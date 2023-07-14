import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import useToken from '../hooks/useToken';

const ProtectedRoute: React.FC = () => {
  const { token } = useToken();
  return token ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
