import React, { useRef, useEffect, useState } from "react";

import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

// import { useDataStore } from "../../stores/DataContext";
// import getDetectorsLayer from "../../Map/getDetectorsLayer";
// import getCorridorsLayer from "../../Map/getCorridorsLayer";

import ZoomWidget from "../../MapWidgets/zoomWidget";
import HomeWidget from "../../MapWidgets/homeWidget";
import BasemapToggleWidget from "../../MapWidgets/basemapToggleWidget";
import { report } from "process";

function QueryBuilderMap({detectorsLayer, definitionExpression}) {

    const mapDiv = useRef(null);
    
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
                    minZoom: 2,
                    maxZoom: 20,
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

            ZoomWidget(_view);
            HomeWidget(_view);
            BasemapToggleWidget(_view);

            // // Add Layers to Map
            _map.addMany([detectorsLayer])

            // Apply Definition Expression to Layers
            detectorsLayer.definitionExpression=definitionExpression;
            detectorsLayer.queryExtent({
                where : definitionExpression
            })
            .then((result) => {
                _view.goTo({
                    target: result.extent,
                    zoom: 15
                })

                console.log(_view.zoom)
            })

        }
    }, [mapDiv, detectorsLayer, definitionExpression]);

    return <div className="m-auto h-full w-full" ref={mapDiv}></div>;
}

export default QueryBuilderMap;