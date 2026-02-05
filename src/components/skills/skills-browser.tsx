"use client";

import { useState, useMemo, useCallback } from "react";
import { Category, Skill } from "@/lib/data";
import { SkillCard } from "./skill-card";
import { SearchInput } from "./search-input";
import { CategoryFilter } from "./category-filter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

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
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="sticky top-16 z-40 -mx-4 px-4 py-4 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 max-w-md">
              <SearchInput value={search} onChange={handleSearchChange} />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-mono text-primary">{filteredSkills.length}</span>
              <span>个技能</span>
              {search && (
                <span className="text-xs">
                  (搜索: &quot;{search}&quot;)
                </span>
              )}
            </div>
          </div>
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
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <span className="text-2xl">?</span>
          </div>
          <h3 className="text-lg font-medium mb-2">未找到技能</h3>
          <p className="text-muted-foreground text-sm max-w-md">
            尝试调整搜索关键词或选择其他分类
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedSkills.map((skill, index) => (
              <div
                key={`${skill.url}-${index}`}
                className="animate-in fade-in slide-in-from-bottom-4 duration-300"
                style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
              >
                <SkillCard skill={skill} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="h-9 w-9 p-0"
              >
                <ChevronsLeft className="h-4 w-4" />
                <span className="sr-only">第一页</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-9 w-9 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">上一页</span>
              </Button>
              
              <div className="flex items-center gap-1 px-2">
                <span className="text-sm font-mono text-primary">{currentPage}</span>
                <span className="text-sm text-muted-foreground">/</span>
                <span className="text-sm font-mono text-muted-foreground">{totalPages}</span>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-9 w-9 p-0"
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">下一页</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="h-9 w-9 p-0"
              >
                <ChevronsRight className="h-4 w-4" />
                <span className="sr-only">最后一页</span>
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
