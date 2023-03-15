import React, { useEffect, useState } from "react";
import axios from "axios";
// import {
//     getTimeLabels,
//     getMultipleSeriesByField,
//     sortTimeData,
// } from "./chartDataHelpers";

// import LineChart from "./LineChart";

import {
    Chart,
    ChartArea,
    ChartTitle,
    ChartSeries,
    ChartSeriesItem,
    ChartValueAxis,
    ChartValueAxisItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
} from "@progress/kendo-react-charts";
import LoadingChart from "../../Loaders/loadingChart";
import { apiUrl } from "../../../DocConfig";

axios.defaults.withCredentials = true;

// const chartColors = ["red", "blue", "green"];
const fontTitle = `bold 12pt -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`;

const fontAxisTitle = `bold 10pt -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`;

const fontAxis = `bold 8pt -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`;

export default function DistributionOfDataPassingQCByWeekday({
    det_num,
    reportId,
    period1,
}) {
    // const [data, setData] = useState(null);
    const [series, setSeries] = useState([]);
    const [Labels, setLabels] = useState([]);
    const [numDays, setNumDays] = useState(0);

    useEffect(() => {
        (async () => {
            let res = null;

            if (reportId) {
                res = await axios.get(
                    apiUrl +
                        "/Detector/DistributionDataPassingQualityControlCriteriaByWeekdayByReportId",
                    {
                        params: {
                            reportId,
                        },
                    }
                );
            } else {
                res = await axios.get(
                    apiUrl +
                        "/Detector/DistributionDataPassingQualityControlCriteriaByWeekdayByReportId",
                    {
                        params: {
                            det_num,
                            year: "2021",
                        },
                    }
                );
            }

            setNumDays(res.data.numDays);

            const _labels = [];

            let _data = res.data["data"]
                .map((item) => {
                    item.passing = 1 - item.NumErrors / res.data.numDays;
                    return item;
                })
                .sort((a, b) => {
                    const weekdays = [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                    ];
                    const weekdayIndexA = weekdays.indexOf(a.Weekday);
                    const weekdayIndexB = weekdays.indexOf(b.Weekday);
                    if (weekdayIndexA !== weekdayIndexB) {
                        return weekdayIndexA - weekdayIndexB;
                    } else {
                        return a.MinSince - b.MinSince;
                    }
                });

            _data.forEach((item) => {
                _labels.push(item.Weekday);
            });

            setLabels(_labels);
            setSeries(_data);
        })();
    }, [det_num, setSeries, setLabels, setNumDays, period1, reportId]);

    return (
        <>
            {series.length > 0 ? (
                <div className="bg-[#eeeeee] p-3">
                    <Chart>
                        <ChartArea background="#fff" />
                        <ChartTitle
                            text="Distribution of Data Passing Quality Control Criteria by Weekday"
                            font={fontTitle}
                        />
                        <ChartValueAxis>
                            <ChartValueAxisItem
                                title={{
                                    text: "Percent of Data Rows Valid",
                                    font: fontAxisTitle,
                                }}
                                labels={{ format: "{0:p}" }}
                            />
                        </ChartValueAxis>
                        <ChartCategoryAxis>
                            <ChartCategoryAxisItem
                                labels={{
                                    font: fontAxis,
                                    step: Math.floor(series.length / 7),
                                    skip: Math.floor(series.length / 15),
                                    rotation: "auto",
                                    padding: [0, 0, 0, 120],
                                    visible: true,
                                }}
                                categories={Labels}
                                majorGridLines={{ visible: false }}
                            />
                        </ChartCategoryAxis>
                        <ChartSeries>
                            <ChartSeriesItem
                                field="passing"
                                type="area"
                                color={"blue"}
                                data={series}
                                markers={{ visible: false }}
                                tooltip={{
                                    background: "blue",
                                    visible: true,
                                    format: "{0}",
                                }}
                            />
                        </ChartSeries>
                    </Chart>
                </div>
            ) : (
                <LoadingChart />
            )}
        </>
    );
}
