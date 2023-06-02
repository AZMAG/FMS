import React from "react";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useDataStore } from "../../stores/DataContext";

function ReportTypeToggle() {
    const store = useDataStore();
    return (
        <div className="my-2">
            <button
                className="mr-2 rounded bg-blue-500 py-1 px-2 font-bold text-white hover:bg-blue-700"
                onClick={() => store.queryBuilder.setReportType("corridor")}
            >
                Corridor
            </button>
            <button
                className="rounded bg-blue-500 py-1 px-2 font-bold text-white hover:bg-blue-700"
                onClick={() => store.queryBuilder.setReportType("detector")}
            >
                Detector
            </button>
        </div>
    );
}
export default observer(ReportTypeToggle);
