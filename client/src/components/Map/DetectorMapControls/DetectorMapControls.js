import React from "react";
import YearSelector from "./YearSelector";
import ValidityStats from "./ValidityStats";
import RouteSelector from "./RouteSelector";
import DownloadShapefileButton from "./DownloadShapefileButton";
import DirectionSelector from "./DirectionSelector";

export default function DetectorMapControls() {
    return (
        <div>
            <YearSelector />
            <RouteSelector />
            <DirectionSelector />
            <ValidityStats />
            <br />
            <DownloadShapefileButton />
        </div>
    );
}
