import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { fetchRelatedWalletAccounts } from '../services/network/wallet';
import { queryKeys } from '../utils/queryKeys';

export const useRelatedAccounts = () => {
  const { walletAddress } = useParams();

  const { data, isLoading } = useQuery([`${queryKeys.RELATED_ACCOUNTS}-${walletAddress}`], () =>
    fetchRelatedWalletAccounts(walletAddress as string)
  );

  return {
    data: Object.values(data || {}),
    isLoading,
    walletAddress
  };
};
