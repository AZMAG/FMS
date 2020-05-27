(async () => {
  const { map, view, highlightDetector } = await addMap({
    target: "viewDiv",
    detectorLayer: {
      renderer: "default",
      popup: false,
      // highlightDetector: 212,
      label: true,
    },
    legend: false,
    home: true,
    yearSelector: false,
  });
  setupDetectorDropdown();

  var validator = $("#qbForm")
    .kendoValidator({
      validate: function (e) {
        if (!isAnalysisChosen()) {
          $("#atLeastOneAnalysis").show();
        } else {
          $("#atLeastOneAnalysis").hide();
        }
      },
    })
    .data("kendoValidator");
  function detectorDropdownChanged(e) {
    var widget = e.sender;
    let val = widget.value();
    if (val && widget.select() === -1) {
      widget.value("");
    }
    validator.validate();
    highlightDetector(val);
  }

  function isTimePeriodValid() {
    return true;
  }

  function isAnalysisChosen() {
    return $("#qbForm").find("input.custom-control-input:checked").length > 0;
  }
  validator.on;

  $("#qbForm").submit(function (e) {
    let valid = validator.validate();
    let analysisChosen = isAnalysisChosen();

    if (!valid || !analysisChosen) {
      e.preventDefault();
    } else {
      $('input[name ="det_num_input"').removeAttr("name");
    }
  });

  $("#qbForm")
    .find(".custom-control-input")
    .change((e) => {
      validator.validate();
    });

  async function setupDetectorDropdown() {
    const det_nums = await getDetNums();

    let combobox = $("#det_num")
      .kendoComboBox({
        dataSource: det_nums,
        dataTextField: "text",
        dataValueField: "det_num",
        placeholder: "Select detector...",
        filter: "contains",
        suggest: true,
        value: "",
        index: 3,
        change: detectorDropdownChanged,
      })
      .data("kendoComboBox");
    combobox.value("");
  }
  async function getDetNums() {
    const detLayer = map.findLayerById("detectors");
    const res = await detLayer.queryFeatures();
    return res.features
      .map(({ attributes }) => {
        const { det_num, Location } = attributes;
        return { det_num, text: `${det_num} (${Location})` };
      })
      .sort((a, b) => Number(a.det_num) - Number(b.det_num));
  }
  $('[data-toggle="tooltip"]').tooltip();
})();
