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
    // const [data, setData] = useState(null);
    const [series, setSeries] = useState([]);
    const [dateLabels, setDateLabels] = useState([]);

    useEffect(() => {
        (async () => {
            let res = null;

            if (reportId) {
                res = await axios.get(
                    "http://magdevarcgis/fms/Detector/AvgHourlySpeedByReportId",
                    {
                        params: {
                            reportId,
                        },
                    }
                );

                res.data = res.data.filter((d) => d.isPeriod1 === period1);
            } else {
                res = await axios.get(
                    "http://magdevarcgis/fms/Detector/AvgHourlySpeed",
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
                "avg_speed"
            );

            // setData(_data);
            setSeries(_series);
            setDateLabels(_dateLabels);
        })();
    }, [det_num, setSeries, setDateLabels, period1, reportId]);
    // console.log(series);
    return (
        <>
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
        </>
    );
}
