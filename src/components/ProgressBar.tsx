import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  className?: string;
  color?: "gold" | "emerald" | "saffron" | "navy";
  showPercentage?: boolean;
}

export const ProgressBar = ({ 
  value, 
  max, 
  label, 
  className, 
  color = "gold",
  showPercentage = true 
}: ProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colorClasses = {
    gold: "bg-sports-gold",
    emerald: "bg-sports-emerald", 
    saffron: "bg-sports-saffron",
    navy: "bg-sports-navy"
  };

  return (
    <div className={cn("progress-bar", className)}>
      {label && (
        <div className="flex justify-between text-xs font-medium mb-1">
          <span>{label}</span>
          {showPercentage && <span>{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
        <div 
          className={cn(
            "progress-fill h-full rounded-full transition-all duration-700 ease-out",
            colorClasses[color]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};