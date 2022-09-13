import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    getTimeLabels,
    //   getMultipleSeriesByField,
    sortTimeData,
} from "./chartDataHelpers";

import LineChart from "./LineChart";

axios.defaults.withCredentials = true;

export default function MiscDetectorData({ det_num }) {
    const [series, setSeries] = useState([]);
    // const [dateLabels, setDateLabels] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await axios.get(
                "http://magdevarcgis/fms/Detector/AvgHourlyThroughput",
                {
                    params: {
                        det_num: 50,
                        year: "2021",
                    },
                }
            );
            const _data = sortTimeData(res.data, "hour_in_day");
            const _dateLabels = getTimeLabels(_data, "hour_in_day", true);
            const _series = [
                {
                    name: "ADT",
                    field: "avg_occ",
                    data: [
                        {
                            id: 3819,
                            detector_number: 50,
                            avg_occ: 2.14,
                            hour_in_day: "HOV Lane",
                            lane_type: "ALL Lanes",
                            year: 2021,
                        },
                        {
                            id: 3819,
                            detector_number: 50,
                            avg_occ: 2.14,
                            hour_in_day: "12:30 AM",
                            lane_type: "ALL Lanes",
                            year: 2021,
                        },
                        {
                            id: 3819,
                            detector_number: 50,
                            avg_occ: 2.14,
                            hour_in_day: "12:30 AM",
                            lane_type: "ALL Lanes",
                            year: 2021,
                        },
                        {
                            id: 3819,
                            detector_number: 50,
                            avg_occ: 2.14,
                            hour_in_day: "12:30 AM",
                            lane_type: "ALL Lanes",
                            year: 2021,
                        },
                    ],
                    dashType: "solid",
                },
                {
                    name: "Speed",
                    field: "avg_occ",
                    data: [],
                    dashType: "longDash",
                },
                {
                    name: "Occupancy",
                    field: "avg_occ",
                    data: [
                        {
                            id: 6530,
                            detector_number: 50,
                            avg_occ: 1.04,
                            lane_type: "HOV",
                            year: 2021,
                        },
                    ],
                    dashType: "dash",
                },
            ];
            setSeries(_series);
            // setDateLabels(_dateLabels);
        })();
    }, [det_num]);
    return (
        <LineChart
            field="avg_occ"
            series={series}
            title="Annual Average by Lane - raw data with zero values and without"
            catTitle="ADT"
            valueTitle=""
            labels={["HOV Lane", "Lane 4", "Lane 3", "Lane 2", "Lane 1"]}
        />
    );
}
