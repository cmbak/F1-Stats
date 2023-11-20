import DriverStandings from './components/DriverStandings'
import PodiumCards from './components/PodiumCards'
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  return (
    // <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <PodiumCards />
        <DriverStandings />
      </QueryClientProvider>
    // </React.StrictMode>
  )
}

export default App
