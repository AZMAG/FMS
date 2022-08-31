import axios from 'axios';
async function getDetectors() {
  const res = await axios.get('http://localhost:56118/Detector/GetDetectors');
  return res.data;
}

export default getDetectors;
