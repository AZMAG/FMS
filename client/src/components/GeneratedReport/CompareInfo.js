import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../DocConfig";

axios.defaults.withCredentials = true;

export default function CompareInfo({ det_num }) {
    const [data, setData] = useState(null);

    // console.log(data);
    const dataItems = [
        {
            data: 4,
            label: "Selected Detector",
        },
        { data: "I-10 WB 75th Ave", label: "Location" },
        {
            data: "pad",
            label: "Type",
        },
        { data: "I-10", label: "Route" },
        {
            data: "WB",
            label: "Direction",
        },
        {
            data: "136",
            label: "Milepost",
        },
    ];

    useEffect(() => {
        (async () => {
            const res = await axios.get(
                apiUrl + "/Detector/GetMiscDetectorData",
                {
                    params: {
                        det_num: 50,
                        year: "2021",
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
                        Query Builder Report
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
                <>Loading</>
            )}
        </>
    );
}
