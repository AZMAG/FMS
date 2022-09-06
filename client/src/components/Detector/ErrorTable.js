import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import "./detector.css";

axios.defaults.withCredentials = true;

export default function ErrorTable({ det_num }) {
    const [data, setData] = useState(null);
    // console.log(data);
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
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            {columns.map((column, i) => (
                                <th
                                    key={i}
                                    className={column.title
                                        .replace(/\s/g, "")
                                        .toLowerCase()}
                                >
                                    {column.title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, i) => (
                            <tr key={i}>
                                {columns.map((column, i) => (
                                    <td
                                        key={i}
                                        className={column.title
                                            .replace(/\s/g, "")
                                            .toLowerCase()}
                                    >
                                        {column.format
                                            ? column.format(row[column.field])
                                            : row[column.field]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <>Loading</>
            )}
        </>
    );
}
