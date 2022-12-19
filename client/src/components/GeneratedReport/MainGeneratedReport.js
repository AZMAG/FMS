import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarDays,
    faLocationDot,
    faShield,
    faClock,
} from "@fortawesome/free-solid-svg-icons";
import ReportChartsSection from "./ReportChartsSection";
import ScrollToTopButton from "../ScrollToTop/scrollToTop";
import GeneratedReportMap from "./GeneratedReportMap";
import TimePeriodCard from "./TimePeriodCard";

export default function GeneratedReport({ data }) {
    const toTimeString = (value, singularName) =>
        `${value} ${singularName}${value !== 1 ? "s" : ""}`;

    const readableTime = (ms) => {
        const days = Math.floor(ms / (24 * 60 * 60 * 1000));
        const daysMs = ms % (24 * 60 * 60 * 1000);
        const hours = Math.floor(daysMs / (60 * 60 * 1000));
        const hoursMs = ms % (60 * 60 * 1000);
        const minutes = Math.floor(hoursMs / (60 * 1000));
        const minutesMs = ms % (60 * 1000);
        const seconds = Math.round(minutesMs / 1000);

        const data = [
            [days, "day"],
            [hours, "hour"],
            [minutes, "minute"],
            [seconds, "second"],
        ];

        return data
            .filter(([value]) => value > 0)
            .map(([value, name]) => toTimeString(value, name))
            .join(", ");
    };
    const containerRef = useRef();

    // let timePeriod1Str;
    // let timePeriod2Str;
    // if (data.startDate1 === null) {
    //     timePeriod1 = data.timePeriodYear1;
    //     timePeriod2 = data.timePeriodYear2;
    // } else {
    //     timePeriod1 = (
    //         <>
    //             {data.startDate1} - {data.endDate1}
    //         </>
    //     );
    //     timePeriod2 = (
    //         <>
    //             {data.startDate2} - {data.endDate2}
    //         </>
    //     );
    // }

    const SubmittedDate = new Date(parseInt(data.date_submitted.substr(6)));
    const CompletedDate = new Date(parseInt(data.date_completed.substr(6)));

    const processingTimeString = CompletedDate - SubmittedDate;

    console.log(data);

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
                        Processing Time:
                        <span className="font-bold">
                            &nbsp;{readableTime(processingTimeString)}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex flex-grow flex-col justify-items-center">
                <GeneratedReportMap
                    x={data.x}
                    y={data.y}
                    segment={data.segment}
                    direction={data.Direction}
                />
            </div>
            <div
                className="container mx-auto mt-6 flex grow grid-cols-2 flex-row
                justify-items-center"
            >
                <div className="flex-1 space-y-4 border-r-2 px-3">
                    <TimePeriodCard data={data} period1={true} />
                    <ReportChartsSection id={data.id} period1={true} />
                </div>
                <div className="flex-1 space-y-4 border-l-2 px-3">
                    <TimePeriodCard data={data} period1={false} />
                    <ReportChartsSection id={data.id} period1={false} />
                </div>
            </div>
            <ScrollToTopButton containerRef={containerRef} />
        </main>
    );
}
