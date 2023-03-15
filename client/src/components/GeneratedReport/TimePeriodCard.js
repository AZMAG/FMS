import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { apiUrl } from "../../DocConfig";

export default function TimePeriodCard({ data, period1 }) {
    console.log(data.reportId);
    function getTotalNumberOfDaysByYear(year) {
        const start = new Date(year, 0, 0);
        const end = new Date(year, 11, 31);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    function getTotalNumberOfDays(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    const totalDays = period1
        ? data.timePeriodYear1
            ? getTotalNumberOfDaysByYear(data.timePeriodYear1)
            : getTotalNumberOfDays(data.startDate1, data.endDate1)
        : data.timePeriodYear2
        ? getTotalNumberOfDaysByYear(data.timePeriodYear2)
        : getTotalNumberOfDays(data.startDate2, data.endDate2);

    const totalDataPoints = totalDays * 1440;

    const [metaData, setMetaData] = useState({});
    const [numberOfUsableDays, setNumberOfUsableDays] = useState(null);

    useEffect(() => {
        (async () => {
            const res = await axios.get(
                `${apiUrl}/Detector/GetMiscDetectorDataByReportId`,
                {
                    params: {
                        reportId: data.id,
                    },
                }
            );

            const thisPeriod = res.data.filter(
                (d) => d.isPeriod1 === period1
            )[0];

            setMetaData(thisPeriod);
        })();
    }, [data.id, period1]);

    return (
        <div
            id="section-time-period"
            className="rounded bg-slate-100 py-1 px-3"
        >
            <h2 className="mb-1.5 text-xl font-bold tracking-tight text-gray-900">
                Time Period
            </h2>
            <FontAwesomeIcon
                icon={faCalendarDays}
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
            />
            {data.startDate1 === null ? (
                <span>
                    {period1 ? data.timePeriodYear1 : data.timePeriodYear2}
                </span>
            ) : (
                <>
                    {period1 ? (
                        <span>
                            {data.startDate1} - {data.endDate1}
                        </span>
                    ) : (
                        <span>
                            {data.startDate2} - {data.endDate2}
                        </span>
                    )}
                </>
            )}
            <p>Total # of days in time period: {totalDays.toLocaleString()}</p>
            <p>
                Total # of 5 minute intervals:{" "}
                {totalDataPoints.toLocaleString()}
            </p>
            <p>
                Number of usable days:{" "}
                {metaData.num_days ? (
                    metaData.num_days
                ) : (
                    <span>Loading...</span>
                )}
            </p>

            {/* <p>
                Number of usable days: <b>{metaData?.num_days}</b>
            </p> */}
            {/* <p>
                GP Lanes: <b>{metaData?.gp_lane_cnt}</b>
            </p>
            <p>
                HOV Lane: <b>{metaData?.hov_lane_cnt}</b>
            </p> */}
        </div>
    );
}
