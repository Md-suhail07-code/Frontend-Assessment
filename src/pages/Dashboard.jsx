import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { api } from "../config/api.js";
import { Loader, AlertCircle } from "lucide-react";

import Navbar from "../components/Navbar";
import Overview from "../components/Overview.jsx";
import ServiceSummary from "../components/ServiceSummary.jsx";
import ReferralLink from "../components/ReferralLink.jsx";
import ReferralTable from "../components/ReferralTable.jsx";
import FooterComp from "../components/FooterComp.jsx";

const Dashboard = () => {
  const token = Cookies.get("jwt_token");
  
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`referrals?search=${encodeURIComponent(searchTerm)}&sort=${sortOrder}`);
      
      if (res.success || res.data?.success) {
        setData(res.data?.data || res.data);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An error occurred while fetching data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      const delayDebounceFn = setTimeout(() => {
        fetchData();
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [token, searchTerm, sortOrder]);

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Referral Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Track your referral earnings and partner activity in one place.
          </p>
        </div>

        {loading && !data.metrics ? (
          <div className="flex h-[350px] flex-col items-center justify-center rounded-[24px] border border-slate-200 bg-white shadow-sm">
            <Loader className="mb-4 h-8 w-8 animate-spin text-indigo-600" />
            <p className="text-sm font-medium text-slate-500">
              Loading your dashboard...
            </p>
          </div>
        ) : error && !data.metrics ? (
          <div className="flex h-[350px] flex-col items-center justify-center rounded-[24px] border border-red-100 bg-red-50/50 shadow-sm">
            <AlertCircle className="mb-3 h-8 w-8 text-red-500" />
            <p className="text-sm font-medium text-red-600">{error}</p>
            <button
              onClick={fetchData}
              className="mt-4 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-red-600 shadow-sm border border-red-200 hover:bg-red-50 transition-all active:scale-[0.98]"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6 sm:gap-8 relative">
            {loading && data.metrics && (
              <div className="absolute inset-0 z-10 rounded-[24px] bg-white/50 backdrop-blur-[1px] flex items-center justify-center">
                 <Loader className="h-8 w-8 animate-spin text-indigo-600" />
              </div>
            )}

            <Overview metrics={data.metrics || []} />
            <ServiceSummary summary={data.serviceSummary} />
            <ReferralLink referral={data.referral} />
            <ReferralTable 
              referrals={data.referrals || []} 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              sortOrder={sortOrder}
              onSortChange={setSortOrder}
            />

          </div>
        )}
      </main>
      <FooterComp />
    </div>
  );
};

export default Dashboard;