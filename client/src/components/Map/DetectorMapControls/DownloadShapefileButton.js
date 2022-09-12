import React from "react";
import { useDataStore } from "../../../stores/DataContext";
import { observer } from "mobx-react-lite";
import JSZip from "jszip";
import FileSaver from "file-saver";

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

        window.shpwrite.write(
            [{ test: "test", OID: 1, FID: 1 }],
            "POINT",
            [[0, 0]],
            (err, res) => {
                const zip = new JSZip();
                console.log(res);
                zip.file("output.dbf", res.dbf.buffer);
                zip.file("output.prj", res.prj);
                zip.file("output.shp", res.shp.buffer);
                zip.file("output.shx", res.shx.buffer);
                zip.generateAsync({ type: "blob" }).then(function (content) {
                    FileSaver.saveAs(content, "output.zip");
                });
            }
        );

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
