"use client";

import { useState, useMemo, useCallback } from "react";
import { Category } from "@/lib/data";
import { SkillCard } from "./skill-card";
import { SearchInput } from "./search-input";
import { CategoryFilter } from "./category-filter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Sparkles, Search as SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillsBrowserProps {
  categories: Category[];
}

const ITEMS_PER_PAGE = 24;

export function SkillsBrowser({ categories }: SkillsBrowserProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Flatten all skills with category info
  const allSkills = useMemo(() => {
    return categories.flatMap((cat) => cat.skills);
  }, [categories]);

  // Category names and counts
  const categoryNames = useMemo(() => categories.map((c) => c.name), [categories]);
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach((cat) => {
      counts[cat.name] = cat.skills.length;
    });
    return counts;
  }, [categories]);

  // Filter skills based on search and category
  const filteredSkills = useMemo(() => {
    let result = allSkills;

    if (selectedCategory) {
      result = result.filter((skill) => skill.category === selectedCategory);
    }

    if (search.trim()) {
      const searchLower = search.toLowerCase().trim();
      result = result.filter(
        (skill) =>
          skill.name.toLowerCase().includes(searchLower) ||
          skill.description.toLowerCase().includes(searchLower)
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

  // Reset page when filters change
  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  }, []);

  return (
    <div className="space-y-8">
      {/* Search and Filter Bar */}
      <div className="sticky top-16 z-40 -mx-4 px-4 py-6 glass">
        <div className="max-w-7xl mx-auto space-y-5">
          {/* Search Row */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="w-full sm:max-w-md">
              <SearchInput value={search} onChange={handleSearchChange} />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-mono">
                  <span className="text-primary font-semibold">{filteredSkills.length}</span>
                  <span className="text-muted-foreground ml-1">个技能</span>
                </span>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <CategoryFilter
            categories={categoryNames}
            selected={selectedCategory}
            onSelect={handleCategoryChange}
            counts={categoryCounts}
          />
        </div>
      </div>

      {/* Skills Grid */}
      {paginatedSkills.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
            <div className="relative w-20 h-20 rounded-2xl glass flex items-center justify-center mb-6">
              <SearchIcon className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">未找到匹配的技能</h3>
          <p className="text-muted-foreground text-sm max-w-md mb-6">
            尝试调整搜索关键词或选择其他分类来发现更多技能
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearch("");
              setSelectedCategory(null);
            }}
            className="border-primary/50 text-primary hover:bg-primary hover:text-background"
          >
            重置筛选条件
          </Button>
        </div>
      ) : (
        <>
          {/* Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedSkills.map((skill, index) => (
              <div
                key={`${skill.url}-${index}`}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
                style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
              >
                <SkillCard skill={skill} index={index} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-8">
              <div className="flex items-center gap-1 p-1 rounded-xl glass">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className={cn(
                    "h-9 w-9 p-0 rounded-lg",
                    "disabled:opacity-30"
                  )}
                >
                  <ChevronsLeft className="h-4 w-4" />
                  <span className="sr-only">第一页</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={cn(
                    "h-9 w-9 p-0 rounded-lg",
                    "disabled:opacity-30"
                  )}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">上一页</span>
                </Button>
                
                {/* Page indicator */}
                <div className="flex items-center gap-2 px-4 min-w-[100px] justify-center">
                  <span className="text-sm font-mono text-primary font-semibold">{currentPage}</span>
                  <span className="text-muted-foreground/50">/</span>
                  <span className="text-sm font-mono text-muted-foreground">{totalPages}</span>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={cn(
                    "h-9 w-9 p-0 rounded-lg",
                    "disabled:opacity-30"
                  )}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">下一页</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className={cn(
                    "h-9 w-9 p-0 rounded-lg",
                    "disabled:opacity-30"
                  )}
                >
                  <ChevronsRight className="h-4 w-4" />
                  <span className="sr-only">最后一页</span>
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
