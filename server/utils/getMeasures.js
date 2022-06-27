import axios from 'axios';
// utils

const getMeasures = async (token) => {
  const response = await axios.get('https://tt.augmentedciso.com/measure', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const measures = response.data;

  return measures;
};

export default getMeasures;
