import { useEffect, useState } from 'react';

import { createApiToken, deleteApiToken, fetchAPITokens } from '../services/network/tokens';

export const useApiTokens = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchAndSetTokens = async () => {
    const response = await fetchAPITokens(currentPage);
    setData(response);
  };

  const createTokens = async (user: number = 2) => {
    const response = await createApiToken(user);
    if (response) {
      fetchAndSetTokens();
    }
  };

  const deleteTokens = async (token: string) => {
    try {
      await deleteApiToken(token);
      fetchAndSetTokens();
    } catch (error) {}
  };

  useEffect(() => {
    fetchAndSetTokens();
  }, [currentPage]);

  return {
    data,
    setCurrentPage,
    deleteTokens,
    createTokens
  };
};
