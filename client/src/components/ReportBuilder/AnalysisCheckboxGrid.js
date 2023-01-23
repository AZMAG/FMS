import React from "react";
import AnalysisCheckbox from "./AnalysisCheckbox";
import { observer } from "mobx-react-lite";
import { useDataStore } from "../../stores/DataContext";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function AnalysisCheckboxGrid() {
    const store = useDataStore();
    const analysisOptions = [
        { value: "AHAS", label: "Annual Hourly Average Speeds (Weekday)" },
        {
            value: "AHATPL",
            label: "Annual Hourly Average Throughput Per Lane (Weekday)",
        },
        {
            value: "AHAOP",
            label: "Annual Hourly Average Occupancy Percent (Weekday)",
        },
        { value: "AAL", label: "Annual Average by Lane" },
        {
            value: "DDPQCCD",
            label: "Distribution of Data Passing Quality Control Criteria by Date",
        },
        {
            value: "DDPQCCW",
            label: "Distribution of Data Passing Quality Control Criteria by Weekday",
        },
        {
            value: "AQCFHD",
            label: "Annual Quality Control Flags by Hour of Day (Weekday)",
        },
        {
            value: "FVD",
            label: "Flow vs. Density",
            tooltip: "All Data Rows & 5-min Weekday Average",
        },
        {
            value: "SVD",
            label: "Speed vs. Density",
            tooltip: "All Data Rows & 5-min Weekday Average",
        },
        {
            value: "SVF",
            label: "Speed vs. Flow",
            tooltip: "All Data Rows & 5-min Weekday Average",
        },
    ];

    const half = Math.ceil(analysisOptions.length / 2);

    function onChange(key, val) {
        store.queryBuilder.setAnalysisOption(key, val);
    }
    const showErrors =
        store.queryBuilder.validated &&
        !store.queryBuilder.anyAnalysisOptionSelected();

    return (
        <div
            className={`flex flex-col ${
                store.queryBuilder.selectedDetector ? "" : " hidden"
            }`}
        >
            <h4 className="mb-1 font-semibold">
                Choose analysis to include in your report
            </h4>
            <div
                className={`flex flex-col gap-y-1 border border-gray-300 px-4 py-3 ${
                    showErrors ? "border-red-500" : ""
                }`}
            >
                <div className="flex">
                    <button
                        className="rounded bg-gray-500 py-1 px-4 font-bold text-white hover:bg-gray-600"
                        onClick={() =>
                            store.queryBuilder.toggleAllAnalysisOptions(true)
                        }
                    >
                        Select All
                    </button>
                    {showErrors && (
                        <span className="ml-6 flex-1 rounded-lg bg-red-100 py-1 px-3 text-base text-red-700">
                            <ErrorOutlineIcon /> You must select at least one
                            option.
                        </span>
                    )}
                </div>
                <div className="flex gap-x-1 text-sm">
                    <div className="">
                        {analysisOptions.slice(0, half).map((option, i) => (
                            <AnalysisCheckbox
                                checked={
                                    store.queryBuilder.analysisOptions[
                                        option.value
                                    ]
                                }
                                value={option.value}
                                label={option.label}
                                tooltip={option.tooltip}
                                key={i}
                                onChange={onChange}
                            />
                        ))}
                    </div>
                    <div>
                        {analysisOptions.slice(half).map((option, i) => (
                            <AnalysisCheckbox
                                checked={
                                    store.queryBuilder.analysisOptions[
                                        option.value
                                    ]
                                }
                                value={option.value}
                                label={option.label}
                                tooltip={option.tooltip}
                                key={i}
                                onChange={onChange}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default observer(AnalysisCheckboxGrid);
