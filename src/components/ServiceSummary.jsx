import React from 'react';

const ServiceSummary = ({ summary = {} }) => {
  const {
    service = "N/A",
    yourReferrals = "0",
    activeReferrals = "0",
    totalRefEarnings = "$0.00"
  } = summary;

  return (
    <div className="w-full rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-slate-900 tracking-tight">
        Service summary
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
        
        <div className="flex flex-col justify-center rounded-[16px] border border-slate-100 bg-slate-50/50 p-5">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            Service
          </p>
          <p className="text-lg font-bold text-indigo-600 truncate">
            {service}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-[16px] border border-slate-100 bg-slate-50/50 p-5">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            Your Referrals
          </p>
          <p className="text-lg font-bold text-slate-900">
            {yourReferrals}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-[16px] border border-slate-100 bg-slate-50/50 p-5">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            Active Referrals
          </p>
          <p className="text-lg font-bold text-slate-900">
            {activeReferrals}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-[16px] border border-slate-100 bg-slate-50/50 p-5">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            Total Ref. Earnings
          </p>
          <p className="text-lg font-bold text-slate-900">
            {totalRefEarnings}
          </p>
        </div>

      </div>
    </div>
  );
};

export default ServiceSummary;