import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';

import useToken from '../hooks/useToken';

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  path: string;
  exact?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const { token } = useToken();

  console.log(':token is ', token);

  return (
    <Route
      {...rest}
      render={(props: any) => (token ? <Component {...props} /> : <Navigate to="/login" />)}
    />
  );
};

export default ProtectedRoute;
