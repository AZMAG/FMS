import axios from "axios";
import { apiUrl } from "../../DocConfig";
async function getCorridorValidityData() {
    const res = await axios.get(apiUrl + "/Corridors/GetCorridorValidity");
    return res.data;
}

export default getCorridorValidityData;
