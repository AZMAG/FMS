import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import RoadGraphic from "./RoadGraphic";
import axios from "axios";
import { apiUrl } from "../../DocConfig";

export default function TimePeriodCard({ data }) {
    const start = new Date(new Date(parseInt(data.startDate.substr(6))));
    const end = new Date(new Date(parseInt(data.endDate.substr(6))));

    const diffTime = Math.abs(end - start);
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

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

            setMetaData(res.data);
        })();
    }, [data.id]);

    return (
        <div
            id="section-time-period"
            className="flex-1 rounded bg-slate-100 py-1 px-3"
        >
            {/* <h2 className="mb-1.5 text-xl font-bold tracking-tight text-gray-900">
                Time Period
            </h2> */}
            <div className="flex items-center">
                <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                />

                {data.startDate && data.endDate && (
                    <p>
                        {start.toLocaleDateString()} -{" "}
                        {end.toLocaleDateString()}
                    </p>
                )}
            </div>

            <br />
            <p>Total # of days in time period: {totalDays.toLocaleString()}</p>
            <p>
                Total # of 5 minute intervals:{" "}
                {totalDataPoints.toLocaleString()}
            </p>
            <br />
            {metaData?.existingLanes && (
                <RoadGraphic data={metaData?.existingLanes} />
            )}

            {/* <p>
                Number of usable days:{" "}
                {metaData.num_days ? (
                    metaData.num_days
                ) : (
                    <span>Loading...</span>
                )}
            </p> */}

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
