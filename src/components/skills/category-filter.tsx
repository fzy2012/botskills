"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  Globe,
  Bot,
  GitBranch,
  BookOpen,
  Cloud,
  Monitor,
  Image,
  Apple,
  Search,
  Wrench,
  Terminal,
  Megaphone,
  ListTodo,
  Brain,
  BarChart3,
  DollarSign,
  Film,
  StickyNote,
  Notebook,
  LayoutGrid,
  Train,
  GraduationCap,
  Heart,
  MessageSquare,
  Mic,
  Home,
  ShoppingCart,
  CalendarDays,
  FileText,
  Server,
  Shield,
  Gamepad2,
  ChevronDown,
  X,
  Check,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

// Icon mapping for categories
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "Web & Frontend Development": Globe,
  "Coding Agents & IDEs": Bot,
  "Git & GitHub": GitBranch,
  "Moltbook": BookOpen,
  "DevOps & Cloud": Cloud,
  "Browser & Automation": Monitor,
  "Image & Video Generation": Image,
  "Apple Apps & Services": Apple,
  "Search & Research": Search,
  "Clawdbot Tools": Wrench,
  "ClawHub": LayoutGrid,
  "CLI Utilities": Terminal,
  "Marketing & Sales": Megaphone,
  "Productivity & Tasks": ListTodo,
  "AI & LLMs": Brain,
  "Data & Analytics": BarChart3,
  "Finance": DollarSign,
  "Media & Streaming": Film,
  "Notes & PKM": StickyNote,
  "Notebook": Notebook,
  "Transportation": Train,
  "Personal Development": GraduationCap,
  "Health & Fitness": Heart,
  "Communication": MessageSquare,
  "Speech & Transcription": Mic,
  "Smart Home & IoT": Home,
  "Shopping & E-commerce": ShoppingCart,
  "Calendar & Scheduling": CalendarDays,
  "PDF & Documents": FileText,
  "Self-Hosted & Automation": Server,
  "Security & Passwords": Shield,
  "Gaming": Gamepad2,
};

