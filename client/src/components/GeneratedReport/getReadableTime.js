function getReadableTime(ms) {
    if (!ms) {
        return "Processing...";
    }

    const toTimeString = (value, singularName) =>
        `${value} ${singularName}${value !== 1 ? "s" : ""}`;

    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const daysMs = ms % (24 * 60 * 60 * 1000);
    const hours = Math.floor(daysMs / (60 * 60 * 1000));
    const hoursMs = ms % (60 * 60 * 1000);
    const minutes = Math.floor(hoursMs / (60 * 1000));
    const minutesMs = ms % (60 * 1000);
    const seconds = Math.round(minutesMs / 1000);

    const data = [
        [days, "day"],
        [hours, "hour"],
        [minutes, "minute"],
        [seconds, "second"],
    ];

    return data
        .filter(([value]) => value > 0)
        .map(([value, name]) => toTimeString(value, name))
        .join(", ");
}
export default getReadableTime;
