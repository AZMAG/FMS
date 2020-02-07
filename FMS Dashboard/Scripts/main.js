require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/Legend"
], function(Map, MapView, FeatureLayer, Legend) {

    const map = new Map({
        basemap: "gray"
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        extent: config.initExtent,
        ui: {
            components: []
        },
        popup: {
            collapseEnabled: false,
            dockOptions: {
                buttonEnabled: false
            }
        }
    });

    window.view = view;
    const fl = new FeatureLayer({
        url: config.detector_url,
        popupTemplate: {
            title: "FMS Detector Locations",
            content: `
            <h5 class="detectorNumber">Detector: <a class="link" href="./Detector?det_num={det_num}">{det_num}</a></h5>
            <div class="detectorDescription">
                <small>Location: {Location}</small>
            </div>
            <table class="table validityTable table-sm">
                <thead class="thead-light">
                    <tr>
                        <th scope="col">Year</th>
                        <th scope="col">Validity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">2019</th>
                        <td>87%</td>
                    </tr>
                    <tr>
                        <th scope="row">2018</th>
                        <td>84%</td>
                    </tr>
                    <tr>
                        <th scope="row">2017</th>
                        <td>75%</td>
                    </tr>
                    <tr>
                        <th scope="row">2016</th>
                        <td>89%</td>
                    </tr>
                    <tr>
                        <th scope="row">2015</th>
                        <td>20%</td>
                    </tr>
                </tbody>
            </table>
            `,
            actions: [{
                title: "Report",
                id: "open-detector-page",
                className: "esri-icon-launch-link-external"
            }]
        },
        renderer: {
            type: "class-breaks",
            field: "det_num",
            classBreakInfos: [{
                minValue: 0,
                maxValue: 100,
                symbol: {
                    type: "simple-marker",
                    style: "circle",
                    color: "red",
                    size: "10px",
                    outline: {
                        width: 0
                    }
                },
                label: "0-20%"
            }, {
                minValue: 100,
                maxValue: 200,
                symbol: {
                    type: "simple-marker",
                    style: "circle",
                    color: "orange",
                    size: "10px",
                    outline: {
                        width: 0
                    }
                },
                label: "20-40%"
            }, {
                minValue: 200,
                maxValue: 300,
                symbol: {
                    type: "simple-marker",
                    style: "circle",
                    color: "yellow",
                    size: "10px",
                    outline: {
                        width: 0
                    }
                },
                label: "40-60%"
            }, {
                minValue: 300,
                maxValue: 400,
                symbol: {
                    type: "simple-marker",
                    style: "circle",
                    color: "lightgreen",
                    size: "10px",
                    outline: {
                        width: 0
                    }
                },
                label: "60-80%"
            }, {
                minValue: 400,
                maxValue: 1000,
                symbol: {
                    type: "simple-marker",
                    style: "circle",
                    color: "green",
                    size: "10px",
                    outline: {
                        width: 0
                    }
                },
                label: "80-100%"
            }]
        }
    });

    // view.popup.alignment = "top-right";

    view.popup.watch("visible", function(val) {
        if (val) {
            // view.popup.reposition();
            // view.goTo(view.popup.selectedFeature);
        }
    });

    view.popup.on("trigger-action", function(event) {
        const attr = event.target.selectedFeature.attributes;
        if (event.action.id === "open-detector-page") {
            const detNum = attr['det_num'];
            OpenDetectorPage(detNum);
        }
    });

    function OpenDetectorPage(detNum) {
        window.location.href = `./Detector?det_num=${detNum}`;
    }

    const legend = new Legend({ view });

    view.ui.add(legend, "bottom-left");

    view.watch('stationary', function () {
        if (view.popup.visible) {
            view.popup.reposition();
        }
    });

    map.add(fl);

});