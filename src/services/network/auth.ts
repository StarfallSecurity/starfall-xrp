import { LoginRequestPayload } from 'types/auth';
import { envUrl } from '../../constants';
import instance from './api';

export const loginUser = async (paylod: LoginRequestPayload) => {
  try {
    const response = await instance.post(`${envUrl}auth-token/`, paylod);

    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchUser = async () => {
  try {
    const response = await instance.get(`${envUrl}api/users/me/`);

    return response?.data;
  } catch (error) {
    throw error;
  }
};
