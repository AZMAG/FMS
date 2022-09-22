import React from "react";
import DetectorDropdown from "./../../QueryBuilder/DetectorDropdown";
import AnalysisCheckboxGrid from "./../../QueryBuilder/AnalysisCheckboxGrid";
// import TimePeriodSelection from "./../../QueryBuilder/TimePeriodSelection";
import QueryBuilderMap from "./../../QueryBuilder/QueryBuilderMap";

export default function QueryBuilder() {
    return (
        <div className="w-full h-full container m-auto mt-2 flex py-4 px-4">
            <div className="w-1/2">
                <DetectorDropdown />
                <br />
                <AnalysisCheckboxGrid />
                {/* <TimePeriodSelection />
                <TimePeriodSelection /> */}
            </div>
            <div className="w-1/2">
                <QueryBuilderMap />
            </div>
        </div>
    );
}
