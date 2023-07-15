import { WalletsResponse } from '../../types/wallets';
import { envUrl } from '../../constants';
import instance from './api';

export const fetchWalletsData = async (page: number, pageSize: number) => {
  try {
    const response = await instance.get<WalletsResponse>(`${envUrl}api/address_lookups/`, {
      params: {
        page: page,
        page_size: pageSize
      }
    });

    return response?.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchWalletByAddress = async (address: string) => {
  try {
    const response = await instance.get(`${envUrl}api/api_addresses_retrieve/${address}/`, {
      // params: {
      //   address: addr
      // }
    });
    console.log('response ', response);
    return response?.data;
  } catch (e) {}
};

export const fetchWalletPrediction = async (address: string) => {
  try {
    const response = await instance.get(`${envUrl}api/final_predictions/${address}/`);
    return response?.data;
  } catch (error) {
    console.error(error);
  }
};
