import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
export default function PrivateRoute() {
    const user = useAuthStore((s) => s.user);
    return user ? _jsx(Outlet, {}) : _jsx(Navigate, { to: "/login", replace: true });
}
