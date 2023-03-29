import axios from "axios";
import { apiUrl } from "../../DocConfig";
async function getValidityData() {
    const res = await axios.get(apiUrl + "/Detector/GetValidityData");
    return res.data;
}

export default getValidityData;
