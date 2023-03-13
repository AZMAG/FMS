import React from "react";
import { useNavigate } from "react-router-dom";
import AssessmentIcon from "@mui/icons-material/Assessment";

export default function GeneratedReportLink({ data }) {
    const navigate = useNavigate();

    function linkClicked(e) {
        if (data.completed) {
            navigate(`/report/${data.id}`);
        }
    }

    return (
        <td>
            <button
                className={`${
                    !data.completed
                        ? "bg-gray cursor-not-allowed opacity-50"
                        : ""
                } rounded bg-blue-500 py-1.5 px-4 font-bold text-white hover:bg-blue-700`}
                onClick={linkClicked}
            >
                <AssessmentIcon />
                <span className="ml-2">Open</span>
            </button>
        </td>
    );
}
