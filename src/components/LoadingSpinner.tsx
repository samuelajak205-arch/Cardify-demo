import React from "react";

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = "Retrieving dashboard metrics..." }: LoadingSpinnerProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50/70 dark:bg-slate-900/70 backdrop-blur-xs transition-opacity duration-300">
      <div className="relative flex flex-col items-center p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-xl max-w-xs w-full text-center">
        {/* Animated Double-ring Spinner */}
        <div className="relative w-12 h-12 mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-indigo-100 dark:border-indigo-950" />
          <div className="absolute inset-0 rounded-full border-4 border-t-indigo-600 dark:border-t-indigo-400 animate-spin" />
        </div>
        
        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider mb-1">
          Loading Cardify
        </h4>
        <p className="text-[11px] text-slate-450 dark:text-slate-400 font-medium">
          {message}
        </p>
      </div>
    </div>
  );
}
