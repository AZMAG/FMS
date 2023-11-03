import React, { useRef } from "react";
import PageHeader from "../GeneratedReport/PageHeader";
import PageSideMenu from "../GeneratedReport/PageSideMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarDays,
    faLocationDot,
    faShield,
    faClock,
} from "@fortawesome/free-solid-svg-icons";

function MainDynamicReportComponent({ data }) {
    /*
    Main report creation component.

    Inputs:
    data -- object (standardized for both detector and corridor reports)
    {
        "startDate": "2023-10-29",
        "endDate": "2023-11-22",
        "reportType": "detector",
        "detNumbers": 1,
        "detIDs": 21,
        "description": "I-10 WB 83RD AVE",
        "route": "I-10"
    }

    */

    console.log(data)

    // Header Styling
    const divStyle = "mt-2 flex items-center text-sm text-gray-500";
    const iconStyle = "mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400";

    return (
        <div>

            {/* Header */}
            <div className="fixed z-10 w-full border bg-white py-2 text-center">

                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    {(data.reportType === 'detector') ? "Detector" : "Corridor"} Report
                </h2>

                <div className="flex flex-col justify-center pt-4 sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">

                    <div className={divStyle}>
                        <FontAwesomeIcon
                            icon={faShield}
                            className={iconStyle}
                            aria-hidden="true"
                        />
                        Detector IDs:
                        <span className="ml-2 font-bold">{data.detNumbers}</span>
                    </div>

                    <div className={divStyle}>
                        <FontAwesomeIcon
                            icon={faLocationDot}
                            className={iconStyle}
                            aria-hidden="true"
                        />
                        {(data.reportType === 'detector') ? 'Detector Location:' : 'Route:'}
                        <span className="ml-2 font-bold">{data.route}</span>
                    </div>

                    <div className={divStyle}>
                        <FontAwesomeIcon
                            icon={faCalendarDays}
                            className={iconStyle}
                            aria-hidden="true"
                        />
                        Start Search Date: {data.startDate}
                    </div>

                    <div className={divStyle}>
                        <FontAwesomeIcon
                            icon={faCalendarDays}
                            className={iconStyle}
                            aria-hidden="true"
                        />
                        End Search Date: {data.endDate}
                    </div>


                </div>

            </div>
            {/* End Header */}


        </div>
    )

};

export default MainDynamicReportComponent