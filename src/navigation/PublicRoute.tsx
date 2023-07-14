import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import useToken from '../hooks/useToken';

const PublicRoute: React.FC = () => {
  const { token } = useToken();
  return token ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
