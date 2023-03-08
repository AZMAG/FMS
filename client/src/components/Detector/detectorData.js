import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingList from "../Loaders/loadingList";
import { apiUrl } from "../../DocConfig";

axios.defaults.withCredentials = true;

export default function DetectorData({ det_num, year }) {
    const [data, setData] = useState(null);

    console.log(data);
    const dataItems = [
        {
            field: "detector_number",
            label: "ADOT Detector ID",
        },
        { field: "year", label: "Analysis Year" },
        {
            field: "num_days",
            label: "Number of Days",
        },
        { field: "N/A", label: "Number of Qualified Weekdays" },
        {
            field: "gp_lane_cnt",
            label: "General Purpose Lanes",
        },
        {
            field: "hov_lane_cnt",
            label: "High-Occupancy Lanes",
        },
    ];

    useEffect(() => {
        (async () => {
            const res = await axios.get(
                `${apiUrl}/Detector/GetMiscDetectorData`,
                {
                    params: {
                        det_num: det_num,
                        year,
                    },
                }
            );
            setData(res.data);
            // console.log(res.data);
        })();
    }, [det_num]);
    return (
        <>
            {data ? (
                <div className="px-2">
                    <div className="mb-1 text-lg font-bold">
                        ADOT Detector Info
                    </div>
                    <div className="">
                        <ul className="w-96 rounded-lg border border-gray-200 bg-white">
                            {dataItems.map((item, i) => (
                                <li
                                    key={i}
                                    className="flex w-full justify-between border-b border-gray-200 px-6 py-2"
                                >
                                    {item.label}:
                                    <span className="font-bold">
                                        {data[item.field]}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <LoadingList />
            )}
        </>
    );
}
