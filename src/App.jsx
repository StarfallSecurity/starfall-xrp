import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import 'react-toastify/dist/ReactToastify.css';

import './css/style.css';

import './charts/ChartjsConfig';

import AppRoutes from './Routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
      staleTime: 5000
      // suspense: true
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <AppRoutes />
    </QueryClientProvider>
  );
}

export default App;
