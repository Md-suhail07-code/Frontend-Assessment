import React from 'react';
import { 
  DollarSign, 
  CreditCard, 
  Link2, 
  Hourglass, 
  Percent, 
  Coins, 
  Users, 
  ArrowLeftRight 
} from 'lucide-react';

const iconMapping = {
  balance: DollarSign,
  discountPct: CreditCard,
  totalRef: Link2,
  discountAmt: Hourglass,
  commissionAmt: Percent,
  totalEarn: Coins,
  commissionDisc: Users,
  bankTransfer: ArrowLeftRight,
};

const Overview = ({ metrics = [] }) => {
  return (
    <div className="w-full rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-slate-900 tracking-tight">
        Overview
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
        {metrics.map((metric) => {
          const Icon = iconMapping[metric.id] || DollarSign;

          return (
            <div 
              key={metric.id} 
              className="flex flex-col justify-center rounded-[20px] border border-slate-200 bg-slate-50 p-5 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] transition-shadow duration-200 hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.1)]"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500 shadow-sm">
                <Icon className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              
              <h3 className="mb-1.5 text-2xl font-extrabold text-slate-900 tracking-tight">
                {metric.value}
              </h3>
              
              <p className="text-sm font-medium text-slate-500">
                {metric.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Overview;