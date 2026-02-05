import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Skill } from "@/lib/data";
import { cn } from "@/lib/utils";

interface SkillCardProps {
  skill: Skill;
}

export function SkillCard({ skill }: SkillCardProps) {
  return (
    <Link
      href={skill.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative block h-full",
        "rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm",
        "p-5 transition-all duration-300",
        "hover:border-primary/50 hover:bg-card",
        "hover:shadow-lg hover:shadow-primary/5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      )}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-mono text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
            {skill.name}
          </h3>
          <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {skill.description}
        </p>
      </div>
    </Link>
  );
}
