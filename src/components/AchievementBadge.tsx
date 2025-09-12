import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface AchievementBadgeProps {
  icon: LucideIcon;
  title: string;
  description: string;
  unlocked?: boolean;
  progress?: number;
  maxProgress?: number;
  className?: string;
}

export const AchievementBadge = ({
  icon: Icon,
  title,
  description, 
  unlocked = false,
  progress = 0,
  maxProgress = 1,
  className
}: AchievementBadgeProps) => {
  const progressPercentage = maxProgress > 0 ? (progress / maxProgress) * 100 : 0;
  
  return (
    <div className={cn(
      "relative p-3 rounded-xl border-2 transition-all duration-300",
      unlocked 
        ? "bg-sports-gold text-white border-sports-gold shadow-gold pulse-glow" 
        : "bg-white/10 text-white/60 border-white/20",
      unlocked && "achievement-unlock",
      className
    )}>
      <div className="flex items-center gap-3">
        <div className={cn(
          "p-2 rounded-lg", 
          unlocked ? "bg-white/20" : "bg-white/5"
        )}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm truncate">{title}</h4>
          <p className="text-xs opacity-80 truncate">{description}</p>
          {!unlocked && maxProgress > 1 && (
            <div className="mt-1 w-full bg-white/10 rounded-full h-1">
              <div 
                className="bg-sports-gold h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          )}
        </div>
      </div>
      
      {unlocked && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-sports-saffron rounded-full flex items-center justify-center">
          <span className="text-[8px] text-white">✓</span>
        </div>
      )}
    </div>
  );
};