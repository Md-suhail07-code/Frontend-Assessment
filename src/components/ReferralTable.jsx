import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ReferralTable = ({ 
  referrals = [], 
  searchTerm, 
  onSearchChange, 
  sortOrder, 
  onSortChange 
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [referrals]);

  const totalEntries = referrals.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = referrals.slice(startIndex, endIndex);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return dateString.replace(/-/g, '/');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleRowClick = (id) => {
    navigate(`/referral/${id}`);
  };

  return (
    <div className="w-full rounded-[24px] border border-slate-200 bg-white shadow-sm overflow-hidden">
      
      <div className="p-6 sm:p-8 pb-4">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-6">
          All referrals
        </h2>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label htmlFor="search" className="text-sm font-medium text-slate-500">
              Search
            </label>
            <input
              id="search"
              type="text"
              aria-label="Search referrals"
              placeholder="Name or service…"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full sm:w-64 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label htmlFor="sort" className="text-sm font-medium text-slate-500 whitespace-nowrap">
              Sort by date
            </label>
            <select
              id="sort"
              value={sortOrder}
              onChange={(e) => onSortChange(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="desc">Newest first</option>
              <option value="asc">Oldest first</option>
            </select>
          </div>

        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-y border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-6 sm:px-8 py-4">Name</th>
              <th className="px-6 sm:px-8 py-4">Service</th>
              <th className="px-6 sm:px-8 py-4">Date</th>
              <th className="px-6 sm:px-8 py-4">Profit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {currentData.length > 0 ? (
              currentData.map((row) => (
                <tr 
                  key={row.id} 
                  onClick={() => handleRowClick(row.id)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 sm:px-8 py-4 text-slate-700">{row.name}</td>
                  <td className="px-6 sm:px-8 py-4 text-slate-700">{row.serviceName}</td>
                  <td className="px-6 sm:px-8 py-4 text-slate-700">{formatDate(row.date)}</td>
                  <td className="px-6 sm:px-8 py-4 font-semibold text-indigo-600">
                    {formatCurrency(row.profit)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 sm:px-8 py-12 text-center text-slate-500">
                  No matching entries
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 p-6 sm:p-8">
        
        <p className="text-sm text-slate-500">
          Showing {totalEntries === 0 ? 0 : startIndex + 1}–{Math.min(endIndex, totalEntries)} of {totalEntries} entries
        </p>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          <div className="flex items-center gap-1 hidden sm:flex">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`h-8 w-8 rounded-lg text-sm font-bold transition-colors ${
                  currentPage === page
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
};

export default ReferralTable;