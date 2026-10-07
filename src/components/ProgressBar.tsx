import React from "react";

interface ProgressBarProps {
  progress: number; // 0-100 percentage
  label?: string;
  subLabel?: string;
  variant?: "primary" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
}

export default function ProgressBar({ progress, label, subLabel, variant = "primary", size = "md" }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, progress));

  const getColors = () => {
    switch (variant) {
      case "success":
        return "bg-brand-accent";
      case "warning":
        return "bg-brand-warning";
      case "danger":
        return "bg-brand-danger";
      case "primary":
      default:
        return "bg-brand-primary";
    }
  };

  const getTrackColors = () => {
    return "bg-slate-100 dark:bg-slate-800";
  };

  const getHeight = () => {
    switch (size) {
      case "sm": return "h-1";
      case "lg": return "h-2.5";
      case "md":
      default:
        return "h-1.5";
    }
  };

  return (
    <div className="w-full space-y-1.5 select-none">
      {(label || subLabel) && (
        <div className="flex items-center justify-between text-xs font-semibold">
          {label && <span className="text-slate-700 dark:text-slate-300">{label}</span>}
          {subLabel && <span className="text-slate-500 dark:text-slate-400 font-mono tabular-nums">{subLabel}</span>}
        </div>
      )}
      <div className={`w-full rounded-full overflow-hidden ${getTrackColors()} ${getHeight()}`}>
        <div 
          className={`h-full rounded-full transition-all duration-500 ${getColors()}`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
