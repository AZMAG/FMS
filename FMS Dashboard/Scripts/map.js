let colors = [
  "#a6cee3",
  "#1f78b4",
  "#b2df8a",
  "#33a02c",
  "#fb9a99",
  "#e31a1c",
  "#fdbf6f",
  "#ff7f00",
  "#cab2d6",
  "#6a3d9a",
  "#ffff99",
  "#b15928",
];

function addMap(options) {
  return new Promise(function (resolve, reject) {
    require([
      "esri/Map",
      "esri/views/MapView",
      "esri/layers/FeatureLayer",
      "esri/widgets/Legend",
      "esri/widgets/Home",
      "esri/Graphic",
      "esri/core/watchUtils",
    ], function (Map, MapView, FeatureLayer, Legend, Home, Graphic, watchUtils) {
      _setupMap({
        Map,
        MapView,
        FeatureLayer,
        Legend,
        Home,
        Graphic,
        watchUtils,
        options,
      }).then((res) => {
        resolve(res);
      });
    });
  });
}

async function _setupMap(params) {
  let rtnObj = {};
  const { Map, MapView, Legend, Home, Graphic, watchUtils, options } = params;

  const map = new Map({
    basemap: "gray",
  });

  const view = new MapView({
    container: options.target,
    map,
    extent: config.initExtent,
    constraints: {
      rotationEnabled: false,
      minZoom: 10,
    },
    ui: {
      components: ["zoom", "home"],
    },
    popup: {
      collapseEnabled: false,
      dockOptions: {
        buttonEnabled: false,
      },
    },
  });

  if (options.detectorLayer) {
    const detLayer = await getDetectorsLayer(params);
    map.add(detLayer);
    view.popup.on("trigger-action", function (event) {
      const attr = event.target.selectedFeature.attributes;
      if (event.action.id === "open-detector-page") {
        const detNum = attr["det_num"];
        window.location.href = `/Detector?det_num=${detNum}`;
      }
    });
    let detectorHighlight;
    async function highlightDetector(det_num) {
      if (detectorHighlight) {
        await detectorHighlight.remove();
      }
      const layerView = await view.whenLayerView(detLayer);
      const { features } = await detLayer.queryFeatures({
        where: `det_num = ${det_num}`,
      });

      if (features.length > 0) {
        detectorHighlight = layerView.highlight(features[0]);
        view.zoom = 13;
        view.goTo(features[0]);
      }
    }
    rtnObj.highlightDetector = highlightDetector;

    if (options.detectorLayer.highlightDetector) {
      highlightDetector(options.detectorLayer.highlightDetector);
    }
  }
  if (options.corridorLayer) {
    const { fl, fl2 } = await getCorridorsLayer(params);
    map.add(fl);
    if (options.corridorLayer.showDetectors) {
      map.add(fl2);
    }

    view.popup.autoOpenEnabled = false;

    function openPopup(mapPoint, features) {
      let name = features[0].attributes["Name"];
      let description = getSegmentByName(name);

      view.popup.open({
        title: "Corridors",
        content: `
                <p><b>Name:</b> ${name}</p>
                <p><b>Description:</b> ${description}</p>
                <table class="table validityTable table-sm">
                    
                        <tbody><tr>
                            <th>Year</th>
                            <th>Validity</th>
                        </tr>
                    
                    </tbody><tbody>
                        <tr>
                            <th>2018</th>
                            <td>23.63%</td>
                        </tr><tr>
                            <th>2017</th>
                            <td>94.26%</td>
                        </tr><tr>
                            <th>2016</th>
                            <td>95.97%</td>
                        </tr><tr>
                            <th>2015</th>
                            <td>90.84%</td>
                        </tr>
                    </tbody>
                </table>
                `,
        location: mapPoint,
      });
    }

    const layerView = await view.whenLayerView(fl);
    let highLight;
    let currEvent;
    view.on("click", async function (e) {
      const res = await view.hitTest(e);
      if (res.results.length) {
        var graphic = res.results.filter(function (result) {
          return true;
        })[0].graphic;
        let { features } = await layerView.queryFeatures({
          where: `Name = '${graphic.attributes["Name"]}'`,
          outFields: ["*"],
        });

        openPopup(e.mapPoint, features);
        console.log(graphic, features);

        if (highLight) {
          highLight.remove();
        }

        highLight = layerView.highlight(features);
        currEvent = e.eventId;

        //This code
        watchUtils.whenTrueOnce(view.popup, "visible", (visible) => {
          watchUtils.whenFalseOnce(view.popup, "visible", (visible) => {
            if (!visible && highLight && currEvent === e.eventId) {
              highLight.remove();
            }
          });
        });
      }
    });
  }
  if (options.legend) {
    const legend = new Legend({ view });
    view.ui.add(legend, "bottom-left");
  }

  if (options.home) {
    const home = new Home({ view });
    view.ui.add(home, "top-left");
  }

  if (options.yearSelector) {
    var yearSelect = document.createElement("div");

    let items = config.years
      .sort()
      .reverse()
      .map((year) => {
        return `<option value="${year}">${year}</option>`;
      });

    yearSelect.innerHTML = `<select class="custom-select" id="yearSelect">${items}</select>`;

    view.ui.add(yearSelect, "top-right");

    let $yearSelect = $("#yearSelect");
    $yearSelect.change((e) => {
      const year = $yearSelect.val();
      updateRenderers(year);
    });

    function updateRenderers(year) {
      let detLayer = map.findLayerById("detectors");
      if (detLayer) {
        let cbr = getCbr();
        cbr.field = `Validity${year}`;
        cbr.legendOptions = {
          title: `Validity ${year}`,
        };
        detLayer.renderer = cbr;
      }
    }
  }
  return { ...rtnObj, map, view, Graphic };
}
let segments = [];

