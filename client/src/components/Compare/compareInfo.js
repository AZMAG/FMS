import React, { useEffect, useState } from "react";
import axios from "axios";

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
                "http://magdevarcgis/fms/Detector/GetMiscDetectorData",
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
                    <div className="font-bold text-lg mb-1">
                        Query Builder Report
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
