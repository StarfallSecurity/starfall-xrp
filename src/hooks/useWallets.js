import { useEffect, useState } from 'react';

import { fetchWalletsData } from '../services/network/wallet';

export const useWallets = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Define the number of items per page

  useEffect(() => {
    (async () => {
      const response = await fetchWalletsData(currentPage, pageSize);
      setData(response);
    })();
  }, [currentPage]);

  return {
    data,
    setCurrentPage
  };
};
