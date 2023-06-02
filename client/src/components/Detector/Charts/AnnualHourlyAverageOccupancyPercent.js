import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    getTimeLabels,
    sortTimeData,
    getMultipleSeriesByField,
} from "./chartDataHelpers";
import LineChart from "./LineChart";
import LoadingChart from "../../Loaders/loadingChart";
import { apiUrl } from "../../../DocConfig";

axios.defaults.withCredentials = true;

export default function AnnualHourlyAverageOccupancyPercent({ reportId, det_num, year }) {
    const [series, setSeries] = useState([]);
    const [dateLabels, setDateLabels] = useState([]);

    useEffect(() => {
        (async () => {
            let res = null;
            if (reportId) {
                res = await axios.get(
                    apiUrl + "/Detector/AvgHourlyOccupancyByReportId",
                    {
                        params: {
                            reportId,
                        },
                    }
                );
            } else if (det_num && year) {
                res = await axios.get(
                    apiUrl + "/Detector/AvgHourlyOccupancyByDetNum",
                    {
                        params: {
                            det_num,
                            year,
                        },
                    }
                );
            }

            const _data = res.data.sort((a, b) => {
                return a.min_since - b.min_since;
            });

            const _dateLabels = getTimeLabels(
                _data.filter((row) => row.lane_type === "All Lanes")
            );
            const _series = getMultipleSeriesByField(
                _data,
                "lane_type",
                "avg_occupancy_pct"
            );

            setSeries(_series);
            setDateLabels(_dateLabels);
        })();
    }, [setSeries, setDateLabels, reportId]);
    return (
        <>
            {series.length ? (
                <div id="annual-avg-hourly-occupancy">
                    <LineChart
                        field="avg_occupancy_pct"
                        series={series}
                        title="Annual Hourly Average Occupancy Percent - Weekdays"
                        catTitle="Average Occupancy Percent"
                        valueTitle=""
                        labels={dateLabels}
                    />
                </div>
            ) : (
                <LoadingChart />
            )}
        </>
    );
}
