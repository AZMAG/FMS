import React from "react";

import { useNavigate } from "react-router-dom";

export default function GeneratedReportLink({ data }) {
    const navigate = useNavigate();

    function linkClicked(e) {
        navigate(`/report/${data.id}`);
    }
    const date = new Date(parseInt(data.date_submitted.substr(6)));

    return (
        <button
            className="cursor-pointer font-bold text-blue-600 underline block border border-black p-3 m-3"
            onClick={linkClicked}
        >
            <span className="mr-2">Detector: {data.det_num}</span>
            <span>
                <b>
                    {date.toLocaleDateString() +
                        " " +
                        date.toLocaleTimeString()}
                </b>
            </span>
        </button>
    );
}
