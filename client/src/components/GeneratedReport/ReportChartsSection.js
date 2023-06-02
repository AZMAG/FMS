import React from "react";
import AnnualHourlyAverageSpeeds from "../Detector/Charts/AnnualHourlyAverageSpeeds";
import AnnualHourlyAverageThroughput from "../Detector/Charts/AnnualHourlyAverageThroughput";
import AnnualHourlyAverageOccupancyPercent from "../Detector/Charts/AnnualHourlyAverageOccupancyPercent";
import AnnualAverageByLane from "../Detector/Charts/AnnualAverageByLane";
import DistributionOfDataPassingQCByDate from "../Detector/Charts/DistributionOfDataPassingQCByDate";
import DistributionOfDataPassingQCByWeekday from "../Detector/Charts/DistributionOfDataPassingQCByWeekday";
import WeekdaySpeedvsFlowData from "../Detector/Charts/WeekdaySpeedvsFlowData";
import WeekdayFlowvsDensity from "../Detector/Charts/WeekdayFlowvsDensity";
import WeekdaySpeedvsDensity from "../Detector/Charts/WeekdaySpeedvsDensity";
import AnnualControlFlagsByHourOfDays from "../Detector/Charts/AnnualControlFlagsByHourOfDays";

export default function ReportChartsSection({ id, det_num, year }) {
    return (
        <>
            {det_num}
            <AnnualHourlyAverageSpeeds
                reportId={id}
                det_num={det_num}
                year={year}
            />
            <AnnualHourlyAverageThroughput
                reportId={id}
                det_num={det_num}
                year={year}
            />
            <AnnualHourlyAverageOccupancyPercent
                reportId={id}
                det_num={det_num}
                year={year}
            />
            <AnnualAverageByLane reportId={id} det_num={det_num} year={year} />
            <DistributionOfDataPassingQCByDate
                reportId={id}
                det_num={det_num}
                year={year}
            />
            <DistributionOfDataPassingQCByWeekday
                reportId={id}
                det_num={det_num}
                year={year}
            />
            <WeekdayFlowvsDensity reportId={id} det_num={det_num} year={year} />
            <WeekdaySpeedvsDensity
                reportId={id}
                det_num={det_num}
                year={year}
            />
            <WeekdaySpeedvsFlowData
                reportId={id}
                det_num={det_num}
                year={year}
            />
        </>
    );
}
