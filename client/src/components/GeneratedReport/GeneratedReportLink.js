import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AssessmentIcon from "@mui/icons-material/Assessment";

export default function GeneratedReportLink({ data }) {
    const navigate = useNavigate();
    // console.log(data);

    function linkClicked(e) {
        navigate(`/report/${data.id}`);
    }

    return (
        <td className="kui-grid-col {data.completed === false ? cursor-not-allowed : cursor-pointer}">
            <Button
                className="{data.completed === false ? cursor-not-allowed : cursor-pointer}"
                disabled={data.completed === false ? true : false}
                variant="contained"
                size="small"
                onClick={linkClicked}
                startIcon={<AssessmentIcon />}
            >
                Get Report
            </Button>
        </td>
    );
}
