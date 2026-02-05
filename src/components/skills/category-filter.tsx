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
        {/* All button */}
        <button
          onClick={() => onSelect(null)}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
            "border",
            selected === null
              ? "bg-primary text-background border-primary glow-sm"
              : "bg-transparent text-muted-foreground border-border/50 hover:border-primary/50 hover:text-foreground"
          )}
        >
          <span>全部</span>
          <span className={cn(
            "text-xs px-1.5 py-0.5 rounded-full",
            selected === null 
              ? "bg-background/20 text-background" 
              : "bg-muted text-muted-foreground"
          )}>
            {totalCount}
          </span>
        </button>

        {/* Category buttons */}
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelect(category === selected ? null : category)}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              "border shrink-0",
              selected === category
                ? "bg-primary text-background border-primary glow-sm"
                : "bg-transparent text-muted-foreground border-border/50 hover:border-primary/50 hover:text-foreground"
            )}
          >
            <span className="truncate max-w-[150px]">{category}</span>
            <span className={cn(
              "text-xs px-1.5 py-0.5 rounded-full",
              selected === category 
                ? "bg-background/20 text-background" 
                : "bg-muted text-muted-foreground"
            )}>
              {counts[category] || 0}
            </span>
          </button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="h-2" />
    </ScrollArea>
  );
}
