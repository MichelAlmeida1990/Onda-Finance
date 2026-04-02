import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import TransferPage from '@/pages/TransferPage';
import GlobalTransferPage from '@/pages/GlobalTransferPage';
import PixPage from '@/pages/PixPage';
import CardsPage from '@/pages/CardsPage';
import PayPage from '@/pages/PayPage';
import DepositPage from '@/pages/DepositPage';
import ChargePage from '@/pages/ChargePage';
import InvestPage from '@/pages/InvestPage';
import PrivateRoute from '@/components/PrivateRoute';
const queryClient = new QueryClient();
export default function App() {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(LandingPage, {}) }), _jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsxs(Route, { element: _jsx(PrivateRoute, {}), children: [_jsx(Route, { path: "/dashboard", element: _jsx(DashboardPage, {}) }), _jsx(Route, { path: "/transfer", element: _jsx(TransferPage, {}) }), _jsx(Route, { path: "/global-transfer", element: _jsx(GlobalTransferPage, {}) }), _jsx(Route, { path: "/pix", element: _jsx(PixPage, {}) }), _jsx(Route, { path: "/cartoes", element: _jsx(CardsPage, {}) }), _jsx(Route, { path: "/pagar", element: _jsx(PayPage, {}) }), _jsx(Route, { path: "/depositar", element: _jsx(DepositPage, {}) }), _jsx(Route, { path: "/cobrar", element: _jsx(ChargePage, {}) }), _jsx(Route, { path: "/investir", element: _jsx(InvestPage, {}) })] }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] }) }) }));
}
