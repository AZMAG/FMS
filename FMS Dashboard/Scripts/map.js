function addMap(options) {
    return new Promise(
        function(resolve, reject) {
            require(["esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "esri/widgets/Legend", "esri/Graphic"], function(Map, MapView, FeatureLayer, Legend, Graphic) {
                _setupMap({ Map, MapView, FeatureLayer, Legend, Graphic, options }).then((res) => {
                    resolve(res);
                })
            });
        }
    );

}

async function _setupMap(params) {

    const { Map, MapView, Legend, Graphic, options } = params;

    const map = new Map({
        basemap: "gray"
    });

    const view = new MapView({
        container: options.target,
        map,
        extent: config.initExtent,
        constraints: {
            rotationEnabled: false,
            minZoom: 10
        },
        ui: {
            components: ["zoom"]
        },
        popup: {
            collapseEnabled: false,
            dockOptions: {
                buttonEnabled: false
            }
        }
    });

    if (options.detectorLayer) {
        const detLayer = await getDetectorsLayer(params);
        map.add(detLayer);
    }
    if (options.corridorLayer) {
        const { fl, fl2 } = await getCorridorsLayer(params);
        map.add(fl);
        map.add(fl2);
    }
    if (options.legend) {
        const legend = new Legend({ view });
        view.ui.add(legend, "bottom-left");
    }

    if (options.yearSelector) {
        var yearSelect = document.createElement("div");

        let items = config.years.sort().reverse().map((year) => {
            return `<option value="${year}">${year}</option>`;
        })

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
                    title: `Validity ${year}`
                }
                detLayer.renderer = cbr;
            }
        }
    }
    return { map, view, Graphic };
}

async function getCorridorsLayer(params) {
    let { options, Graphic, FeatureLayer } = params;

    let fields = [{
        name: 'id',
        type: 'single'
    }, {
        name: 'Name',
        type: 'string'
    }, {
        name: 'Description',
        type: 'string'
    }];

    let data = await getJsonByUrl(`/Corridors/GetCorridors`);

    // console.log(data);

    let renderer = {
        type: "simple",
        symbol: {
            type: "simple-line", // autocasts as new SimpleLineSymbol()
            color: "blue",
            width: "4px",
            style: "solid"
        }
    };
    let popupTemplate;
    let labelingInfo;

    // if (detectorLayer.popup) {
    //     popupTemplate = {
    //         title: 'FMS Detector Locations <span style="display: none;">{*}</span>',
    //         content: GetPopup,
    //         actions: [{
    //             title: "Report",
    //             id: "open-detector-page",
    //             className: "esri-icon-launch-link-external"
    //         }]
    //     }
    //     view.popup.on("trigger-action", function(event) {
    //         const attr = event.target.selectedFeature.attributes;
    //         if (event.action.id === "open-detector-page") {
    //             const detNum = attr['det_num'];
    //             window.location.href = `/Detector?det_num=${detNum}`;
    //         }
    //     });
    // }

    // if (detectorLayer.label === true) {
    labelingInfo = [{
        labelPlacement: 'center-along',
        labelExpressionInfo: {
            expression: '$feature.Name'
        },
        symbol: {
            type: 'text',
            color: 'black',
            font: {
                size: 13
            },
            haloSize: 2,
            haloColor: 'lightgray'
        }
    }]
    // }

    let points = []

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
        // return (360 - theta + 90) % 360
        return theta;
    }

    let srcFeatures = data.map((attr, i) => {
        console.log(attr);

        // let ys = attr.Detectors.map(a => a.y);
        // let xs = attr.Detectors.map(a => a.x);

        // let xavg = getAvg(xs);
        // let yavg = getAvg(ys);

        let pnts = [...attr.Detectors];

        pnts = pnts.map((row) => {
            row.angle = getDirection(row.x, xavg, row.y, yavg);
            return row;
        })

        let paths = pnts.sort((a, b) => {
            let diff = b.angle - a.angle;
            return diff;
        }).map((row) => {
            let graphic = new Graphic({
                geometry: {
                    type: "point",
                    latitude: row.y,
                    longitude: row.x,
                    spatialReference: 4326
                },
                attributes: row
            })
            points.push(graphic);
            return [row.x, row.y];
        })

        // paths.push(paths[0]);
        let maxDist = 0;
        let maxIndex;

        for (let i = 0; i < paths.length - 1; i++) {
            let curr = paths[i];
            let next = paths[i + 1];

            const segmentDist = pntDistance(curr, next);
            if (segmentDist > maxDist) {
                maxDist = segmentDist;
                maxIndex = i + 1;
            }
        }
        let spliceCnt = (paths.length) - maxIndex;

        // let tail = paths.splice(maxIndex, spliceCnt);
        // console.log(tail);

        // paths.unshift(...tail);
        // console.log(tail);


        console.log(paths);
        console.log(maxDist);
        console.log(maxIndex);


        let graphic = new Graphic({
            geometry: {
                type: "polyline",
                paths,
                spatialReference: 4326
            },
            attributes: attr
        })
        return graphic;
    })

    const fl = new FeatureLayer({
        id: "detectors",
        source: srcFeatures,
        spatialReference: {
            wkid: 4326
        },
        fields,
        // labelingInfo,
        objectIdField: "ID",
        popupTemplate,
        renderer
    });

    const fl2 = new FeatureLayer({
        id: "detectors2",
        source: points,
        labelingInfo: [{
            labelPlacement: 'center-right',
            labelExpressionInfo: {
                expression: '$feature.angle'
            },
            symbol: {
                type: 'text',
                color: 'black',
                font: {
                    size: 9
                },
                haloSize: .5,
                haloColor: 'lightgray'
            }
        }],
        spatialReference: {
            wkid: 4326
        },
        fields: [{
            name: 'angle',
            type: 'single'
        }],
        objectIdField: "ID",
    });

    return { fl, fl2 }
}

