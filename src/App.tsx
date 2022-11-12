import { QueryClient, QueryClientProvider } from 'react-query';
import { PrefPopulationChart } from './pages/PrefPopulationChart';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useState } from 'react';

function App() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PrefPopulationChart />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
