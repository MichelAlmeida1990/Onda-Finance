import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import LandingPage from '@/pages/LandingPage'
import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'
import TransferPage from '@/pages/TransferPage'
import PixPage from '@/pages/PixPage'
import CardsPage from '@/pages/CardsPage'
import PayPage from '@/pages/PayPage'
import DepositPage from '@/pages/DepositPage'
import ChargePage from '@/pages/ChargePage'
import InvestPage from '@/pages/InvestPage'
import PrivateRoute from '@/components/PrivateRoute'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/transfer" element={<TransferPage />} />
            <Route path="/pix" element={<PixPage />} />
            <Route path="/cartoes" element={<CardsPage />} />
            <Route path="/pagar" element={<PayPage />} />
            <Route path="/depositar" element={<DepositPage />} />
            <Route path="/cobrar" element={<ChargePage />} />
            <Route path="/investir" element={<InvestPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
