import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
type ProtectedRouteProps = {
  children: React.ReactNode;
};
export function ProtectedRoute({
  children
}: ProtectedRouteProps) {
  const {
    user,
    isLoading
  } = useAuth();
  const location = useLocation();
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
        <div className="text-indigo-600 text-xl">Loading...</div>
      </div>;
  }
  if (!user) {
    return <Navigate to="/login" state={{
      from: location
    }} replace />;
  }
  return <>{children}</>;
}