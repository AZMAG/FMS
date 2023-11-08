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

class Map {

    constructor(
        container, 
        detectorsLayer, 
        corridorsLayer, 
        reportType, 
        detectorsLayerDefinitionExpression, 
        corridorsLayerDefinitionExpression,
        map,
        view
    ) 
    {
        this.container=container;
        this.detectorsLayer = detectorsLayer;
        this.corridorsLayer = corridorsLayer;
        this.reportType = reportType;
        this.detectorsLayerDefinitionExpression = detectorsLayerDefinitionExpression;
        this.corridorsLayerDefinitionExpression = corridorsLayerDefinitionExpression;
        this.map=map;
        this.view=view;
    }

    renderMap = () => {

        

        this.map = new ArcGISMap({
            basemap: "gray-vector",
        });
    
        this.view = new MapView({
            map: this.map,
            container: this.container,
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

    }



}

export default Map;

// function QueryBuilderMap(params) {

//     ////////////////////////////
//     // Set Component State
//     ////////////////////////////


//     ////////////////////////////
//     // Layer Assembly Methods
//     ////////////////////////////

//     // const [reportType, setReportType] = useState(params.reportType)

//     // console.log(params)

//     const mapDiv = useRef(null);

//     useEffect(() => {

//         if (mapDiv.current) {

//             const _map = new ArcGISMap({
//                 basemap: "gray-vector",
//             });

//             const _view = new MapView({
//                 map: _map,
//                 container: mapDiv.current,
//                 center: [-112.024, 33.541],
//                 zoom: 9,
//                 constraints: {
//                     rotationEnabled: false,
//                     minZoom: 15,
//                     maxZoom: 9,
//                     snapToZoom: true,
//                 },
//                 popup: {
//                     alignment: "top-center",
//                     dockEnabled: true,
//                     collapseEnabled: false,
//                     actions: [],
//                     dockOptions: {
//                         buttonEnabled: false,
//                         breakpoint: true,
//                     },
//                 },
//                 ui: { components: [] },
//             });

//             ZoomWidget(_view);
//             HomeWidget(_view);
//             BasemapToggleWidget(_view);

//             // // Add Layers to Map
//             /*

//             */
//             if (params.reportType === 'detector'){
//                 params.detectorsLayer.visible = true;
//                 params.corridorsLayer.visible = !params.detectorsLayer.visible;
//             }
//             else {
//                 params.detectorsLayer.visible = false;
//                 params.corridorsLayer.visible = !params.detectorsLayer.visible;
//             }
//             console.log(params)

//             _map.addMany([params.detectorsLayer, params.corridorsLayer])


//         }
//     }, [mapDiv, params]);

//     return <div className="m-auto h-full w-full" ref={mapDiv}></div>;
// }

// export default QueryBuilderMap;
