import { useEffect, useState } from 'react';

import { fetchWalletsData } from '../services/network/wallet';
import { Wallet, WalletsResponse } from '../types/wallets';

export const useWallets = () => {
  const [data, setData] = useState<Wallet[] | []>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const pageSize = 10; // Define the number of items per page
  useEffect(() => {
    (async () => {
      const response = await fetchWalletsData(currentPage, pageSize);
      setData(response?.results ?? []);
      setCount(response?.count ?? 0);
    })();
  }, [currentPage]);

  return {
    data,
    count,
    pageSize,
    currentPage,
    setCurrentPage
  };
};
