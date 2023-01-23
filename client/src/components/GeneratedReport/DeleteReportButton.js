import React from "react";

import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteReportButton({ data, onClick }) {
    return (
        <td>
            <button
                className="rounded bg-red-500 py-1.5 px-4 font-bold text-white hover:bg-red-700"
                onClick={() => onClick(data)}
            >
                <DeleteIcon />
                <span className="ml-2">Delete Report</span>
            </button>
        </td>
    );
}
