"use client";

import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export function GradientText({ children, className, animate = true }: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-[oklch(0.75_0.18_180)] via-[oklch(0.7_0.2_220)] to-[oklch(0.65_0.2_280)] bg-clip-text text-transparent",
        animate && "bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]",
        className
      )}
    >
      {children}
    </span>
  );
}
