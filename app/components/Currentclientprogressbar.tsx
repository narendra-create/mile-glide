import React from "react";

interface ClientProgressBarProps {
  progress: number; // e.g. 72
  milestonesCompleted: number; // e.g. 3
  totalMilestones: number; // e.g. 4
  dueDate: string; // e.g. "Jul 20"
  variant?: "gold" | "green" | "amber";
}

export function ClientProgressBar({
  progress,
  milestonesCompleted,
  totalMilestones,
  dueDate,
  variant = "gold",
}: ClientProgressBarProps) {
  const getFillStyle = () => {
    switch (variant) {
      case "green":
        return "bg-dash-green";
      case "amber":
        return "bg-dash-amber";
      case "gold":
      default:
        return "bg-gradient-to-r from-dash-gold-dim to-dash-gold";
    }
  };

  return (
    <div className="w-full">
      {/* Top Label */}
      <div className="flex items-center justify-between mb-[5px] font-mono text-[10px] tracking-[1px] uppercase text-ink/60">
        Progress <span className="text-ink">{progress}%</span>
      </div>

      {/* Progress Track */}
      <div className="bg-dash-border rounded-[2px] h-1 w-full overflow-hidden">
        <div
          className={`h-full rounded-[2px] transition-all duration-500 delay-200 ease-dash-custom ${getFillStyle()}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Bottom Information */}
      <div className="flex justify-between mt-[10px]">
        <span className="font-mono text-[9px] text-ink-dim">
          {milestonesCompleted} of {totalMilestones} milestones
        </span>
        <span className="font-mono text-[9px] font-semibold text-dash-amber">
          Due {dueDate}
        </span>
      </div>
    </div>
  );
}
