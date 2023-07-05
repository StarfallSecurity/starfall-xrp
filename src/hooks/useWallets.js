import { useEffect, useState } from "react";

import { fetchWalletsData } from "../services/WalletsList";

export const useWallets = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Define the number of items per page

  useEffect(() => {
    const response = fetchWalletsData(currentPage, pageSize);
    setData(response)
  }, [currentPage]);

  return {
    data,
    setCurrentPage,
  }
}