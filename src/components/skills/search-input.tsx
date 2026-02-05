"use client";

import { Search, X, Command } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder = "搜索技能名称或描述..." }: SearchInputProps) {
  return (
    <div className="relative group">
      {/* Glow effect on focus */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-xl opacity-0 group-focus-within:opacity-100 blur-sm transition-opacity duration-300" />
      
      <div className="relative flex items-center">
        <Search className="absolute left-4 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full h-12 pl-11 pr-24 rounded-xl",
            "bg-card/50 backdrop-blur-sm",
            "border border-border/50",
            "text-foreground placeholder:text-muted-foreground/50",
            "focus:outline-none focus:border-primary/50 focus:bg-card/80",
            "transition-all duration-300"
          )}
        />
        
        {/* Keyboard hint or clear button */}
        <div className="absolute right-3 flex items-center gap-2">
          {value ? (
            <button
              onClick={() => onChange("")}
              className="flex items-center justify-center w-7 h-7 rounded-md bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-3.5 w-3.5" />
              <span className="sr-only">清除</span>
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground/50">
              <kbd className="flex items-center justify-center w-5 h-5 rounded border border-border/50 bg-muted/30">
                <Command className="w-3 h-3" />
              </kbd>
              <kbd className="flex items-center justify-center w-5 h-5 rounded border border-border/50 bg-muted/30 font-mono">
                K
              </kbd>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
