import { cn } from "@/lib/utils";

interface StatsCardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatsCard({ value, label, icon, className }: StatsCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6",
        "transition-all duration-300 hover:border-primary/30 hover:bg-card",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      <div className="relative flex items-center gap-4">
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        <div>
          <div className="text-3xl font-bold font-mono text-primary glow-text">{value}</div>
          <div className="text-sm text-muted-foreground">{label}</div>
        </div>
      </div>
    </div>
  );
}
