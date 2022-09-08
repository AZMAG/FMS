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
            const validityClause = `Validity${this.selectedYear} is not null`;

            if (this.selectedRoute === "All") {
                this.detectorsLayer.definitionExpression = validityClause;
            } else {
                console.log(
                    `${validityClause} AND Route = '${this.selectedRoute}'`
                );
                this.detectorsLayer.definitionExpression = `${validityClause} AND Route = '${this.selectedRoute}'`;
            }
        },
        mapLoaded: false,
    });
}
