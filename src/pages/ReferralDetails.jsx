import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../config/api.js";
import { Loader, AlertCircle } from "lucide-react";
import Navbar from "../components/Navbar.jsx";

const ReferralDetails = () => {
  const { id } = useParams();
  const [referralDetails, setReferralDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchReferralDetails = async (referralId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`referrals/?id=${referralId}`);
      if (res.success || res.data?.success) {
        setReferralDetails(res.data?.data?.referrals[0] || res.data?.referrals[0]);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An error occurred while fetching referral details."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchReferralDetails(id);
    }
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString.replace(/-/g, "/");
  };

  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return "";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        <button
          onClick={() => navigate("/")}
          className="mb-8 text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors focus:outline-none"
        >
          &larr; Back to dashboard
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Referral Details
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Full information for this referral partner.
          </p>
        </div>

        <section>
          {loading ? (
             <div className="flex h-[400px] w-full max-w-2xl flex-col items-center justify-center rounded-[24px] border border-slate-200 bg-white shadow-sm">
               <Loader className="mb-4 h-8 w-8 animate-spin text-indigo-600" />
               <p className="text-sm font-medium text-slate-500">
                 Loading details...
               </p>
             </div>
          ) : error ? (
            <div className="flex h-[400px] w-full max-w-2xl flex-col items-center justify-center rounded-[24px] border border-red-100 bg-red-50/50 shadow-sm">
              <AlertCircle className="mb-3 h-8 w-8 text-red-500" />
              <p className="text-sm font-medium text-red-600">{error}</p>
              <button
                onClick={() => fetchReferralDetails(id)}
                className="mt-4 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-red-600 shadow-sm border border-red-200 hover:bg-red-50 transition-all active:scale-[0.98]"
              >
                Try Again
              </button>
            </div>
          ) : referralDetails ? (
            <div className="w-full max-w-2xl rounded-[24px] border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
              
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {referralDetails.name}
                </h2>
                <span className="rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600">
                  {referralDetails.serviceName}
                </span>
              </div>

              <div className="divide-y divide-slate-100 border-t border-slate-100">
                
                <div className="flex py-5">
                  <div className="w-40 flex-shrink-0 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Referral ID
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {referralDetails.id}
                  </div>
                </div>

                <div className="flex py-5">
                  <div className="w-40 flex-shrink-0 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Name
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {referralDetails.name}
                  </div>
                </div>

                <div className="flex py-5">
                  <div className="w-40 flex-shrink-0 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Service Name
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {referralDetails.serviceName}
                  </div>
                </div>

                <div className="flex py-5">
                  <div className="w-40 flex-shrink-0 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Date
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {formatDate(referralDetails.date)}
                  </div>
                </div>

                <div className="flex py-5">
                  <div className="w-40 flex-shrink-0 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Profit
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {formatCurrency(referralDetails.profit)}
                  </div>
                </div>

              </div>
            </div>
          ) : (
             <div className="text-slate-500 text-sm">No details found.</div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ReferralDetails;