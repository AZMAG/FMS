import React from "react";
import { useDataStore } from "../../../stores/DataContext";
import { observer } from "mobx-react-lite";
import JSZip from "jszip";
import FileSaver from "file-saver";

function DownloadShapefileButton() {
    const store = useDataStore();

    async function downloadShapefile() {
        const { features } = await store.detectorsLayer.queryFeatures();
        const attrs = features.map((feature) => {
            return {
                ...feature.attributes,
                x: feature.geometry.x,
                y: feature.geometry.y,
            };
        });
        const shps = features.map((feature) => [
            feature.geometry.x,
            feature.geometry.y,
        ]);

        window.shpwrite.write(attrs, "POINT", shps, (err, res) => {
            const zip = new JSZip();
            zip.file("output.dbf", res.dbf.buffer);
            zip.file("output.prj", res.prj);
            zip.file("output.shp", res.shp.buffer);
            zip.file("output.shx", res.shx.buffer);
            zip.generateAsync({ type: "blob" }).then(function (content) {
                FileSaver.saveAs(content, "output.zip");
            });
        });
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
