import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { ROUTES } from '../lib/constants';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuthContext();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 space-y-6">
        <div className="h-16 w-full skeleton-shimmer rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="h-28 skeleton-shimmer rounded-2xl" />
          <div className="h-28 skeleton-shimmer rounded-2xl" />
          <div className="h-28 skeleton-shimmer rounded-2xl" />
          <div className="h-28 skeleton-shimmer rounded-2xl" />
        </div>
        <div className="h-96 w-full skeleton-shimmer rounded-2xl" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.ADMIN_LOGIN} state={{ from: location }} replace />;
  }

  return children;
}
