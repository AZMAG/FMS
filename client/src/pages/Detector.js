import React from "react";

import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import MiscDetectorData from "./../components/Detector/MiscDetectorData";
import ErrorTable from "./../components/Detector/ErrorTable";

import AnnualHourlyAverageSpeeds from "./../components/Detector/Charts/AnnualHourlyAverageSpeeds";
import AnnualHourlyAverageThroughput from "./../components/Detector/Charts/AnnualHourlyAverageThroughput";
import AnnualHourlyAverageOccupancyPercent from "./../components/Detector/Charts/AnnualHourlyAverageOccupancyPercent";
import AnnualAverageByLane from "./../components/Detector/Charts/AnnualAverageByLane";
import DistributionOfDataPassingQCByDate from "./../components/Detector/Charts/DistributionOfDataPassingQCByDate";
import DistributionOfDataPassingQCByWeekday from "./../components/Detector/Charts/DistributionOfDataPassingQCByWeekday";

export default function Detector() {
    const id = 50;
    return (
        <div className="detector-page flex flex-col container mx-auto">
            <div className="black-banner my-2 text-lg font-semibold">
                <span>Detector Number: {id}</span>
            </div>
            <div className="charts-section">
                <div className="flex w-1/2">
                    {/* <MiscDetectorData det_num={id} /> */}
                    <ErrorTable det_num={id} />
                </div>
                <div className="flex">
                    <AnnualHourlyAverageSpeeds det_num={id} />
                    <AnnualHourlyAverageThroughput det_num={id} />
                </div>
                <div className="flex">
                    <AnnualHourlyAverageOccupancyPercent det_num={id} />
                    <AnnualAverageByLane det_num={id} />
                </div>
                <div className="flex">
                    <DistributionOfDataPassingQCByDate det_num={id} />
                    <DistributionOfDataPassingQCByWeekday det_num={id} />
                </div>
            </div>
        </div>
    );
}
