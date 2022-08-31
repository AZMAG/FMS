import axios from 'axios';
async function getDetectors() {
  const res = await axios.get('http://magdevarcgis/fms/Detector/GetDetectors');
  return res.data;
}

export default getDetectors;
