async function GetCorridorValidity(detectorList) {
  const rawResponse = await fetch(
    `/Corridors/GetCorridorValidity?detectorList=${detectorList.join(',')}`
  );
  const content = await rawResponse.json();
  return content;
}

$(async function () {
  const { map, view, Graphic } = await addMap({
    target: 'viewDiv',
    detectorLayer: {
      renderer: 'validity',
      label: true,
    },
    legend: false,
    yearSelector: true,
    popup: false,
  });

  const $yearSelect = $('#yearSelect');
  const defaultYear = $yearSelect.val();

  setupSelectPolygonTool();
  const detectorsLyrView = await getDetectorsLyrView();

  let $detectorsGrid = $('#detectorsGrid');
  $detectorsGrid.kendoGrid({
    sortable: true,
    height: 200,
    columns: [
      {
        field: 'Detector',
        title: 'Detector',
      },
      {
        field: 'Direction',
        title: 'Direction',
      },
      {
        field: 'Validity' + defaultYear,
        title: `Validity (${defaultYear})`,
        format: '{0:p1}',
      },
      {
        command: {
          text: 'Remove',
          click: function (e) {
            e.preventDefault();

            var grid = $detectorsGrid.data('kendoGrid');
            var row = $(e.currentTarget).closest('tr');
            var { Detector } = grid.dataItem(row);
            grid.removeRow(row);
            unhighlight(Detector, grid.dataSource.data());
          },
        },
        title: ' ',
        width: '120px',
      },
    ],
    noRecords: {
      template: `<div class="nodata">No detectors selected.  Please select some detectors on the map to get started.</div>`,
    },
    dataBound: function (e) {
      let selected = e.sender.dataSource._total;

      if ($('form').hasClass('was-validated')) {
        if (selected > 1) {
          $('#gridInvalid').hide();
          $detectorsGrid.removeClass('invalid').addClass('valid');
        } else {
          $('#gridInvalid').show();
          $detectorsGrid.addClass('invalid').removeClass('valid');
        }
      }

      $('#detCnt').html(selected);
    },
  });

  const angleLookup = {
    NB: 0,
    EB: 90,
    WB: -90,
    SB: 180,
  };

  async function doubleHighlight(det_num) {
    const res = await detectorsLyrView.queryFeatures({
      where: 'det_num = ' + det_num,
      returnGeometry: true,
    });
    const doubleHighlightLayer = map.findLayerById('doubleHighlightLayer');
    if (res.features.length > 0) {
      let feature = res.features[0];

      let graphic = new Graphic({
        geometry: feature.geometry,
        symbol: {
          type: 'simple-marker',
          style: 'triangle',
          color: [255, 255, 153, 0.75],
          size: '10px',
          outline: {
            width: 4,
            color: [255, 255, 153, 0.9],
          },
          angle: angleLookup[feature.attributes['Direction']],
        },
      });

      doubleHighlightLayer.removeAll();
      doubleHighlightLayer.add(graphic);
    }
  }

  $('body').on('mouseover', 'tr', (e) => {
    try {
      const grid = $detectorsGrid.data('kendoGrid');
      const row = $(e.currentTarget).closest('tr');
      const { Detector } = grid.dataItem(row);
      clearDoubleHighlight();
      doubleHighlight(Detector);
    } catch (error) {}
  });

  function clearDoubleHighlight() {
    const doubleHighlightLayer = map.findLayerById('doubleHighlightLayer');
    doubleHighlightLayer.removeAll();
  }

  $('body').on('mouseout', 'tr', (e) => {
    clearDoubleHighlight();
  });
  $('#addCorridor-container').on('mouseover', () => {
    clearDoubleHighlight();
  });
  $('#addCorridor-container').on('mouseout', () => {
    clearDoubleHighlight();
  });

  async function getDetectorsLyrView() {
    let detLayer = map.findLayerById('detectors');
    let lyrView = await view.whenLayerView(detLayer);
    return lyrView;
  }

  let highlight;
  async function selectFeatures(geometry) {
    const res = await detectorsLyrView.queryFeatures({ geometry });
    if (highlight) {
      highlight.remove();
    }
    highlight = detectorsLyrView.highlight(res.features);
    updateGrid(res.features);
  }

  async function unhighlight(unhighlight, currentlyHighlighted) {
    let newHighlightDetNums = currentlyHighlighted.reduce((detNums, curr) => {
      let { Detector } = curr;
      if (Detector !== unhighlight) {
        detNums.push(Detector);
      }
      return detNums;
    }, []);

    let detLayer = map.findLayerById('detectors');
    let oids = await detLayer.queryObjectIds({
      where: `det_num in(${newHighlightDetNums.join(', ')})`,
    });

    if (highlight) {
      highlight.remove();
    }
    highlight = detectorsLyrView.highlight(oids);
  }

  $yearSelect.change(() => {
    const year = $yearSelect.val();
    let grid = $detectorsGrid.data('kendoGrid');
    let columns = grid.columns;
    columns[2].field = 'Validity' + year;
    columns[2].title = `Validity (${year})`;
    grid.setOptions({
      columns,
    });
  });

  function updateGrid(features) {
    let grid = $detectorsGrid.data('kendoGrid');
    const data = features.map((feature) => {
      const { det_num, Direction } = feature.attributes;
      const rtnObj = {
        Detector: det_num,
        Direction,
      };

      config.years.forEach((year) => {
        rtnObj['Validity' + year] = feature.attributes['Validity' + year];
      });
      return rtnObj;
    });

    grid.setDataSource(data);
    grid.dataSource.read();
  }

  function setupSelectPolygonTool() {
    return new Promise(function (res, rej) {
      view.ui.add('select-by-polygon', 'bottom-left');

      require([
        'esri/widgets/Sketch/SketchViewModel',
        'esri/layers/GraphicsLayer',
      ], function (SketchViewModel, GraphicsLayer) {
        let graphicsLayer = new GraphicsLayer({
          id: 'graphicsLayer',
        });

        map.add(graphicsLayer);

        let doubleHighlightLayer = new GraphicsLayer({
          id: 'doubleHighlightLayer',
        });

        map.add(doubleHighlightLayer);

        let sketchViewModel = new SketchViewModel({
          view,
          layer: graphicsLayer,
        });

        $('#select-by-polygon').click((e) => {
          sketchViewModel.create('polygon');
        });
        sketchViewModel.on('create', function (e) {
          if (e.state === 'complete') {
            graphicsLayer.remove(e.graphic);
            selectFeatures(e.graphic.geometry);
          }
        });
        res();
      });
    });
  }

  function isGridValid() {
    let grid = $detectorsGrid.data('kendoGrid');
    let gridData = grid.dataSource.data();
    const gridValid = gridData.length > 1;
    if (gridValid) {
      return gridData;
    } else {
      return false;
    }
  }

  function isFormValid() {
    const form = $('form')[0];
    const formValid = form.checkValidity();
    return formValid;
  }

  $('#analyzeCorridorBtn').click(async (e) => {
    e.preventDefault();
    const formValid = isFormValid();
    const gridData = isGridValid();
    if (!gridData) {
      $('#gridInvalid').show();
      $detectorsGrid.addClass('invalid').removeClass('valid');
    } else {
      let detectorIds = gridData.map(({ Detector }) => Detector);
      let data = await GetCorridorValidity(detectorIds);
      //   let series = [];

      //     for (let i = 0; i < data.length; i++) {
      //         const row = data[i];
      //         series.push({
      //             name: row.year,
      //             data:
      //         })

      //     }

      $('#analyzeCorridorModal').modal('show');
      $('#analyzeCorridorModal').on('shown.bs.modal', function () {
        $('#validityChart').kendoChart({
          title: {
            text: 'Corridor validity % by month',
          },
          legend: {
            position: 'bottom',
          },
          seriesDefaults: {
            type: 'line',
            style: 'smooth',
          },
          series: [
            {
              name: 2015,
              data: [70, 80.5, 60, 20, 11, 15, 40, 80, 90, 40, 80.5, 60],
            },
            {
              name: 2016,
              data: [40, 80, 90, 40, 80.5, 60, 20, 70, 80.5, 60, 20, 11],
            },
            {
              name: 2017,
              data: [15, 40, 80, 90, 40, 70, 80.5, 60, 20, 11, 80.5, 60],
            },
            {
              name: 2018,
              data: [80, 90, 40, 80.5, 60, 70, 80.5, 60, 20, 11, 15, 40],
            },
          ],
          valueAxis: {
            labels: {
              format: '{0}%',
            },
            line: {
              visible: false,
            },
            axisCrossingValue: -10,
          },
          categoryAxis: {
            categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ],
            majorGridLines: {
              visible: false,
            },
            labels: {
              rotation: 'auto',
            },
          },
          responsive: true,
          tooltip: {
            visible: true,
            format: '{0}%',
            template: '#= series.name #: #= value #',
          },
        });
      });

      //   setTimeout(() => {
      //     $('#validityChart').data('kendoChart').resize();
      //   }, 50);
    }
  });

  $('#corridorForm').submit((e) => {
    e.preventDefault();
    const formValid = isFormValid();
    const gridData = isGridValid();

    if (!gridData) {
      $('#gridInvalid').show();
      $detectorsGrid.addClass('invalid').removeClass('valid');
    } else if (formValid) {
      let detectorNumbers = gridData.map((row) => row.Detector);
      let corridorName = $('#corridorName').val();
      let corridorDescription = $('#corridorDescription').val();
      submitCorridor({
        detectorNumbers,
        corridorName,
        corridorDescription,
      });
    }
    form.classList.add('was-validated');
  });

  async function submitCorridor(data) {
    const rawResponse = await fetch('./Corridors/AddNew', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const content = await rawResponse.json();
    if (content) {
      $('.successMessage').fadeIn(300, function () {
        var message = this;
        setTimeout(function () {
          $(message).fadeOut(500);
        }, 3000);
      });
      resetForm();
    }
  }

  function resetForm() {
    $('form')[0].reset();
    $('form').removeClass('was-validated');
    $detectorsGrid.removeClass('valid').removeClass('invalid');

    const grid = $detectorsGrid.data('kendoGrid');
    grid.setDataSource([]);
    if (highlight) {
      highlight.remove();
    }
  }
});
