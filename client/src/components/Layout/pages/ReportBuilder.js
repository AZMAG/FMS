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
        <main className="container flex flex-row w-full h-full mx-auto grid-cols-2 justify-items-center">
            <div className="flex flex-col gap-y-1 w-1/2 p-4">
                <DetectorDropdown />
                <AnalysisCheckboxGrid />
                <div className="flex flex-wrap justify-around">
                    <TimePeriodSelection timePeriod={1} />
                    <TimePeriodSelection timePeriod={2} />
                </div>
                <div className="flex py-2 mt-2">
                    <ResetButton />
                    <SubmitButton />
                </div>
            </div>
            <div className="flex w-1/2">
                <ReportBuilderMap />
            </div>
            <ReportBuilderSubmitModal />
        </main>
    );
}
