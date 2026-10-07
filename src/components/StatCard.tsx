import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtext?: string;
  trend?: {
    value: string | number;
    type: "up" | "down" | "neutral";
  };
  color?: string; // Tailwind color class, e.g. text-brand-primary
}

export default function StatCard({ title, value, icon: Icon, subtext, trend, color = "text-indigo-600 dark:text-indigo-400" }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-700/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex items-start justify-between select-none">
      <div className="space-y-2">
        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
          {title}
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
            {value}
          </span>
          {trend && (
            <span className={`text-[10px] font-bold ${
              trend.type === "up" ? "text-emerald-500" : trend.type === "down" ? "text-rose-500" : "text-slate-400"
            }`}>
              {trend.type === "up" ? "↑" : trend.type === "down" ? "↓" : "•"} {trend.value}
            </span>
          )}
        </div>
        {subtext && (
          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
            {subtext}
          </p>
        )}
      </div>

      <div className={`p-3 rounded-xl bg-slate-50 dark:bg-slate-700/60 text-slate-500 ${color}`}>
        <Icon size={18} />
      </div>
    </div>
  );
}
