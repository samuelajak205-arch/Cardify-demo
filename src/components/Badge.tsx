import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "danger" | "info" | "neutral";
}

export default function Badge({ children, variant = "neutral" }: BadgeProps) {
  const getColors = () => {
    switch (variant) {
      case "success":
        return "text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30";
      case "warning":
        return "text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/30";
      case "danger":
        return "text-rose-700 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/30";
      case "info":
        return "text-indigo-700 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/30";
      case "neutral":
      default:
        return "text-slate-600 bg-slate-50 dark:text-slate-350 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/40";
    }
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${getColors()}`}>
      {children}
    </span>
  );
}
