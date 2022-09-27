import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getGeneratedReports from "./../../GeneratedReport/getGeneratedReports";
import GeneratedReportLink from "./../../GeneratedReport/GeneratedReportLink";

export default function GeneratedReport() {
    const [loading, setLoading] = useState(true);
    const [reports, setReports] = useState([]);
    const { id } = useParams();

    //On initial page load, use id in the url to lookup the submitted report.
    useEffect(() => {
        (async () => {
            const _reports = await getGeneratedReports();
            setReports(_reports);
            setLoading(false);
        })();
    }, [id]);

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="w-1/2 bg-slate-100 m-auto p-4 text-center">
                    <span>
                        There are currently {reports.length} generated reports.
                    </span>
                    <div>
                        {reports.map((report, i) => (
                            <GeneratedReportLink key={i} data={report} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
