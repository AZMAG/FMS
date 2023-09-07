import React, { useRef, useEffect } from "react";

import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

import { useDataStore } from "../../stores/DataContext";

import getDetectorsLayer from "./getDetectorsLayer";
import { useNavigate } from "react-router-dom";

import ZoomWidget from "../MapWidgets/zoomWidget";
import HomeWidget from "../MapWidgets/homeWidget";
import BasemapToggleWidget from "../MapWidgets/basemapToggleWidget";
import DirectionSelector from "./DetectorMapControls/DirectionSelector";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

function AddCorridorsMap() {
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

        detectorsLayer.renderer = {
          type: "simple",
          symbol: {
            type: "simple-marker",
            style: "triangle",
            size: "10px",
            outline: {
              width: 1,
            },
            color: "gray",
          },
          visualVariables: [
            {
              type: "rotation",
              valueExpression: `When($feature.Direction == 'EB', 90, $feature.Direction == 'WB', -90, $feature.Direction == 'SB', 180, 0)`,
            },
          ],
        };
        const sketchLayer = new GraphicsLayer();

        _map.add(detectorsLayer);
        _map.add(sketchLayer);
        store.addCorridor.setDetectorsLayer(detectorsLayer);
        store.addCorridor.setMap(_map);
        store.addCorridor.setView(_view);
        store.addCorridor.setSketchLayer(sketchLayer);
      })();

      _view.popup.on("trigger-action", (event) => {
        if (event.action.id === "open-detector-page") {
          const det_num = _view.popup.selectedFeature.attributes.det_num;
          navigate(`/detector/${det_num}`);
        }
      });
      // Call Widgets
      ZoomWidget(_view);
      HomeWidget(_view);
      BasemapToggleWidget(_view);
    }
  }, [mapDiv, store, navigate]);

  return (
    <div className="m-auto mx-6 h-[700px] w-full">
      <DirectionSelector path="addCorridor" />
      <div className="ml-2 h-full w-full" ref={mapDiv}></div>
    </div>
  );
}

export default AddCorridorsMap;
