import React from "react";
import { useNavigate } from "react-router-dom";

export default function GeneratedReportLink({ data }) {
    const navigate = useNavigate();
    console.log(data);

    function linkClicked(e) {
        navigate(`/report/${data.id}`);
    }

    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={linkClicked}
        >
            Get Report
        </button>
    );
}
