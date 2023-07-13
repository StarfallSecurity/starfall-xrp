import React, { useEffect } from 'react';

import './css/style.css';

import './charts/ChartjsConfig';

import { setAuthToken } from './services/network/api';
import useToken from './hooks/useToken';
import ProtectedRoute from './navigation/ProtectedRoute';
import AppRoutes from './Routes';

function App() {
  setAuthToken();

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
