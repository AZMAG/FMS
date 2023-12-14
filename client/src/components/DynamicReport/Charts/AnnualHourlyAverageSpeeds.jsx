import React, { useEffect, useState } from "react";
import axios from "axios";
import { getTimeLabels, getMultipleSeriesByField } from "./chartDataHelpers";
import LineChart from "./LineChart";
import LoadingChart from "../../Loaders/loadingChart";
import { apiUrl } from "../../../DocConfig";

axios.defaults.withCredentials = true;

export default function AnnualHourlyAverageSpeeds({det_num, startDate, endDate}) {
    const [series, setSeries] = useState([]);
    const [dateLabels, setDateLabels] = useState([]);

    console.log(det_num, startDate, endDate)

    useEffect(() => {
        (async () => {
            let res = null;

            res = await axios.get (
                `${apiUrl}/Detector/AvgHourlySpeedByParams`,
                {
                    params : {
                        det_num : det_num,
                        startDate : startDate,
                        endDate : endDate

                    }
                }
            );

            const _data = res.data.sort((a, b) => {
                return a.min_since - b.min_since;
            });

            const _dateLabels = getTimeLabels(
                _data.filter((row) => row.lane_type === "All Lanes")
            );
            const _series = getMultipleSeriesByField(
                _data,
                "lane_type",
                "avg_speed"
            );

            setSeries(_series);
            setDateLabels(_dateLabels);
        })();
    }, [setSeries, setDateLabels]);
    return (
        <div id="annual-avg-hourly-speed">
            {series.length ? (
                <LineChart
                    field="avg_speed"
                    series={series}
                    title="Annual Hourly Average Speeds - Weekdays"
                    catTitle="Average Speed (mph)"
                    valueTitle=""
                    labels={dateLabels}
                />
            ) : (
                <LoadingChart />
            )}
        </div>
    );
}
