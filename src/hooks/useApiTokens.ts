import { useEffect, useState } from 'react';

import { fetchAPITokens } from '../services/network/tokens';

export const useApiTokens = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      const response = await fetchAPITokens(currentPage);
      setData(response);
    })();
  }, [currentPage]);

  return {
    data,
    setCurrentPage
  };
};
