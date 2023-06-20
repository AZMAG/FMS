import React from "react";
import { observer } from "mobx-react-lite";
import { useDataStore } from "../../stores/DataContext";

function ReportTypeToggle() {
  const store = useDataStore();
  const sharedButtonStyle = "rounded py-1 px-2 font-bold ";
  const activeButtonStyle = "bg-blue-500 text-white";
  const inactiveButtonStyle = "bg-gray-200 text-gray-800 hover:underline";

  const handleButtonClick = (reportType) => {
    store.queryBuilder.setReportType(reportType);
  };

  const isCorridorActive = store.queryBuilder.reportType === "corridor";
  const isDetectorActive = store.queryBuilder.reportType === "detector";

  return (
    <div className="my-2 mb-6">
        <p className="font-semibold text-md italic mb-2">Select Report Type:</p>
    <button
        className={`mr-1 ${sharedButtonStyle} ${
          isDetectorActive ? activeButtonStyle : inactiveButtonStyle
        }`}
        onClick={() => handleButtonClick("detector")}
      >
        Detector
      </button>
      <button
        className={`${sharedButtonStyle} ${
          isCorridorActive ? activeButtonStyle : inactiveButtonStyle
        }`}
        onClick={() => handleButtonClick("corridor")}
      >
        Corridor
      </button>
      
    </div>
  );
}

export default observer(ReportTypeToggle);
