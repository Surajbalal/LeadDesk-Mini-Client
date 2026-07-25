import React from 'react';
import { Inbox } from 'lucide-react';

export default function EmptyState({ message = 'No leads found.', title = 'No Leads Available' }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-4">
      <div className="h-16 w-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
        <Inbox className="h-8 w-8 text-indigo-400" />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-slate-100">{title}</h3>
        <p className="text-sm text-slate-400 max-w-sm">{message}</p>
      </div>
    </div>
  );
}
