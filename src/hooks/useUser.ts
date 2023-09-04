import { useQuery } from '@tanstack/react-query';

import { fetchUser } from '../services/network/auth';
import { queryKeys } from '../utils/queryKeys';

const useUser = () => {
  return useQuery({
    queryKey: [queryKeys.USER_DETAILS],
    queryFn: () => fetchUser(),
    placeholderData: {}
  });
};

export default useUser;
