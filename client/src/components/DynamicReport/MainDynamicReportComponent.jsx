import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarDays,
    faLocationDot,
    faShield,
    faClock,
} from "@fortawesome/free-solid-svg-icons";

// Maps
import ReportBuilderMap from "../DynamicReport/Components/ReportBuilderMap";

// Charts
import AnnualHourlyAverageSpeeds from "./Charts/AnnualHourlyAverageSpeeds";
import AnnualHourlyAverageThroughput from "./Charts/AnnualHourlyAverageThroughput";
import AnnualHourlyAverageOccupancyPercent from "./Charts/AnnualHourlyAverageOccupancyPercent"
import AnnualAverageByLane from "./Charts/AnnualAverageByLane";
import DistributionOfDataPassingQCByDate from "./Charts/DistributionOfDataPassingQCByDate";
import DistributionOfDataPassingQCByWeekday from "./Charts/DistributionOfDataPassingQCByWeekday";


function MainDynamicReportComponent({ data, detectorsLayer }) {
    /*
    Main report creation component.

    Inputs:
    data -- object (standardized for both detector and corridor reports)

    Detector Data --
    {
        "startDate": "2023-10-31",
        "endDate": "2023-11-30",
        "reportType": "detector",
        "detNumbers": 1,
        "detIDs": 21,
        "description": "I-10 WB 83RD AVE",
        "route": "I-10",
        "detectorCorridor": {
            "ID": 21,
            "det_num": 1,
            "Location": "I-10 WB 83RD AVE",
            "Route": "I-10",
            "Direction": "WB",
            "Milepost": 135.753,
            "GPS": false,
            "Type": "pad",
            "Length_ft": 2170.30493164,
            "y": 33.46250153,
            "x": -112.23600769,
            "Segment": "[[-112.23106460499997,33.46280114000007],[-112.23443235799999,33.46265030200004],[-112.23817470799997,33.462558029000036]]"
        }
    }

    */

    // Report Detector Number
    const detNum = data.detectorCorridor.det_num;
    const definitionExpression = `det_num=${detNum}`;

    // Header Styling
    const divStyle = "mt-2 flex items-center text-sm text-gray-500";
    const iconStyle = "mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400";

    return (
        <div className="h-full w-full">

            {/* Header */}
            <div className="border text-center pt-4 pb-4">

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

            {/* Report Content */}
            <div className="overflow-y-auto text-black">

                <div className="mt-6">


                    <div className={`mt-3 w-full h-[400px]`}>

                        {
                            detectorsLayer != undefined &&
                            <ReportBuilderMap
                                detectorsLayer={detectorsLayer}
                                definitionExpression={definitionExpression}
                            />
                        }


                    </div>
                </div>

                <div className="mt-6">

                    <AnnualHourlyAverageSpeeds
                        det_num={data.detectorCorridor.det_num}
                        startDate={data.startDate}
                        endDate={data.endDate}
                    />

                </div>

                <div className="mt-6">

                    <AnnualHourlyAverageThroughput
                        det_num={data.detectorCorridor.det_num}
                        startDate={data.startDate}
                        endDate={data.endDate}
                    />

                </div>


                <div className="mt-6">

                    <AnnualHourlyAverageOccupancyPercent
                        det_num={data.detectorCorridor.det_num}
                        startDate={data.startDate}
                        endDate={data.endDate}
                    />

                </div>

                <div className="mt-6">

                    <AnnualAverageByLane
                        det_num={data.detectorCorridor.det_num}
                        startDate={data.startDate}
                        endDate={data.endDate}
                    />

                </div>

                <div className="mt-6">

                    <DistributionOfDataPassingQCByDate
                        det_num={data.detectorCorridor.det_num}
                        startDate={data.startDate}
                        endDate={data.endDate}
                    />

                </div>

                <div className="mt-6">

                    <DistributionOfDataPassingQCByWeekday
                        det_num={data.detectorCorridor.det_num}
                        startDate={data.startDate}
                        endDate={data.endDate}
                    />

                </div>

            </div>

        </div>
    )

};

export default MainDynamicReportComponent