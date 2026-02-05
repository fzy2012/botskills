"use client";

import Link from "next/link";
import { ExternalLink, Zap } from "lucide-react";
import { Skill } from "@/lib/data";
import { cn } from "@/lib/utils";

interface SkillCardProps {
  skill: Skill;
  index?: number;
}

export function SkillCard({ skill, index = 0 }: SkillCardProps) {
  return (
    <Link
      href={skill.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative block h-full",
        "rounded-xl overflow-hidden",
        "glass glass-hover card-shine",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      )}
      style={{
        animationDelay: `${Math.min(index * 40, 400)}ms`,
      }}
    >
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative p-5 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-background transition-colors duration-300">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="font-mono text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-tight truncate">
              {skill.name}
            </h3>
          </div>
          <ExternalLink className="w-4 h-4 text-muted-foreground/50 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all duration-300 shrink-0 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {skill.description}
        </p>

        {/* Category badge */}
        <div className="mt-3 pt-3 border-t border-border/30">
          <span className="inline-flex items-center text-xs font-medium text-muted-foreground/70">
            {skill.category}
          </span>
        </div>
      </div>
    </Link>
  );
}
