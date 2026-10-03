import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/public/Navbar';
import HeroList from './components/public/HeroList';
import { BrowserRouter, Route, Routes } from 'react-router';
import HeroDetail from './components/pages/heroes/HeroDetail';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="/heroes" element={<HeroList/>} />
          <Route path="/heroes/:id" element={<HeroDetail/>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
