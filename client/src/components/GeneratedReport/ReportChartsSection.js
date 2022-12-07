import React from "react";
import AnnualHourlyAverageSpeeds from "../Detector/Charts/AnnualHourlyAverageSpeeds";
import AnnualHourlyAverageThroughput from "../Detector/Charts/AnnualHourlyAverageThroughput";
import AnnualHourlyAverageOccupancyPercent from "../Detector/Charts/AnnualHourlyAverageOccupancyPercent";
import AnnualAverageByLane from "../Detector/Charts/AnnualAverageByLane";
import DistributionOfDataPassingQCByDate from "../Detector/Charts/DistributionOfDataPassingQCByDate";
import DistributionOfDataPassingQCByWeekday from "../Detector/Charts/DistributionOfDataPassingQCByWeekday";

export default function ReportChartsSection({ id, period1 }) {
    return (
        <>
            <AnnualHourlyAverageSpeeds reportId={id} period1={period1} />
            <AnnualHourlyAverageThroughput reportId={id} period1={period1} />
            {/* <AnnualHourlyAverageOccupancyPercent
                reportId={id}
                period1={period1}
            />
            <AnnualAverageByLane reportId={id} period1={period1} />
            <DistributionOfDataPassingQCByDate
                reportId={id}
                period1={period1}
            />
            <DistributionOfDataPassingQCByWeekday
                reportId={id}
                period1={period1}
            /> */}
        </>
    );
}
