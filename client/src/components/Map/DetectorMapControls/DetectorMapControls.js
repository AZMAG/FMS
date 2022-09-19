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

export default function DetectorMapControls() {
    return (
        <div>
            <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
                <Instructions />
                <div className="mt-2 bg-gray-100 py-3 px-4">
                    <YearSelector />
                    <DirectionSelector />
                    <RouteSelector />
                    <LabelToggle />
                    <NoDataToggle />
                </div>
                <ValidityStats />
                <br />
                <DownloadShapefileButton />
                <br />
                <DownloadGeoJSONButton />
                <br />
                <DownloadESRIJSONButton />
            </div>
        </div>
    );
}
