import React from 'react';

export default function LeadTableSkeleton({ rows = 5 }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-md">
      <table className="w-full text-left text-sm text-slate-300">
        <thead className="bg-slate-950/80 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800">
          <tr>
            <th scope="col" className="px-6 py-4">Name</th>
            <th scope="col" className="px-6 py-4">Contact Info</th>
            <th scope="col" className="px-6 py-4">Budget Range</th>
            <th scope="col" className="px-6 py-4">Status</th>
            <th scope="col" className="px-6 py-4">Created Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {Array.from({ length: rows }).map((_, index) => (
            <tr key={index}>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 skeleton-shimmer rounded-full shrink-0" />
                  <div className="space-y-1.5">
                    <div className="h-4 w-28 skeleton-shimmer rounded" />
                    <div className="h-3 w-40 skeleton-shimmer rounded" />
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-36 skeleton-shimmer rounded" />
              </td>
              <td className="px-6 py-4">
                <div className="h-6 w-24 skeleton-shimmer rounded-lg" />
              </td>
              <td className="px-6 py-4">
                <div className="h-6 w-20 skeleton-shimmer rounded-lg" />
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-24 skeleton-shimmer rounded" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
