import React from "react";

interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function ChartCard({ title, description, children }: ChartCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-700/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all flex flex-col justify-between select-none">
      <div className="space-y-1 mb-5">
        <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
          {title}
        </h3>
        {description && (
          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
            {description}
          </p>
        )}
      </div>
      <div className="w-full flex-1 min-h-[220px]">
        {children}
      </div>
    </div>
  );
}
