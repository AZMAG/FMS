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
    ChartTooltip,
    ChartSeriesItemTooltip,
    ChartCategoryAxisLabels,
} from "@progress/kendo-react-charts";
import "hammerjs";

const chartColors = ["red", "blue", "green"];
const font = `bold 12px "Avenir Next W00", "Helvetica Neue", Helvetica, Arial, sans-serif`;

export default function LineChart({
    field,
    series,
    title,
    catTitle,
    valueTitle,
    labels,
}) {
    return (
        <div className="flex-1 mr-3">
            {series.length > 0 ? (
                <Chart>
                    <ChartArea background="#f5f6f9" />
                    <ChartLegend position="bottom" orientation="horizontal" />
                    <ChartTitle text={title} />
                    <ChartValueAxis>
                        <ChartValueAxisItem
                            title={{
                                text: catTitle,
                                font,
                            }}
                        />
                    </ChartValueAxis>
                    <ChartCategoryAxis>
                        <ChartCategoryAxisItem
                            labels={{
                                format: "d",
                                rotation: "auto",
                                font,
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
            ) : (
                <>Loading</>
            )}
        </div>
    );
}
