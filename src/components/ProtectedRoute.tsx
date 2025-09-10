import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { type JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());


  return isAuthenticated ? children : <Navigate to="/login" />;
}
