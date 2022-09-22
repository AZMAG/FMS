import React from "react";
import YearSelector from "./YearSelector";
import ValidityStats from "./ValidityStats";
import RouteSelector from "./RouteSelector";
import DownloadShapefileButton from "./DownloadShapefileButton";
import DownloadGeoJSONButton from "./DownloadGeoJSONButton";
import DownloadESRIJSONButton from "./DownloadESRIJSONButton";
import DirectionSelector from "./DirectionSelector";
import Instructions from "./Instructions";
import LabelToggle from "./LabelToggle";
import NoDataToggle from "./NoDataToggle";
import ResetButton from "./ResetButton";

export default function DetectorMapControls() {
    return (
        <div className="flex flex-col h-full px-3 gap-y-2 rounded-lg shadow-lg bg-white overflow-y-auto">
            <Instructions />
            <div className="grid grid-rows-3 grid-flow-col bg-gray-100 py-3 px-4">
                <div className="flex justify-between">
                    <div>
                        <YearSelector />
                        <DirectionSelector />
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
            <div className="bg-gray-100 py-3 px-4">
                <ValidityStats />
            </div>
            <div className="flex flex-col justify-center items-center bg-gray-100 py-10">
                <DownloadShapefileButton />
                <DownloadGeoJSONButton />
                <DownloadESRIJSONButton />
            </div>
        </div>
    );
}
