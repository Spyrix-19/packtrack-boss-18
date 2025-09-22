import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon: LucideIcon;
  className?: string;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon: Icon,
  className 
}: MetricCardProps) {
  return (
    <div className={cn(
      "bg-card p-6 rounded-lg border border-border shadow-card hover:shadow-elevated transition-shadow",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-card-foreground mt-1">{value}</p>
          {change && (
            <p className={cn(
              "text-xs font-medium mt-2",
              changeType === 'increase' && "text-success-foreground",
              changeType === 'decrease' && "text-destructive",
              changeType === 'neutral' && "text-muted-foreground"
            )}>
              {change}
            </p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-lg",
          "bg-gradient-primary"
        )}>
          <Icon className="w-5 h-5 text-primary-foreground" />
        </div>
      </div>
    </div>
  );
}