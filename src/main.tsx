import './index.css';

import ErrorBoundaryWrapper from '@src/ErrorBoundaryWrapper.tsx';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx';

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      throwOnError: true,
    },
    queries: {
      throwOnError: true,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      setTimeout(() => {
        queryClient.removeQueries(query);
      }, 0);
    },
  }),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ErrorBoundaryWrapper fullScreen>
          <App />
          <Toaster />
        </ErrorBoundaryWrapper>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>,
);
