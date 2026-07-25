import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, LogIn, Menu, X, Layers } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';
import { ROUTES } from '../lib/constants';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 rounded-xl bg-linear-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-105 transition-transform">
            LD
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-indigo-400 transition-colors">
            LeadDesk <span className="text-indigo-500 font-medium text-xs uppercase tracking-wider ml-1 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">Mini</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          {isHome && (
            <>
              <a href="#features" className="hover:text-white transition-colors">
                Features
              </a>
              <a href="#why-us" className="hover:text-white transition-colors">
                Why LeadDesk
              </a>
              <a href="#contact" className="hover:text-white transition-colors">
                Submit Lead
              </a>
            </>
          )}
        </nav>

        {/* Admin Quick Action */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <Link
              to={ROUTES.ADMIN_DASHBOARD}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium text-sm transition-all shadow-lg shadow-indigo-600/20"
            >
              <LayoutDashboard className="h-4 w-4" />
              Admin Dashboard
            </Link>
          ) : (
            <Link
              to={ROUTES.ADMIN_LOGIN}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 rounded-lg font-medium text-sm transition-all"
            >
              <LogIn className="h-4 w-4 text-indigo-400" />
              Admin Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          {isHome && (
            <>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                Features
              </a>
              <a
                href="#why-us"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                Why LeadDesk
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                Submit Lead
              </a>
            </>
          )}
          <div className="pt-2 border-t border-slate-800">
            {isAuthenticated ? (
              <Link
                to={ROUTES.ADMIN_DASHBOARD}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-indigo-600 text-white rounded-lg font-medium"
              >
                <LayoutDashboard className="h-4 w-4" />
                Admin Dashboard
              </Link>
            ) : (
              <Link
                to={ROUTES.ADMIN_LOGIN}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-slate-800 text-slate-200 rounded-lg font-medium"
              >
                <LogIn className="h-4 w-4 text-indigo-400" />
                Admin Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