function getSegmentByName(name) {
  let segmentData = segments.filter((segment) => {
    return segment.attributes["Name"] === name;
  });

  if (segmentData.length > 0) {
    return segmentData[0].attributes["Description"];
  } else {
    return "";
  }
}

async function getCorridorsLayer(params) {
  let { options, Graphic, FeatureLayer } = params;
  let { corridorLayer } = options;

  let data = await getJsonByUrl(`/Corridors/GetCorridors`);

  console.log(data);

  function getAvg(grades) {
    const total = grades.reduce((acc, c) => acc + c, 0);
    return total / grades.length;
  }

  function pntDistance(a, b) {
    return Math.hypot(a[0] - b[0], a[1] - b[1]);
  }

  function getDirection(x1, x2, y1, y2) {
    var dy = y2 - y1;
    var dx = x2 - x1;
    var theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI;
    return theta;
  }

  // let segments = [];
  let points = [];
  let uvr = [];

  data.forEach((attr, i) => {
    let color = colors[i]
      ? colors[i]
      : "#" + Math.floor(Math.random() * 16777215).toString(16);

    uvr.push({
      value: attr["Name"],
      symbol: {
        type: "simple-line",
        color,
        width: "6px",
      },
    });

    attr.Detectors.forEach((detector) => {
      if (detector) {
        if (detector.Segment) {
          let segment = JSON.parse(detector.Segment);

          let graphic = new Graphic({
            geometry: {
              type: "polyline",
              paths: segment,
              spatialReference: 4326,
            },
            attributes: attr,
          });

          segments.push(graphic);
        }

        // let graphic = new Graphic({
        //     geometry: {
        //         type: "point",
        //         latitude: detector.y,
        //         longitude: detector.x,
        //         spatialReference: 4326
        //     },

        //     attributes: detector
        // })
        // points.push(graphic);
      }
    });
  });

  console.log(segments);

  const fl = new FeatureLayer({
    id: "corridors",
    title: "Corridor Name",
    source: segments,
    spatialReference: {
      wkid: 4326,
    },
    outfields: ["Description"],
    fields: [
      {
        name: "id",
        type: "single",
      },
      {
        name: "Name",
        type: "string",
      },
      {
        name: "Description",
        type: "string",
      },
    ],
    objectIdField: "ID",
    //popupTemplate,
    renderer: {
      type: "unique-value",
      field: "Name",
      uniqueValueInfos: uvr,
    },
  });

  const fl2 = new FeatureLayer({
    id: "corridorDetectors",
    source: points,
    labelingInfo: [
      {
        labelPlacement: "center-right",
        labelExpressionInfo: {
          expression: "$feature.det_num",
        },
        symbol: {
          type: "text",
          color: "black",
          font: {
            size: 9,
          },
          haloSize: 0.5,
          haloColor: "lightgray",
        },
        maxScale: 0,
        minScale: 150000,
      },
    ],
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-marker",
        style: "circle",
        color: "white",
        size: "4px",
      },
    },
    legendEnabled: false,
    spatialReference: {
      wkid: 4326,
    },
    fields: [
      {
        name: "det_num",
        type: "single",
      },
    ],
    objectIdField: "ID",
  });

  return { fl, fl2 };
}

