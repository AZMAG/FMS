import React, { useRef, useEffect } from "react";

import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

import Graphic from "@arcgis/core/Graphic";

function getAngleFromDirection(direction) {
    if (direction == "EB") {
        return 90;
    } else if (direction == "WB") {
        return -90;
    } else if (direction == "SB") {
        return 180;
    } else {
        return 0;
    }
}

function GeneratedReportMap({ x, y, segment, direction }) {
    const mapDiv = useRef(null);

    useEffect(() => {
        if (mapDiv.current) {
            const map = new ArcGISMap({
                basemap: "gray-vector",
            });

            const view = new MapView({
                map,
                container: mapDiv.current,
                center: [-112.024, 33.541],
                zoom: 9,
                constraints: {
                    rotationEnabled: false,
                    minZoom: 15,
                    maxZoom: 9,
                    snapToZoom: true,
                },
                popup: {
                    alignment: "top-center",
                    dockEnabled: true,
                    collapseEnabled: false,
                    actions: [],
                    dockOptions: {
                        buttonEnabled: false,
                        breakpoint: true,
                    },
                },
                ui: { components: [] },
            });
            view.on("mouse-wheel", (e) => e.stopPropagation());

            const pointGraphic = new Graphic({
                symbol: {
                    type: "simple-marker",
                    style: "triangle",
                    size: "12px",
                    outline: {
                        width: 1,
                    },
                    angle: getAngleFromDirection(direction),
                    color: "cyan",
                },

                geometry: {
                    type: "point",
                    longitude: x,
                    latitude: y,
                },
            });
            const segmentGraphic = new Graphic({
                symbol: {
                    type: "simple-line",
                    color: [226, 119, 40],
                    width: "6px",
                },
                geometry: {
                    type: "polyline",
                    paths: JSON.parse(segment),
                },
            });

            view.graphics.add(segmentGraphic);
            view.graphics.add(pointGraphic);

            view.goTo(segmentGraphic);
        }
    }, [mapDiv]);

    return <div className="m-auto h-96 w-full pt-6" ref={mapDiv}></div>;
}

export default GeneratedReportMap;
