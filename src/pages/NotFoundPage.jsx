import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import { ROUTES } from '../lib/constants';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center selection:bg-indigo-500 selection:text-white">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 max-w-md w-full shadow-2xl space-y-6">
        <div className="h-16 w-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">404</h1>
          <h2 className="text-xl font-bold text-slate-200">Page Not Found</h2>
          <p className="text-sm text-slate-400">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        <Link
          to={ROUTES.HOME}
          className="inline-flex items-center gap-2 w-full justify-center py-3 px-5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-indigo-600/25 transition-all"
        >
          <Home className="h-4 w-4" />
          <span>Return to Home</span>
        </Link>
      </div>
    </div>
  );
}
