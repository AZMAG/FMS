(async () => {
  let submitted = false;
  const { map, view, highlightDetector, highlightCorridor } = await addMap({
    target: "viewDiv",
    detectorLayer: {
      renderer: "default",
      popup: false,
      label: true,
    },
    corridorLayer: {
      renderer: "default",
      popup: false,
      label: true,
      visible: false,
    },
    legend: false,
    home: true,
    yearSelector: false,
  });
  setupDetectorDropdown();
  setupCorridorDropdown();

  var validator = $("#qbForm")
    .kendoValidator({
      validate: function (e) {
        submitted = true;

        // Setting required here to avoid the error from popping up before the form is submitted
        $(".dropDownContainer:visible").find("select").prop("required", true);

        if (!isAnalysisChosen()) {
          $("#atLeastOneAnalysis").show();
        } else {
          $("#atLeastOneAnalysis").hide();
        }
        let timeValues = getTimeData();
        let { date1, date2 } = isTimePeriodValid(timeValues);

        if (date1.valid === false) {
          $("#date1Error")
            .html(`<span class="k-icon k-i-warning"> </span>${date1.message}`)
            .show();
        } else {
          $("#date1Error").hide();
        }
        if (date2.valid === false) {
          $("#date2Error")
            .html(`<span class="k-icon k-i-warning"> </span>${date2.message}`)
            .show();
        } else {
          $("#date2Error").hide();
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
    if (widget.value() === "") {
      view.extent = config.initExtent;
    }
    highlightDetector(val);
  }

  function corridorDropdownChanged(e) {
    var widget = e.sender;
    let val = widget.value();
    if (val && widget.select() === -1) {
      widget.value("");
    }
    if (widget.value() === "") {
      view.extent = config.initExtent;
    }
    highlightCorridor(val);
  }

  function getTimeData() {
    return {
      year1: $("input[name='year1']").val(),
      start1: $("input[name='start1']").val(),
      end1: $("input[name='end1']").val(),
      year2: $("input[name='year2']").val(),
      start2: $("input[name='start2']").val(),
      end2: $("input[name='end2']").val(),
    };
  }

  function getTimePeriodValidObj({ year, start, end }) {
    let rtnObj = { valid: true, message: "" };
    if (year === "" && start === "" && end === "") {
      rtnObj.valid = false;
      rtnObj.message = "Please enter either a year or a date range.";
    } else {
      if (year !== "" && (start !== "" || end !== "")) {
        rtnObj.valid = false;
        rtnObj.message = "Please choose either a year or a date range.";
      } else {
        if (year) {
          try {
            let nyear = Number(year);
            if (!config.years.includes(nyear)) {
              rtnObj.valid = false;
              rtnObj.message = `The year ${year} is not available.  Please try one of these years: ${config.years.join(
                ", "
              )}`;
            }
          } catch (error) {
            rtnObj.valid = false;
            rtnObj.message = "Please enter valid year.";
          }
        } else {
          if (start === "" || end === "") {
            rtnObj.valid = false;
            rtnObj.message =
              "The start date and end date both need to be included.";
          }
          const dateStart = Date.parse(start);
          const dateEnd = Date.parse(end);
          if (dateStart > dateEnd) {
            rtnObj.valid = false;
            rtnObj.message = "The end date needs to be after the start date.";
          }
        }
      }
    }
    return rtnObj;
  }

  function isTimePeriodValid({ year1, start1, end1, year2, start2, end2 }) {
    let date1 = getTimePeriodValidObj({
      year: year1,
      start: start1,
      end: end1,
    });

    let date2 = getTimePeriodValidObj({
      year: year2,
      start: start2,
      end: end2,
    });

    if (date1.valid && date2.valid) {
      if (
        (year1 === year2 && year1 !== "") ||
        (start1 !== "" && start1 === start2 && end1 === end2)
      ) {
        date2.valid = false;
        date2.message = "The two time periods need to be different";
      }
    }

    return { date1, date2 };
  }

  function isAnalysisChosen() {
    return $("#qbForm").find("input.custom-control-input:checked").length > 0;
  }

  $("#qbForm").submit(function (e) {
    let valid = validator.validate();
    let analysisChosen = isAnalysisChosen();
    let timeValues = getTimeData();
    let { date1, date2 } = isTimePeriodValid(timeValues);

    if (!valid || !analysisChosen || !date1.valid || !date2.valid) {
      e.preventDefault();
    } else {
      $('input[name ="det_num_input"').removeAttr("name");
      $('input[name ="corridor_id_input"').removeAttr("name");
    }
  });

  $("#qbForm")
    .find("input")
    .change((e) => {
      if (submitted) {
        validator.validate();
      }
    });

  async function getCorridorData() {
    const corridorLayer = map.findLayerById("corridors");
    const res = await corridorLayer.queryFeatures();
    let added = {};
    let data = [];
    res.features.forEach(({ attributes }) => {
      const { Name, Year, id } = attributes;
      if (!added[id]) {
        data.push({ id, text: `${Name} (${Year})` });
      }
      added[id] = true;
    });
    return data;
  }

  async function getDetData() {
    const detLayer = map.findLayerById("detectors");
    const res = await detLayer.queryFeatures();
    return res.features
      .map(({ attributes }) => {
        const { det_num, Location } = attributes;
        return { det_num, text: `${det_num} (${Location})` };
      })
      .sort((a, b) => Number(a.det_num) - Number(b.det_num));
  }

  async function setupCorridorDropdown() {
    const ds = await getCorridorData();

    let combobox = $("#corridor_id")
      .kendoComboBox({
        dataSource: ds,
        dataTextField: "text",
        dataValueField: "id",
        placeholder: "Select corridor...",
        filter: "contains",
        suggest: true,
        value: "",
        index: 3,
        change: corridorDropdownChanged,
      })
      .data("kendoComboBox");
    combobox.value("");
    return combobox;
  }
  async function setupDetectorDropdown() {
    const det_nums = await getDetData();

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
    return combobox;
  }

  $('[data-toggle="tooltip"]').tooltip();

  $(".btnType").click((e) => {
    let type = $(e.currentTarget).data("val");
    $(".btnType")
      .removeClass("btn-primary btn-secondary")
      .addClass("btn-secondary");
    $(e.currentTarget).removeClass("btn-secondary").addClass("btn-primary");

    let $allContainers = $(".dropDownContainer");
    $allContainers.hide();
    $allContainers.find("select").prop("required", false);

    let $container = $(`.${type}Container`);
    $container.css("display", "flex");

    map.layers.forEach((lyr) => {
      lyr.visible = false;
    });

    view.extent = config.initExtent;
    let layer = map.findLayerById(`${type}s`);
    layer.visible = true;

    validator.hideMessages();

    let detectorCbox = $("#det_num").data("kendoComboBox");
    detectorCbox.value("");
    highlightDetector(null);

    let corridorCbox = $("#corridor_id").data("kendoComboBox");
    corridorCbox.value("");
    highlightCorridor(null);
    submitted = false;
  });
})();
