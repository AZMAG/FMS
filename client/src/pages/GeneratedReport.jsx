import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getGeneratedReports from "../components/GeneratedReport/getGeneratedReports";
import NoReportFound from "../components/GeneratedReport/NoReportFound";
import NotComplete from "../components/GeneratedReport/NotComplete";
import MainGeneratedReport from "../components/GeneratedReport/MainGeneratedReport";
import LoadingSpin from "../components/Loaders/loadingSpin";

export default function GeneratedReport() {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState(null);
  const { id } = useParams();

  //On initial page load, use id in the url to lookup the submitted report.
  useEffect(() => {
    (async () => {
      const reports = await getGeneratedReports();
      setLoading(false);
      const [report] = reports.filter((report) => report.id === id);
      if (report) {
        setReportData(report);
      }
    })();
  }, [id]);

  return (
    <>
      {loading ? (
        <LoadingSpin />
      ) : (
        <>
          {reportData && reportData.id === id ? (
            <>
              {reportData.completed ? (
                <MainGeneratedReport data={reportData} />
              ) : (
                <NotComplete data={reportData} />
              )}
            </>
          ) : (
            <NoReportFound />
          )}
        </>
      )}
    </>
  );
}