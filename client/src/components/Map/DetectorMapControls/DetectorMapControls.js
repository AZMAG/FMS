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

export default function DetectorMapControls() {
    return (
        <div className="flex flex-col h-full px-3 gap-y-2 rounded-lg shadow-lg bg-white">
            <Instructions />
            <div className="bg-gray-100 py-3 px-4">
                <YearSelector />
                <DirectionSelector />
                <RouteSelector />
                <LabelToggle />
            </div>
            <div className="bg-gray-100 py-3 px-4">
                <ValidityStats />
            </div>
            <div className="flex flex-col mx-24 mt-8">
                <DownloadShapefileButton />
                <DownloadGeoJSONButton />
                <DownloadESRIJSONButton />
            </div>
        </div>
    );
}
