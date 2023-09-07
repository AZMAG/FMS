import Graphic from "@arcgis/core/Graphic";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import DocConfig from "../../DocConfig";
import getCorridorValidityData from "./getCorridorValidityData";
import getCorridors from "./getCorridors";
import * as ReactDOM from "react-dom/client";
import PolyLine from "@arcgis/core/geometry/Polyline";

async function getCorridorsLayer(store) {
    let data = await getCorridors();
    let fields = [
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
    ];

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
            // visualVariables: [
            //     {
            //         type: "rotation",
            //         valueExpression: `When($feature.Direction == 'EB', 90, $feature.Direction == 'WB', -90, $feature.Direction == 'SB', 180, 0)`,
            //     },
            // ],
            classBreakInfos: [],
        };
        let iterCnt = 0;
        for (let i = 0; i < 1; i += 0.2) {
            let next = i + 0.2;
            cbr.classBreakInfos.push({
                minValue: i,
                maxValue: next,

                symbol: {
                    type: "simple-line",
                    color: validityColors[iterCnt],
                    width: "5px",
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
        let validityData = await getCorridorValidityData();

        return data.map((row) => {
            let currValidData = validityData.filter((valid) => {
                return valid["corridor"] === row["id"];
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
    data = await addValidityAttr(data);
    const renderer = getCbr();
    // const fields = getValidityFields();
    fields = fields.concat(getValidityFields());

    const srcFeatures = [];
    // GetCorridorValidity;

    data.forEach((corridor) => {
        var combinedCorridor = new PolyLine();
        corridor.Detectors.forEach((detector) => {
            combinedCorridor.addPath(JSON.parse(detector.Segment));
        });

        let graphic = new Graphic({
            geometry: {
                type: "polyline",
                paths: combinedCorridor.paths,
            },
            attributes: {
                ...corridor,
            },
        });
        srcFeatures.push(graphic);
    });

    console.log(data, renderer);

    const fl = new FeatureLayer({
        id: "corridors",
        source: srcFeatures,
        spatialReference: {
            wkid: 4326,
        },
        objectIdField: "id",
        renderer,
        // renderer: {
        //     type: "simple",
        //     symbol: {
        //         type: "simple-line",
        //         color: [255, 0, 0],
        //         width: 2,
        //     },
        // },
        fields,
        popupTemplate: {
            title: "Corridor",
            content: ({ graphic }) => {
                const id = graphic.attributes.id;
                const corridor = data.find((corridor) => corridor.id === id);
                const div = document.createElement("div");
                ReactDOM.createRoot(div).render(
                    <div className="p-1">
                        <p className="text-md my-2 font-semibold">
                            {corridor.Name}
                        </p>
                        <p>{corridor.Description}</p>
                    </div>
                );
                return div;
            },
        },
    });

    return fl;
}

export default getCorridorsLayer;
