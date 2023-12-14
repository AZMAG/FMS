import React, { useEffect, useState } from "react";
import axios from "axios";

import exportToCsv from "./exportToCsv";
// import {
//     getTimeLabels,
//     getMultipleSeriesByField,
//     sortTimeData,
// } from "./chartDataHelpers";

// import LineChart from "./LineChart";

import {
  Chart,
  ChartArea,
  ChartTitle,
  ChartSeries,
  ChartSeriesItem,
  ChartValueAxis,
  ChartValueAxisItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
} from "@progress/kendo-react-charts";
import LoadingChart from "../../Loaders/loadingChart";
import { apiUrl } from "../../../DocConfig";

axios.defaults.withCredentials = true;

// const chartColors = ["red", "blue", "green"];
const fontTitle = `bold 12pt -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`;

const fontAxisTitle = `bold 10pt -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`;

const fontAxis = `bold 8pt -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`;

export default function DistributionOfDataPassingQCByDate({
  det_num,
  startDate,
  endDate,
  }) {
  // const [data, setData] = useState(null);
  const [series, setSeries] = useState([]);
  const [dateLabels, setDateLabels] = useState([]);

  useEffect(() => {
    (async () => {
      let res = null;

      res = await axios.get (
        `${apiUrl}/Detector/DistributionDataPassingQualityControlCriteriaByDateByParams`,
        {
            params : {
                det_num : det_num,
                startDate : startDate,
                endDate : endDate

            }
        }
      );

      const _dateLabels = [];

      let _data = res.data
        .map((item) => {
          item.date = new Date(
            parseInt(item.collected.replace(/[^0-9 +]/g, ""))
          );
          item.passing = 1 - item.num_errors / 288;
          return item;
        })
        .sort((a, b) => a.date - b.date);

      _data.forEach((item) => {
        const strMonth = item.date.toLocaleString("default", {
          month: "long",
        });
        _dateLabels.push(strMonth + " " + (item.date.getDate() + 1));
      });

      setDateLabels(_dateLabels);
      setSeries(_data);
    })();
  }, [det_num, setSeries, setDateLabels]);
  return (
    <>
      {series.length > 0 ? (
        <div
          id="distribution-of-data-passing-quality-control-criteria-by-date"
          className="bg-[#eeeeee] p-3"
        >
          <button
            onClick={() => exportToCsv(series)}
            className="mb-2 rounded bg-gray-500 px-2 py-1 font-bold text-white hover:bg-gray-700"
          >
            Export to CSV
          </button>
          <Chart>
            <ChartArea background="#fff" />
            <ChartTitle
              text="Distribution of Data Passing Quality Control Criteria by Date"
              font={fontTitle}
            />
            <ChartValueAxis>
              <ChartValueAxisItem
                title={{
                  text: "Percent of Data Rows Valid",
                  font: fontAxisTitle,
                }}
                labels={{ format: "{0:p}" }}
              />
            </ChartValueAxis>
            <ChartCategoryAxis>
              <ChartCategoryAxisItem
                labels={{
                  font: fontAxis,
                  step: Math.floor(series.length / 10),
                  skip: 0,
                  rotation: "auto",
                  padding: [0, 0, 0, 120],
                  visible: true,
                }}
                categories={dateLabels}
                majorGridLines={{ visible: false }}
              />
            </ChartCategoryAxis>
            <ChartSeries>
              <ChartSeriesItem
                field="passing"
                type="area"
                color={"blue"}
                data={series}
                markers={{ visible: false }}
                tooltip={{
                  background: "blue",
                  visible: true,
                  format: "{0}",
                }}
              />
            </ChartSeries>
          </Chart>
        </div>
      ) : (
        <LoadingChart />
      )}
    </>
  );
}
