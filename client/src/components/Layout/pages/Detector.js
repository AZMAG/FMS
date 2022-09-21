import React from "react";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import DetectorData from "../../Detector/detectorData";
import QualityTable from "../../Detector/qualityTable";
import ErrorTable from "../../Detector/errorTable";
import DetectorNotes from "../../Detector/detectorNotes";
import DetectorDefinition from "../../Detector/detectorDefinition";

import AnnualHourlyAverageSpeeds from "../../Detector/Charts/AnnualHourlyAverageSpeeds";
import AnnualHourlyAverageThroughput from "../../Detector/Charts/AnnualHourlyAverageThroughput";
import AnnualHourlyAverageOccupancyPercent from "../../Detector/Charts/AnnualHourlyAverageOccupancyPercent";
import AnnualAverageByLane from "../../Detector/Charts/AnnualAverageByLane";
import DistributionOfDataPassingQCByDate from "../../Detector/Charts/DistributionOfDataPassingQCByDate";
import DistributionOfDataPassingQCByWeekday from "../../Detector/Charts/DistributionOfDataPassingQCByWeekday";

import ScrollToTopButton from "../../ScrollToTop/scrollToTop";

export default function Detector() {
    const containerRef = useRef();
    const id = 50;

    return (
        <main className="flex-1 overflow-y-auto px-16 mt-4" ref={containerRef}>
            <div className="flex flex-col space-y-6 m-auto grid-cols-2 gap-x-4 justify-items-center">
                <div className="grid grid-flow-col gap-6">
                    <DetectorData det_num={id} />
                    <DetectorNotes />
                </div>
                <div className="text-xl font-bold text-center border-b-2 border-b-gray">
                    <h5>
                        Tables, Quality Control Charts and Additional
                        Information
                    </h5>
                </div>
                <div className="flex grid-cols-2 gap-x-4">
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
                </div>
            </div>
            <ScrollToTopButton containerRef={containerRef} />
        </main>
    );
}
