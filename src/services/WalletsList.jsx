import axios from "axios";

import {envUrl} from "../constants";

const data = [
  {
      "id": 36654,
      "address": {
          "id": 81429,
          "name": "wallet",
          "hash": "0x0591a42188996397fc7cd6db729045146c37696c",
          "is_blacklist": true
      },
      "created": "2023-06-27T23:12:58.781668Z",
      "modified": "2023-06-27T23:12:58.781668Z",
      "user": 2
  },
  {
      "id": 36655,
      "address": {
          "id": 81874,
          "name": "wallet",
          "hash": "0xcdb26199db086d54f7b11e50ca4374b4dd9ce13f",
          "is_blacklist": true
      },
      "created": "2023-06-27T23:12:58.782301Z",
      "modified": "2023-06-27T23:12:58.782301Z",
      "user": 2
  },
  {
      "id": 36656,
      "address": {
          "id": 83559,
          "name": "wallet",
          "hash": "0x8b170540b63d2f826846f3c0b9e6410b08548ec3",
          "is_blacklist": true
      },
      "created": "2023-06-27T23:12:58.782781Z",
      "modified": "2023-06-27T23:12:58.782781Z",
      "user": 2
  },
  {
      "id": 36657,
      "address": {
          "id": 84777,
          "name": "wallet",
          "hash": "0x4f08932186ab86fad489e957409771e74484bfbe",
          "is_blacklist": true
      },
      "created": "2023-06-27T23:12:58.783223Z",
      "modified": "2023-06-27T23:12:58.783223Z",
      "user": 2
  },
  {
      "id": 36658,
      "address": {
          "id": 85379,
          "name": "wallet",
          "hash": "0xe30c6b5ecef9fd188394e21b3ecf60919b57d6c8",
          "is_blacklist": true
      },
      "created": "2023-06-27T23:12:58.783771Z",
      "modified": "2023-06-27T23:12:58.783771Z",
      "user": 2
  },
  {
      "id": 36659,
      "address": {
          "id": 86302,
          "name": "wallet",
          "hash": "0x59cd39bd79769561735dc8d597d143db23e207a1",
          "is_blacklist": true
      },
      "created": "2023-06-27T23:12:58.784273Z",
      "modified": "2023-06-27T23:12:58.784273Z",
      "user": 2
  },
  {
      "id": 36660,
      "address": {
          "id": 86351,
          "name": "wallet",
          "hash": "0x5b39067ee0309856edd13f23c9c1793f9fda1b4f",
          "is_blacklist": true
      },
      "created": "2023-06-27T23:12:58.785105Z",
      "modified": "2023-06-27T23:12:58.785105Z",
      "user": 2
  },
  {
      "id": 36661,
      "address": {
          "id": 87983,
          "name": "wallet",
          "hash": "0x896e2dbe60cf92b7209a1a57b1423f31c0a7f84e",
          "is_blacklist": true
      },
      "created": "2023-06-27T23:12:58.785562Z",
      "modified": "2023-06-27T23:12:58.785562Z",
      "user": 2
  },
  {
      "id": 36662,
      "address": {
          "id": 90170,
          "name": "wallet",
          "hash": "0xd0d68941509f4231c88e4c204df6bdca05cc6506",
          "is_blacklist": true
      },
      "created": "2023-06-27T23:12:58.786060Z",
      "modified": "2023-06-27T23:12:58.786060Z",
      "user": 2
  },
  {
      "id": 36663,
      "address": {
          "id": 91303,
          "name": "wallet",
          "hash": "0xff96c1a8cd66ea0db71908e8c6e47cb39baec608",
          "is_blacklist": true
      },
      "created": "2023-06-27T23:12:58.786632Z",
      "modified": "2023-06-27T23:12:58.786632Z",
      "user": 2
  }
]

export const fetchWalletsData = async (page, pageSize) => {
    try {
        const response = await axios.get(`${envUrl}api/address_lookups/`, {
          params: {
            page: page,
            page_size: pageSize
          }
        });
  
        const { count, next, previous, results } = response.data || {};
        return data
      } catch (error) {
        console.error(error);
        return data
      }
  };
  
//   d4c61ef5657782f17bd093856dba821b1d86b955
// curl --location --request GET 'http://starfall-backend.herokuapp.com/api/address_lookups/' \
// --header 'Authorization: Token d4c61ef5657782f17bd093856dba821b1d86b955'