import React from "react";

import { useParams } from "react-router-dom";

import MiscDetectorData from "./../components/Detector/MiscDetectorData";
import ErrorTable from "./../components/Detector/ErrorTable";
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
        <div className="container flex flex-col space-y-6 mt-4">
            <div className="flex">
                <div className="flex-1">
                    <MiscDetectorData det_num={id} />
                </div>
                <div className="flex-1 bg-[#eeeeee]">
                    <DetectorNotes />
                </div>
            </div>
            <div className="text-xl font-bold text-center border-b-2 border-b-black">
                <h5>
                    Tables, Quality Control Charts and Additional Information
                </h5>
            </div>
            <div className="flex">
                <div className="flex-1">
                    <h6>
                        Count of Quality Control Flags by Time Period - weekdays
                    </h6>
                    <ErrorTable det_num={id} />
                </div>
                <div className="flex-1">
                    <AnnualHourlyAverageSpeeds det_num={id} />
                </div>
            </div>
            <div className="flex">
                <div className="flex-1"></div>
                <div className="flex-1">
                    <AnnualHourlyAverageThroughput det_num={id} />
                </div>
            </div>
            <div className="flex">
                <div className="flex-1">
                    <DetectorDefinition />
                </div>
                <div className="flex-1">
                    <AnnualHourlyAverageOccupancyPercent det_num={id} />
                </div>
            </div>
            <div className="flex">
                <div className="flex-1"></div>
                <div className="flex-1">
                    <AnnualAverageByLane det_num={id} />
                </div>
            </div>
            <div className="flex">
                <div className="flex-1">
                    <DistributionOfDataPassingQCByDate det_num={id} />
                </div>
                <div className="flex-1">
                    <DistributionOfDataPassingQCByWeekday det_num={id} />
                </div>
            </div>
        </div>
    );
}
