import axios from 'axios';
import { envUrl } from '../../constants';

const instance = axios.create({
  baseURL: envUrl
});

export const setAuthToken = (apiInstance = instance, token = import.meta.env.VITE_AUTH_TOKEN) => {
  apiInstance.defaults.headers.common.Authorization = `Token ${token}`;
};

export const removeAuthToken = (apiInstance = instance, token: string) => {
  delete apiInstance.defaults.headers.common.Authorization;
};

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    throw error;
  }
);

export default instance;
