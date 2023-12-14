import Graphic from "@arcgis/core/Graphic";
import PolyLine from "@arcgis/core/geometry/Polyline";
import axios from "axios";
import { apiUrl } from "../DocConfig";
import { v4 as uuid } from "uuid";

axios.defaults.withCredentials = true;

const queryBuilderData = {
    emailRequested: false,
    setEmailRequested(val) {
        this.emailRequested = val;
    },
    email: "",
    setEmail(val) {
        this.email = val;
    },
    emailError: false,
    setEmailError(val) {
        this.emailError = val;
    },
    reportType: "detector",
    setReportType(val) {
        if (val === "corridor") {
            this.corridorsLayer.visible = true;
            this.detectorsLayer.visible = false;
        }
        if (val === "detector") {
            this.corridorsLayer.visible = false;
            this.detectorsLayer.visible = true;
        }
        this.reportType = val;
    },
    corridorsLayer: null,
    setCorridorsLayer(corridorsLayer) {
        this.corridorsLayer = corridorsLayer;
    },
    selectedCorridor: null,
    setSelectedCorridor(newSelected) {
        this.selectedCorridor = newSelected;
        let corridorGraphic = null;

        if (newSelected) {
            const combinedCorridor = new PolyLine();
            newSelected.corridor.Detectors.forEach((detector) => {
                combinedCorridor.addPath(JSON.parse(detector.Segment));
            });

            corridorGraphic = new Graphic({
                geometry: {
                    type: "polyline",
                    paths: combinedCorridor.paths,
                },
                attributes: {
                    ...newSelected.corridor,
                },
            });
        }

        this.zoomToSelectedCorridor(corridorGraphic);
        this.addCorridorDetectorGraphics(newSelected);
        // this.highlightSelectedDetector();
        // this.resetTimePeriodData();

        // if (this.selectedDetector) {
        //     this.detectorsLayer.definitionExpression = `det_num = ${this.selectedDetector.detector.det_num}`;
        // } else {
        //     this.detectorsLayer.definitionExpression = "1=1";
        // }
    },
    addCorridorDetectorGraphics(newSelected) {
        if (newSelected) {
            const detectorNums = newSelected.corridor.Detectors.map(
                (detector) => {
                    return detector.det_num;
                }
            );
            this.detectorsLayer.definitionExpression = `det_num in (${detectorNums.join(
                ","
            )})`;
            this.detectorsLayer.visible = true;
            // this.graphicsLayer.removeAll();
        } else {
            this.detectorsLayer.definitionExpression = "1=1";
            // this.graphicsLayer.removeAll();
        }
    },
    zoomToSelectedCorridor(corridorGraphic) {
        if (corridorGraphic) {
            this.view.goTo(corridorGraphic);
        } else {
            this.view.goTo({ center: [-112.024, 33.541], zoom: 9 });
        }
    },
    selectedDetector: null,
    setSelectedDetector(newSelected) {
        this.selectedDetector = newSelected;
        this.zoomToSelectedDetector();
        this.highlightSelectedDetector();
        this.resetTimePeriodData();

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
    resetTimePeriodData(timePeriod) {
        this.setStartDate(timePeriod, "");
        this.setEndDate(timePeriod, "");
    },
    startDate: "",
    setStartDate(date) {
        this.startDate = date;
    },
    endDate: "",
    setEndDate(date) {
        this.endDate = date;
    },
    validated: false,
    setValidated(val) {
        this.validated = val;
    },
    checkValidity() {
        this.setValidated(true);
        if (
            (this.selectedDetector || this.selectedCorridor) &&
            this.isTimePeriodValid()
        ) {
            return true;
        }
        return false;
    },
    resetQueryBuilder() {
        this.setSelectedDetector(null);
        this.resetTimePeriodData();
        this.setValidated(false);
    },
    anyChanges() {
        if (this.selectedDetector) {
            return true;
        }
        if (this.selectedCorridor) {
            return true;
        }

        if (this.startDate !== "") {
            return true;
        }
        if (this.endDate !== "") {
            return true;
        }
        if (this.validated) {
            return true;
        }

        return false;
    },
    isTimePeriodValid(timePeriod) {
        if (!this.isTwoTimePeriods && timePeriod === 2) {
            return true;
        }
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
    async addGeneratedReport() {
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

        const url = apiUrl + "/Reports/AddGeneratedReport";

        const data = {
            id: uuid(),
            ...this.analysisOptions,
            det_num: this.selectedDetector?.detector?.det_num,
            corridor_id: this.selectedCorridor?.corridor?.id,
            startDate: this.startDate,
            endDate: this.endDate,
            completed: false,
            email: this.email,
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
