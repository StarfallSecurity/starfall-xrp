import { useEffect, useState } from 'react';

import { fetchWalletsData } from '../services/network/wallet';
import { Wallet, WalletsResponse } from '../types/wallets';
import { useLocation, useNavigate } from 'react-router-dom';

export const useWallets = () => {
  const location = useLocation();
  const page = new URLSearchParams(location.search).get('page') || 1;
  const [data, setData] = useState<Wallet[] | []>([]);
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const pageSize = 10; // Define the number of items per page

  useEffect(() => {
    (async () => {
      const response = await fetchWalletsData(currentPage, pageSize);
      setData(response?.results ?? []);
      setCount(response?.count ?? 0);
    })();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`${location.pathname}?page=${page}`);
  };

  return {
    data,
    count,
    pageSize,
    currentPage,
    setCurrentPage,
    handlePageChange
  };
};
