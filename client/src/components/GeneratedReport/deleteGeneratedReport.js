import { apiUrl } from "../../DocConfig";
import axios from "axios";
axios.defaults.withCredentials = true;

async function deleteGeneratedReport(id) {
    const deleteUrl = apiUrl + "/Reports/DeleteGeneratedReport";
    const res = await axios.get(deleteUrl, {
        params: {
            id,
        },
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.data;
}

export default deleteGeneratedReport;
