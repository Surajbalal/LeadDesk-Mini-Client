import React from 'react';

export default function StatsCardSkeleton() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-3 w-24 skeleton-shimmer rounded" />
        <div className="h-9 w-9 skeleton-shimmer rounded-xl" />
      </div>
      <div className="h-8 w-16 skeleton-shimmer rounded" />
    </div>
  );
}
