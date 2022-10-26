import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getGeneratedReports from "../../GeneratedReport/getGeneratedReports";
import GeneratedReportLink from "../../GeneratedReport/GeneratedReportLink";
import { useNavigate } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "./pages.css";

export default function GeneratedReport() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [reports, setReports] = useState([]);
    const { id } = useParams();

    //On initial page load, use id in the url to lookup the submitted report.
    useEffect(() => {
        (async () => {
            const _reports = await getGeneratedReports();
            setReports(_reports);
            setLoading(false);
        })();
    }, [id]);
    // console.log(reports);

    const newData = [];
    reports.forEach((x) => {
        const date = new Date(parseInt(x.date_submitted.substr(6)));
        newData.push({
            det_num: x.det_num,
            completed: x.completed,
            dateSubmitted: date.toLocaleDateString(),
            timeSubmitted: date.toLocaleTimeString(),
            id: x.id,
        });
    });
    // console.log(newData);

    return (
        <main className="container flex flex-row w-full h-full mx-auto grid-cols-2 gap-x-4 justify-items-center">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="container bg-slate-100 mx-80 p-4">
                    <span>
                        There are currently <b>{reports.length}</b> generated
                        reports.
                    </span>
                    {/* <div>
                        {reports.map((report, i) => (
                            <GeneratedReportLink key={i} data={report} />
                        ))}
                    </div> */}
                    <TableContainer component={Paper}>
                        <Table
                            sx={{ minWidth: 650 }}
                            size="small"
                            aria-label="table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">
                                        Detector ID
                                    </TableCell>
                                    <TableCell align="center">
                                        Completed
                                    </TableCell>
                                    <TableCell align="center">Date</TableCell>
                                    <TableCell align="center">
                                        Time Stamp
                                    </TableCell>
                                    <TableCell align="center">Submit</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {newData.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                {
                                                    border: 0,
                                                },
                                        }}
                                    >
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            align="center"
                                        >
                                            {row.det_num}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{
                                                color:
                                                    row.completed === false
                                                        ? "Red"
                                                        : "Green",
                                            }}
                                        >
                                            {row.completed === false
                                                ? "False"
                                                : "True"}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.dateSubmitted}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.timeSubmitted}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.completed}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </main>
    );
}
