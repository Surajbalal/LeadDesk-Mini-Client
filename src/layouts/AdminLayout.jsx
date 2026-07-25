import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LogOut, Home, Shield, User, Loader2 } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';
import { ROUTES } from '../lib/constants';
import { toast } from 'react-hot-toast';

export default function AdminLayout() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate(ROUTES.ADMIN_LOGIN);
    } catch (err) {
      toast.error(err.message || 'Logout failed');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Admin Top Navigation Bar */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to={ROUTES.HOME} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider">
              <Home className="h-4 w-4" />
              <span>Back to Site</span>
            </Link>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Shield className="h-4 w-4" />
              </div>
              <span className="font-bold text-white text-base">CRM Admin Workspace</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-slate-300">
              <User className="h-3.5 w-3.5 text-indigo-400" />
              <span>{user?.email || 'admin@leaddesk.com'}</span>
            </div>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 hover:text-rose-300 rounded-xl text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
            >
              {isLoggingOut ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <LogOut className="h-3.5 w-3.5" />
              )}
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content View */}
      <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
