import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getGeneratedReports from "./../../GeneratedReport/getGeneratedReports";
import GeneratedReportLink from "./../../GeneratedReport/GeneratedReportLink";

import { useNavigate } from "react-router-dom";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { orderBy } from "@progress/kendo-data-query";
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
    console.log(reports);

    const [data, setData] = useState(reports);
    const [sort, setSort] = useState([
        {
            field: "det_num",
            dir: "desc",
        },
    ]);
    const sortChange = (event) => {
        setData(getReports(event.sort));
        setSort(event.sort);
    };
    const getReports = (sort) => {
        return orderBy(reports, sort);
    };

    return (
        <main className="container flex flex-row w-full h-full mx-auto grid-cols-2 gap-x-4 justify-items-center">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="bg-slate-100 m-auto p-4">
                    <span>
                        There are currently {reports.length} generated reports.
                    </span>
                    <div>
                        {reports.map((report, i) => (
                            <GeneratedReportLink key={i} data={report} />
                        ))}
                    </div>
                    {/* <Grid
                        style={{
                            height: "200px",
                        }}
                        data={data}
                        sortable={true}
                        sort={sort}
                        onSortChange={sortChange}
                        className="kui-grid-header"
                    >
                        <GridColumn
                            className="kui-grid-col"
                            field="det_num"
                            title="Detector ID"
                            width="130"
                        />
                        <GridColumn
                            className="kui-grid-col"
                            field="completed"
                            title="Completed"
                            width="100"
                        />
                        <GridColumn
                            field="date_submitted"
                            title="Date"
                            width="200"
                        />
                        <GridColumn field="" title="Time Stamp" width="100" />
                        <GridColumn field="id" title="Report ID" width="300" />
                    </Grid> */}
                </div>
            )}
        </main>
    );
}
