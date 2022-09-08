import React, { useEffect, useState } from "react";
import axios from "axios";
import { getTimeLabels, sortTimeData } from "./chartDataHelpers";

import LineChart from "./LineChart";

axios.defaults.withCredentials = true;

export default function MiscDetectorData({ det_num }) {
    const [setData] = useState(null);
    const [series, setSeries] = useState([]);
    const [dateLabels, setDateLabels] = useState([]);

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
                    name: "ALL Lanes",
                    field: "avg_occ",
                    data: [
                        {
                            id: 3819,
                            detector_number: 50,
                            avg_occ: 2.14,
                            hour_in_day: "12:30 AM",
                            lane_type: "ALL Lanes",
                            year: 2021,
                        },
                        {
                            id: 3857,
                            detector_number: 50,
                            avg_occ: 1.87,
                            hour_in_day: "1:30 AM",
                            lane_type: "ALL Lanes",
                            year: 2021,
                        },
                        {
                            id: 3703,
                            detector_number: 50,
                            avg_occ: 2.0,
                            hour_in_day: "2:30 AM",
                            lane_type: "ALL Lanes",
                            year: 2021,
                        },
                        {
                            id: 3747,
                            detector_number: 50,
                            avg_occ: 2.59,
                            hour_in_day: "3:30 AM",
                            lane_type: "ALL Lanes",
                            year: 2021,
                        },
                        {
                            id: 3826,
                            detector_number: 50,
                            avg_occ: 5.7,
                            hour_in_day: "4:30 AM",
                            lane_type: "ALL Lanes",
                            year: 2021,
                        },
                        {
                            id: 3789,
                            detector_number: 50,
                            avg_occ: 8.42,
                            hour_in_day: "5:30 AM",
                            lane_type: "ALL Lanes",
                            year: 2021,
                        },
                        {
                            id: 3726,
                            detector_number: 50,
                            avg_occ: 10.24,
                            hour_in_day: "6:30 AM",
                            lane_type: "ALL Lanes",
                            year: 2021,
                        },
                        {
                            id: 3859,
                            detector_number: 50,
                            avg_occ: 10.49,
                            hour_in_day: "7:30 AM",
                            lane_type: "ALL Lanes",
                            year: 2021,
                        },
                        {
                            id: 3722,
                            detector_number: 50,
                            avg_occ: 10.65,
                            hour_in_day: "8:30 AM",
                            lane_type: "ALL Lanes",
                            year: 2021,
                        },
                        {
                            id: 3856,
                            detector_number: 50,
                            avg_occ: 10.92,
                            hour_in_day: "9:30 AM",
                            lane_type: "ALL Lanes",
                            year: 2021,
                        },
                        {
                            id: 3823,
                            detector_number: 50,
                            avg_occ: 10.62,
                            hour_in_day: "10:30 AM",
                            lane_type: "ALL Lanes",
                            year: 2021,
                        },
                        {
                            id: 3761,
                            detector_number: 50,
                            avg_occ: 10.89,
                            hour_in_day: "11:30 AM",
                            lane_type: "ALL Lanes",
                            year: 2021,
                        },
                        {
                            id: 3853,
                            detector_number: 50,
                            avg_occ: 9.94,
                            hour_in_day: "12:30 PM",
                            lane_type: "ALL Lanes",
                            year: 2021,
                        },
                        {
                            id: 3757,
                            detector_number: 50,
                            avg_occ: 10.6,
                            hour_in_day: "1:30 PM",
                            lane_type: "ALL Lanes",
                            year: 2021,
                        },
                        {
                            id: 3716,
                            detector_number: 50,
                            avg_occ: 16.38,
                            hour_in_day: "2:30 PM",
                            lane_type: "ALL Lanes",
                            year: 2021,
                        },
                        {
                            id: 3742,
                            detector_number: 50,
                            avg_occ: 22.91,
                            hour_in_day: "3:30 PM",
                            lane_type: "ALL Lanes",
                            year: 2021,
                        },
                        {
                            id: 3736,
                            detector_number: 50,
                            avg_occ: 26.77,
                            hour_in_day: "4:30 PM",
                            lane_type: "ALL Lanes",
                            year: 2021,
                        },
                        {
                            id: 3708,
                            detector_number: 50,
                            avg_occ: 27.89,
                            hour_in_day: "5:30 PM",
                            lane_type: "ALL Lanes",
                            year: 2021,
                        },
                        {
                            id: 3738,
                            detector_number: 50,
                            avg_occ: 16.39,
                            hour_in_day: "6:30 PM",
                            lane_type: "ALL Lanes",
                            year: 2021,
                        },
                        {
                            id: 3852,
                            detector_number: 50,
                            avg_occ: 7.48,
                            hour_in_day: "7:30 PM",
                            lane_type: "ALL Lanes",
                            year: 2021,
                        },
                        {
                            id: 3735,
                            detector_number: 50,
                            avg_occ: 6.19,
                            hour_in_day: "8:30 PM",
                            lane_type: "ALL Lanes",
                            year: 2021,
                        },
                        {
                            id: 3770,
                            detector_number: 50,
                            avg_occ: 5.46,
                            hour_in_day: "9:30 PM",
                            lane_type: "ALL Lanes",
                            year: 2021,
                        },
                        {
                            id: 3809,
                            detector_number: 50,
                            avg_occ: 4.08,
                            hour_in_day: "10:30 PM",
                            lane_type: "ALL Lanes",
                            year: 2021,
                        },
                        {
                            id: 3778,
                            detector_number: 50,
                            avg_occ: 3.13,
                            hour_in_day: "11:30 PM",
                            lane_type: "ALL Lanes",
                            year: 2021,
                        },
                    ],
                    dashType: "solid",
                },
                {
                    name: "GP",
                    field: "avg_occ",
                    data: [
                        {
                            id: 6481,
                            detector_number: 50,
                            avg_occ: 2.42,
                            hour_in_day: "12:30 AM",
                            lane_type: "GP",
                            year: 2021,
                        },
                        {
                            id: 6428,
                            detector_number: 50,
                            avg_occ: 2.12,
                            hour_in_day: "1:30 AM",
                            lane_type: "GP",
                            year: 2021,
                        },
                        {
                            id: 6691,
                            detector_number: 50,
                            avg_occ: 2.29,
                            hour_in_day: "2:30 AM",
                            lane_type: "GP",
                            year: 2021,
                        },
                        {
                            id: 6589,
                            detector_number: 50,
                            avg_occ: 2.92,
                            hour_in_day: "3:30 AM",
                            lane_type: "GP",
                            year: 2021,
                        },
                        {
                            id: 6514,
                            detector_number: 50,
                            avg_occ: 6.07,
                            hour_in_day: "4:30 AM",
                            lane_type: "GP",
                            year: 2021,
                        },
                        {
                            id: 6392,
                            detector_number: 50,
                            avg_occ: 8.97,
                            hour_in_day: "5:30 AM",
                            lane_type: "GP",
                            year: 2021,
                        },
                        {
                            id: 6684,
                            detector_number: 50,
                            avg_occ: 11.61,
                            hour_in_day: "6:30 AM",
                            lane_type: "GP",
                            year: 2021,
                        },
                        {
                            id: 6688,
                            detector_number: 50,
                            avg_occ: 11.92,
                            hour_in_day: "7:30 AM",
                            lane_type: "GP",
                            year: 2021,
                        },
                        {
                            id: 6518,
                            detector_number: 50,
                            avg_occ: 12.33,
                            hour_in_day: "8:30 AM",
                            lane_type: "GP",
                            year: 2021,
                        },
                        {
                            id: 6609,
                            detector_number: 50,
                            avg_occ: 12.15,
                            hour_in_day: "9:30 AM",
                            lane_type: "GP",
                            year: 2021,
                        },
                        {
                            id: 6528,
                            detector_number: 50,
                            avg_occ: 11.79,
                            hour_in_day: "10:30 AM",
                            lane_type: "GP",
                            year: 2021,
                        },
                        {
                            id: 6579,
                            detector_number: 50,
                            avg_occ: 12.03,
                            hour_in_day: "11:30 AM",
                            lane_type: "GP",
                            year: 2021,
                        },
                        {
                            id: 6533,
                            detector_number: 50,
                            avg_occ: 10.62,
                            hour_in_day: "12:30 PM",
                            lane_type: "GP",
                            year: 2021,
                        },
                        {
                            id: 6567,
                            detector_number: 50,
                            avg_occ: 11.08,
                            hour_in_day: "1:30 PM",
                            lane_type: "GP",
                            year: 2021,
                        },
                        {
                            id: 6631,
                            detector_number: 50,
                            avg_occ: 16.75,
                            hour_in_day: "2:30 PM",
                            lane_type: "GP",
                            year: 2021,
                        },
                        {
                            id: 6520,
                            detector_number: 50,
                            avg_occ: 24.77,
                            hour_in_day: "3:30 PM",
                            lane_type: "GP",
                            year: 2021,
                        },
                        {
                            id: 6695,
                            detector_number: 50,
                            avg_occ: 28.91,
                            hour_in_day: "4:30 PM",
                            lane_type: "GP",
                            year: 2021,
                        },
                        {
                            id: 6592,
                            detector_number: 50,
                            avg_occ: 30.01,
                            hour_in_day: "5:30 PM",
                            lane_type: "GP",
                            year: 2021,
                        },
                        {
                            id: 6394,
                            detector_number: 50,
                            avg_occ: 17.97,
                            hour_in_day: "6:30 PM",
                            lane_type: "GP",
                            year: 2021,
                        },
                        {
                            id: 6563,
                            detector_number: 50,
                            avg_occ: 8.13,
                            hour_in_day: "7:30 PM",
                            lane_type: "GP",
                            year: 2021,
                        },
                        {
                            id: 6674,
                            detector_number: 50,
                            avg_occ: 6.83,
                            hour_in_day: "8:30 PM",
                            lane_type: "GP",
                            year: 2021,
                        },
                        {
                            id: 6663,
                            detector_number: 50,
                            avg_occ: 6.01,
                            hour_in_day: "9:30 PM",
                            lane_type: "GP",
                            year: 2021,
                        },
                        {
                            id: 6507,
                            detector_number: 50,
                            avg_occ: 4.48,
                            hour_in_day: "10:30 PM",
                            lane_type: "GP",
                            year: 2021,
                        },
                        {
                            id: 6659,
                            detector_number: 50,
                            avg_occ: 3.49,
                            hour_in_day: "11:30 PM",
                            lane_type: "GP",
                            year: 2021,
                        },
                    ],
                    dashType: "longDash",
                },
                {
                    name: "HOV",
                    field: "avg_occ",
                    data: [
                        {
                            id: 6530,
                            detector_number: 50,
                            avg_occ: 1.04,
                            hour_in_day: "12:30 AM",
                            lane_type: "HOV",
                            year: 2021,
                        },
                        {
                            id: 6679,
                            detector_number: 50,
                            avg_occ: 0.85,
                            hour_in_day: "1:30 AM",
                            lane_type: "HOV",
                            year: 2021,
                        },
                        {
                            id: 6459,
                            detector_number: 50,
                            avg_occ: 0.84,
                            hour_in_day: "2:30 AM",
                            lane_type: "HOV",
                            year: 2021,
                        },
                        {
                            id: 6448,
                            detector_number: 50,
                            avg_occ: 1.25,
                            hour_in_day: "3:30 AM",
                            lane_type: "HOV",
                            year: 2021,
                        },
                        {
                            id: 6374,
                            detector_number: 50,
                            avg_occ: 4.19,
                            hour_in_day: "4:30 AM",
                            lane_type: "HOV",
                            year: 2021,
                        },
                        {
                            id: 6371,
                            detector_number: 50,
                            avg_occ: 6.21,
                            hour_in_day: "5:30 AM",
                            lane_type: "HOV",
                            year: 2021,
                        },
                        {
                            id: 6425,
                            detector_number: 50,
                            avg_occ: 4.75,
                            hour_in_day: "6:30 AM",
                            lane_type: "HOV",
                            year: 2021,
                        },
                        {
                            id: 6382,
                            detector_number: 50,
                            avg_occ: 4.75,
                            hour_in_day: "7:30 AM",
                            lane_type: "HOV",
                            year: 2021,
                        },
                        {
                            id: 6475,
                            detector_number: 50,
                            avg_occ: 3.95,
                            hour_in_day: "8:30 AM",
                            lane_type: "HOV",
                            year: 2021,
                        },
                        {
                            id: 6417,
                            detector_number: 50,
                            avg_occ: 6.01,
                            hour_in_day: "9:30 AM",
                            lane_type: "HOV",
                            year: 2021,
                        },
                        {
                            id: 6591,
                            detector_number: 50,
                            avg_occ: 5.93,
                            hour_in_day: "10:30 AM",
                            lane_type: "HOV",
                            year: 2021,
                        },
                        {
                            id: 6462,
                            detector_number: 50,
                            avg_occ: 6.34,
                            hour_in_day: "11:30 AM",
                            lane_type: "HOV",
                            year: 2021,
                        },
                        {
                            id: 6463,
                            detector_number: 50,
                            avg_occ: 7.19,
                            hour_in_day: "12:30 PM",
                            lane_type: "HOV",
                            year: 2021,
                        },
                        {
                            id: 6376,
                            detector_number: 50,
                            avg_occ: 8.68,
                            hour_in_day: "1:30 PM",
                            lane_type: "HOV",
                            year: 2021,
                        },
                        {
                            id: 6431,
                            detector_number: 50,
                            avg_occ: 14.93,
                            hour_in_day: "2:30 PM",
                            lane_type: "HOV",
                            year: 2021,
                        },
                        {
                            id: 6477,
                            detector_number: 50,
                            avg_occ: 15.47,
                            hour_in_day: "3:30 PM",
                            lane_type: "HOV",
                            year: 2021,
                        },
                        {
                            id: 6381,
                            detector_number: 50,
                            avg_occ: 18.19,
                            hour_in_day: "4:30 PM",
                            lane_type: "HOV",
                            year: 2021,
                        },
                        {
                            id: 6440,
                            detector_number: 50,
                            avg_occ: 19.4,
                            hour_in_day: "5:30 PM",
                            lane_type: "HOV",
                            year: 2021,
                        },
                        {
                            id: 6541,
                            detector_number: 50,
                            avg_occ: 10.08,
                            hour_in_day: "6:30 PM",
                            lane_type: "HOV",
                            year: 2021,
                        },
                        {
                            id: 6595,
                            detector_number: 50,
                            avg_occ: 4.89,
                            hour_in_day: "7:30 PM",
                            lane_type: "HOV",
                            year: 2021,
                        },
                        {
                            id: 6445,
                            detector_number: 50,
                            avg_occ: 3.62,
                            hour_in_day: "8:30 PM",
                            lane_type: "HOV",
                            year: 2021,
                        },
                        {
                            id: 6633,
                            detector_number: 50,
                            avg_occ: 3.27,
                            hour_in_day: "9:30 PM",
                            lane_type: "HOV",
                            year: 2021,
                        },
                        {
                            id: 6610,
                            detector_number: 50,
                            avg_occ: 2.49,
                            hour_in_day: "10:30 PM",
                            lane_type: "HOV",
                            year: 2021,
                        },
                        {
                            id: 6368,
                            detector_number: 50,
                            avg_occ: 1.69,
                            hour_in_day: "11:30 PM",
                            lane_type: "HOV",
                            year: 2021,
                        },
                    ],
                    dashType: "dash",
                },
            ];

            setData(_data);
            setSeries(_series);
            setDateLabels(_dateLabels);
        })();
    }, [det_num, setData, setSeries, setDateLabels]);
    return (
        <LineChart
            field="avg_occ"
            series={series}
            title="Annual Hourly Average Occupancy Percent - weekdays"
            catTitle="Average Occupancy Percent"
            valueTitle=""
            labels={dateLabels}
        />
    );
}
