import React from "react";
import { useNavigate } from "react-router-dom";
import YearSelector from "./YearSelector";
import ValidityStats from "./ValidityStats";
import DownloadShapefileButton from "./DownloadShapefileButton";
import DownloadGeoJSONButton from "./DownloadGeoJSONButton";
import DownloadESRIJSONButton from "./DownloadESRIJSONButton";

import CorridorDropdown from "./CorridorDropdown";

export default function DetectorMapControls() {
  const navigate = useNavigate();

  function AddNewClicked() {
    navigate("/add-corridor");
  }

  return (
    <div className="flex flex-col rounded-lg bg-white px-3 py-2 shadow-lg">
      <p className="bg-gray-100 px-4 py-3 text-sm italic">
        Select a year to change the corridor colors on the map.
      </p>
      <div className="bg-gray-100 px-4 py-3">
        <div className="flex items-center">
          <div>
            <YearSelector />
          </div>
        </div>
      </div>
      <div className="bg-gray-100 px-4 py-3">
        <ValidityStats />
      </div>
      <div>
        <div className="bg-gray-100 px-4 py-3">
          <h3 className="text-md mb-4 font-semibold">
            Open corridor report by year
          </h3>
          <CorridorDropdown />
          <button onClick={AddNewClicked} className="btn btn-blue mt-4">
            Add New
          </button>
        </div>
      </div>

      <div className="bg-gray-100 px-4 py-4">
        <h3 className="text-md font-semibold">Download Data</h3>
        <p className="mb-4 text-sm italic">
          Click one of the options below to download the current map data.
        </p>
        <div className="flex items-center justify-between ">
          <DownloadShapefileButton />
          <DownloadGeoJSONButton />
          <DownloadESRIJSONButton />
        </div>
      </div>
    </div>
  );
}
