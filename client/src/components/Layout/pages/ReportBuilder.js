import React from "react";
import DetectorDropdown from "./../../ReportBuilder/DetectorDropdown";
import AnalysisCheckboxGrid from "./../../ReportBuilder/AnalysisCheckboxGrid";
import TimePeriodSelection from "./../../ReportBuilder/TimePeriodSelection";
import ReportBuilderMap from "./../../ReportBuilder/ReportBuilderMap";
import ResetButton from "./../../ReportBuilder/ResetButton";
import SubmitButton from "./../../ReportBuilder/SubmitButton";
import ReportBuilderSubmitModal from "./../../ReportBuilder/ReportBuilderSubmitModal";
import { observer } from "mobx-react-lite";
import { useDataStore } from "../../../stores/DataContext";

function ReportBuilder() {
    const store = useDataStore();
    return (
        <main
            id="ReportBuilder"
            className="container mx-auto flex grow grid-cols-2 flex-row justify-items-center gap-x-4"
        >
            <div className="flex w-1/2 flex-col gap-y-1 pt-2">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    Report Builder
                </h2>
                <DetectorDropdown />
                {store.queryBuilder.selectedDetector && (
                    <>
                        <AnalysisCheckboxGrid />
                        <div className="flex w-full">
                            <TimePeriodSelection timePeriod={1} />
                            {store.queryBuilder.isTwoTimePeriods ? (
                                <>
                                    <TimePeriodSelection timePeriod={2} />
                                </>
                            ) : (
                                <div className="flex w-1/2 flex-col items-center border border-gray-300 p-2 text-sm">
                                    <p>
                                        To add a second time period to compare,
                                    </p>
                                    <button
                                        onClick={() =>
                                            store.queryBuilder.setIsTwoTimePeriods(
                                                true
                                            )
                                        }
                                        className="mt-3 rounded bg-gray-500 py-1 px-4 font-bold text-white hover:bg-gray-600"
                                    >
                                        Click here
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="mt-3 flex space-x-4">
                            <ResetButton />
                            <SubmitButton />
                        </div>
                    </>
                )}
            </div>
            <div className="flex w-1/2">
                <ReportBuilderMap />
            </div>
            <ReportBuilderSubmitModal />
        </main>
    );
}
export default observer(ReportBuilder);
