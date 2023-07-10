import axios from 'axios';
import { envUrl } from '../../constants';

const instance = axios.create({
  baseURL: envUrl
});

export const setAuthToken = (apiInstance = instance, token = import.meta.env.VITE_AUTH_TOKEN) => {
  apiInstance.defaults.headers.common.Authorization = `Token d4c61ef5657782f17bd093856dba821b1d86b955`;
};

export const removeAuthToken = (apiInstance = instance, token: string) => {
  delete apiInstance.defaults.headers.common.Authorization;
};

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    throw error;
  }
);

export default instance;
