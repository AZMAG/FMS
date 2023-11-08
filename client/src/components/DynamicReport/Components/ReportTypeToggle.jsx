import React from "react";
import { observer } from "mobx-react-lite";

function ReportTypeToggle({reportType, setReportType}) {
 
  const sharedButtonStyle = "rounded py-1 px-2 font-bold ";
  const activeButtonStyle = "bg-blue-500 text-white";
  const inactiveButtonStyle = "bg-gray-200 text-gray-800 hover:underline";

  const isDetectorActive = (reportType === "detector") ? true : false;

  return (
    <div className="my-2 mb-6">
        <p className="font-semibold text-md italic mb-2">Select Report Type:</p>
    <button
        className={`mr-1 ${sharedButtonStyle} ${
          isDetectorActive ? activeButtonStyle : inactiveButtonStyle
        }`}
        onClick={() => setReportType("detector")}
      >
        Detector
      </button>
      <button
        className={`${sharedButtonStyle} ${
          isDetectorActive ? inactiveButtonStyle : activeButtonStyle
        }`}
        onClick={() => setReportType("corridor")}
      >
        Corridor
      </button>
      
    </div>
  );
}

export default observer(ReportTypeToggle);
