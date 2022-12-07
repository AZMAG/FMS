import axios from "axios";
import { apiUrl } from "../../DocConfig";

async function getDetectors() {
    const res = await axios.get(apiUrl + "/Detector/GetDetectors");
    return res.data;
}

export default getDetectors;
