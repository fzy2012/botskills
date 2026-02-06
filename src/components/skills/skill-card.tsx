"use client";

import Link from "next/link";
import { ExternalLink, Zap } from "lucide-react";
import { Skill } from "@/lib/data";
import { cn } from "@/lib/utils";

interface SkillCardProps {
  skill: Skill;
  index?: number;
}

export function SkillCard({ skill }: SkillCardProps) {
  return (
    <Link
      href={skill.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative block h-full",
        "rounded-xl overflow-hidden",
        "glass card-glow gradient-border-hover shimmer-scan",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      )}
    >
      {/* Content */}
      <div className="relative p-5 h-full flex flex-col gap-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary shrink-0 group-hover:bg-primary group-hover:text-background transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(0,212,255,0.3)]">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <h3 className="font-mono text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300 truncate">
              {skill.name}
            </h3>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/30 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all duration-300 shrink-0 mt-1 transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>

        {/* Description */}
        <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {skill.description}
        </p>

        {/* Category tag */}
        <div className="pt-2 border-t border-border/20">
          <span className="inline-flex items-center text-[11px] font-medium text-muted-foreground/50 tracking-wide uppercase">
            {skill.category}
          </span>
        </div>
      </div>
    </Link>
  );
}
