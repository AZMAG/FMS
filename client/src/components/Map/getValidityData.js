import axios from 'axios';
async function getValidityData() {
  const res = await axios.get('http://magdevarcgis/fmsHome/GetValidityData');
  console.log(res.data);
  return res.data;
}

export default getValidityData;
