class DetectorAnalysis {
  constructor({ det_num, year, startDate, endDate }) {
    this.det_num = det_num;
    this.startDate = startDate;
    this.endDate = endDate;
    this.year = year;
  }

  _getUniqueId() {
    return (
      Math.random().toString(36).substring(2) +
      new Date().getTime().toString(36)
    );
  }

  _getMinutesSinceMidnight(strDate) {
    const midnight = new Date('1/1/2001');
    const targetTime = new Date(`1/1/2001 ${strDate}`);
    const timeSinceMidnight = targetTime.getTime() - midnight.getTime();
    return timeSinceMidnight;
  }

  async _getJsonByUrl(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  _sortTimeData(data, timeField) {
    timeField = timeField || 'hour_in_day';
    return data.sort((a, b) => {
      let aMins = this._getMinutesSinceMidnight(a[timeField]);
      let bMins = this._getMinutesSinceMidnight(b[timeField]);
      return aMins - bMins;
    });
  }

  _getDistinctPropertyList(data, prop, sort) {
    const labels = [];
    data.forEach((row) => {
      const label = row[prop];
      if (!labels.includes(label)) {
        labels.push(label);
      }
    });

    return sort ? labels.sort() : labels;
  }

  async _getSortedChartData(url, sortField) {
    const data = await this._getJsonByUrl(url);
    return this._sortTimeData(data, sortField || 'hour_in_day');
  }

  _getTimeLabels(data, timeField) {
    timeField = timeField || 'hour_in_day';
    let times = this._getDistinctPropertyList(data, timeField);
    times = times.map((time, i) => {
      return time.replace(':00 PM', ' PM').replace(':00 AM', ' AM');
    });
    return times;
  }

  _getMultipleSeriesByField(data, filterField, dataField) {
    const seriesKeys = this._getDistinctPropertyList(data, filterField, true);
    const seriesList = [];
    const dashTypes = ['solid', 'longDash', 'dash'];

    seriesKeys.map((key, i) => {
      seriesList.push({
        name: key,
        field: dataField,
        data: data.filter((row) => row[filterField] === key),
        dashType: dashTypes[i],
      });
    });
    return seriesList;
  }

  _createLineChart(id, title, valueName, ttTemplate) {
    const font = `bold 12px "Avenir Next W00", "Helvetica Neue", Helvetica, Arial, sans-serif`;

    $('#' + id).kendoChart({
      type: 'line',
      title: {
        text: title,
      },
      legend: {
        position: 'bottom',
      },
      chartArea: {
        height: 270,
      },
      seriesColors: ['red', 'blue', 'green'],
      seriesDefaults: {
        type: 'line',
        style: 'smooth',
        markers: {
          visible: false,
        },
        tooltip: {
          visible: true,
          template: ttTemplate,
          font,
        },
      },
      valueAxis: {
        title: {
          text: valueName,
          font,
        },
        majorGridLines: {
          visible: true,
        },
        labels: {
          step: 2,
        },
      },
      categoryAxis: {
        plotBands: [
          { from: 6, to: 9, color: 'rgba(192,192,192, .3)' },
          { from: 15, to: 19, color: 'rgba(192,192,192, .3)' },
        ],
        majorGridLines: {
          visible: false,
        },
        labels: {
          rotation: 'auto',
          step: 2,
        },
      },
      series: [],
      render: hideLoading,
    });

    return $('#' + id).data('kendoChart');

    function hideLoading(e) {
      // Clear up the loading indicator for this chart
      var loading = $('.chart-loading', e.sender.element.parent());
      kendo.ui.progress(loading, false);
    }
  }

  async metaData(target) {
    const uniqueId = this._getUniqueId();

    $('#' + target).html(`
        <div id="miscLoading${uniqueId}" class="loadingDiv">
              <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
              </div>
        </div>
        <form id="miscForm${uniqueId}" class="loading">
            <div class="form-group row">
                <label for="txtBoxNumDays" class="col-xl-6 col-form-label form-control-sm">Number of Days in Dataset:</label>
                <div class="col-xl-6">
                    <input class="k-textbox form-control-sm" data-field="num_days" name="txtBoxNumDays" readonly="readonly">
                </div>
            </div>
            <div class="form-group row">
                <label for="txtBoxGPLaneCnt" class="col-xl-6 col-form-label form-control-sm">General Purpose Lanes:</label>
                <div class="col-xl-6">
                    <input class="k-textbox form-control-sm" data-field="gp_lane_cnt" name="txtBoxGPLaneCnt" readonly="readonly">
                </div>
            </div>
            <div class="form-group row">
                <label for="txtBoxHOVLaneCnt" class="col-xl-6 col-form-label form-control-sm">High-Occupancy Lanes:</label>
                <div class="col-xl-6">
                    <input class="k-textbox form-control-sm" data-field="hov_lane_cnt" name="txtBoxHOVLaneCnt" readonly="readonly">
                </div>
            </div>
        </form>
    `);

    const data = await this._getJsonByUrl(
      `../Detector/GetMiscDetectorData?det_num=${this.det_num}&year=${this.year}&start=${this.startDate}&end=${this.endDate}`
    );
    $(`#miscForm${uniqueId}`)
      .find('input[data-field]')
      .each((i, el) => {
        let $input = $(el);
        let fld = $input.data('field');
        $input.val(data[fld]);
      });
    $(`#miscForm${uniqueId}`).removeClass('loading');
    $(`#miscLoading${uniqueId}`).hide();
  }

  async errorTable(target) {
    const data = await this._getJsonByUrl(
      `../Detector/GetErrorData?det_num=${this.det_num}&year=${this.year}`
    );
    let $errorTable = $('#' + target);

    $errorTable.kendoGrid({
      dataSource: data,
      scrollable: false,
      columns: [
        {
          field: 'label',
          title: 'Error Type',
        },
        {
          field: 'value',
          template: '#=kendo.format("{0:n0}", value)#',
          title: 'Total',
        },
        {
          field: 'pct',
          template: '#=kendo.format("{0:p}", pct)#',
          title: 'Percentage',
        },
      ],
    });
  }

  async AHAS(target) {
    try {
      const speedChart = this._createLineChart(
        target,
        'Annual Hourly Average Speeds - weekdays',
        'Average Speed (mph)',
        `#: dataItem.avg_speed # mph <br>#: dataItem.hour_in_day #`
      );

      const data = await this._getSortedChartData(
        `../Detector/AvgHourlySpeed?det_num=${this.det_num}&year=${this.year}`,
        'hour_in_day'
      );

      const speedChartOptions = speedChart.options;
      const dateLabels = this._getTimeLabels(data, 'hour_in_day', true);
      speedChartOptions.categoryAxis.categories = dateLabels;
      speedChartOptions.series = this._getMultipleSeriesByField(
        data,
        'lane_type',
        'avg_speed'
      );
      speedChart.redraw();
    } catch (error) {
      console.log(error);
    }
  }

  async AHATPL(target) {
    try {
      const chart = this._createLineChart(
        target,
        'Annual Hourly Average Throughput - weekdays',
        'Average Volume Per Lane',
        `#: dataItem.avg_throughput # vehicles <br>#: dataItem.hour_in_day #`
      );
      const data = await this._getSortedChartData(
        `../Detector/AvgHourlyThroughput?det_num=${this.det_num}&year=${this.year}`,
        'hour_in_day'
      );
      const chartOptions = chart.options;
      const dateLabels = this._getTimeLabels(data, 'hour_in_day', true);
      chartOptions.categoryAxis.categories = dateLabels;
      chartOptions.series = this._getMultipleSeriesByField(
        data,
        'lane_type',
        'avg_throughput'
      );
      chart.redraw();
    } catch (error) {
      console.log(error);
    }
  }

  async AAL(target) {
    try {
      // let data = await this._getSortedChartData(
      //   `../Detector/AvgAnnualTraffic?det_num=${this.det_num}&year=${this.year}`,
      //   'lane'
      // );
      // data = [
      //   { lane: 'HOV', ADT: 22509 },
      //   { lane: 'lane1', ADT: 27381 },
      //   { lane: 'lane2', ADT: 23897 },
      //   { lane: 'lane3', ADT: 23384 },
      //   { lane: 'lane4', ADT: 25573 },
      // ];
      // const chart = this._createLineChart(
      //   target,
      //   'Annual Average by Lane - raw data with zero values and without',
      //   'ADT',
      //   `ADT: #: dataItem.ADT # <br>Lane:#: dataItem.lane #`
      // );
      // const chartOptions = chart.options;
      // chartOptions.series = this._getMultipleSeriesByField(data, 'lane', 'ADT');
      // data, filterField, dataField;
      // chart.redraw();
    } catch (error) {
      console.log(error);
    }
  }
  async AHAOP(target) {
    try {
      const data = await this._getSortedChartData(
        `../Detector/GetAnnualAvgByLane?det_num=${this.det_num}&year=${this.year}`,
        'lane'
      );

      console.log(data);

      const chart = this._createLineChart(
        target,
        'Annual Hourly Average Occupancy Percent - weekdays',
        'ADT',
        `ADT: #: dataItem.ADT # <br>Lane:#: dataItem.lane #`
      );

      const chartOptions = chart.options;
      chartOptions.series = this._getMultipleSeriesByField(
        data,
        'lane',
        'avg_ADT'
      );

      // data, filterField, dataField;
      chart.redraw();
    } catch (error) {
      console.log(error);
    }
  }
  async AQCFHD(target) {
    $('#' + target).html('AQCFHD');
  }
  async DDPQCCD(target) {
    let data = await this._getSortedChartData(
      `../Detector/GetErrors?det_num=${this.det_num}&year=${this.year}`,
      'lane'
    );

    console.log(data);

    data = data.map((item) => {
      item.date = new Date(parseInt(item.collected.replace(/[^0-9 +]/g, '')));
      return item;
    });

    var startDate = new Date('2018-01-01');
    var endDate = new Date('2018-12-31');

    var getDateArray = function (start, end) {
      var arr = new Array();
      var dt = new Date(start);
      while (dt <= end) {
        const totalDailyErrors = data.filter((item) => {
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
          month: dt.getMonth(),
        };

        arr.push(obj);

        dt.setDate(dt.getDate() + 1);
      }
      return arr;
    };

    const seriesData = getDateArray(startDate, endDate);
    const font = `bold 12px "Avenir Next W00", "Helvetica Neue", Helvetica, Arial, sans-serif`;

    $('#' + target).kendoChart({
      type: 'area',
      dataSource: seriesData,
      title: {
        font: 'bold 13px "Avenir Next W00", "Helvetica Neue", Helvetica, Arial, sans-serif',
        text: 'Distribution of Data Passing Quality Control Criteria by Date',
      },
      legend: {
        position: 'bottom',
      },
      chartArea: {
        height: 270,
      },
      seriesColors: ['blue'],
      seriesDefaults: {
        type: 'area',
        markers: {
          visible: false,
        },
        tooltip: {
          visible: true,
          template: "#= kendo.toString(value,'P0') #",
        },
      },
      valueAxis: {
        title: {
          font,
          text: 'Percent of Data Rows Valid',
        },
        majorGridLines: {
          visible: true,
        },
        labels: {
          step: 1,
          template: "#= kendo.toString(value,'P0') #",
        },
        max: 1,
      },
      categoryAxis: {
        labels: {
          step: 15.5,
          skip: 15,
          template: "#= kendo.toString(value,'MMM') #",
          padding: [0, 0, 0, 120],
        },
        line: {
          visible: false,
        },
        majorGridLines: {
          visible: false,
        },
        majorGridLines: {
          visible: false,
        },
      },
      series: [
        {
          type: 'area',
          field: 'passing',
          categoryField: 'date',
        },
      ],
    });
    console.log(seriesData);
    return $('#' + target).data('kendoChart');
  }
  async DDPQCCWD(target) {
    let data = await this._getSortedChartData(
      `../Detector/GetErrors?det_num=${this.det_num}&year=${this.year}`,
      'lane'
    );
    console.log(data);
    data = data.map((item) => {
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
        const totalDailyErrors = data.filter((item) => {
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
          weekday: dt.getDay(),
          passing,
        };
        arr.push(obj);
        dt.setDate(dt.getDate() + 1);
      }
      return arr;
    };
    const seriesData = getDateArray(startDate, endDate);
    console.log(seriesData);

    seriesData.sort((a, b) => {
      return a.weekday - b.weekday;
    });
    const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const categories = seriesData.map((item) => {
      return weekday[item.weekday];
    });

    const font = `bold 12px "Avenir Next W00", "Helvetica Neue", Helvetica, Arial, sans-serif`;
    $('#' + target).kendoChart({
      type: 'area',
      dataSource: {
        data: seriesData,
        sort: { field: 'weekday' },
      },
      title: {
        font: 'bold 13px "Avenir Next W00", "Helvetica Neue", Helvetica, Arial, sans-serif',
        text: 'Distribution of Data Passing Quality Control Criteria by Weekday',
      },
      legend: {
        position: 'bottom',
      },
      chartArea: {
        height: 270,
      },
      seriesColors: ['blue'],
      seriesDefaults: {
        type: 'area',
        markers: {
          visible: false,
        },
        tooltip: {
          visible: true,
        },
      },
      valueAxis: {
        title: {
          text: 'Percent of Data Rows Valid',
          fontSize: '10px',
          font,
        },
        majorGridLines: {
          visible: true,
        },
        labels: {
          step: 1,
          template: "#= kendo.toString(value,'P0') #",
        },
        max: 1,
      },
      categoryAxis: {
        categories,
        line: {
          visible: false,
        },
        majorGridLines: {
          visible: false,
        },
        majorGridLines: {
          visible: false,
        },
        labels: {
          skip: 25,
          step: 52,
          template: "#= kendo.toString(value,'ddd') #",
          padding: [0, 0, 0, 120],
        },
      },
      series: [
        {
          type: 'area',
          field: 'passing',
          // categoryField: 'date',
        },
      ],
    });
    return $('#' + target).data('kendoChart');
  }

  async FVD(target) {
    $('#' + target).html('FVD');
  }
  async SVD(target) {
    $('#' + target).html('SVD');
  }
  async SV(target) {
    $('#' + target).html('SV');
  }

  createReport(includedCharts, insertId) {
    const $container = $('#' + insertId);
    Object.keys(includedCharts).forEach((key) => {
      if (includedCharts[key] && typeof this[key] === 'function') {
        const targetId = key + this._getUniqueId();
        $container.append(
          `<div class="analysisBox"><div id="${targetId}"></div></div>`
        );
        this[key](targetId);
      }
    });
  }
}
