import { envUrl } from '../../constants';
import instance from './api';

export const fetchWalletsData = async (page: number, pageSize: number) => {
  try {
    const response = await instance.get(`${envUrl}api/address_lookups/`, {
      params: {
        page: page,
        page_size: pageSize
      }
    });

    const { count, next, previous, results } = (response as any) || {};

    return results;
  } catch (error) {
    console.error(error);
  }
};

export const fetchWalletPrediction = async (address: string) => {
  try {
    const response = await instance.get(`${envUrl}api/final_predictions/${address}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
