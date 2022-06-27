import axios from 'axios';
// utils
import getAuth from '../utils/getAuth.js';

const play = async (token, payload) => {
  const response = await axios.post(
    'https://tt.augmentedciso.com/play',
    payload,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  const result = response.data;

  return result;
};

export default play;
