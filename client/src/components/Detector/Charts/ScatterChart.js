import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
const chartColors = ["red", "blue", "orange", "yellow"];

const fontTitle = `bold 12pt -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`;

const fontAxisTitle = `bold 10pt -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`;

const fontAxis = `bold 8pt -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`;

export default function ScatterChart({
    field,
    series,
    title,
    catTitle,
    valueTitle,
    labels,
}) {
    console.log(series);

    Highcharts.setOptions({
        colors: chartColors,
    });
    const options = {
        title: {
            text: "Weekday Speed vs Flow",
        },
        chart: {
            type: "scatter",
            zoomType: "xy",
            // height: "100%",
        },
        boost: {
            useGPUTranslations: true,
            usePreAllocated: true,
        },
        series: [
            {
                data: series[0].data
                    .filter((x) => x.time_of_day === "AM Peak")
                    .map((s) => {
                        return [s.speed, s.vph];
                    }),
                marker: {
                    symbol: "circle",
                    radius: 2.5,
                },

                name: "AM Peak",
                id: "am-peak",
            },
            {
                data: series[0].data
                    .filter((x) => x.time_of_day === "Mid Day")
                    .map((s) => {
                        return [s.speed, s.vph];
                    }),
                marker: {
                    symbol: "circle",
                    radius: 2.5,
                },

                name: "Mid Day",
                id: "mid-day",
            },
            {
                data: series[0].data
                    .filter((x) => x.time_of_day === "PM Peak")
                    .map((s) => {
                        return [s.speed, s.vph];
                    }),
                marker: {
                    symbol: "circle",
                    radius: 2.5,
                },

                name: "PM Peak",
                id: "pm-peak",
            },
            {
                data: series[0].data
                    .filter((x) => x.time_of_day === "Night")
                    .map((s) => {
                        return [s.speed, s.vph];
                    }),
                marker: {
                    symbol: "circle",
                    radius: 2.5,
                },

                name: "Night",
                id: "night",
            },
        ],
        xAxis: {
            title: {
                text: "Speed",
            },
            labels: {
                format: "{value} MPH",
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
        },
        yAxis: {
            title: {
                text: "Flow",
            },
            labels: {
                format: "{value} VPH",
            },
        },
        tooltip: {
            pointFormat: "Speed: {point.x} MPH <br/> Flow: {point.y} VPH",
        },
    };

    console.log(options);

    return (
        <>
            {series.length > 0 ? (
                <div className="bg-[#eeeeee] p-3">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                    />
                    {/* <Chart>
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
                                    type="scatter"
                                    data={series.data}
                                    name={series.name}
                                    xField="rainfall"
                                    yField="windSpeed"
                                    color={chartColors[i]}
                                    tooltip={{
                                        background: chartColors[i],
                                        visible: true,
                                        format: "{0}",
                                    }}
                                />
                            ))}
                        </ChartSeries>
                    </Chart> */}
                </div>
            ) : (
                <>Loading</>
            )}
        </>
    );
}
