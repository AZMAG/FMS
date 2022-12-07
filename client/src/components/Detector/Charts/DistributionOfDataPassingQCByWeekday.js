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
    // ChartLegend,
    // ChartSeriesItemTooltip,
    // ChartCategoryAxisLabels,
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
    const [dateLabels, setDateLabels] = useState([]);

    useEffect(() => {
        (async () => {
            let res = null;

            if (reportId) {
            } else {
                res = await axios.get(apiUrl + "/Detector/GetErrors", {
                    params: {
                        det_num: 50,
                        year: "2021",
                    },
                });
            }

            let _data = res.data.map((item) => {
                item.date = new Date(
                    parseInt(item.collected.replace(/[^0-9 +]/g, ""))
                );
                item.weekday = item.date.getDay();
                return item;
            });

            var startDate = new Date("2018-01-01");
            var endDate = new Date("2018-12-31");

            var getDateArray = function (start, end) {
                var arr = [];
                var dt = new Date(start);
                while (dt <= end) {
                    const totalDailyErrors = _data.filter((item) => {
                        // console.log(item);
                        return item.date.getDate() === dt.getDate();
                    });

                    const min_since = {};
                    totalDailyErrors.forEach((error) => {
                        min_since[error.min_since] = true;
                    });

                    let passing = 1 - Object.keys(min_since).length / 288;

                    if (passing < 0) {
                        alert("passing is less than 0");
                        passing = 0;
                    }

                    const obj = {
                        date: new Date(dt),
                        passing,
                        weekday: dt.getDay(),
                    };

                    arr.push(obj);
                    dt.setDate(dt.getDate() + 1);
                }
                return arr;
            };
            const seriesData = getDateArray(startDate, endDate);
            seriesData.sort((a, b) => {
                return a.weekday - b.weekday;
            });
            const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const labels = seriesData.map((item) => {
                return weekday[item.weekday];
            });
            setDateLabels(labels);
            setSeries(seriesData);
        })();
    }, [det_num, setSeries, setDateLabels, period1, reportId]);
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
                                    step: 26.5,
                                    skip: 26,
                                    rotation: "auto",
                                    padding: [0, 0, 0, 120],
                                    visible: true,
                                }}
                                categories={dateLabels}
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
