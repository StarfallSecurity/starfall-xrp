import React, { useState } from 'react';
import instance, { setAuthToken } from '../services/network/api';
import { TOKEN_KEY } from '../constants';

const useToken = () => {
  const getToken = () => {
    const tokenString = localStorage.getItem(TOKEN_KEY);
    const userToken = tokenString && JSON.parse(tokenString ?? '');
    if (tokenString) setAuthToken(instance, userToken);
    return userToken;
  };

  const [token, setToken] = useState(getToken());
  const saveToken = (userToken: { token: string }) => {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(userToken));
    setToken(userToken.token);
  };

  const deleteToken = () => {
    localStorage.removeItem(TOKEN_KEY);
  };
  return {
    setToken: saveToken,
    deleteToken,
    token
  };
};

export default useToken;
