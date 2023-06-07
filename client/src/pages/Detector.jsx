import React from "react";
import { useParams } from "react-router-dom";
import MainGeneratedReport from "../components/GeneratedReport/MainGeneratedReport";

export default function GeneratedReport() {
    const { id, year } = useParams();

    return (
        <>
            <MainGeneratedReport det_num={id} year={year} />
        </>
    );
}
