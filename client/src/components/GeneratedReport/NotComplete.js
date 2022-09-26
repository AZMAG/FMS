import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotComplete({ data }) {
    const navigate = useNavigate();
    const date = new Date(parseInt(data.date_submitted.substr(6)));
    function otherReportsBtnClicked() {
        navigate("/reports");
    }
    return (
        <div className="container bg-gray-100 m-auto flex items-center">
            <div className="bg-mag-teal m-auto my-6">
                <div className="w-9/12 m-auto py-16 min-h-100 flex items-center justify-center">
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
                        <div className="border-t border-gray-200 text-center pt-8">
                            <h1 className="text-2xl font-medium py-8">
                                Report still processing.
                            </h1>
                            <p className="text-lg pb-8 px-12 font-medium">
                                This report is still being built. Please try
                                again later.
                            </p>
                            <div>
                                <div>
                                    <span className="mr-3">
                                        Report Generated:
                                    </span>
                                    <b>
                                        {date.toLocaleDateString() +
                                            " " +
                                            date.toLocaleTimeString()}
                                    </b>
                                </div>
                                <div>
                                    <span className="mr-3">
                                        Requested Detector:
                                    </span>
                                    <b>{data.det_num}</b>
                                </div>
                                {data.timePeriodYear1 && (
                                    <div>
                                        <span className="mr-3">
                                            Time Period 1:
                                        </span>
                                        <b>{data.timePeriodYear1}</b>
                                    </div>
                                )}
                                {data.timePeriodYear2 && (
                                    <div>
                                        <span className="mr-3">
                                            Time Period 2:
                                        </span>
                                        <b>{data.timePeriodYear2}</b>
                                    </div>
                                )}

                                {data.startDate1 && data.endDate1 && (
                                    <div>
                                        <span className="mr-3">
                                            Time Period 1:
                                        </span>
                                        <b>
                                            {data.startDate1} - {data.endDate1}
                                        </b>
                                    </div>
                                )}

                                {data.startDate2 && data.endDate2 && (
                                    <div>
                                        <span className="mr-3">
                                            Time Period 2:
                                        </span>
                                        <b>
                                            {data.startDate2} - {data.endDate2}
                                        </b>
                                    </div>
                                )}
                                <button
                                    onClick={otherReportsBtnClicked}
                                    className="cursor-pointer font-bold text-blue-600 underline"
                                >
                                    View other reports
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
