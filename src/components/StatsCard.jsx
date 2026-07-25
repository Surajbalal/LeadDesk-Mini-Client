import React from 'react';

export default function StatsCard({ title, value, icon: Icon, color = 'indigo' }) {
  const colorMap = {
    indigo: {
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20',
      text: 'text-indigo-400',
    },
    amber: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      text: 'text-amber-400',
    },
    blue: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      text: 'text-blue-400',
    },
    emerald: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      text: 'text-emerald-400',
    },
  };

  const scheme = colorMap[color] || colorMap.indigo;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm hover:border-slate-700 transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        <div className={`p-2.5 rounded-xl border ${scheme.bg} ${scheme.border}`}>
          <Icon className={`h-5 w-5 ${scheme.text}`} />
        </div>
      </div>
      <div className="mt-4 flex items-baseline">
        <span className="text-3xl font-extrabold tracking-tight text-white">
          {value}
        </span>
      </div>
    </div>
  );
}
