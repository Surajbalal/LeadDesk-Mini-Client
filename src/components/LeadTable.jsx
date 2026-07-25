import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Loader2, Mail, Calendar, DollarSign, User, ShieldCheck } from 'lucide-react';
import { formatDate } from '../utils/formatters';
import { LEAD_STATUS, LEAD_STATUS_OPTIONS } from '../lib/constants';

export default function LeadTable({ leads, onUpdateStatus }) {
  const [updatingId, setUpdatingId] = useState(null);

 const handleStatusChange = async (leadId, newStatus) => {
  setUpdatingId(leadId);

  try {
    await onUpdateStatus(leadId, newStatus);
    toast.success("Status updated successfully");
  } catch (error) {
    toast.error(
      error.message || "Failed to update status"
    );
  } finally {
    setUpdatingId(null);
  }
};

  const getStatusBadge = (status) => {
    switch (status) {
      case LEAD_STATUS.NEW:
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case LEAD_STATUS.CONTACTED:
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case LEAD_STATUS.CLOSED:
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

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
          {leads.map((lead) => {
            const isThisRowUpdating = updatingId === lead._id;

            return (
              <tr key={lead._id} className="hover:bg-slate-800/40 transition-colors">
                {/* Lead Name & Message Preview */}
                <td className="px-6 py-4 font-medium text-slate-100 max-w-xs">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 font-bold shrink-0">
                      {lead.name ? lead.name.charAt(0).toUpperCase() : 'L'}
                    </div>
                    <div className="truncate">
                      <p className="font-semibold text-slate-100 truncate">{lead.name}</p>
                      <p className="text-xs text-slate-400 truncate max-w-[200px]" title={lead.message}>
                        {lead.message}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Contact Email */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Mail className="h-4 w-4 text-slate-500 shrink-0" />
                    <a
                      href={`mailto:${lead.email}`}
                      className="hover:text-indigo-400 hover:underline transition-colors truncate"
                    >
                      {lead.email}
                    </a>
                  </div>
                </td>

                {/* Budget */}
                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-semibold text-slate-200">
                    <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                    {lead.budget}
                  </div>
                </td>

                {/* Status Dropdown */}
                <td className="px-6 py-4">
                  <div className="relative inline-block">
                    <select
                      value={lead.status}
                      disabled={isThisRowUpdating}
                      onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                      className={`py-1.5 pl-3 pr-8 rounded-lg text-xs font-semibold border ${getStatusBadge(
                        lead.status
                      )} bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer disabled:opacity-50`}
                    >
                      {LEAD_STATUS_OPTIONS.map((statusOption) => (
                        <option
                          key={statusOption}
                          value={statusOption}
                          className="bg-slate-900 text-slate-100 font-medium"
                        >
                          {statusOption}
                        </option>
                      ))}
                    </select>

                    {isThisRowUpdating && (
                      <Loader2 className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 animate-spin text-indigo-400 pointer-events-none" />
                    )}
                  </div>
                </td>

                {/* Created Date */}
                <td className="px-6 py-4 text-slate-400 text-xs whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-slate-500" />
                    {formatDate(lead.createdAt)}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
