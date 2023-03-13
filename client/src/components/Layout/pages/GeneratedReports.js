import { useState, useEffect } from "react";
import getGeneratedReports from "../../GeneratedReport/getGeneratedReports";
import deleteGeneratedReport from "./../../GeneratedReport/deleteGeneratedReport";

import GeneratedReportLink from "../../GeneratedReport/GeneratedReportLink";
import DeleteReportButton from "../../GeneratedReport/DeleteReportButton";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { orderBy } from "@progress/kendo-data-query";
import LoadingSpin from "../../Loaders/loadingSpin";

import "./pages.css";
import getReadableTime from "./../../GeneratedReport/getReadableTime";

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
        const SubmittedDate = new Date(parseInt(x.date_submitted.substr(6)));
        const CompletedDate = new Date(parseInt(x.date_completed?.substr(6)));
        let timePeriod1Str;
        let timePeriod2Str;

        if (x.startDate1 === null) {
            timePeriod1Str = x.timePeriodYear1;
        } else {
            timePeriod1Str = `${x.startDate1} - ${x.endDate1}`;
        }

        if (x.startDate2 === null) {
            if (x.timePeriodYear2 === null) {
                timePeriod2Str = "N/A";
            }
        }

        const processingTimeString = CompletedDate - SubmittedDate;

        newData.push({
            det_num: x.det_num,
            completed: x.completed,
            dateSubmitted: date.toLocaleDateString(),
            timeSubmitted: date.toLocaleTimeString(),
            readableTime: getReadableTime(processingTimeString),
            timePeriod1Str,
            timePeriod2Str,
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

    console.log(reports);

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
                            title="Detector #"
                            width="140px"
                        />
                        <GridColumn
                            className="kui-grid-col"
                            field="dateSubmitted"
                            title="Date"
                            width="100px"
                        />
                        <GridColumn
                            className="kui-grid-col"
                            field="timeSubmitted"
                            title="Time Stamp"
                            width="150px"
                        />
                        <GridColumn
                            className="kui-grid-col"
                            field="readableTime"
                            title="Processing Time"
                            width="200px"
                        />
                        <GridColumn
                            className="kui-grid-col"
                            field="timePeriod1Str"
                            title="Time Period 1"
                            width="180px"
                        />
                        <GridColumn
                            className="kui-grid-col"
                            field="timePeriod2Str"
                            title="Time Period 2"
                            width="180px"
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
