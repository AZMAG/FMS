import React from "react";
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

import exportToCsv from "./exportToCsv";

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

export default function LineChart({
    field,
    series,
    title,
    catTitle,
    valueTitle,
    labels,
}) {
    // console.log(series);
    return (
        <>
            {series.length > 0 ? (
                <div className="bg-[#eeeeee] p-3">
                    <button
                        onClick={() => exportToCsv(series[0].data)}
                        className="mb-2 rounded bg-gray-500 py-1 px-2 font-bold text-white hover:bg-gray-700"
                    >
                        Export to CSV
                    </button>
                    <Chart>
                        <ChartArea background="#fff" />
                        <ChartLegend
                            position="bottom"
                            orientation="horizontal"
                        />
                        <ChartTitle text={title} font={fontTitle} />
                        <ChartValueAxis>
                            <ChartValueAxisItem
                                title={{
                                    text: catTitle,
                                    font: fontAxisTitle,
                                }}
                            />
                        </ChartValueAxis>
                        <ChartCategoryAxis>
                            <ChartCategoryAxisItem
                                labels={{
                                    format: "d",
                                    rotation: "auto",
                                    font: fontAxis,
                                }}
                                categories={labels}
                                maxDivisions={8}
                                plotBands={[
                                    {
                                        from: 6,
                                        to: 9,
                                        color: "rgba(192,192,192, .3)",
                                    },
                                    {
                                        from: 15,
                                        to: 19,
                                        color: "rgba(192,192,192, .3)",
                                    },
                                ]}
                            />
                        </ChartCategoryAxis>
                        <ChartSeries>
                            {series.map((series, i) => (
                                <ChartSeriesItem
                                    key={i}
                                    field={field}
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
                <>Loading</>
            )}
        </>
    );
}
