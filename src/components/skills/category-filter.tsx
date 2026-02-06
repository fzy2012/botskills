"use client";

import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface CategoryFilterProps {
  categories: string[];
  selected: string | null;
  onSelect: (category: string | null) => void;
  counts: Record<string, number>;
}

export function CategoryFilter({
  categories,
  selected,
  onSelect,
  counts,
}: CategoryFilterProps) {
  const totalCount = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-2 pb-2">
        {/* All */}
        <button
          onClick={() => onSelect(null)}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 border shrink-0",
            selected === null
              ? "pill-active font-medium"
              : "bg-transparent text-muted-foreground/70 border-border/40 hover:border-primary/30 hover:text-foreground"
          )}
        >
          <span>全部</span>
          <span
            className={cn(
              "text-[11px] tabular-nums px-1.5 py-px rounded-full",
              selected === null
                ? "bg-primary/20 text-primary"
                : "bg-muted/50 text-muted-foreground/50"
            )}
          >
            {totalCount}
          </span>
        </button>

        {/* Category buttons */}
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelect(category === selected ? null : category)}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 border shrink-0",
              selected === category
                ? "pill-active font-medium"
                : "bg-transparent text-muted-foreground/70 border-border/40 hover:border-primary/30 hover:text-foreground"
            )}
          >
            <span className="truncate max-w-[140px]">{category}</span>
            <span
              className={cn(
                "text-[11px] tabular-nums px-1.5 py-px rounded-full",
                selected === category
                  ? "bg-primary/20 text-primary"
                  : "bg-muted/50 text-muted-foreground/50"
              )}
            >
              {counts[category] || 0}
            </span>
          </button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="h-1.5" />
    </ScrollArea>
  );
}
