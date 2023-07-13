import React, { useContext } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

import useToken from '../hooks/useToken';

interface ProtectedRouteProps {
  element: React.ReactNode;
  path: string;
  exact?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element: Component, path, ...rest }) => {
  const { token } = useToken();

  return true ? (
    <Route path={path} element={Component} {...rest} />
  ) : (
    <Navigate to="/signin" replace />
  );
};

export default ProtectedRoute;
