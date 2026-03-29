import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/store/auth'

export default function PrivateRoute() {
  const user = useAuthStore((s) => s.user)
  return user ? <Outlet /> : <Navigate to="/login" replace />
}
