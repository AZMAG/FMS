import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarDays,
    faLocationDot,
    faShield,
    faClock,
} from "@fortawesome/free-solid-svg-icons";
import getReadableTime from "./getReadableTime";

export default function PageHeader({ data }) {
    const SubmittedDate = new Date(parseInt(data.date_submitted.substr(6)));
    const CompletedDate = new Date(parseInt(data.date_completed.substr(6)));
    const processingTimeString = CompletedDate - SubmittedDate;
    const divStyle = "mt-2 flex items-center text-sm text-gray-500";
    const iconStyle = "mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400";

    return (
        <div className="fixed z-10 w-full border bg-white py-4 text-center">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Detector Report
            </h2>
            <div className="flex flex-col justify-center pt-4 sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                <div className={divStyle}>
                    <FontAwesomeIcon
                        icon={faShield}
                        className={iconStyle}
                        aria-hidden="true"
                    />
                    Detector ID:
                    <span className="ml-2 font-bold">{data.det_num}</span>
                </div>
                <div className={divStyle}>
                    <FontAwesomeIcon
                        icon={faLocationDot}
                        className={iconStyle}
                        aria-hidden="true"
                    />
                    Detector Location:
                    <span className="ml-2 font-bold">{data.Location}</span>
                </div>
                <div className={divStyle}>
                    <FontAwesomeIcon
                        icon={faCalendarDays}
                        className={iconStyle}
                        aria-hidden="true"
                    />
                    Date Submitted:
                    <span className="ml-2 font-bold">
                        {SubmittedDate.toLocaleDateString()}
                    </span>
                </div>
                <div className={divStyle}>
                    <FontAwesomeIcon
                        icon={faClock}
                        className={iconStyle}
                        aria-hidden="true"
                    />
                    Processing Time:
                    <span className="ml-2 font-bold">
                        {getReadableTime(processingTimeString)}
                    </span>
                </div>
            </div>
        </div>
    );
}