function getIcon(name: string): LucideIcon {
  return CATEGORY_ICONS[name] || Sparkles;
}

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
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const totalCount = Object.values(counts).reduce((a, b) => a + b, 0);

  // Sort categories by count descending
  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => (counts[b] || 0) - (counts[a] || 0)),
    [categories, counts]
  );

  // Top 6 categories shown as quick pills
  const topCategories = useMemo(() => sortedCategories.slice(0, 6), [sortedCategories]);

  // Filtered categories for dropdown
  const filteredCategories = useMemo(() => {
    if (!query.trim()) return sortedCategories;
    const q = query.toLowerCase();
    return sortedCategories.filter((c) => c.toLowerCase().includes(q));
  }, [sortedCategories, query]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
        setFocusedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Keyboard nav
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) return;
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((i) => Math.min(i + 1, filteredCategories.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((i) => Math.max(i - 1, -1));
          break;
        case "Enter":
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < filteredCategories.length) {
            const cat = filteredCategories[focusedIndex];
            onSelect(cat === selected ? null : cat);
            setOpen(false);
            setQuery("");
            setFocusedIndex(-1);
          }
          break;
        case "Escape":
          setOpen(false);
          setQuery("");
          setFocusedIndex(-1);
          break;
      }
    },
    [open, focusedIndex, filteredCategories, onSelect, selected]
  );

  const selectedIcon = selected ? getIcon(selected) : null;
  const SelectedIconComponent = selectedIcon;

  return (
    <div className="space-y-3">
      {/* Row 1: Quick pills + "More" dropdown trigger */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* "All" pill */}
        <button
          onClick={() => onSelect(null)}
          className={cn(
            "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm transition-all duration-300 border shrink-0",
            selected === null
              ? "pill-active font-medium"
              : "bg-transparent text-muted-foreground/70 border-border/40 hover:border-primary/30 hover:text-foreground"
          )}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{"全部"}</span>
          <span
            className={cn(
              "text-[11px] tabular-nums px-1.5 py-px rounded-full ml-0.5",
              selected === null
                ? "bg-primary/20 text-primary"
                : "bg-muted/50 text-muted-foreground/50"
            )}
          >
            {totalCount}
          </span>
        </button>

        {/* Top quick-access pills */}
        {topCategories.map((category) => {
          const Icon = getIcon(category);
          const isSelected = selected === category;
          return (
            <button
              key={category}
              onClick={() => onSelect(isSelected ? null : category)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm transition-all duration-300 border shrink-0",
                isSelected
                  ? "pill-active font-medium"
                  : "bg-transparent text-muted-foreground/70 border-border/40 hover:border-primary/30 hover:text-foreground"
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="max-w-[120px] truncate">{category}</span>
              <span
                className={cn(
                  "text-[11px] tabular-nums px-1.5 py-px rounded-full",
                  isSelected
                    ? "bg-primary/20 text-primary"
                    : "bg-muted/50 text-muted-foreground/50"
                )}
              >
                {counts[category] || 0}
              </span>
            </button>
          );
        })}

        {/* "More categories" dropdown trigger */}
        <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
          <button
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm transition-all duration-300 border shrink-0",
              open
                ? "border-primary/50 text-primary bg-primary/5"
                : selected && !topCategories.includes(selected)
                  ? "pill-active font-medium"
                  : "bg-transparent text-muted-foreground/70 border-border/40 hover:border-primary/30 hover:text-foreground"
            )}
          >
            {selected && !topCategories.includes(selected) && SelectedIconComponent ? (
              <>
                <SelectedIconComponent className="w-3.5 h-3.5" />
                <span className="max-w-[120px] truncate">{selected}</span>
                <span className="text-[11px] tabular-nums px-1.5 py-px rounded-full bg-primary/20 text-primary">
                  {counts[selected] || 0}
                </span>
              </>
            ) : (
              <>
                <span>{"更多分类"}</span>
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 transition-transform duration-200",
                    open && "rotate-180"
                  )}
                />
              </>
            )}
          </button>

          {/* Dropdown panel */}
          {open && (
            <div className="absolute top-full left-0 mt-2 w-80 max-h-96 rounded-xl glass-strong border border-border/50 shadow-2xl shadow-black/40 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Search bar */}
              <div className="p-3 border-b border-border/30">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/50" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setFocusedIndex(-1);
                    }}
                    placeholder="搜索分类..."
                    className="w-full h-9 pl-9 pr-3 rounded-lg bg-muted/30 border border-border/30 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 transition-colors"
                  />
                  {query && (
                    <button
                      onClick={() => {
                        setQuery("");
                        inputRef.current?.focus();
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 rounded flex items-center justify-center text-muted-foreground/50 hover:text-foreground transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category list */}
              <div className="overflow-y-auto max-h-72 py-1.5 custom-scrollbar">
                {filteredCategories.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-muted-foreground/50">
                    {"未找到匹配的分类"}
                  </div>
                ) : (
                  filteredCategories.map((category, index) => {
                    const Icon = getIcon(category);
                    const isSelected = selected === category;
                    const isFocused = focusedIndex === index;
                    return (
                      <button
                        key={category}
                        onClick={() => {
                          onSelect(isSelected ? null : category);
                          setOpen(false);
                          setQuery("");
                          setFocusedIndex(-1);
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2.5 mx-1.5 rounded-lg text-sm transition-all duration-150",
                          "hover:bg-primary/5",
                          isSelected && "bg-primary/10 text-primary",
                          isFocused && "bg-primary/5 outline outline-1 outline-primary/30",
                          !isSelected && !isFocused && "text-foreground/80"
                        )}
                        style={{ width: "calc(100% - 12px)" }}
                      >
                        <div
                          className={cn(
                            "flex items-center justify-center w-8 h-8 rounded-lg shrink-0 transition-colors duration-200",
                            isSelected
                              ? "bg-primary/15 text-primary"
                              : "bg-muted/40 text-muted-foreground/60"
                          )}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 text-left min-w-0">
                          <div className="truncate font-medium">{category}</div>
                          <div className="text-[11px] text-muted-foreground/50 tabular-nums">
                            {counts[category] || 0} 个技能
                          </div>
                        </div>
                        {isSelected && (
                          <Check className="w-4 h-4 text-primary shrink-0" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Active filter clear button (when a category is selected) */}
        {selected && (
          <button
            onClick={() => onSelect(null)}
            className="inline-flex items-center gap-1 px-2 py-1.5 rounded-full text-xs text-muted-foreground/60 hover:text-foreground border border-border/30 hover:border-destructive/30 hover:text-destructive transition-all duration-200"
          >
            <X className="w-3 h-3" />
            <span>{"清除筛选"}</span>
          </button>
        )}
      </div>
    </div>
  );
}
