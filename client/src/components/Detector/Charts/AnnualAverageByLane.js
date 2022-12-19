import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    getTimeLabels,
    sortTimeData,
    getMultipleSeriesByField,
} from "./chartDataHelpers";
import LineChart from "./LineChart";
import LoadingChart from "../../Loaders/loadingChart";
import { apiUrl } from "../../../DocConfig";

axios.defaults.withCredentials = true;

export default function MiscDetectorData({ det_num, reportId, period1 }) {
    const [series, setSeries] = useState([]);
    const [dateLabels, setDateLabels] = useState([]);

    useEffect(() => {
        (async () => {
            let res = null;
            if (reportId) {
                res = await axios.get(
                    apiUrl + "/Detector/AvgVolumeByLaneByReportId",
                    {
                        params: {
                            reportId,
                        },
                    }
                );

                res.data = res.data.filter((d) => d.isPeriod1 === period1);
            } else {
                res = await axios.get(
                    apiUrl + "/Detector/AvgHourlyThroughput",

                    {
                        params: {
                            det_num,
                            year: "2021",
                        },
                    }
                );
            }

            console.log(res.data);

            const _data = sortTimeData(res.data, "hour_in_day");
            const _dateLabels = getTimeLabels(_data, "hour_in_day", true);
            const _series = getMultipleSeriesByField(
                _data,
                "lane_type",
                "avg_occupancy_percent"
            );
            setSeries(_series);
            setDateLabels(_dateLabels);
        })();
    }, [det_num, setSeries, setDateLabels, period1, reportId]);
    return (
        <>
            {series.length ? (
                <LineChart
                    field="avg_occ"
                    series={series}
                    title="Annual Average by Lane - raw data with zero values and without"
                    catTitle="ADT"
                    valueTitle=""
                    labels={[
                        "HOV Lane",
                        "Lane 4",
                        "Lane 3",
                        "Lane 2",
                        "Lane 1",
                    ]}
                />
            ) : (
                <LoadingChart />
            )}
        </>
    );
}
