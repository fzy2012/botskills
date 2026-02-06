"use client";

import { Search, X } from "lucide-react";
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "搜索技能名称或描述...",
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  /* Cmd/Ctrl + K shortcut */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="relative group">
      {/* Subtle glow on focus */}
      <div className="absolute -inset-px bg-gradient-to-r from-primary/15 via-accent/15 to-primary/15 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-500" />

      <div className="relative flex items-center">
        <Search className="absolute left-4 h-4 w-4 text-muted-foreground/60 group-focus-within:text-primary transition-colors duration-300" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full h-12 pl-11 pr-24 rounded-xl",
            "glass",
            "text-foreground placeholder:text-muted-foreground/40",
            "focus:outline-none focus:border-primary/40",
            "transition-all duration-300"
          )}
        />

        {/* Right: clear or keyboard hint */}
        <div className="absolute right-3 flex items-center gap-1.5">
          {value ? (
            <button
              onClick={() => onChange("")}
              className="flex items-center justify-center w-7 h-7 rounded-md bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="清除搜索"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-1 text-[11px] text-muted-foreground/40">
              <kbd className="flex items-center justify-center px-1.5 h-5 rounded border border-border/40 bg-muted/20 font-mono">
                {"⌘"}
              </kbd>
              <kbd className="flex items-center justify-center px-1.5 h-5 rounded border border-border/40 bg-muted/20 font-mono">
                K
              </kbd>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
