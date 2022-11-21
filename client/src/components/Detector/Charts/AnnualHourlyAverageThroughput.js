import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    getTimeLabels,
    getMultipleSeriesByField,
    sortTimeData,
} from "./chartDataHelpers";
import LineChart from "./LineChart";
import LoadingChart from "../../Loaders/loadingChart";

axios.defaults.withCredentials = true;

export default function MiscDetectorData({ det_num, reportId, period1 }) {
    // const [setData] = useState(null);
    const [series, setSeries] = useState([]);
    const [dateLabels, setDateLabels] = useState([]);

    useEffect(() => {
        (async () => {
            let res = null;
            if (reportId) {
            } else {
                res = await axios.get(
                    "http://magdevarcgis/fms/Detector/AvgHourlyThroughput",
                    {
                        params: {
                            det_num,
                            year: "2021",
                        },
                    }
                );
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
        <>
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
        </>
    );
}
