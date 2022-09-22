import Graphic from "@arcgis/core/Graphic";
const queryBuilderData = {
    selectedDetector: null,
    setSelectedDetector(newSelected) {
        this.selectedDetector = newSelected;
        this.zoomToSelectedDetector();
        this.highlightSelectedDetector();

        if (this.selectedDetector) {
            this.detectorsLayer.definitionExpression = `det_num = ${this.selectedDetector.detector.det_num}`;
        } else {
            this.detectorsLayer.definitionExpression = "1=1";
        }
    },
    highlightSelectedDetector() {
        if (this.selectedDetector) {
            function getAngle(dir) {
                const angleLookup = { EB: 90, WB: -90, SB: 180, NB: 0 };
                return angleLookup[dir];
            }

            const detectorHighlightGraphic = new Graphic({
                geometry: {
                    type: "point",
                    x: this.selectedDetector.detector.x,
                    y: this.selectedDetector.detector.y,
                },
                symbol: {
                    angle: getAngle(this.selectedDetector.detector.Direction),
                    type: "simple-marker",
                    color: [0, 255, 255, 0.5],
                    style: "triangle",
                    size: "12px",
                    outline: {
                        color: [0, 255, 255, 0.8],
                        width: 2,
                    },
                },
            });

            this.graphicsLayer.removeAll();
            this.graphicsLayer.add(detectorHighlightGraphic);

            if (this.selectedDetector.detector.Segment) {
                const detectorSegmentHighlightGraphic = new Graphic({
                    geometry: {
                        type: "polyline",
                        paths: [
                            JSON.parse(this.selectedDetector.detector.Segment),
                        ],
                    },
                    symbol: {
                        type: "simple-line",
                        color: [0, 255, 255, 0.7],
                        width: 5,
                    },
                });
                this.graphicsLayer.add(detectorSegmentHighlightGraphic);
            }
        } else {
            this.view.goTo({ center: [-112.024, 33.541], zoom: 9 });
            this.graphicsLayer.removeAll();
        }
    },
    zoomToSelectedDetector() {
        if (this.selectedDetector) {
            this.view.goTo({
                center: [
                    this.selectedDetector.detector.x,
                    this.selectedDetector.detector.y,
                ],
                zoom: 13,
            });
        } else {
            this.view.goTo({ center: [-112.024, 33.541], zoom: 9 });
        }
    },
    map: null,
    setMap(map) {
        this.map = map;
    },
    view: null,
    setView(view) {
        this.view = view;
    },
    detectorsLayer: null,
    setDetectorsLayer(detLayer) {
        this.detectorsLayer = detLayer;
    },
    graphicsLayer: null,
    setGraphicsLayer(gfxLayer) {
        this.graphicsLayer = gfxLayer;
    },
    analysisOptions: {
        AHAS: false,
        AHATPL: false,
        AHAOP: false,
        AAL: false,
        DDPQCCD: false,
        DDPQCCW: false,
        AQCFHD: false,
        FVD: false,
        SVD: false,
        SVF: false,
    },
    setAnalysisOption(key, val) {
        this.analysisOptions[key] = val;
    },
};

export default queryBuilderData;
