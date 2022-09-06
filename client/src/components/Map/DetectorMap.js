import React, { useRef, useEffect } from "react";

import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import { whenFalseOnce } from "@arcgis/core/core/reactiveUtils";
import { useDataStore } from "../../stores/DataContext";

import getDetectorsLayer from "./getDetectorsLayer";

function DetectorMap() {
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
                extent: {
                    spatialReference: {
                        wkid: 102100,
                    },
                    xmax: -12399883.303088231,
                    xmin: -12546642.690914528,
                    ymax: 3993315.240863136,
                    ymin: 3925821.209899271,
                },
                constraints: {
                    rotationEnabled: false,
                    minZoom: 8,
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
                const detectorsLayer = await getDetectorsLayer();
                _map.add(detectorsLayer);
                store.setDetectorsLayer(detectorsLayer);
                store.setMap(_map);
                store.setView(_view);
            })();
        }
    }, [mapDiv, store]);

    return <div className="m-auto h-full w-full" ref={mapDiv}></div>;
}

export default DetectorMap;
