import axios from 'axios';
async function getDetectors() {
  const res = await axios.get('http://magdevarcgis/fmsDetector/GetDetectors');
  return res.data;
}

export default getDetectors;
