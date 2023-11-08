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

function QueryBuilderMap(params) {

    console.log(params)

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
                    minZoom: 20,
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

            ZoomWidget(_view);
            HomeWidget(_view);
            BasemapToggleWidget(_view);

                        // Add Layers to Map
                        _map.addMany([params.detectorsLayer, params.corridorsLayer])

            // Layer Visibility and Extent
            if (params.reportType === 'detector'){
                
                params.detectorsLayer.visible = true;
                params.corridorsLayer.visible = !params.detectorsLayer.visible;

                if (params.detector != undefined){

                    var queryParam = {'where' : `det_num=${params.detector.detector.det_num}`}
                    params.detectorsLayer.queryExtent(queryParam)
                    .then((result) => {
                        console.log(result.extent)
                        _view.goTo({target : result.extent, zoom : 20})
                    });
                    params.detectorsLayer.definitionExpression=`det_num=${params.detector.detector.det_num}`

                    
                }
            
            }
            else {
                params.detectorsLayer.visible = false;
                params.corridorsLayer.visible = !params.detectorsLayer.visible;   
            }





        }
    }, [mapDiv, params]);

    return <div className="m-auto h-full w-full" ref={mapDiv}></div>;
}

export default QueryBuilderMap;
