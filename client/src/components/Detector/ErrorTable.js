import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import LoadingList from "../Loaders/loadingList";
import { apiUrl } from "../../DocConfig";

axios.defaults.withCredentials = true;

export default function ErrorTable({ det_num }) {
    const [data, setData] = useState(null);
    console.log(data);
    const columns = [
        {
            field: "label",
            title: "Error Type",
        },
        {
            field: "pct",
            format: (num) => Math.round(num * 10000) / 100 + " %",
            title: "AM Peak",
        },
        {
            field: "",
            format: (num) => Math.round(num * 10000) / 100 + " %",
            title: "Mid-day Peak",
        },
        {
            field: "",
            format: (num) => Math.round(num * 10000) / 100 + " %",
            title: "PM Peak",
        },
        {
            field: "",
            format: (num) => Math.round(num * 10000) / 100 + " %",
            title: "Night",
        },
        {
            field: "value",
            format: (num) => num.toLocaleString(),
            title: "Total",
        },
    ];

    useEffect(() => {
        (async () => {
            const res = await axios.get(apiUrl + "/Detector/GetErrorData", {
                params: {
                    det_num: 50,
                    year: "2021",
                },
            });
            setData(res.data);
        })();
    }, [det_num]);
    return (
        <>
            {data ? (
                <div className="bg-[#eeeeee] p-5">
                    <h6 className="mb-2 text-lg font-semibold">
                        Percent of Data Rows Flagged by Time Period - weekdays
                    </h6>
                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="Quality table">
                            <TableHead className="bg-slate-100">
                                <TableRow>
                                    {columns.map((column, i) => (
                                        <TableCell
                                            key={i}
                                            className={column.title
                                                .replace(/\s/g, "")
                                                .toLowerCase()}
                                        >
                                            {column.title}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row, i) => (
                                    <TableRow key={i}>
                                        {columns.map((column, i) => (
                                            <TableCell
                                                key={i}
                                                className={column.title}
                                            >
                                                {column.format
                                                    ? column.format(
                                                          row[column.field]
                                                      )
                                                    : row[column.field]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            ) : (
                <LoadingList />
            )}
        </>
    );
}
