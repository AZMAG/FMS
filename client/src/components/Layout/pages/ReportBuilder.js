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
        <main className="container mx-auto flex min-h-screen w-full grid-cols-2 flex-row justify-items-center gap-x-4">
            <div className="flex w-1/2 flex-col gap-y-1 pt-2">
                <DetectorDropdown />
                <AnalysisCheckboxGrid />
                <div className="flex flex-wrap justify-between">
                    <TimePeriodSelection timePeriod={1} />
                    <TimePeriodSelection timePeriod={2} />
                </div>
                <div className="mt-3 flex space-x-4">
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
