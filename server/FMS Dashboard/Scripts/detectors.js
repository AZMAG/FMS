function setupPage(detNum, year) {
  // kendo.ui.progress($('.chart-loading'), true);

  let detectorAnalysisBuilder = new DetectorAnalysis({
    det_num: detNum,
    year,
  });

  detectorAnalysisBuilder.AHAS('speedChart');
  detectorAnalysisBuilder.AHATPL('throughputChart');
  // detectorAnalysisBuilder.AHAOP('AHAOPChart');
  detectorAnalysisBuilder.AAL('AALChart');
  detectorAnalysisBuilder.DDPQCCD('DDPQCCDChart');
  detectorAnalysisBuilder.DDPQCCWD('DDPQCCWDChart');

  detectorAnalysisBuilder.metaData('metaData');
  detectorAnalysisBuilder.errorTable('errorTable');

  // kendo.ui.progress($('.chart-loading'), true);
}

$(async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const det_num = urlParams.get('det_num');

  setupPage(det_num, 2018);

  config.years.sort((a, b) => b - a);

  $('#yearSelector').kendoDropDownList({
    dataSource: config.years,
    index: 0,
    change: (val) => {
      $('#miscForm').addClass('loading');
      $('#miscLoading').show();
      const year = $('#yearSelector').val();
      setupPage(det_num, year);
    },
  });

  const { map, view, highlightDetector } = await addMap({
    target: 'viewDiv',
    detectorLayer: {
      renderer: 'default',
      popup: false,
      label: true,
      definitionExpression: `det_num =${det_num}`,
    },
    corridorLayer: {
      visible: false,
    },
    legend: false,
    home: true,
    yearSelector: false,
  });
});
