import React from "react";
import AddCorridorsMap from "../components/Map/AddCorridorsMap";
import { useDataStore } from "../stores/DataContext";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";
import { observer } from "mobx-react-lite";

function NewCorridor() {
  const store = useDataStore();
  const [drawing, setDrawing] = React.useState(false);
  const [selectedDetectors, setSelectedDetectors] = React.useState([]);

  let sketchViewModel;
  if (store.addCorridor.sketchLayer) {
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
    sketchViewModel = new SketchViewModel({
      layer: store.addCorridor.sketchLayer,
      view: store.addCorridor.view,
      defaultCreateOptions: { hasZ: false },
    });
    sketchViewModel.on(["create"], async (e) => {
      if (e.state === "complete") {
        store.addCorridor.sketchLayer.removeAll();
        store.addCorridor.sketchGeometry = e.graphic.geometry;
        store.addCorridor.view.graphics.removeAll();
        const res = await store.addCorridor.detectorsLayer.queryFeatures({
          geometry: store.addCorridor.sketchGeometry,
          returnGeometry: true,
          where: store.addCorridor.detectorsLayer.definitionExpression,
        });
        if (res.features.length > 0) {
          res.features = res.features.map((f) => {
            f.symbol = {
              type: "simple-marker",
              color: [0, 255, 255, 0.5],
              size: 10,
              style: "triangle",
              outline: {
                color: [0, 255, 255, 1],
                width: 1,
              },
              angle: getAngleFromDirection(f.attributes.Direction),
            };
            return f;
          });

          setSelectedDetectors(res.features);
          store.addCorridor.view.graphics.add(e.graphic);
          store.addCorridor.view.graphics.addMany(res.features);
          store.addCorridor.view.goTo(e.graphic.geometry);
        }
        setDrawing(false);
      }
    });
  }
  function onSubmit(e) {
    e.preventDefault();
    store.addCorridor.submit(selectedDetectors);
  }

  function onSelectDetectorsClick() {
    store.addCorridor.view.graphics.removeAll();
    setDrawing(true);
    if (sketchViewModel) {
      sketchViewModel.create("polygon");
    }
  }

  function onCancelClick() {
    setDrawing(false);
    sketchViewModel.cancel();
  }

  return (
    <main
      tag="mainPage"
      className="mx-10 mt-4 flex flex-row justify-items-center px-2 py-1"
    >
      <div className="m-auto flex h-[700px] w-4/5">
        <div className="w-full max-w-xs">
          <form
            className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="mb-4">
              <div className="mb-3 border-b-4 border-slate-900 bg-slate-200 p-2 italic">
                Enter a name and description for the corridor. Then click the
                "Select Detectors" button and start drawing on the map to select
                detectors to include.
              </div>
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="name"
              >
                Name
              </label>
              <input
                value={store.addCorridor.corridorName}
                onChange={(e) =>
                  store.addCorridor.setCorridorName(e.target.value)
                }
                placeholder="Corridor Name"
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="name"
                type="text"
              />
            </div>
            <div className="mb-6">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                value={store.addCorridor.corridorDescription}
                onChange={(e) =>
                  store.addCorridor.setCorridorDescription(e.target.value)
                }
                className="focus:shadow-outline mb-3 max-h-44 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="description"
                placeholder="Corridor Description"
              />
            </div>
            {drawing ? (
              <button
                onClick={onCancelClick}
                className="btn btn-red mb-2 block"
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={onSelectDetectorsClick}
                className="btn btn-blue mb-2 block"
              >
                Select Detectors
              </button>
            )}
            <button onClick={onSubmit} className="btn btn-green">
              Submit
            </button>
          </form>
        </div>
        <div>{selectedDetectors.length}</div>
        <AddCorridorsMap />
      </div>
    </main>
  );
}
export default observer(NewCorridor);
