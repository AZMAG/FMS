import Graphic from "@arcgis/core/Graphic";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import DocConfig from "../../DocConfig";
import getValidityData from "./getValidityData";
import getDetectors from "./getDetectors";
import * as ReactDOM from "react-dom/client";

async function getDetectorsLayer(store) {
    function getCbr() {
        let maxYear = Math.max(...DocConfig.years);
        let validityColors = ["red", "orange", "yellow", "lightgreen", "green"];
        const noDataSymbol = {
            type: "simple-marker",
            style: "triangle",
            size: "10px",
            outline: {
                width: 1,
            },
            color: "gray",
        };

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
            defaultSymbol: store
                ? store?.detectorMap.noDataAvailableShown
                    ? noDataSymbol
                    : null
                : noDataSymbol,
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
    function getValidityFields() {
        return DocConfig.years.map((year) => {
            return {
                name: `Validity${year}`,
                type: "single",
                alias: `Validity${year}`,
            };
        });
    }

    async function addValidityAttr(data) {
        let validityData = await getValidityData();

        return data.map((row) => {
            let currValidData = validityData.filter((valid) => {
                return valid["detector_number"] === row["det_num"];
            });

            DocConfig.years.forEach((year) => {
                const currData = currValidData.filter((dataRow) => {
                    return dataRow.year === year;
                });

                if (currData.length === 1) {
                    row[`Validity${year}`] =
                        currData[0].valid / currData[0].total;
                } else {
                    row[`Validity${year}`] = null;
                }
            });
            return row;
        });
    }

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
        { name: "Route", type: "string" },
    ];

    let data = await getDetectors();

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
    renderer = getCbr();

    popupTemplate = {
        title: "FMS Detector Locations",
        content: ({ graphic }) => {
            const fullDataset = data.filter((row) => {
                return row.det_num === graphic.attributes.det_num;
            })[0];

            let det_num = graphic.attributes.det_num;
            let validity =
                graphic.attributes["Validity" + store.detectorMap.selectedYear];

            const div = document.createElement("div");
            const root = ReactDOM.createRoot(div);

            root.render(
                <div className="mt-3 text-black">
                    <div>
                        <span className="font-semibold">Detector Number</span>:{" "}
                        {det_num}
                    </div>
                    <div>
                        <span className="font-semibold">Location</span>:{" "}
                        {fullDataset.Location}
                    </div>
                    <div>
                        <span className="font-semibold">Direction</span>:{" "}
                        {fullDataset.Direction}
                    </div>
                    <div>
                        <span className="font-semibold">Route</span>:{" "}
                        {fullDataset.Route}
                    </div>
                    <div>
                        <span className="font-semibold">Validity</span>:{" "}
                        {validity.toFixed(2) * 100}%
                    </div>
                </div>
            );

            return div;
        },

        actions: [
            {
                title: "Report",
                id: "open-detector-page",
                className: "esri-icon-launch-link-external",
            },
        ],
    };

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
        renderer: renderer,
        definitionExpression: store?.detectorMap.getDefExpression(),
        labelsVisible: store ? store.detectorMap.labelsVisible : true,
    });

    return fl;
}

export default getDetectorsLayer;