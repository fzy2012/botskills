"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface CategoryFilterProps {
  categories: string[];
  selected: string | null;
  onSelect: (category: string | null) => void;
  counts: Record<string, number>;
}

export function CategoryFilter({ categories, selected, onSelect, counts }: CategoryFilterProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-2 pb-3">
        <Button
          variant={selected === null ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect(null)}
          className={cn(
            "shrink-0 h-8 px-4 rounded-full transition-all",
            selected === null 
              ? "bg-primary text-primary-foreground glow-cyan" 
              : "border-border/50 hover:border-primary/50 hover:text-primary"
          )}
        >
          全部
          <span className="ml-1.5 text-xs opacity-70">
            {Object.values(counts).reduce((a, b) => a + b, 0)}
          </span>
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selected === category ? "default" : "outline"}
            size="sm"
            onClick={() => onSelect(category)}
            className={cn(
              "shrink-0 h-8 px-4 rounded-full transition-all",
              selected === category 
                ? "bg-primary text-primary-foreground glow-cyan" 
                : "border-border/50 hover:border-primary/50 hover:text-primary"
            )}
          >
            {category}
            <span className="ml-1.5 text-xs opacity-70">{counts[category] || 0}</span>
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="h-2" />
    </ScrollArea>
  );
}
