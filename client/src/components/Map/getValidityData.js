import axios from 'axios';
async function getValidityData() {
  const res = await axios.get('http://localhost:56118/Home/GetValidityData');
  console.log(res.data);
  return res.data;
}

export default getValidityData;
