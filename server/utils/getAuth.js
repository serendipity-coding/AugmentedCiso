import axios from 'axios';
const api = axios.create({
  baseURL: 'https://tt.augmentedciso.com'
});

const getAuth = async () => {
  const response = await api.post(`/register`, {
    email: 'hello@hotmail.fr',
    name: 'patate'
  });
  const token = response.data.token;
  return token;
};

export default getAuth;
