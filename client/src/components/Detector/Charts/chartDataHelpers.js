function getTimeLabels(data, timeField) {
  timeField = timeField || 'hour_in_day';
  let times = getDistinctPropertyList(data, timeField);
  times = times.map((time, i) => {
    return time.replace(':00 PM', ' PM').replace(':00 AM', ' AM');
  });
  return times;
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
  const midnight = new Date('1/1/2001');
  const targetTime = new Date(`1/1/2001 ${strDate}`);
  const timeSinceMidnight = targetTime.getTime() - midnight.getTime();
  return timeSinceMidnight;
}

function sortTimeData(data, timeField) {
  timeField = timeField || 'hour_in_day';
  return data.sort((a, b) => {
    let aMins = getMinutesSinceMidnight(a[timeField]);
    let bMins = getMinutesSinceMidnight(b[timeField]);
    return aMins - bMins;
  });
}

function getMultipleSeriesByField(data, filterField, dataField) {
  const seriesKeys = getDistinctPropertyList(data, filterField, true);
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

export { getMultipleSeriesByField, getTimeLabels, sortTimeData };
