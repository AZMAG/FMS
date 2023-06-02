import axios from "axios";
import { apiUrl } from "../../DocConfig";

async function getCorridors() {
    const res = await axios.get(apiUrl + "/Corridors/GetCorridors");
    return res.data;
}

export default getCorridors;
