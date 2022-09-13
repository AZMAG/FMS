import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    getTimeLabels,
    getMultipleSeriesByField,
    sortTimeData,
} from "./chartDataHelpers";

import LineChart from "./LineChart";

axios.defaults.withCredentials = true;

export default function MiscDetectorData({ det_num }) {
    // const [data, setData] = useState(null);
    const [series, setSeries] = useState([]);
    const [dateLabels, setDateLabels] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await axios.get(
                "http://magdevarcgis/fms/Detector/AvgHourlySpeed",
                {
                    params: {
                        det_num: 50,
                        year: "2021",
                    },
                }
            );
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
    }, [det_num, setSeries, setDateLabels]);
    console.log(series);
    return (
        <LineChart
            field="avg_speed"
            series={series}
            title="Annual Hourly Average Speeds - Weekdays"
            catTitle="Average Speed (mph)"
            valueTitle=""
            labels={dateLabels}
        />
    );
}
