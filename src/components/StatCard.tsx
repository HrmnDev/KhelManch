import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  color?: "gold" | "emerald" | "saffron" | "navy" | "maroon";
  className?: string;
}

export const StatCard = ({
  icon: Icon,
  label,
  value,
  trend = "neutral",
  trendValue,
  color = "gold",
  className
}: StatCardProps) => {
  const colorClasses = {
    gold: "bg-gradient-gold border-sports-gold/30",
    emerald: "bg-gradient-emerald border-sports-emerald/30", 
    saffron: "bg-sports-saffron border-sports-saffron/30",
    navy: "bg-gradient-navy border-sports-navy/30",
    maroon: "bg-gradient-maroon border-sports-maroon/30"
  };

  const trendClasses = {
    up: "text-sports-emerald",
    down: "text-sports-maroon", 
    neutral: "text-white/60"
  };

  return (
    <div className={cn(
      "p-4 rounded-xl border text-white shadow-card-sports hover:shadow-glow transition-all duration-300 hover:scale-105",
      colorClasses[color],
      className
    )}>
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white/20 rounded-lg">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium opacity-90">{label}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">{value}</span>
            {trendValue && (
              <span className={cn("text-xs font-medium", trendClasses[trend])}>
                {trend === "up" && "↗"} {trend === "down" && "↘"} {trendValue}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};