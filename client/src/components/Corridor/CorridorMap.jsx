import React, { useRef, useEffect, useState } from "react";

import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

import Graphic from "@arcgis/core/Graphic";
import getCorridors from "../Map/getCorridors";

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

function CorridorMap({ corridor_id }) {
  const mapDiv = useRef(null);
  const [view, setView] = useState(null);
  const [detectors, setDetectors] = useState([]);

  useEffect(() => {
    if (mapDiv.current && corridor_id) {
      async function getDetectors() {
        const corridors = await getCorridors();

        const [corridor] = corridors.filter(
          (corridor) => corridor.id === corridor_id
        );
        setDetectors(corridor.Detectors);
      }

      getDetectors();

      const map = new ArcGISMap({
        basemap: "gray-vector",
      });

      const _view = new MapView({
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

      _view.on("mouse-wheel", (e) => e.stopPropagation());
      setView(_view);
    }
  }, [mapDiv]);

  useEffect(() => {
    if (view && detectors.length > 0) {
      console.log({ detectors });
      const graphics = detectors.map((detector) => {
        const pointGraphic = new Graphic({
          symbol: {
            type: "simple-marker",
            style: "triangle",
            size: "12px",
            outline: {
              width: 1,
            },
            angle: getAngleFromDirection(detector.Direction),
            color: "cyan",
          },

          geometry: {
            type: "point",
            longitude: detector.x,
            latitude: detector.y,
          },
        });
        if (detector.Segment) {
          const segmentGraphic = new Graphic({
            symbol: {
              type: "simple-line",
              color: [226, 119, 40],
              width: "6px",
            },
            geometry: {
              type: "polyline",
              paths: JSON.parse(detector.Segment),
            },
          });
          return [segmentGraphic, pointGraphic];
        }
        return [pointGraphic];
      });

      view.graphics.addMany(graphics.flat());
      view.goTo(graphics.flat());
    }
  }, [view, detectors]);

  return <div className="m-auto h-96 w-full pt-6" ref={mapDiv}></div>;
}

export default CorridorMap;
