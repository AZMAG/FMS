import Graphic from "@arcgis/core/Graphic";
import axios from "axios";
import { v4 as uuid } from "uuid";

axios.defaults.withCredentials = true;

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
    toggleAllAnalysisOptions(val) {
        const analysisKeys = Object.keys(this.analysisOptions);
        return analysisKeys.forEach((key) => {
            this.analysisOptions[key] = val;
        });
    },
    anyAnalysisOptionSelected() {
        if (this.analysisOptions) {
            const analysisKeys = Object.keys(this.analysisOptions);
            return analysisKeys.some((key) => {
                return this.analysisOptions[key];
            });
        }
        return false;
    },
    setAnalysisOption(key, val) {
        this.analysisOptions[key] = val;
    },
    timePeriodYear1: "",
    setTimePeriodYear(timePeriod, year) {
        this["timePeriodYear" + timePeriod] = year;
    },
    timePeriodYear2: "",
    startDate1: "",
    startDate2: "",
    setStartDate(timePeriod, date) {
        this["startDate" + timePeriod] = date;
    },
    endDate1: "",
    endDate2: "",
    setEndDate(timePeriod, date) {
        this["endDate" + timePeriod] = date;
    },
    validated: false,
    setValidated(val) {
        this.validated = val;
    },
    checkValidity() {
        this.setValidated(true);
        if (
            this.anyAnalysisOptionSelected() &&
            this.selectedDetector &&
            this.isTimePeriodValid(1) &&
            this.isTimePeriodValid(2)
        ) {
            return true;
        }
        return false;
    },
    resetQueryBuilder() {
        this.setSelectedDetector(null);
        this.setTimePeriodYear(1, "");
        this.setTimePeriodYear(2, "");
        this.setStartDate(1, "");
        this.setStartDate(2, "");
        this.setEndDate(1, "");
        this.setEndDate(2, "");
        this.toggleAllAnalysisOptions(false);
        this.setValidated(false);
    },
    anyChanges() {
        if (this.anyAnalysisOptionSelected()) {
            return true;
        }

        if (this.selectedDetector) {
            return true;
        }

        if (this.timePeriodYear1 !== "") {
            return true;
        }
        if (this.timePeriodYear2 !== "") {
            return true;
        }
        if (this.startDate1 !== "") {
            return true;
        }
        if (this.startDate2 !== "") {
            return true;
        }
        if (this.endDate1 !== "") {
            return true;
        }
        if (this.endDate2 !== "") {
            return true;
        }
        if (this.validated) {
            return true;
        }

        return false;
    },
    isTimePeriodValid(timePeriod) {
        if (this["timePeriodYear" + timePeriod] !== "") {
            return true;
        }

        const startDate = this["startDate" + timePeriod];
        const endDate = this["endDate" + timePeriod];

        if (startDate !== "" && endDate !== "") {
            return true;
        }
        return false;
    },
    submitModalShown: false,
    setSubmitModalShown(val) {
        this.submitModalShown = val;
    },
    async addGenereatedReport() {
        function formatDate(val) {
            if (val === "") {
                return "";
            } else {
                const tempDate = new Date(val);
                tempDate.setDate(tempDate.getDate() + 1);
                const yyyy = tempDate.getFullYear();
                let mm = tempDate.getMonth() + 1;
                let dd = tempDate.getDate();
                return `${mm}/${dd}/${yyyy}`;
            }
        }

        // const url = "http://localhost:56118/Reports/AddGeneratedReport";
        const url = "http://magdevarcgis/fms/Reports/AddGeneratedReport";
        const data = {
            id: uuid(),
            ...this.analysisOptions,
            det_num: this.selectedDetector.detector.det_num,
            timePeriodYear1: this.timePeriodYear1,
            timePeriodYear2: this.timePeriodYear2,
            startDate1: formatDate(this.startDate1),
            startDate2: formatDate(this.startDate2),
            endDate1: formatDate(this.endDate1),
            endDate2: formatDate(this.endDate2),
            completed: false,
            date_submitted: new Date(),
        };

        const res = await axios.post(url, JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return res;
    },
};

export default queryBuilderData;
