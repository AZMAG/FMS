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

export default function AnnualHourlyAverageThroughput({
    det_num,
    reportId,
    period1,
}) {
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
                res.data = res.data.filter((d) => d.isPeriod1 === period1);
            } else {
            }

            const _data = sortTimeData(res.data, "hour_in_day");
            const _dateLabels = getTimeLabels(_data, "hour_in_day", true);
            const _series = getMultipleSeriesByField(
                _data,
                "lane_type",
                "avg_throughput"
            );

            setSeries(_series);
            setDateLabels(_dateLabels);
            console.log(_series);
        })();
    }, [det_num, setSeries, setDateLabels, period1, reportId]);
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
