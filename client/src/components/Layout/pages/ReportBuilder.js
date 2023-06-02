import React from "react";
import DetectorDropdown from "./../../ReportBuilder/DetectorDropdown";
import CorridorDropdown from "./../../ReportBuilder/CorridorDropdown";
// import AnalysisCheckboxGrid from "./../../ReportBuilder/AnalysisCheckboxGrid";
import TimePeriodSelection from "./../../ReportBuilder/TimePeriodSelection";
import ReportBuilderMap from "./../../ReportBuilder/ReportBuilderMap";
import ResetButton from "./../../ReportBuilder/ResetButton";
import SubmitButton from "./../../ReportBuilder/SubmitButton";
import ReportBuilderSubmitModal from "./../../ReportBuilder/ReportBuilderSubmitModal";
import { observer } from "mobx-react-lite";
import { useDataStore } from "../../../stores/DataContext";
import ReportTypeToggle from "../../ReportBuilder/ReportTypeToggle";

function ReportBuilder() {
    const store = useDataStore();
    return (
        <main
            id="ReportBuilder"
            className="container mx-auto flex flex-row justify-items-center gap-x-4"
        >
            <div className="flex w-1/2 flex-col gap-y-1 pt-2">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    Report Builder
                </h2>
                <ReportTypeToggle />
                <DetectorDropdown />
                <CorridorDropdown />
                <>
                    <div className="flex w-full">
                        <TimePeriodSelection />
                    </div>
                    <div className="mt-3 flex space-x-4">
                        <ResetButton />
                        <SubmitButton />
                    </div>
                </>
            </div>
            <div className="flex h-[700px] w-1/2 items-center pt-2">
                <ReportBuilderMap />
            </div>
            <ReportBuilderSubmitModal />
        </main>
    );
}
export default observer(ReportBuilder);
