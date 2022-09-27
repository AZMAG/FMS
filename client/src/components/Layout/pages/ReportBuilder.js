import React from "react";
import DetectorDropdown from "./../../ReportBuilder/DetectorDropdown";
import AnalysisCheckboxGrid from "./../../ReportBuilder/AnalysisCheckboxGrid";
import TimePeriodSelection from "./../../ReportBuilder/TimePeriodSelection";
import ReportBuilderMap from "./../../ReportBuilder/ReportBuilderMap";
import ResetButton from "./../../ReportBuilder/ResetButton";
import SubmitButton from "./../../ReportBuilder/SubmitButton";
import ReportBuilderSubmitModal from "./../../ReportBuilder/ReportBuilderSubmitModal";

export default function ReportBuilder() {
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
                    <ReportBuilderMap />
                </div>
            </div>
            <ReportBuilderSubmitModal />
        </>
    );
}
