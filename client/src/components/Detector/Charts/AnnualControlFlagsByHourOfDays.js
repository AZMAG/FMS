import React, { useEffect, useState } from "react";
import axios from "axios";
import { getSingleSeriesByField } from "./chartDataHelpers";
import LineChart from "./LineChart";
import LoadingChart from "../../Loaders/loadingChart";
import { apiUrl } from "../../../DocConfig";

export default function AnnualControlFlagsByHourOfDays({ reportId, period1 }) {
    const [series, setSeries] = useState([]);
    const [labels, setLabels] = useState([]);

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

            console.log(res.data);

            const _data = res.data.sort((a, b) => a.lane.localeCompare(b.lane));
            const _labels = _data.map((d) => d.lane);

            const _series = getSingleSeriesByField(
                res.data,
                "avg_daily_traffic"
            );

            setSeries(_series);
            setLabels(_labels);
        })();
    }, [setSeries, setLabels, period1, reportId]);
    return <div>test</div>;
}
