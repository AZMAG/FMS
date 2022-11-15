import React, { useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarDays,
    faLocationDot,
    faShield,
    faClock,
} from "@fortawesome/free-solid-svg-icons";

// import QualityTable from "../Detector/qualityTable";
// import ErrorTable from "../Detector/errorTable";
// import DetectorNotes from "../Detector/detectorNotes";
// import DetectorDefinition from "../Detector/detectorDefinition";

import AnnualHourlyAverageSpeeds from "../Detector/Charts/AnnualHourlyAverageSpeeds";
import AnnualHourlyAverageThroughput from "../Detector/Charts/AnnualHourlyAverageThroughput";
import AnnualHourlyAverageOccupancyPercent from "../Detector/Charts/AnnualHourlyAverageOccupancyPercent";
import AnnualAverageByLane from "../Detector/Charts/AnnualAverageByLane";
import DistributionOfDataPassingQCByDate from "../Detector/Charts/DistributionOfDataPassingQCByDate";
import DistributionOfDataPassingQCByWeekday from "../Detector/Charts/DistributionOfDataPassingQCByWeekday";

import ScrollToTopButton from "../ScrollToTop/scrollToTop";

export default function GeneratedReport({ data }) {
    const containerRef = useRef();
    console.log(data);

    let timePeriod1;
    let timePeriod2;
    if (data.startDate1 === null) {
        timePeriod1 = data.timePeriodYear1;
        timePeriod2 = data.timePeriodYear2;
    } else {
        timePeriod1 = (
            <>
                {data.startDate1} - {data.endDate1}
            </>
        );
        timePeriod2 = (
            <>
                {data.startDate2} - {data.endDate2}
            </>
        );
    }

    const SubmittedDate = new Date(parseInt(data.date_submitted.substr(6)));
    return (
        <main
            className="container mx-auto flex grow flex-col justify-items-center"
            ref={containerRef}
        >
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
                        Time Submitted:
                        <span className="font-bold">
                            &nbsp;{SubmittedDate.toLocaleTimeString()}
                        </span>
                    </div>
                </div>
            </div>
            <div
                className="container mx-auto mt-6 flex grow grid-cols-2 flex-row
                justify-items-center"
            >
                <div className="flex-1 border-r-2 px-3">
                    <div className="rounded bg-slate-100 py-1 px-3">
                        <h2 className="mb-1.5 text-xl font-bold tracking-tight text-gray-900">
                            Time Period
                        </h2>
                        <FontAwesomeIcon
                            icon={faCalendarDays}
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                        />
                        {timePeriod1}
                    </div>
                </div>
                <div className="flex-1 border-l-2 px-3">
                    <div className="rounded bg-slate-100 py-1 px-3">
                        <h2 className="mb-1.5 text-xl font-bold tracking-tight text-gray-900">
                            Time Period
                        </h2>
                        <FontAwesomeIcon
                            icon={faCalendarDays}
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                        />
                        {timePeriod2}
                    </div>
                </div>
            </div>
            <ScrollToTopButton containerRef={containerRef} />
        </main>
    );
}
