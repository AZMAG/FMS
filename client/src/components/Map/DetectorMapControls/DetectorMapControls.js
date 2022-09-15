import React from "react";
import YearSelector from "./YearSelector";
import ValidityStats from "./ValidityStats";
import RouteSelector from "./RouteSelector";
import DownloadShapefileButton from "./DownloadShapefileButton";
import DirectionSelector from "./DirectionSelector";
import LabelToggle from "./LabelToggle";

export default function DetectorMapControls() {
    return (
        <div>
            <YearSelector />
            <RouteSelector />
            <DirectionSelector />
            <LabelToggle />
            <ValidityStats />
            <br />
            <DownloadShapefileButton />
        </div>
    );
}