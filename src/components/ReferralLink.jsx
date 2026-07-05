import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const ReferralLink = ({ referral = {} }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const {
    link = "Loading...",
    code = "Loading..."
  } = referral;

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'link') {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="w-full rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-slate-900 tracking-tight">
        Refer friends and earn more
      </h2>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Your Referral Link
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              readOnly
              value={link}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-700 outline-none truncate"
            />
            <button
              onClick={() => handleCopy(link, 'link')}
              className={`flex flex-shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold text-white transition-all duration-200 active:scale-[0.96] ${
                copiedLink ? 'bg-emerald-500' : 'bg-indigo-500 hover:bg-indigo-600 shadow-sm'
              }`}
            >
              {copiedLink ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span className="hidden sm:inline">{copiedLink ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Your Referral Code
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              readOnly
              value={code}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-900 outline-none uppercase tracking-wider"
            />
            <button
              onClick={() => handleCopy(code, 'code')}
              className={`flex flex-shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold text-white transition-all duration-200 active:scale-[0.96] ${
                copiedCode ? 'bg-emerald-500' : 'bg-indigo-500 hover:bg-indigo-600 shadow-sm'
              }`}
            >
              {copiedCode ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span className="hidden sm:inline">{copiedCode ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReferralLink;