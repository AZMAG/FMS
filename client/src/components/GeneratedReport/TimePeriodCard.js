import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { apiUrl } from "../../DocConfig";

export default function TimePeriodCard({ data, period1 }) {
    const [metaData, setMetaData] = useState({});
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
        <div className="rounded bg-slate-100 py-1 px-3">
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
            <p>
                Number of usable days: <b>{metaData?.num_days}</b>
            </p>
            <p>
                GP Lanes: <b>{metaData?.gp_lane_cnt}</b>
            </p>
            <p>
                HOV Lane: <b>{metaData?.hov_lane_cnt}</b>
            </p>
        </div>
    );
}
