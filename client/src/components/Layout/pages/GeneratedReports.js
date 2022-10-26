import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getGeneratedReports from "../../GeneratedReport/getGeneratedReports";
import GeneratedReportLink from "../../GeneratedReport/GeneratedReportLink";
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
                className="kui-grid-col"
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
        <main className="container flex flex-row w-full h-full mx-auto grid-cols-2 gap-x-4 justify-items-center">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="container bg-slate-100 mx-80 p-4">
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
                        className="kui-grid-header"
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
                            title="Submit"
                            cell={({ dataItem }) => (
                                <GeneratedReportLink data={dataItem} />
                            )}
                        />
                    </Grid>
                </div>
            )}
        </main>
    );
}
