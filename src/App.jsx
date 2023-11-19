import DriverStandings from './components/DriverStandings'
import PodiumCards from './components/PodiumCards'
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DriverStandings />
      <PodiumCards />
    </QueryClientProvider>
  )
}

export default App
