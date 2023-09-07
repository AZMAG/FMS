import React from "react";
import YearSelector from "./YearSelector";
import ValidityStats from "./ValidityStats";
import RouteSelector from "./RouteSelector";
import DownloadShapefileButton from "./DownloadShapefileButton";
import DownloadGeoJSONButton from "./DownloadGeoJSONButton";
import DownloadESRIJSONButton from "./DownloadESRIJSONButton";
import DirectionSelector from "./DirectionSelector";
import LabelToggle from "./LabelToggle";
import NoDataToggle from "./NoDataToggle";
import ResetButton from "./ResetButton";
import DetectorDropdown from "./DetectorDropdown";

export default function DetectorMapControls() {
  return (
    <div className="flex flex-col rounded-lg bg-white px-3 py-2 shadow-lg">
      <p className="bg-gray-100 px-4 py-3 text-sm italic">
        Use the dropdown options below to change the detector data to be shown
        on the map.
      </p>
      <div className="bg-gray-100 px-4 py-3">
        <div className="flex justify-between">
          <div>
            <YearSelector />
            <DirectionSelector path="detectorMap" />
          </div>
          <div>
            <ResetButton />
          </div>
        </div>
        <div className="">
          <RouteSelector />
        </div>
        <div className="">
          <LabelToggle />
          <NoDataToggle />
        </div>
      </div>
      <div className="bg-gray-100 px-4 py-3">
        <ValidityStats />
      </div>
      <div>
        <div className="bg-gray-100 px-4 py-3">
          <h3 className="text-md mb-4 font-semibold">
            Open detector report by year
          </h3>
          <DetectorDropdown />
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
