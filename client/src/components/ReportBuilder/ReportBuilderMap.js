import React, { useRef, useEffect } from "react";

import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

import { useDataStore } from "../../stores/DataContext";
import getDetectorsLayer from "../Map/getDetectorsLayer";

import ZoomWidget from "../MapWidgets/zoomWidget";
import HomeWidget from "../MapWidgets/homeWidget";
import BasemapToggleWidget from "../MapWidgets/basemapToggleWidget";

function QueryBuilderMap() {
    const mapDiv = useRef(null);
    const store = useDataStore();

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
                const graphicsLayer = new GraphicsLayer();
                _map.add(graphicsLayer);
                store.queryBuilder.setGraphicsLayer(graphicsLayer);

                const detectorsLayer = await getDetectorsLayer();
                _map.add(detectorsLayer);

                store.queryBuilder.setDetectorsLayer(detectorsLayer);

                store.queryBuilder.setMap(_map);
                store.queryBuilder.setView(_view);
            })();
            // Call Widgets
            ZoomWidget(_view);
            HomeWidget(_view);
            BasemapToggleWidget(_view);
        }
    }, [mapDiv, store]);

    return <div className="m-auto h-full w-full" ref={mapDiv}></div>;
}

export default QueryBuilderMap;
