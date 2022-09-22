import React, { useRef, useEffect } from "react";

import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

import { useDataStore } from "../../stores/DataContext";

import getDetectorsLayer from "./getDetectorsLayer";
import { useNavigate } from "react-router-dom";

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
                const detectorsLayer = await getDetectorsLayer(store);
                _map.add(detectorsLayer);
                store.detectorMap.setDetectorsLayer(detectorsLayer);
                store.detectorMap.setMap(_map);
                store.detectorMap.setView(_view);
            })();

            _view.popup.on("trigger-action", (event) => {
                if (event.action.id === "open-detector-page") {
                    const det_num =
                        _view.popup.selectedFeature.attributes.det_num;
                    navigate(`/detector/${det_num}`);
                }
            });
        }
    }, [mapDiv, store, navigate]);

    return <div className="m-auto h-full w-full" ref={mapDiv}></div>;
}

export default DetectorMap;
