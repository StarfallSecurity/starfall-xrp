import axios from "axios";
import {envUrl} from "../constants";


export async function getNFTs() {
  try {
    const response = await axios.get(`${envUrl}api/nfts/get_nfts`);
    console.log('response  ', response)
    return response.data;
  } catch (error) {
    return [];
  }

}