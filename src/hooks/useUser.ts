import { useQuery } from '@tanstack/react-query';

import { fetchUser } from '../services/network/auth';
import { queryKeys } from '../utils/queryKeys';

const useUser = () => {
  return useQuery([queryKeys.USER_DETAILS], () => fetchUser(), { initialData: {} });
};

export default useUser;
