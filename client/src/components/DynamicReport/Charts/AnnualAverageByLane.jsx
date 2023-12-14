import React, { useEffect, useState } from "react";
import axios from "axios";
import { getSingleSeriesByField } from "./chartDataHelpers";
import LineChart from "./LineChart";
import LoadingChart from "../../Loaders/loadingChart";
import { apiUrl } from "../../../DocConfig";

axios.defaults.withCredentials = true;

export default function AnnualAverageByLane({ det_num, startDate, endDate }) {
    const [series, setSeries] = useState([]);
    const [labels, setLabels] = useState([]);

    useEffect(() => {
        (async () => {

            let res = null;

            res = await axios.get (
                `${apiUrl}/Detector/AvgVolumeByLaneByParams`,
                {
                    params : {
                        det_num : det_num,
                        startDate : startDate,
                        endDate : endDate

                    }
                }
            );

            const _data = res.data.sort((a, b) => a.lane.localeCompare(b.lane));
            const _labels = _data.map((d) => d.lane);

            const _series = getSingleSeriesByField(
                res.data,
                "avg_daily_traffic"
            );

            setSeries(_series);
            setLabels(_labels);
        })();
    }, [det_num, setSeries, setLabels]);
    return (
        <div id="annual-avg-by-lane">
            {series.length ? (
                <LineChart
                    field="avg_daily_traffic"
                    series={series}
                    title="Annual Average by Lane - raw data with zero values and without"
                    catTitle="ADT"
                    valueTitle=""
                    labels={labels}
                />
            ) : (
                <LoadingChart />
            )}
        </div>
    );
}
