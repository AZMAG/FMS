import axios from "axios";

const url = "http://magdevarcgis/fms/Reports/GetGeneratedReports";
async function getGeneratedReports() {
    const res = await axios.get(url);
    return res.data;
}

export default getGeneratedReports;
