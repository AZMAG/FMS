import axios from "axios";
import { apiUrl } from "../../DocConfig";

async function getGeneratedReports() {
    const res = await axios.get(apiUrl + "/Reports/GetGeneratedReports");
    return res.data;
}

export default getGeneratedReports;
