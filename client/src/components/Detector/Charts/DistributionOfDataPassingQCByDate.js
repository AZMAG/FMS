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

export default function DistributionOfDataPassingQCByDate({ det_num }) {
    // const [data, setData] = useState(null);
    const [series, setSeries] = useState([]);
    const [dateLabels, setDateLabels] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await axios.get(
                "http://magdevarcgis/fms/Detector/GetErrors",
                {
                    params: {
                        det_num: 50,
                        year: "2021",
                    },
                }
            );
            let _data = res.data.map((item) => {
                item.date = new Date(
                    parseInt(item.collected.replace(/[^0-9 +]/g, ""))
                );
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
                        month: dt.getMonth(),
                    };

                    arr.push(obj);
                    dt.setDate(dt.getDate() + 1);
                }
                return arr;
            };
            const seriesData = getDateArray(startDate, endDate);
            var months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];

            const labels = seriesData.map((ser) => {
                return months[ser.month];
            });
            setDateLabels(labels);
            setSeries(seriesData);
        })();
    }, [det_num]);
    return (
        <>
            {series.length > 0 ? (
                <div className="bg-[#eeeeee] p-3">
                    <Chart>
                        <ChartArea background="#fff" />
                        <ChartTitle
                            text="Distribution of Data Passing Quality Control Criteria by Date"
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
                                    step: 15.5,
                                    skip: 15,
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
                <>Loading</>
            )}
        </>
    );
}
