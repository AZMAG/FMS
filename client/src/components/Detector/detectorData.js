import React, { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function DetectorData({ det_num }) {
    const [data, setData] = useState(null);

    // console.log(data);
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
        { field: "", label: "Number of Qualified Weekdays" },
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
                "http://magdevarcgis/fms/Detector/GetMiscDetectorData",
                {
                    params: {
                        det_num: 50,
                        year: "2021",
                    },
                }
            );
            setData(res.data);
            console.log(res.data);
        })();
    }, [det_num]);
    return (
        <>
            {data ? (
                <div className="px-2">
                    <div className="font-bold text-lg mb-1">
                        ADOT Detector Info
                    </div>
                    <div className="">
                        <ul className="bg-white rounded-lg border border-gray-200 w-96">
                            {dataItems.map((item, i) => (
                                <li
                                    key={i}
                                    className="flex justify-between px-6 py-2 border-b border-gray-200 w-full"
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
                <>Loading</>
            )}
        </>
    );
}