async function getDetectorsLayer(params) {
    let { options, Graphic, FeatureLayer } = params;
    let { detectorLayer } = options;

    let fields = [{
        name: 'det_num',
        type: 'single'
    }, {
        name: 'Location',
        type: 'string'
    }, {
        name: 'Direction',
        type: 'string'
    }];

    let data = await getJsonByUrl(`/Detector/GetDetectors`);
    let renderer = {
        type: "simple",
        symbol: {
            type: "simple-marker",
            size: 6,
            color: "black",
            outline: {
                width: 0.5,
                color: "white"
            }
        }
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
            actions: [{
                title: "Report",
                id: "open-detector-page",
                className: "esri-icon-launch-link-external"
            }]
        }
        view.popup.on("trigger-action", function(event) {
            const attr = event.target.selectedFeature.attributes;
            if (event.action.id === "open-detector-page") {
                const detNum = attr['det_num'];
                window.location.href = `/Detector?det_num=${detNum}`;
            }
        });
    }

    if (detectorLayer.label === true) {
        labelingInfo = [{
            labelPlacement: 'center-right',
            labelExpressionInfo: {
                expression: '$feature.det_num'
            },
            symbol: {
                type: 'text',
                color: 'black',
                font: {
                    size: 9
                },
                haloSize: .5,
                haloColor: 'lightgray'
            }
        }]
    }

    let srcFeatures = data.map((attr, i) => {
        let graphic = new Graphic({
            geometry: {
                type: "point",
                latitude: attr.y,
                longitude: attr.x,
                spatialReference: 4326
            },
            attributes: attr
        })
        return graphic;
    })

    const fl = new FeatureLayer({
        id: "detectors",
        source: srcFeatures,
        spatialReference: {
            wkid: 4326
        },
        fields,
        labelingInfo,
        objectIdField: "ID",
        popupTemplate,
        renderer
    });

    return fl;

}

function getValidityFields() {
    return config.years.map((year) => {
        return {
            name: `Validity${year}`,
            type: 'single',
            alias: `Validity${year}`
        }
    })
}

async function addValidityAttr(data) {
    let validityData = await getJsonByUrl(`/Home/GetValidityData`);

    return data.map(row => {
        let currValidData = validityData.filter((valid) => {
            return valid["detector_number"] == row["det_num"];
        })

        currValidData.forEach(({ pct, year }) => {
            row[`Validity${year}`] = pct;
        })
        return row;
    })
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
            title: `Validity ${maxYear}`
        },
        visualVariables: [{
            type: "rotation",
            valueExpression: `When($feature.Direction == 'EB', 90, $feature.Direction == 'WB', -90, $feature.Direction == 'SB', 180, 0)`
        }],
        classBreakInfos: []
    }
    let iterCnt = 0;
    for (let i = 0; i < 1; i += .2) {
        let next = i + .2;
        cbr.classBreakInfos.push({
            minValue: i,
            maxValue: next,
            symbol: {
                type: "simple-marker",
                style: "triangle",
                color: validityColors[iterCnt],
                size: "10px",
                outline: {
                    width: 1
                }
            },
            label: `${ Math.floor(i * 100)} - ${ Math.floor(next * 100) }%`
        })
        iterCnt++;
    }

    return cbr;
}

async function GetPopup({ graphic }) {
    let attr = graphic.attributes;
    let { Location, det_num } = attr;

    let validityRows = config.years.sort().reverse().map((year) => {
        return `<tr>
                    <th scope="row">${year}</th>
                    <td>${(attr[`Validity${year}`] * 100).toFixed(2)}%</td>
                </tr>`
    })

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
                ${validityRows.join('')}
            </tbody>
        </table>
        `
}