import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    getMultipleSeriesByField,
    getSingleSeriesByField,
} from "./chartDataHelpers";
import LineChart from "./LineChart";
import LoadingChart from "../../Loaders/loadingChart";
import { apiUrl } from "../../../DocConfig";
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
    ChartLegend,
    // ChartTooltip,
    // ChartSeriesItemTooltip,
    // ChartCategoryAxisLabels,
} from "@progress/kendo-react-charts";

export default function AnnualControlFlagsByHourOfDays({ reportId, period1 }) {
    const [series, setSeries] = useState([]);
    const [labels, setLabels] = useState([]);
    const chartColors = ["red", "blue", "green"];

    const fontTitle = `bold 12pt -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`;

    const fontAxisTitle = `bold 10pt -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`;

    const fontAxis = `bold 8pt -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`;

    useEffect(() => {
        (async () => {
            let res = null;
            if (reportId) {
                res = await axios.get(
                    apiUrl + "/Detector/AnnualQualityControlFlagsByHourOfDay",
                    {
                        params: {
                            reportId,
                        },
                    }
                );

                // res.data = res.data.filter((d) => d.isPeriod1 === period1);
            }
            const _data = res.data
                .map((row) => {
                    return row;
                })
                .sort((a, b) => a.min_since - b.min_since);

            const _series = [
                {
                    dashType: "solid",
                    field: "all_rows",
                    data: _data,
                    name: "All Rows",
                },
                {
                    dashType: "solid",
                    field: "zeros_error",
                    data: _data,
                    name: "Zeros Error",
                },
                {
                    dashType: "solid",
                    field: "difference_error",
                    data: _data,
                    name: "Difference Error",
                },
                {
                    dashType: "solid",
                    field: "occupancy_error",
                    data: _data,
                    name: "Occupancy Error",
                },
                {
                    dashType: "solid",
                    field: "speed_error",
                    data: _data,
                    name: "Speed Error",
                },
                {
                    dashType: "solid",
                    field: "volume_error",
                    data: _data,
                    name: "Volume Error",
                },
            ];

            const _labels = _data.map((d) => {
                const hour_of_day = Math.floor(d.min_since / 60);
                const hour = hour_of_day % 12 || 12;
                const ampm = hour_of_day < 12 ? "AM" : "PM";
                const label = `${hour}:00 ${ampm}`;

                return label;
            });

            setSeries(_series);
            setLabels(_labels);
        })();
    }, [setSeries, setLabels, period1, reportId]);
    return (
        <>
            {series.length ? (
                <div id="annual-control-flags-by-hour-of-days">
                    <Chart>
                        <ChartArea background="#fff" />
                        <ChartLegend
                            position="top"
                            orientation="horizontal"
                            visible={true}
                        />
                        <ChartTitle
                            text={"Annual Control Flags By Hour Of Day"}
                            font={fontTitle}
                        />
                        <ChartValueAxis>
                            <ChartValueAxisItem
                                title={{
                                    text: "Count of 5-min Error Flags (per hour)",
                                    font: fontAxisTitle,
                                }}
                            />
                        </ChartValueAxis>
                        <ChartCategoryAxis>
                            <ChartCategoryAxisItem
                                majorGridLines={{ visible: false }}
                                minorGridLines={{ visible: false }}
                                labels={{
                                    font: fontAxis,
                                    step: 20,
                                    skip: 0,
                                    rotation: "45",
                                    padding: [0, 0, 0, 120],
                                    visible: true,
                                }}
                                categories={labels}
                                maxDivisions={8}
                            />
                        </ChartCategoryAxis>
                        <ChartSeries>
                            {series.map((series, i) => (
                                <ChartSeriesItem
                                    key={i}
                                    field={series.field}
                                    type="line"
                                    name={series.name}
                                    color={chartColors[i]}
                                    dashType={series.dashType}
                                    data={series.data}
                                    markers={{ visible: false }}
                                    tooltip={{
                                        background: chartColors[i],
                                        visible: true,
                                        format: "{0}",
                                    }}
                                />
                            ))}
                        </ChartSeries>
                    </Chart>
                </div>
            ) : (
                <LoadingChart />
            )}
        </>
    );
}
