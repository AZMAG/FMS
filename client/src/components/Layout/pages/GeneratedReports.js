import { useState, useEffect } from "react";
import getGeneratedReports from "../../GeneratedReport/getGeneratedReports";
import deleteGeneratedReport from "./../../GeneratedReport/deleteGeneratedReport";

import GeneratedReportLink from "../../GeneratedReport/GeneratedReportLink";
import DeleteReportButton from "../../GeneratedReport/DeleteReportButton";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { orderBy } from "@progress/kendo-data-query";
import LoadingSpin from "../../Loaders/loadingSpin";

import "./pages.css";

export default function GeneratedReport() {
    const [loading, setLoading] = useState(true);
    const [reports, setReports] = useState([]);

    async function deleteButtonClicked(dataItem) {
        setLoading(true);
        try {
            await deleteGeneratedReport(dataItem.id);
        } catch (error) {
            console.log(error);
        }
        await loadReports();
    }

    async function loadReports() {
        const _reports = await getGeneratedReports();
        setReports(_reports);
        setLoading(false);
    }

    //On initial page load, use id in the url to lookup the submitted report.
    useEffect(() => {
        loadReports();
    }, []);

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

    const initSort = [
        {
            field: "det_num",
            dir: "desc",
        },
    ];
    const [sort, setSort] = useState(initSort);

    // Style the completed column
    const CustomCell = (props) => {
        const field = props.field || "";
        const value = props.dataItem[field];
        return (
            <td
                style={{
                    color: value
                        ? props.myProp[0].color
                        : props.myProp[1].color,
                }}
                className="kui-grid-col uppercase"
                colSpan={props.colSpan}
                role={"gridcell"}
            >
                {value === null ? "" : props.dataItem[field].toString()}
            </td>
        );
    };
    const customData = [{ color: "green" }, { color: "red" }];
    const MyCustomCell = (props) => (
        <CustomCell {...props} myProp={customData} />
    );

    return (
        <main
            id="ReportsHistory"
            className="mx-auto flex grow grid-cols-2 flex-row justify-items-center gap-x-4"
        >
            {loading ? (
                <LoadingSpin />
            ) : (
                <div className="mx-80 bg-slate-100 p-4">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Generated Report History
                    </h2>
                    <span>
                        There are currently <b>{reports.length}</b> generated
                        reports.
                    </span>
                    <Grid
                        data={orderBy(newData, sort)}
                        sortable={true}
                        sort={sort}
                        onSortChange={(e) => {
                            setSort(e.sort);
                        }}
                        className="kui-grid-header mt-2"
                    >
                        <GridColumn
                            className="kui-grid-col"
                            field="det_num"
                            title="Detector ID"
                        />
                        <GridColumn
                            field="completed"
                            title="Completed"
                            cell={MyCustomCell}
                        />
                        <GridColumn
                            className="kui-grid-col"
                            field="dateSubmitted"
                            title="Date"
                        />
                        <GridColumn
                            className="kui-grid-col"
                            field="timeSubmitted"
                            title="Time Stamp"
                        />
                        <GridColumn
                            className="kui-grid-col"
                            title=""
                            cell={({ dataItem }) => (
                                <GeneratedReportLink data={dataItem} />
                            )}
                        />
                        <GridColumn
                            className="kui-grid-col"
                            title=""
                            cell={({ dataItem }) => (
                                <DeleteReportButton
                                    data={dataItem}
                                    onClick={deleteButtonClicked}
                                />
                            )}
                        />
                    </Grid>
                </div>
            )}
        </main>
    );
}
