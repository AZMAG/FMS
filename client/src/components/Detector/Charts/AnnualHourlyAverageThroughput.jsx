import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    getTimeLabels,
    getMultipleSeriesByField,
    sortTimeData,
} from "./chartDataHelpers";
import LineChart from "./LineChart";
import LoadingChart from "../../Loaders/loadingChart";
import { apiUrl } from "../../../DocConfig";

axios.defaults.withCredentials = true;

export default function AnnualHourlyAverageThroughput({ reportId, det_num, year }) {
    // const [setData] = useState(null);
    const [series, setSeries] = useState([]);
    const [dateLabels, setDateLabels] = useState([]);

    useEffect(() => {
        (async () => {
            let res = null;
            if (reportId) {
                res = await axios.get(
                    apiUrl + "/Detector/AvgHourlyThroughputByReportId",
                    {
                        params: {
                            reportId,
                        },
                    }
                );
            } else if (det_num && year) {
                res = await axios.get(
                    apiUrl + "/Detector/AvgHourlyThroughputByDetNum",
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
                "avg_throughput"
            );

            setSeries(_series);
            setDateLabels(_dateLabels);
        })();
    }, [setSeries, setDateLabels, reportId]);
    return (
        <div id="annual-avg-hourly-throughput">
            {series.length ? (
                <LineChart
                    field="avg_throughput"
                    series={series}
                    title="Annual Hourly Average Throughput - Weekdays"
                    catTitle="Average Volume Per Lane"
                    valueTitle=""
                    labels={dateLabels}
                />
            ) : (
                <LoadingChart />
            )}
        </div>
    );
}
