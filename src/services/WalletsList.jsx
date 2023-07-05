import axios from "axios";

import {envUrl} from "../constants";

export const fetchWalletsData = async (page, pageSize) => {
    try {
        const response = await axios.get(`${envUrl}api/address_lookups/`, {
          params: {
            page: page,
            page_size: pageSize
          }
        });
  
        const { count, next, previous, results } = response.data || {};
        return results
      } catch (error) {
        console.error(error);
      }
  };
  