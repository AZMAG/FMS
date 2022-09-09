import React from "react";
import { useDataStore } from "../../../stores/DataContext";
import { observer } from "mobx-react-lite";
import shpwrite from "shp-write";

function DownloadShapefileButton() {
    const store = useDataStore();

    async function downloadShapefile() {
        const { features } = await store.detectorsLayer.queryFeatures();
        const geoJSONFeatures = features.map((feature) => {
            return {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [feature.geometry.y, feature.geometry.x],
                },
                properties: {
                    // ...feature.attributes,
                    // x: feature.geometry.x,
                    // y: feature.geometry.y,
                    test: "test",
                },
            };
        });

        var options = {
            folder: "myshapes",
            types: {
                point: "mypoints",
                polygon: "mypolygons",
                line: "mylines",
            },
        };
        // a GeoJSON bridge for features
        shpwrite.download(
            {
                type: "FeatureCollection",
                features: [
                    {
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: [0, 0],
                        },
                        properties: {
                            name: "Foo",
                        },
                    },
                    {
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: [0, 10],
                        },
                        properties: {
                            name: "Bar",
                        },
                    },
                ],
            },
            options
        );

        // console.log(window.shpwrite);

        // window.shpwrite.download({
        //     type: "FeatureCollection",
        //     features: geoJSONFeatures,
        // });
    }
    return (
        <button
            onClick={downloadShapefile}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded inline-flex items-center"
        >
            <svg
                className="fill-current w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
            >
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
            <span>Download Shapefile</span>
        </button>
    );
}

export default observer(DownloadShapefileButton);
