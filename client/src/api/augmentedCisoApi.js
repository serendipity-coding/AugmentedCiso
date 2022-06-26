import axios from 'axios';
const api = axios.create({
  baseURL: 'https://tt.augmentedciso.com/'
});

api.interceptors.request.use((config) => {
  config.headers.post.Authorization = `Bearer ${sessionStorage.getItem(
    'minRisk-token'
  )}`;
  config.headers.get.Authorization = `Bearer ${sessionStorage.getItem(
    'minRisk-token'
  )}`;
  config.headers.put.Authorization = `Bearer ${sessionStorage.getItem(
    'minRisk-token'
  )}`;
  config.headers.delete.Authorization = `Bearer ${sessionStorage.getItem(
    'minRisk-token'
  )}`;
  return config;
});

export const register = (payload) => {
  return api.post(`/register`, payload);
};
export const getMeasures = () => {
  return api.get(`/measure`);
};

export const getRisks = () => {
  return api.get(`/risk`);
};

export const assessRisk = (payload) => {
  return api.post('/play', payload);
};

const apis = { register, getMeasures, assessRisk, getRisks };

export default apis;
