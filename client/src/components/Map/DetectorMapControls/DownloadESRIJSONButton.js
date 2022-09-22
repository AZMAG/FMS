import React from "react";
import { useDataStore } from "../../../stores/DataContext";
import { observer } from "mobx-react-lite";
import FileSaver from "file-saver";

function DownloadESRIJSONButton() {
    const store = useDataStore();

    async function downloadESRIJSON() {
        const { features } =
            await store.detectorMap.detectorsLayer.queryFeatures();
        const esriJson = {
            objectIdFieldName: "objectid",
            geometryType: "esriGeometryPoint",
            spatialReference: {
                wkid: 102100,
                latestWkid: 3857,
            },
            fields: [
                {
                    name: "objectid",
                    alias: "OBJECTID",
                    type: "esriFieldTypeOID",
                },
                {
                    name: "det_num",
                    alias: "det_num",
                    type: "esriFieldTypeInteger",
                },
                {
                    name: "Location",
                    alias: "Location",
                    type: "esriFieldTypeString",
                },
                {
                    name: "Direction",
                    alias: "Direction",
                    type: "esriFieldTypeString",
                },
                { name: "Route", alias: "Route", type: "esriFieldTypeString" },
                {
                    name: "Validity2015",
                    alias: "Validity2015",
                    type: "esriFieldTypeDouble",
                },
                {
                    name: "Validity2016",
                    alias: "Validity2016",
                    type: "esriFieldTypeDouble",
                },
                {
                    name: "Validity2017",
                    alias: "Validity2017",
                    type: "esriFieldTypeDouble",
                },
                {
                    name: "Validity2018",
                    alias: "Validity2018",
                    type: "esriFieldTypeDouble",
                },
                {
                    name: "Validity2019",
                    alias: "Validity2019",
                    type: "esriFieldTypeDouble",
                },
                {
                    name: "Validity2020",
                    alias: "Validity2020",
                    type: "esriFieldTypeDouble",
                },
                {
                    name: "Validity2021",
                    alias: "Validity2021",
                    type: "esriFieldTypeDouble",
                },
                { name: "x", alias: "x", type: "esriFieldTypeDouble" },
                { name: "y", alias: "y", type: "esriFieldTypeDouble" },
            ],
            features: features.map((feature) => {
                feature.attributes.x = feature.geometry.x;
                feature.attributes.y = feature.geometry.y;
                return feature;
            }),
        };

        var blob = new Blob([JSON.stringify(esriJson)], {
            type: "text/plain;charset=utf-8",
        });
        FileSaver.saveAs(blob, "export.json");
    }
    return (
        <button
            onClick={downloadESRIJSON}
            className="mt-2 bg-mag-teal/75 hover:bg-mag-teal text-white font-bold w-56 py-1 px-4 rounded inline-flex items-center"
        >
            <svg
                className="fill-current w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
            >
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
            <span>Download ESRI JSON</span>
        </button>
    );
}

export default observer(DownloadESRIJSONButton);
