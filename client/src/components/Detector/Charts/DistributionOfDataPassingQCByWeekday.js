import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  getTimeLabels,
  getMultipleSeriesByField,
  sortTimeData,
} from './chartDataHelpers';

import LineChart from './LineChart';

import {
  Chart,
  ChartTitle,
  ChartSeries,
  ChartSeriesItem,
  ChartValueAxis,
  ChartValueAxisItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartLegend,
  ChartSeriesItemTooltip,
  ChartCategoryAxisLabels,
} from '@progress/kendo-react-charts';

axios.defaults.withCredentials = true;

const chartColors = ['red', 'blue', 'green'];
const font = `bold 12px "Avenir Next W00", "Helvetica Neue", Helvetica, Arial, sans-serif`;

export default function DistributionOfDataPassingQCByWeekday({ det_num }) {
  const [data, setData] = useState(null);
  const [series, setSeries] = useState([]);
  const [dateLabels, setDateLabels] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        'http://magdevarcgis/fms/Detector/GetErrors',
        {
          params: {
            det_num: 50,
            year: '2021',
          },
        }
      );
      let _data = res.data.map((item) => {
        item.date = new Date(parseInt(item.collected.replace(/[^0-9 +]/g, '')));
        item.weekday = item.date.getDay();
        return item;
      });

      var startDate = new Date('2018-01-01');
      var endDate = new Date('2018-12-31');

      var getDateArray = function (start, end) {
        var arr = new Array();
        var dt = new Date(start);
        while (dt <= end) {
          const totalDailyErrors = _data.filter((item) => {
            // console.log(item);
            return item.date.getDate() === dt.getDate();
          });

          const min_since = {};
          totalDailyErrors.forEach((error) => {
            min_since[error.min_since] = true;
          });

          let passing = 1 - Object.keys(min_since).length / 288;

          if (passing < 0) {
            alert('passing is less than 0');
            passing = 0;
          }

          const obj = {
            date: new Date(dt),
            passing,
            weekday: dt.getDay(),
          };

          arr.push(obj);
          dt.setDate(dt.getDate() + 1);
        }
        return arr;
      };
      const seriesData = getDateArray(startDate, endDate);
      seriesData.sort((a, b) => {
        return a.weekday - b.weekday;
      });
      const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const labels = seriesData.map((item) => {
        return weekday[item.weekday];
      });
      setDateLabels(labels);
      setSeries(seriesData);
    })();
  }, [det_num]);
  return (
    <div style={{ marginRight: '15px', flex: 1 }}>
      {series.length > 0 ? (
        <div>
          <Chart>
            <ChartTitle text="Distibution of Data Passing Quality Control Criteria by Weekday" />
            <ChartValueAxis>
              <ChartValueAxisItem
                title={{
                  text: 'Percent of Data Rows Valid',
                  font,
                }}
                labels={{ format: '{0:p}' }}
              />
            </ChartValueAxis>
            <ChartCategoryAxis>
              <ChartCategoryAxisItem
                labels={{
                  font,
                  step: 26.5,
                  skip: 26,
                  rotation: 'auto',
                  padding: [0, 0, 0, 120],
                  visible: true,
                }}
                categories={dateLabels}
              />
            </ChartCategoryAxis>
            <ChartSeries>
              <ChartSeriesItem
                field="passing"
                type="area"
                color={'blue'}
                data={series}
                markers={{ visible: false }}
                tooltip={{
                  background: 'blue',
                  visible: true,
                  format: '{0}',
                }}
              />
            </ChartSeries>
          </Chart>
        </div>
      ) : (
        <>Loading</>
      )}
    </div>
  );
}
