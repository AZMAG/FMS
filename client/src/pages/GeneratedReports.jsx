import { useState, useEffect } from "react";
import getGeneratedReports from "../components/GeneratedReport/getGeneratedReports";
import deleteGeneratedReport from "../components/GeneratedReport/deleteGeneratedReport";

import GeneratedReportLink from "../components/GeneratedReport/GeneratedReportLink";
import DeleteReportButton from "../components/GeneratedReport/DeleteReportButton";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { orderBy } from "@progress/kendo-data-query";
import LoadingSpin from "../components/Loaders/loadingSpin";

import getReadableTime from "../components/GeneratedReport/getReadableTime";

export default function GeneratedReport() {
  const [loading, setLoading] = useState(true);
  const [reportType, setReportType] = useState("detector");
  const [corridorReports, setCorridorReports] = useState([]);
  const [detReports, setDetReports] = useState([]);

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
    setCorridorReports(_reports.filter((x) => x.corridor_id !== null));
    setDetReports(_reports.filter((x) => x.det_num !== null));
    setLoading(false);
  }

  //On initial page load, use id in the url to lookup the submitted report.
  useEffect(() => {
    loadReports();
  }, []);

  function getFormattedRow(row) {
    const date = new Date(parseInt(row.date_submitted.substr(6)));
    const submittedDate = new Date(parseInt(row.date_submitted.substr(6)));
    const completedDate = new Date(parseInt(row.date_completed?.substr(6)));
    const processingTimeString = completedDate - submittedDate;

    const startDate = new Date(parseInt(row.startDate.substr(6)));
    const endDate = new Date(parseInt(row.endDate.substr(6)));

    return {
      corridor_description: row.CorridorDescription,
      corridor_name: row.CorridorName,
      corridor_id: row.corridor_id,
      det_num: row.det_num,
      completed: row.completed,
      dateSubmitted: date.toLocaleDateString(),
      timeSubmitted: date.toLocaleTimeString(),
      readableTime: getReadableTime(processingTimeString),
      startDate: startDate.toLocaleDateString(),
      endDate: endDate.toLocaleDateString(),
      numDays: Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)),
      id: row.id,
    };
  }

  const formattedCorridorData = corridorReports.map((x) => getFormattedRow(x));
  const formattedDetData = detReports.map((x) => getFormattedRow(x));
  const sharedButtonStyle = "rounded py-1 px-2 font-bold ";
  const activeButtonStyle = "bg-blue-500 text-white";
  const inactiveButtonStyle = "bg-gray-200 text-gray-800 hover:underline";

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
          color: value ? props.myProp[0].color : props.myProp[1].color,
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
  const MyCustomCell = (props) => <CustomCell {...props} myProp={customData} />;

  return (
    <main
      id="ReportsHistory"
      className="container mx-auto flex grow grid-cols-2 flex-row justify-items-center gap-x-4"
    >
      {loading ? (
        <LoadingSpin />
      ) : (
        <div className="bg-slate-100 p-4">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Generated Report History
          </h2>
          <span>
            There are currently{" "}
            <b>
              {reportType === "corridor"
                ? formattedCorridorData.length
                : formattedDetData.length}
            </b>{" "}
            generated {reportType} reports.
          </span>
          <div className="my-3">
            <button
              className={`mr-1 ${sharedButtonStyle} ${
                reportType === "detector"
                  ? activeButtonStyle
                  : inactiveButtonStyle
              }`}
              onClick={() => setReportType("detector")}
            >
              Detector
            </button>
            <button
              className={`${sharedButtonStyle} ${
                reportType === "corridor"
                  ? activeButtonStyle
                  : inactiveButtonStyle
              }`}
              onClick={() => setReportType("corridor")}
            >
              Corridor
            </button>
          </div>
          <Grid
            data={orderBy(
              reportType === "corridor"
                ? formattedCorridorData
                : formattedDetData,
              sort
            )}
            sortable={true}
            sort={sort}
            onSortChange={(e) => {
              setSort(e.sort);
            }}
            resizable={true}
            className="kui-grid-header mt-2"
          >
            {reportType === "corridor" ? (
              <GridColumn
                className="kui-grid-col"
                field="corridor_name"
                title="Corridor Name"
                width="240px"
              />
            ) : (
              <GridColumn
                className="kui-grid-col"
                field="det_num"
                title="Detector #"
                width="140px"
              />
            )}

            {/* {reportType === "corridor" && (
              <GridColumn
                className="kui-grid-col"
                field="corridor_description"
                title="Corridor Description"
                width="240px"
              />
            )} */}

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
              width="150px"
            />
            <GridColumn
              className="kui-grid-col"
              field="startDate"
              title="Start Date"
              width="120px"
            />
            <GridColumn
              className="kui-grid-col"
              field="endDate"
              title="End Date"
              width="120px"
            />
            <GridColumn
              className="kui-grid-col"
              field="numDays"
              title="Days"
              width="100px"
            />

            <GridColumn
              className="kui-grid-col"
              width="150px"
              title=""
              cell={({ dataItem }) => <GeneratedReportLink data={dataItem} />}
            />
            <GridColumn
              className="kui-grid-col"
              width="150px"
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
