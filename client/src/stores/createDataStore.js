import { makeAutoObservable } from "mobx";

export function createDataStore() {
    return makeAutoObservable({
        view: null,
        setView(view) {
            this.view = view;
        },
        map: null,
        setMap(map) {
            this.map = map;
        },
        detectorsLayer: null,
        setDetectorsLayer(detLayer) {
            this.detectorsLayer = detLayer;
        },
        graphicsLayer: null,
        setGraphicsLayer(gfxLayer) {
            this.graphicsLayer = gfxLayer;
        },
        selectedRoute: "All",
        setSelectedRoute(route) {
            this.selectedRoute = route;
            this.updateDetectorDefinitionExpression();
        },
        selectedYear: 2021,
        setSelectedYear(year) {
            const newRenderField = `Validity${year}`;
            this.detectorsLayer.renderer.field = newRenderField;
            this.selectedYear = year;
            this.updateDetectorDefinitionExpression();
        },
        updateDetectorDefinitionExpression() {
            const terms = ["1=1"]; //`Validity${this.selectedYear} is not null`

            if (this.selectedRoute !== "All") {
                terms.push(`Route = '${this.selectedRoute}'`);
            }

            if (this.selectedDirection !== "All") {
                terms.push(`Direction = '${this.selectedDirection}'`);
            }
            const defExpression = terms.join(" AND ");
            this.detectorsLayer.definitionExpression = defExpression;
        },
        selectedDirection: "All",
        setSelectedDirection(dir) {
            this.selectedDirection = dir;
            this.updateDetectorDefinitionExpression();
        },
        detectorLabels: true,
        toggleDetectorLabels() {
            this.detectorLabels = !this.detectorLabels;
            this.detectorsLayer.labelsVisible = this.detectorLabels;
        },
        detectorNoDataShown: true,
        toggleNoDataShown() {
            this.detectorNoDataShown = !this.detectorNoDataShown;
            if (this.detectorNoDataShown) {
                this.detectorsLayer.renderer.defaultSymbol = {
                    type: "simple-marker",
                    style: "triangle",
                    size: "10px",
                    outline: {
                        width: 1,
                    },
                    color: "gray",
                };
            } else {
                this.detectorsLayer.renderer.defaultSymbol = null;
                this.detectorsLayer.renderer.defaultLabel = null;
            }
        },
        mapLoaded: false,
    });
}
