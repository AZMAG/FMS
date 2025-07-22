import axios from "axios";
import { apiUrl } from "../../DocConfig";

async function getDetectors() {
    const res = await axios.get(apiUrl + "/Detector/GetDetectors");
    const unknownSegment = [];
    //console.log("getDetectors response", res.data);
    for (const detector of res.data) {
        if (detector.Segment == null) {
            unknownSegment.push(detector.det_num);
        }
    }
    //console.log("Detectors with unknown segments:", unknownSegment);
    return res.data;
}

export default getDetectors;
