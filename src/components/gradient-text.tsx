"use client";

import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
}

export function GradientText({
  children,
  className,
  colors = ["#00d4ff", "#7c3aed", "#06b6d4", "#00d4ff"],
}: GradientTextProps) {
  const gradientString = colors.join(", ");

  return (
    <span
      className={cn(
        "bg-clip-text text-transparent",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(90deg, ${gradientString})`,
        backgroundSize: "300% 100%",
        animation: "gradient-text-flow 4s ease infinite",
      }}
    >
      {children}
    </span>
  );
}
