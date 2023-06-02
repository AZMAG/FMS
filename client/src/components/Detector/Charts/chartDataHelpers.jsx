function getTimeLabels(data) {
    const seen = {};
    return data.map((row) => {
        const hour_since = Math.floor(row.min_since / 60) * 60;
        const date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMinutes(hour_since);
        const time = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
        if (seen[time]) {
            return "";
        } else {
            seen[time] = true;
            return time;
        }
    });
}

function getDistinctPropertyList(data, prop, sort) {
    const labels = [];
    data.forEach((row) => {
        const label = row[prop];
        if (!labels.includes(label)) {
            labels.push(label);
        }
    });

    return sort ? labels.sort() : labels;
}

function getMinutesSinceMidnight(strDate) {
    const midnight = new Date("1/1/2001");
    const targetTime = new Date(`1/1/2001 ${strDate}`);
    const timeSinceMidnight = targetTime.getTime() - midnight.getTime();
    return timeSinceMidnight;
}

function sortTimeData(data, timeField) {
    timeField = timeField || "hour_in_day";
    return data.sort((a, b) => {
        let aMins = getMinutesSinceMidnight(a[timeField]);
        let bMins = getMinutesSinceMidnight(b[timeField]);
        return aMins - bMins;
    });
}

function getSingleSeriesByField(data, dataField) {
    return [
        {
            name: dataField,
            field: dataField,
            data: data,
        },
    ];
}

function getMultipleSeriesByField(data, filterField, dataField) {
    const seriesKeys = getDistinctPropertyList(data, filterField, true);
    const seriesList = [];
    const dashTypes = ["solid", "longDash", "dash"];

    seriesKeys.forEach((key, i) => {
        seriesList.push({
            name: key,
            field: dataField,
            data: data.filter((row) => row[filterField] === key),
            dashType: dashTypes[i],
        });
    });
    return seriesList;
}

export {
    getMultipleSeriesByField,
    getTimeLabels,
    sortTimeData,
    getSingleSeriesByField,
};
