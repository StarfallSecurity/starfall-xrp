import { envUrl } from '../../constants';
import instance from './api';

export const fetchAPITokens = async (page: number) => {
  try {
    const response = await instance.get(`${envUrl}api/tokens/`, {
      params: {
        page
      }
    });

    const { count, next, previous, results } = (response as any) || {};

    return results;
  } catch (error) {
    console.error(error);
  }
};
