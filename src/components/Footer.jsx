import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <div className="h-6 w-6 rounded-md bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
            LD
          </div>
          <span className="font-bold text-slate-200 tracking-tight">LeadDesk Mini</span>
        </div>
        <p className="text-sm text-slate-400">
          Streamlining lead management for modern agencies and SaaS teams.
        </p>
        <div className="pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} LeadDesk Mini. All rights reserved.</p>
          <p className="font-medium text-slate-400">
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4 transition-colors"
            >
              Built for Digital Heroes Training Task
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
