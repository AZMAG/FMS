const corridorMapData = {
    view: null,
    setView(view) {
        this.view = view;
    },
    map: null,
    setMap(map) {
        this.map = map;
    },
    corridorLayer: null,
    setCorridorLayer(detLayer) {
        this.corridorLayer = detLayer;
    },
    selectedRoute: "All",
    setSelectedRoute(route) {
        this.selectedRoute = route;
        this.updateDefExpression();
    },
    selectedYear: 2022,
    setSelectedYear(year) {
        const newRenderField = `Validity${year}`;
        this.corridorLayer.renderer.field = newRenderField;
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
        this.corridorLayer.definitionExpression = defExpression;
    },
    selectedDirection: "All",
    setSelectedDirection(dir) {
        this.selectedDirection = dir;
        this.updateDefExpression();
    },
    labelsVisible: true,
    toggleLabels(val) {
        if (val !== null && val !== undefined) {
            this.labelsVisible = val;
        } else {
            this.labelsVisible = !this.labelsVisible;
        }

        this.corridorLayer.labelsVisible = this.labelsVisible;
    },
    noDataAvailableShown: true,
    toggleNoDataAvailableShown(val) {
        if (val !== null && val !== undefined) {
            this.noDataAvailableShown = val;
        } else {
            this.noDataAvailableShown = !this.noDataAvailableShown;
        }

        if (this.noDataAvailableShown) {
            this.corridorLayer.renderer.defaultSymbol = {
                type: "simple-marker",
                style: "triangle",
                size: "10px",
                outline: {
                    width: 1,
                },
                color: "gray",
            };
        } else {
            this.corridorLayer.renderer.defaultSymbol = null;
            this.corridorLayer.renderer.defaultLabel = null;
        }
    },
    mapLoaded: false,
    anyChanges() {
        if (this.selectedRoute !== "All") {
            return true;
        }

        if (this.selectedYear !== 2022) {
            return true;
        }

        if (this.selectedDirection !== "All") {
            return true;
        }

        if (this.labelsVisible !== true) {
            return true;
        }

        if (this.noDataAvailableShown !== true) {
            return true;
        }

        return false;
    },
    resetMapControls() {
        this.setSelectedRoute("All");
        this.setSelectedYear(2022);
        this.setSelectedDirection("All");
        this.toggleLabels(true);
        this.toggleNoDataAvailableShown(true);
    },
};

export default corridorMapData;
