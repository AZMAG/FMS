// import { useParams } from "react-router-dom";
import React, { useRef } from "react";

import DetectorData from "../../Detector/detectorData";
import QualityTable from "../../Detector/qualityTable";
import ErrorTable from "../../Detector/ErrorTable";
import DetectorNotes from "../../Detector/detectorNotes";
import DetectorDefinition from "../../Detector/detectorDefinition";

import AnnualHourlyAverageSpeeds from "../../Detector/Charts/AnnualHourlyAverageSpeeds";
import AnnualHourlyAverageThroughput from "../../Detector/Charts/AnnualHourlyAverageThroughput";
import AnnualHourlyAverageOccupancyPercent from "../../Detector/Charts/AnnualHourlyAverageOccupancyPercent";
import AnnualAverageByLane from "../../Detector/Charts/AnnualAverageByLane";
import DistributionOfDataPassingQCByDate from "../../Detector/Charts/DistributionOfDataPassingQCByDate";
import DistributionOfDataPassingQCByWeekday from "../../Detector/Charts/DistributionOfDataPassingQCByWeekday";

import ScrollToTopButton from "../../ScrollToTop/scrollToTop";

export default function Detector({ det_num }) {
    const containerRef = useRef();
    const id = 50;

    return (
        <main className="mt-4 flex-1 overflow-y-auto px-16" ref={containerRef}>
            <div className="m-auto flex grid-cols-2 flex-col justify-items-center gap-x-4 space-y-6">
                <div className="grid grid-flow-col gap-6">
                    <DetectorData det_num={id} />
                    <DetectorNotes />
                </div>
                <div className="border-b-gray border-b-2 text-center text-xl font-bold">
                    <h5>
                        Tables, Quality Control Charts and Additional
                        Information
                    </h5>
                </div>
                <div className="flex grid-cols-2 gap-x-4">
                    <div className="grid flex-1 gap-y-4">
                        <QualityTable det_num={id} />
                        <ErrorTable det_num={id} />
                        <DetectorDefinition />
                    </div>
                    <div className="grid flex-1 gap-y-4">
                        <AnnualHourlyAverageSpeeds det_num={id} />
                        <AnnualHourlyAverageThroughput det_num={id} />
                        <AnnualHourlyAverageOccupancyPercent det_num={id} />
                    </div>
                </div>
                <div className="flex grid-cols-2 gap-x-4">
                    <div className="grid flex-1 gap-y-4">
                        <DistributionOfDataPassingQCByDate det_num={id} />
                        <DistributionOfDataPassingQCByWeekday det_num={id} />
                    </div>
                    <div className="grid flex-1 gap-y-4">
                        <AnnualAverageByLane det_num={id} />
                        <span />
                    </div>
                </div>
            </div>
            <ScrollToTopButton containerRef={containerRef} />
        </main>
    );
}
