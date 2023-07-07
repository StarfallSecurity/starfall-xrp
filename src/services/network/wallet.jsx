import { envUrl } from '../../constants';
import instance from './api';

export const fetchWalletsData = async (page, pageSize) => {
  try {
    const response = await instance.get(`${envUrl}api/address_lookups/`, {
      params: {
        page: page,
        page_size: pageSize
      }
    });

    const { count, next, previous, results } = response || {};
    console.log('response ', response);

    return results;
  } catch (error) {
    console.error(error);
    return data;
  }
};
