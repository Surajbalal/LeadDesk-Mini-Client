import React, { useState, useEffect } from 'react';
import {
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Download,
  RefreshCw,
  SlidersHorizontal,
} from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { LEAD_STATUS, LEAD_STATUS_OPTIONS } from '../lib/constants';
import { exportLeadsToCSV } from '../utils/csvExporter';
import api from '../lib/axios';
import StatsCard from '../components/StatsCard';
import StatsCardSkeleton from '../components/StatsCardSkeleton';
import LeadTable from '../components/LeadTable';
import LeadTableSkeleton from '../components/LeadTableSkeleton';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';

export default function DashboardPage() {
  const [searchInput, setSearchInput] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    closed: 0,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const debouncedSearch = useDebounce(searchInput, 300);

  // Fetch leads
  const fetchLeads = async () => {
    setIsFetching(true);
    try {
      const params = new URLSearchParams();
      if (debouncedSearch) params.append('search', debouncedSearch);
      if (statusFilter) params.append('status', statusFilter);
      params.append('page', page);
      params.append('limit', 10);

      const response = await api.get(`/leads?${params.toString()}`);
      setLeads(response.data.data.leads);
      setPagination(response.data.data.pagination);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setIsFetching(false);
      setIsLoading(false);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await api.get('/leads/stats');
      setStats(response.data.data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchLeads();
    fetchStats();
  }, [debouncedSearch, statusFilter, page]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    setPage(1);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(1);
  };

  const handleUpdateStatus = async (id, status) => {
  setIsUpdating(true);

  try {
    console.log("ID:", id);
    console.log("STATUS:", status);

    await api.patch(`/leads/${id}/status`, {
      status,
    });

    await Promise.all([
      fetchLeads(),
      fetchStats(),
    ]);
  } catch (error) {
    console.error("Error updating status:", error);

    throw (
      error.response?.data || {
        message: "Failed to update status",
      }
    );
  } finally {
    setIsUpdating(false);
  }
};

  const handleExportCSV = () => {
    exportLeadsToCSV(leads);
  };

  return (
    <div className="space-y-8">
      {/* Top Welcome Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Lead Management Dashboard
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Monitor incoming client inquiries, filter pipeline stages, and update lead statuses.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          disabled={!leads.length}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white rounded-xl text-xs font-semibold shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer self-start sm:self-auto"
        >
          <Download className="h-4 w-4 text-indigo-400" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <>
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
          </>
        ) : (
          <>
            <StatsCard
              title="Total Leads"
              value={stats.total}
              icon={Users}
              color="indigo"
            />
            <StatsCard
              title="New Leads"
              value={stats.new}
              icon={Clock}
              color="amber"
            />
            <StatsCard
              title="Contacted"
              value={stats.contacted}
              icon={CheckCircle}
              color="blue"
            />
            <StatsCard
              title="Closed Deals"
              value={stats.closed}
              icon={XCircle}
              color="emerald"
            />
          </>
        )}
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
        {/* Search Input */}
        <div className="relative grow max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setPage(1);
            }}
            placeholder="Search leads by name or email..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Status Filter Dropdown */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="pl-9 pr-8 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer appearance-none"
            >
              <option value="">All Statuses</option>
              {LEAD_STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {isFetching && (
            <RefreshCw className="h-4 w-4 text-indigo-400 animate-spin" title="Refreshing leads..." />
          )}
        </div>
      </div>

      {/* Main Table / Skeleton / Empty State */}
      {isLoading ? (
        <LeadTableSkeleton rows={5} />
      ) : leads.length === 0 ? (
        <EmptyState
          title="No Leads Found"
          message={
            debouncedSearch || statusFilter
              ? 'No leads match your current search and status filters. Try clearing your search filters.'
              : 'No client inquiries submitted yet. Submit a new lead from the landing page to get started.'
          }
        />
      ) : (
        <div className="space-y-4">
          <LeadTable
            leads={leads}
            onUpdateStatus={handleUpdateStatus}
            isUpdating={isUpdating}
          />
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}
    </div>
  );
}
