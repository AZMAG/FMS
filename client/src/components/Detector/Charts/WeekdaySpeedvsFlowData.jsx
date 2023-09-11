import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    getTimeLabels,
    sortTimeData,
    getMultipleSeriesByField,
} from "./chartDataHelpers";
import ScatterChart from "./ScatterChart";
import LoadingChart from "../../Loaders/loadingChart";
import { apiUrl } from "../../../DocConfig";

axios.defaults.withCredentials = true;

export default function MiscDetectorData({ det_num, reportId, period1 }) {
    const [series, setSeries] = useState([]);
    const [dateLabels, setDateLabels] = useState([]);

    useEffect(() => {
        (async () => {
            let res = null;
            if (reportId) {
                res = await axios.get(
                    apiUrl + "Detector/SpeedVsFlowByReportId",
                    {
                        params: {
                            reportId,
                            isPeriod1: period1,
                        },
                    }
                );
                // console.log(res.data);
                // res.data = res.data.filter((d) => d.isPeriod1 === period1);
            } else {
                res = await axios.get(
                    apiUrl + "/Detector/AvgHourlyThroughput",

                    {
                        params: {
                            det_num,
                            year: "2021",
                        },
                    }
                );
            }

            const _data = res.data.map((row) => {
                if (row.min_since >= 361 && row.min_since <= 540) {
                    row.time_of_day = "AM Peak";
                } else if (row.min_since >= 541 && row.min_since <= 900) {
                    row.time_of_day = "Mid Day";
                } else if (row.min_since >= 901 && row.min_since <= 1140) {
                    row.time_of_day = "PM Peak";
                } else {
                    row.time_of_day = "Night";
                }

                return row;
            });

            setSeries(_data);
        })();
    }, [det_num, setSeries, setDateLabels, period1, reportId]);
    return (
        <>
            {series.length ? (
                <div id="speed-vs-flow">
                    <ScatterChart
                        data={series}
                        xField="vph"
                        yField="speed"
                        xUnit="VPH"
                        yUnit="MPH"
                        xLabel="Flow (Veh/hr)"
                        yLabel="Speed (mph)"
                        title="Speed vs Flow - all data rows & 5-min weekday average"
                    />
                </div>
            ) : (
                <LoadingChart />
            )}
        </>
    );
}