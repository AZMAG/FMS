import React from "react";
import DetectorDropdown from "./../../QueryBuilder/DetectorDropdown";
import AnalysisCheckboxGrid from "./../../QueryBuilder/AnalysisCheckboxGrid";
import TimePeriodSelection from "./../../QueryBuilder/TimePeriodSelection";
import QueryBuilderMap from "./../../QueryBuilder/QueryBuilderMap";
import ResetButton from "./../../QueryBuilder/ResetButton";
import SubmitButton from "./../../QueryBuilder/SubmitButton";
import QueryBuilderSubmitModal from "./../../QueryBuilder/QueryBuilderSubmitModal";

export default function QueryBuilder() {
    return (
        <>
            <div className="w-full h-full container m-auto mt-2 flex py-4 px-4">
                <div className="w-1/2">
                    <DetectorDropdown />
                    <br />
                    <AnalysisCheckboxGrid />
                    <div className="flex">
                        <TimePeriodSelection timePeriod={1} />
                        <TimePeriodSelection timePeriod={2} />
                    </div>
                    <div className="flex py-2 mt-2">
                        <ResetButton />
                        <SubmitButton />
                    </div>
                </div>
                <div className="w-1/2">
                    <QueryBuilderMap />
                </div>
            </div>
            <QueryBuilderSubmitModal />
        </>
    );
}
