import React from "react";
import AnalysisCheckbox from "./AnalysisCheckbox";
import { observer } from "mobx-react-lite";
import { useDataStore } from "../../stores/DataContext";

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

    return (
        <>
            <h4 className="mb-3">Choose analysis to include in your report</h4>
            <div className="flex border border-gray-300 px-4 mr-4 py-3">
                <div>
                    {analysisOptions.slice(0, half).map((option, i) => (
                        <AnalysisCheckbox
                            checked={
                                store.queryBuilder.analysisOptions[option.value]
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
                            value={option.value}
                            label={option.label}
                            tooltip={option.tooltip}
                            key={i}
                            onChange={onChange}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default observer(AnalysisCheckboxGrid);
