const detectorMapData = {
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
    selectedRoute: "All",
    setSelectedRoute(route) {
        this.selectedRoute = route;
        this.updateDefExpression();
    },
    selectedYear: 2021,
    setSelectedYear(year) {
        const newRenderField = `Validity${year}`;
        this.detectorsLayer.renderer.field = newRenderField;
        this.selectedYear = year;
        this.updateDefExpression();
    },
    getDefExpression() {
        const terms = ["1=1"]; //`Validity${this.selectedYear} is not null`
        if (this.selectedRoute !== "All") {
            terms.push(`Route = '${this.selectedRoute}'`);
        }
        if (this.selectedDirection !== "All") {
            terms.push(`Direction = '${this.selectedDirection}'`);
        }
        return terms.join(" AND ");
    },
    updateDefExpression() {
        const defExpression = this.getDefExpression();
        this.detectorsLayer.definitionExpression = defExpression;
    },
    selectedDirection: "All",
    setSelectedDirection(dir) {
        this.selectedDirection = dir;
        this.updateDefExpression();
    },
    labelsVisible: true,
    toggleLabels() {
        this.labelsVisible = !this.labelsVisible;
        this.detectorsLayer.labelsVisible = this.labelsVisible;
    },
    noDataAvailableShown: true,
    toggleNoDataAvailableShown() {
        this.noDataAvailableShown = !this.noDataAvailableShown;
        if (this.noDataAvailableShown) {
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
};

export default detectorMapData;
