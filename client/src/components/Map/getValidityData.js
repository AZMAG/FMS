import axios from 'axios';
async function getValidityData() {
  const res = await axios.get('http://magdevarcgis/fms/Home/GetValidityData');
  console.log(res.data);
  return res.data;
}

export default getValidityData;
