import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navbar from './components/ui/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router'
import HeroDetail from './components/features/heroes/HeroDetail'
import HeroList from './components/features/heroes/HeroList'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" />
          <Route path="/heroes" element={<HeroList/>} />
          <Route path="/heroes/:id" element={<HeroDetail/>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
