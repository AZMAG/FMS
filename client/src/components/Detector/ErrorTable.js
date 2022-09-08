import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import "./detector.css";

axios.defaults.withCredentials = true;

export default function ErrorTable({ det_num }) {
    const [data, setData] = useState(null);
    const columns = [
        {
            field: "label",
            title: "Error Type",
        },
        {
            field: "value",
            format: (num) => num.toLocaleString(),
            title: "Total",
        },
        {
            field: "pct",
            format: (num) => Math.round(num * 10000) / 100 + " %",
            title: "Percentage",
        },
    ];

    useEffect(() => {
        (async () => {
            const res = await axios.get(
                "http://magdevarcgis/fms/Detector/GetErrorData",
                {
                    params: {
                        det_num: 50,
                        year: "2021",
                    },
                }
            );
            setData(res.data);
        })();
    }, [det_num]);
    return (
        <>
            {data ? (
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {columns.map((column, i) => (
                                <TableCell key={i} className={column.title}>
                                    {column.title}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, i) => (
                            <TableRow key={i}>
                                {columns.map((column, i) => (
                                    <TableCell key={i} className={column.title}>
                                        {column.format
                                            ? column.format(row[column.field])
                                            : row[column.field]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <>Loading</>
            )}
        </>
    );
}
