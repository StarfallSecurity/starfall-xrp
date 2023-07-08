import { envUrl } from '../../constants';
import instance from './api';

export const fetchAPITokens = async (page: number) => {
  try {
    const response = await instance.get(`${envUrl}api/tokens/`, {
      params: {
        page
      }
    });

    const { count, next, previous, results } = (response?.data as any) || {};

    return results;
  } catch (error) {
    console.error(error);
  }
};

export const createApiToken = async (user: number) => {
  try {
    const response = await instance.post(`${envUrl}api/tokens/`, { user });

    return response?.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteApiToken = async (key: string) => {
  try {
    const response = await instance.delete(`${envUrl}api/tokens/${key}/`);
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
