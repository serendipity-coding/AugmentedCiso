import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1/'
});

const token = sessionStorage.getItem('minRisk-token');
export const assess = () => {
  return api.get(`/assess/${token}`);
};

const indexApis = { assess };

export default indexApis;
