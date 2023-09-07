import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainGeneratedReport from "../components/GeneratedReport/MainGeneratedReport";
import getDetectors from "../components/Map/getDetectors";

export default function GeneratedReport() {
  const { id, year } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const detectors = await getDetectors();
      const [detector] = detectors.filter(
        (detector) => detector.det_num === Number(id)
      );

      if (detector) {
        detector.year = year;
        detector.segment = detector.Segment;
        setData(detector);
      }
    })();
  }, [id, year]);

  return (
    <>{data && <MainGeneratedReport data={data} det_num={id} year={year} />}</>
  );
}
