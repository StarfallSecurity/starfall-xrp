import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import './css/style.css';

import './charts/ChartjsConfig';

import AppRoutes from './Routes';

function App() {
  return (
    <>
      <ToastContainer />
      <AppRoutes />
    </>
  );
}

export default App;
