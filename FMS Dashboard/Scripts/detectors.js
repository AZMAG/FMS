const urlParams = new URLSearchParams(window.location.search);
const det_num = urlParams.get('det_num');

async function getData(det_num) {
    let throughput = await get_AvgHourlyThroughputByDetNum(det_num);
    let speed = await get_AvgHourlySpeedByDetNum(det_num);
    return { throughput, speed }
}

function sortTimeData(data, timeField) {
    timeField = timeField || "hour_in_day";
    return data.sort((a, b) => {
        let aMins = getMinutesSinceMidnight(a[timeField]);
        let bMins = getMinutesSinceMidnight(b[timeField]);
        return aMins - bMins;
    });
}

async function getSortedChartData(url, sortField) {
    const res = await fetch(url);
    const data = await res.json();
    return sortTimeData(data, sortField || "hour_in_day");
}

async function get_AvgHourlySpeedByDetNum(det_num) {
    return getSortedChartData(`Detector/AvgHourlySpeed?det_num=${det_num}`, "hour_in_day");
}

async function get_AvgHourlyThroughputByDetNum(det_num) {
    return getSortedChartData(`Detector/AvgHourlyThroughput?det_num=${det_num}`, "hour_in_day");
}

function getMinutesSinceMidnight(strDate) {
    const midnight = new Date('1/1/2001');
    const targetTime = new Date(`1/1/2001 ${strDate}`);
    const timeSinceMidnight = targetTime.getTime() - midnight.getTime();
    return timeSinceMidnight;
}

function getTimeLabels(data, timeField) {
    timeField = timeField || "hour_in_day";
    let times = getDistinctPropertyList(data, timeField);
    times = times.map((time, i) => {
        return time.replace(':00 PM', ' PM').replace(':00 AM', ' AM');
    })
    return times;
}

function getDistinctPropertyList(data, prop, sort) {
    const labels = [];
    data.forEach(row => {
        const label = row[prop];
        if (!labels.includes(label)) {
            labels.push(label);
        }
    });

    return sort ? labels.sort() : labels;
}

function getMultipleSeriesByField(data, filterField, dataField) {

    const seriesKeys = getDistinctPropertyList(data, filterField, true);
    const seriesList = [];
    const dashTypes = ["solid", "longDash", "dash"]

    seriesKeys.map((key, i) => {
        seriesList.push({
            name: key,
            field: dataField,
            data: data.filter((row) => row[filterField] === key),
            dashType: dashTypes[i]
        })
    });
    return seriesList;
}

function createLineChart(id, title, valueName, ttTemplate) {

    const font = `bold 12px "Avenir Next W00", "Helvetica Neue", Helvetica, Arial, sans-serif`;

    $("#" + id).kendoChart({
        type: "line",
        title: {
            text: title
        },
        legend: {
            position: "bottom"
        },
        chartArea: {
            height: 270
        },
        seriesColors: ["red", "blue", "green"],
        seriesDefaults: {
            type: "line",
            style: "smooth",
            markers: {
                visible: false
            },
            tooltip: {
                visible: true,
                template: ttTemplate,
                font
            }
        },
        valueAxis: {
            title: {
                text: valueName,
                font
            },
            majorGridLines: {
                visible: true
            },
            labels: {
                step: 2
            }
        },
        categoryAxis: {
            plotBands: [
                { from: 6, to: 9, color: "rgba(192,192,192, .3)" },
                { from: 15, to: 19, color: "rgba(192,192,192, .3)" }
            ],
            majorGridLines: {
                visible: false
            },
            labels: {
                rotation: "auto",
                step: 2
            }
        },
        series: [],
        render: hideLoading
    });

    return $("#" + id).data("kendoChart");

    function hideLoading(e) {
        // Clear up the loading indicator for this chart
        var loading = $(".chart-loading", e.sender.element.parent());
        kendo.ui.progress(loading, false);
    }
}


async function setupAvgSpeedChart() {
    try {
        const speedChart = createLineChart("speedChart", "Annual Hourly Average Speeds - weekdays", "Average Speed (mph)", `#: dataItem.avg_speed # mph <br>#: dataItem.hour_in_day #`);
        const data = await get_AvgHourlySpeedByDetNum(det_num);
        const speedChartOptions = speedChart.options;
        const dateLabels = getTimeLabels(data, "hour_in_day", true);
        speedChartOptions.categoryAxis.categories = dateLabels;
        speedChartOptions.series = getMultipleSeriesByField(data, "lane_type", "avg_speed");
        speedChart.redraw();
    } catch (error) {
        console.log(error);
    }
}

async function setupAvgThroughputChart() {
    try {
        const speedChart = createLineChart("throughputChart", "Annual Hourly Average Throughput - weekdays", "Average Volume Per Lane", `#: dataItem.avg_throughput # vehicles <br>#: dataItem.hour_in_day #`);
        const data = await get_AvgHourlyThroughputByDetNum(det_num);
        const speedChartOptions = speedChart.options;
        const dateLabels = getTimeLabels(data, "hour_in_day", true);
        speedChartOptions.categoryAxis.categories = dateLabels;
        speedChartOptions.series = getMultipleSeriesByField(data, "lane_type", "avg_throughput");
        speedChart.redraw();
    } catch (error) {
        console.log(error);
    }
}


$(function() {
    setupAvgSpeedChart();
    setupAvgThroughputChart();
    kendo.ui.progress($(".chart-loading"), true);
});