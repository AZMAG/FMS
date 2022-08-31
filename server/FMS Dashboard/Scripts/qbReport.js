async function init(options) {
  const {
    corridor_id,
    det_num,
    end1,
    end2,
    start1,
    start2,
    year1,
    year2,
  } = options;
  const { map, view, highlightDetector, highlightCorridor } = await addMap({
    target: "viewDiv",
    detectorLayer: {
      renderer: "default",
      popup: false,
      label: true,
      visible: true,
      definitionExpression: `det_num =${det_num}`,
    },
    corridorLayer: {
      renderer: "default",
      popup: false,
      label: true,
      visible: false,
    },
    legend: false,
    home: false,
    yearSelector: false,
  });

  let period1Builder = new DetectorAnalysis({
    det_num,
    year: year1,
    startDate: start1,
    endDate: end1,
  });
  period1Builder.createReport(
    { metaData: true, errorTable: true, ...options },
    "period1AnalysisTarget"
  );

  let period2Builder = new DetectorAnalysis({
    det_num,
    year: year2,
    startDate: start2,
    endDate: end2,
  });

  period2Builder.createReport(
    { metaData: true, errorTable: true, ...options },
    "period2AnalysisTarget"
  );
}
