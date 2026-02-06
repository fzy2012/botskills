"use client";

import { useState, useMemo, useCallback } from "react";
import useSWR from "swr";
import { Category, Skill } from "@/lib/data";
import { SkillCard } from "./skill-card";
import { SearchInput } from "./search-input";
import { CategoryFilter } from "./category-filter";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Sparkles,
  SearchX,
  LayoutGrid,
  List,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const ITEMS_PER_PAGE = 24;

function SkillsBrowserSkeleton() {
  return (
    <div className="space-y-6">
      <div className="sticky top-16 z-40 -mx-4 px-4 py-5 glass-strong border-b border-border/20">
        <div className="max-w-7xl mx-auto space-y-4">
          <Skeleton className="h-12 w-full max-w-md rounded-xl" />
          <div className="flex gap-2 overflow-hidden">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-24 rounded-full shrink-0" />
            ))}
          </div>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="h-44 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export function SkillsBrowser() {
  const { data, isLoading } = useSWR<{ categories: Category[] }>(
    "/api/skills",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  const categories = data?.categories ?? [];

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Flatten all skills
  const allSkills = useMemo<Skill[]>(
    () => categories.flatMap((cat) => cat.skills),
    [categories]
  );

  // Category data
  const categoryNames = useMemo(
    () => categories.map((c) => c.name),
    [categories]
  );
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach((cat) => {
      counts[cat.name] = cat.skills.length;
    });
    return counts;
  }, [categories]);

  // Filter
  const filteredSkills = useMemo(() => {
    let result = allSkills;

    if (selectedCategory) {
      result = result.filter((s) => s.category === selectedCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      );
    }

    return result;
  }, [allSkills, selectedCategory, search]);

  // Pagination
  const totalPages = Math.ceil(filteredSkills.length / ITEMS_PER_PAGE);
  const paginatedSkills = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredSkills.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredSkills, currentPage]);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  }, []);

  // Generate page numbers to show
  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);
    start = Math.max(1, end - maxVisible + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }, [currentPage, totalPages]);

  if (isLoading) {
    return <SkillsBrowserSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Sticky toolbar */}
      <div className="sticky top-16 z-40 -mx-4 px-4 py-5 glass-strong border-b border-border/20">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Top row: search + stats */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="w-full sm:max-w-md">
              <SearchInput value={search} onChange={handleSearchChange} />
            </div>
            <div className="flex items-center gap-3">
              {/* View toggle */}
              <div className="flex items-center gap-0.5 p-0.5 rounded-lg glass">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-2 rounded-md transition-all duration-200",
                    viewMode === "grid"
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground/50 hover:text-muted-foreground"
                  )}
                  aria-label="网格视图"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-2 rounded-md transition-all duration-200",
                    viewMode === "list"
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground/50 hover:text-muted-foreground"
                  )}
                  aria-label="列表视图"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Count badge */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/15">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-sm font-mono">
                  <span className="text-primary font-semibold tabular-nums">
                    {filteredSkills.length}
                  </span>
                  <span className="text-muted-foreground/70 ml-1">个技能</span>
                </span>
              </div>
            </div>
          </div>

          {/* Category filter row */}
          <CategoryFilter
            categories={categoryNames}
            selected={selectedCategory}
            onSelect={handleCategoryChange}
            counts={categoryCounts}
          />
        </div>
      </div>

      {/* Content */}
      {paginatedSkills.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-28 text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full" />
            <div className="relative w-20 h-20 rounded-2xl glass flex items-center justify-center">
              <SearchX className="w-8 h-8 text-muted-foreground/50" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            未找到匹配的技能
          </h3>
          <p className="text-muted-foreground text-sm max-w-md mb-6">
            尝试调整搜索关键词或选择其他分类来发现更多技能
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearch("");
              setSelectedCategory(null);
            }}
            className="border-primary/30 text-primary hover:bg-primary hover:text-background transition-all duration-300"
          >
            重置筛选条件
          </Button>
        </div>
      ) : (
        <>
          {/* Grid / List */}
          <div
            className={cn(
              viewMode === "grid"
                ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "flex flex-col gap-3"
            )}
          >
            {paginatedSkills.map((skill, index) => (
              <div
                key={`${skill.url}-${index}`}
                style={{
                  opacity: 0,
                  animation: `fade-in-up 0.4s cubic-bezier(0.16,1,0.3,1) ${Math.min(index * 25, 250)}ms forwards`,
                }}
              >
                <SkillCard skill={skill} index={index} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <ScrollReveal>
              <div className="flex items-center justify-center gap-1 pt-8 pb-4">
                <div className="flex items-center gap-1 p-1 rounded-xl glass">
                  {/* First / prev */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="h-9 w-9 p-0 rounded-lg disabled:opacity-20"
                  >
                    <ChevronsLeft className="h-4 w-4" />
                    <span className="sr-only">第一页</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((p) => Math.max(1, p - 1))
                    }
                    disabled={currentPage === 1}
                    className="h-9 w-9 p-0 rounded-lg disabled:opacity-20"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">上一页</span>
                  </Button>

                  {/* Page numbers */}
                  {pageNumbers.map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        "h-9 w-9 rounded-lg text-sm font-mono transition-all duration-200",
                        page === currentPage
                          ? "bg-primary/15 text-primary font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                      )}
                    >
                      {page}
                    </button>
                  ))}

                  {/* Next / last */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="h-9 w-9 p-0 rounded-lg disabled:opacity-20"
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">下一页</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="h-9 w-9 p-0 rounded-lg disabled:opacity-20"
                  >
                    <ChevronsRight className="h-4 w-4" />
                    <span className="sr-only">最后一页</span>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          )}
        </>
      )}
    </div>
  );
}
