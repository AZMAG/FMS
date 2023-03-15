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

    return (
        <div className="mt-2 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Generated Report
            </h2>
            <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                <div className="mt-2 flex items-center text-sm text-gray-500">
                    <FontAwesomeIcon
                        icon={faShield}
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                    />
                    Detector ID:
                    <span className="font-bold">&nbsp;{data.det_num}</span>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                    <FontAwesomeIcon
                        icon={faLocationDot}
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                    />
                    Detector Location:
                    <span className="font-bold">&nbsp;{data.Location}</span>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                    <FontAwesomeIcon
                        icon={faCalendarDays}
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                    />
                    Date Submitted:
                    <span className="font-bold">
                        &nbsp;{SubmittedDate.toLocaleDateString()}
                    </span>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                    <FontAwesomeIcon
                        icon={faClock}
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                    />
                    Processing Time:
                    <span className="font-bold">
                        &nbsp;{getReadableTime(processingTimeString)}
                    </span>
                </div>
            </div>
        </div>
    );
}