async function getDetectorsLayer(params) {
  let { options, Graphic, FeatureLayer } = params;
  let { detectorLayer } = options;

  let fields = [
    {
      name: "det_num",
      type: "single",
    },
    {
      name: "Location",
      type: "string",
    },
    {
      name: "Direction",
      type: "string",
    },
  ];

  let data = await getJsonByUrl(`/Detector/GetDetectors`);
  let renderer = {
    type: "simple",
    symbol: {
      type: "simple-marker",
      size: 6,
      color: "black",
      outline: {
        width: 0.5,
        color: "white",
      },
    },
  };
  let popupTemplate;
  let labelingInfo;

  fields = fields.concat(getValidityFields());
  data = await addValidityAttr(data);

  if (detectorLayer.renderer === "validity") {
    renderer = getCbr();
  }
  if (detectorLayer.popup) {
    popupTemplate = {
      title: 'FMS Detector Locations <span style="display: none;">{*}</span>',
      content: GetPopup,
      actions: [
        {
          title: "Report",
          id: "open-detector-page",
          className: "esri-icon-launch-link-external",
        },
      ],
    };
  }

  if (detectorLayer.label === true) {
    labelingInfo = [
      {
        labelPlacement: "center-right",
        labelExpressionInfo: {
          expression: "$feature.det_num",
        },
        symbol: {
          type: "text",
          color: "black",
          font: {
            size: 9,
          },
          haloSize: 0.5,
          haloColor: "lightgray",
        },
      },
    ];
  }

  let srcFeatures = data.map((attr, i) => {
    let graphic = new Graphic({
      geometry: {
        type: "point",
        latitude: attr.y,
        longitude: attr.x,
        spatialReference: 4326,
      },
      attributes: attr,
    });
    return graphic;
  });

  const fl = new FeatureLayer({
    id: "detectors",
    source: srcFeatures,
    spatialReference: {
      wkid: 4326,
    },
    fields,
    labelingInfo,
    objectIdField: "ID",
    popupTemplate,
    renderer,
  });

  return fl;
}

function getValidityFields() {
  return config.years.map((year) => {
    return {
      name: `Validity${year}`,
      type: "single",
      alias: `Validity${year}`,
    };
  });
}

async function addValidityAttr(data) {
  let validityData = await getJsonByUrl(`/Home/GetValidityData`);

  return data.map((row) => {
    let currValidData = validityData.filter((valid) => {
      return valid["detector_number"] == row["det_num"];
    });

    currValidData.forEach(({ pct, year }) => {
      row[`Validity${year}`] = pct;
    });
    return row;
  });
}

async function getJsonByUrl(url) {
  const res = await fetch(`${url}`);
  const data = await res.json();
  return data;
}

function getCbr() {
  let maxYear = Math.max(...config.years);
  let validityColors = ["red", "orange", "yellow", "lightgreen", "green"];

  let cbr = {
    type: "class-breaks",
    field: `Validity${maxYear}`,
    legendOptions: {
      title: `Validity ${maxYear}`,
    },
    visualVariables: [
      {
        type: "rotation",
        valueExpression: `When($feature.Direction == 'EB', 90, $feature.Direction == 'WB', -90, $feature.Direction == 'SB', 180, 0)`,
      },
    ],
    classBreakInfos: [],
  };
  let iterCnt = 0;
  for (let i = 0; i < 1; i += 0.2) {
    let next = i + 0.2;
    cbr.classBreakInfos.push({
      minValue: i,
      maxValue: next,
      symbol: {
        type: "simple-marker",
        style: "triangle",
        color: validityColors[iterCnt],
        size: "10px",
        outline: {
          width: 1,
        },
      },
      label: `${Math.floor(i * 100)} - ${Math.floor(next * 100)}%`,
    });
    iterCnt++;
  }

  return cbr;
}

async function GetPopup({ graphic }) {
  let attr = graphic.attributes;
  let { Location, det_num } = attr;

  let validityRows = config.years
    .sort()
    .reverse()
    .map((year) => {
      return `<tr>
                    <th scope="row">${year}</th>
                    <td>${(attr[`Validity${year}`] * 100).toFixed(2)}%</td>
                </tr>`;
    });

  return `
        <h5 class="detectorNumber">Detector: <a class="link" href="/Detector?det_num=${det_num}">${det_num}</a></h5>
        <div class="detectorDescription">
            <small>Location: ${Location}</small>
        </div>
        <table class="table validityTable table-sm">
            <thead class="thead-light">
                <tr>
                    <th scope="col">Year</th>
                    <th scope="col">Validity</th>
                </tr>
            </thead>
            <tbody>
                ${validityRows.join("")}
            </tbody>
        </table>
        `;
}
