import React from "react";
import { useDataStore } from "../../../stores/DataContext";
import { observer } from "mobx-react-lite";
import FileSaver from "file-saver";

function DownloadGeoJsonButton() {
    const store = useDataStore();

    async function downloadGeoJson() {
        const { features } =
            await store.detectorMap.detectorsLayer.queryFeatures();
        const geoJSONFeatures = features.map((feature) => {
            return {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [feature.geometry.x, feature.geometry.y],
                },
                properties: {
                    ...feature.attributes,
                    x: feature.geometry.x,
                    y: feature.geometry.y,
                },
            };
        });

        var blob = new Blob([JSON.stringify(geoJSONFeatures)], {
            type: "text/plain;charset=utf-8",
        });
        FileSaver.saveAs(blob, "export.geojson");
    }
    return (
        <button
            onClick={downloadGeoJson}
            className="mt-2 bg-mag-teal/75 hover:bg-mag-teal text-white font-bold w-56 py-1 px-4 rounded inline-flex items-center"
        >
            <svg
                className="fill-current w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
            >
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
            <span>Download GeoJSON</span>
        </button>
    );
}

export default observer(DownloadGeoJsonButton);
