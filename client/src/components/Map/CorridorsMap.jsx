import React, { useRef, useEffect } from "react";

import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

import { useDataStore } from "../../stores/DataContext";

import getCorridorsLayer from "./getCorridorsLayer";
import { useNavigate } from "react-router-dom";

import ZoomWidget from "../MapWidgets/zoomWidget";
import HomeWidget from "../MapWidgets/homeWidget";
import BasemapToggleWidget from "../MapWidgets/basemapToggleWidget";

function DetectorMap() {
    const mapDiv = useRef(null);
    const store = useDataStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (mapDiv.current) {
            const _map = new ArcGISMap({
                basemap: "gray-vector",
            });

            const _view = new MapView({
                map: _map,
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
            (async () => {
                const corridorsLayer = await getCorridorsLayer(store);
                _map.add(corridorsLayer);
                store.corridorMap.setCorridorLayer(corridorsLayer);
                store.corridorMap.setMap(_map);
                store.corridorMap.setView(_view);
            })();

            _view.popup.on("trigger-action", (event) => {
                if (event.action.id === "open-detector-page") {
                    const det_num =
                        _view.popup.selectedFeature.attributes.det_num;
                    navigate(`/detector/${det_num}`);
                }
            });
            // Call Widgets
            ZoomWidget(_view);
            HomeWidget(_view);
            BasemapToggleWidget(_view);
        }
    }, [mapDiv, store, navigate]);

    return <div className="m-auto mx-6 h-[700px] w-4/5" ref={mapDiv}></div>;
}

export default DetectorMap;
