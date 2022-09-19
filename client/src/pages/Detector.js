import React from "react";

import { useParams } from "react-router-dom";
import DetectorData from "./../components/Detector/detectorData";
import QualityTable from "../components/Detector/qualityTable";
import ErrorTable from "../components/Detector/errorTable";
import DetectorNotes from "./../components/Detector/detectorNotes";
import DetectorDefinition from "../components/Detector/detectorDefinition";

import AnnualHourlyAverageSpeeds from "./../components/Detector/Charts/AnnualHourlyAverageSpeeds";
import AnnualHourlyAverageThroughput from "./../components/Detector/Charts/AnnualHourlyAverageThroughput";
import AnnualHourlyAverageOccupancyPercent from "./../components/Detector/Charts/AnnualHourlyAverageOccupancyPercent";
import AnnualAverageByLane from "./../components/Detector/Charts/AnnualAverageByLane";
import DistributionOfDataPassingQCByDate from "./../components/Detector/Charts/DistributionOfDataPassingQCByDate";
import DistributionOfDataPassingQCByWeekday from "./../components/Detector/Charts/DistributionOfDataPassingQCByWeekday";

export default function Detector() {
    const id = 50;

    return (
        <div className="container flex flex-col relative top-24 space-y-6 mx-auto mt-4 mb-8">
            <div className="grid grid-flow-col gap-6">
                <DetectorData det_num={id} />
                <DetectorNotes />
            </div>
            <div className="text-xl font-bold text-center border-b-2 border-b-gray">
                <h5>
                    Tables, Quality Control Charts and Additional Information
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
    );
}
