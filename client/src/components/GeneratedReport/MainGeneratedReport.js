import React, { useRef } from "react";

import CompareInfo from "./CompareInfo";

import QualityTable from "../Detector/qualityTable";
import ErrorTable from "../Detector/errorTable";
// import DetectorNotes from "../Detector/detectorNotes";
import DetectorDefinition from "../Detector/detectorDefinition";

import AnnualHourlyAverageSpeeds from "../Detector/Charts/AnnualHourlyAverageSpeeds";
import AnnualHourlyAverageThroughput from "../Detector/Charts/AnnualHourlyAverageThroughput";
import AnnualHourlyAverageOccupancyPercent from "../Detector/Charts/AnnualHourlyAverageOccupancyPercent";
import AnnualAverageByLane from "../Detector/Charts/AnnualAverageByLane";
import DistributionOfDataPassingQCByDate from "../Detector/Charts/DistributionOfDataPassingQCByDate";
import DistributionOfDataPassingQCByWeekday from "../Detector/Charts/DistributionOfDataPassingQCByWeekday";

import ScrollToTopButton from "../ScrollToTop/scrollToTop";

export default function GeneratedReport({ data }) {
    const containerRef = useRef();
    const id = 50;

    return (
        <main className="flex-1 overflow-y-auto px-16 mt-4" ref={containerRef}>
            <div className="flex flex-col space-y-6 m-auto grid-cols-2 gap-x-4 justify-items-center">
                <div className="grid grid-flow-col gap-6">
                    <CompareInfo />
                    {/* <div className="bg-slate-200 px-2 my-auto">
                        Place Map Here
                    </div> */}
                    {/* <DetectorData det_num={id} /> */}
                    {/* <DetectorNotes /> */}
                </div>
                <div className="grid grid-cols-2 gap-4 border-t-2 border-b-gray">
                    <div className="text-xl font-bold justify-start pl-6">
                        <h1>2020</h1>
                        <div className="px-2">
                            <div className="">
                                <ul className="flex justify-between px-6 py-2 border-b border-gray-200 w-full">
                                    <li className="flex justify-between px-6 py-2 border-b border-gray-200 w-full">
                                        Number of Days
                                        <span className="font-bold">335</span>
                                    </li>
                                    <li className="flex justify-between px-6 py-2 border-b border-gray-200 w-full">
                                        General Purpose Lanes
                                        <span className="font-bold">4</span>
                                    </li>
                                    <li className="flex justify-between px-6 py-2 border-b border-gray-200 w-full">
                                        High-Occupancy Lanes
                                        <span className="font-bold">1</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-start pl-6">
                        <h1>2021</h1>
                        <div className="border-solid border-1"></div>
                    </div>
                </div>
                {/* <div className="flex grid-cols-2 gap-x-4">
                    <div className="flex-1 grid gap-y-4">
                        <QualityTable det_num={id} />
                        <ErrorTable det_num={id} />
                        <DetectorDefinition />
                    </div>
                    <div className="flex-1 grid gap-y-4">
                        <AnnualHourlyAverageSpeeds det_num={id} />
                        <AnnualHourlyAverageThroughput det_num={id} />
                        <AnnualHourlyAverageOccupancyPercent det_num={id} />
                    </div>
                </div>
                <div className="flex grid-cols-2 gap-x-4">
                    <div className="flex-1 grid gap-y-4">
                        <DistributionOfDataPassingQCByDate det_num={id} />
                        <DistributionOfDataPassingQCByWeekday det_num={id} />
                    </div>
                    <div className="flex-1 grid gap-y-4">
                        <AnnualAverageByLane det_num={id} />
                        <span />
                    </div>
                </div> */}
            </div>
            <ScrollToTopButton containerRef={containerRef} />
        </main>
    );
}
