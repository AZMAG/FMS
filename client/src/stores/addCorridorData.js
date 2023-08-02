import axios from "axios";
import { apiUrl } from "../DocConfig";

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
    sketchLayer: null,
    setSketchLayer(sketchLayer) {
        this.sketchLayer = sketchLayer;
    },
    selectedDirection: "All",
    setSelectedDirection(dir) {
        this.selectedDirection = dir;
        if (dir === "All") {
            this.detectorsLayer.definitionExpression = "";
            return;
        } else {
            this.detectorsLayer.definitionExpression = `Direction = '${dir}'`;
        }
    },
    corridorName: "",
    setCorridorName(name) {
        this.corridorName = name;
    },
    corridorDescription: "",
    setCorridorDescription(desc) {
        this.corridorDescription = desc;
    },
    reset() {
        this.corridorName = "";
        this.corridorDescription = "";
        this.sketchLayer.removeAll();
    },
    async submit(detectors) {
        const url = apiUrl + "/Corridors/AddNew";
        const data = {
            corridorName: this.corridorName,
            corridorDescription: this.corridorDescription,
            detectorNumbers: detectors.map((d) => d.attributes.det_num),
        };
        const res = await axios.post(url, JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json",
            },
        });
        this.reset();
        alert("done");
    },
};
export default detectorMapData;
