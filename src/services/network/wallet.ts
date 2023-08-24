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

export const fetchWalletByAddress = async (address: string, blockchainName: string, recompute: boolean = false) => {
  try {
    let url = `${envUrl}api/addresses/${address}/`;
    const searchParams = new URLSearchParams();
    if (recompute) {
      searchParams.append('recompute', 'True');
    }
    if (blockchainName) {
      searchParams.append('blockchain_name', blockchainName);
    }
    url += `?${searchParams.toString()}`;
    const response = await instance.get(url);
    return response?.data;
  } catch (e) {
    throw e;
  }
};

export const fetchWalletPrediction = async (address: string) => {
  try {
    const response = await instance.get(`${envUrl}api/final_predictions/${address}/`);
    return response?.data;
  } catch (error) {
    console.error(error);
  }
};
