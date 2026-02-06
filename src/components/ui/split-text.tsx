"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  splitType?: "chars" | "words";
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  from?: "bottom" | "top" | "left" | "right";
  threshold?: number;
}

export function SplitText({
  text,
  className,
  delay = 30,
  duration = 0.6,
  splitType = "chars",
  tag: Tag = "p",
  from = "bottom",
  threshold = 0.1,
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  const pieces = useMemo(() => {
    if (splitType === "words") return text.split(/(\s+)/);
    return text.split("");
  }, [text, splitType]);

  const fromTransform = {
    bottom: "translateY(40px)",
    top: "translateY(-40px)",
    left: "translateX(-40px)",
    right: "translateX(40px)",
  }[from];

  return (
    <Tag ref={ref as React.Ref<HTMLDivElement & HTMLHeadingElement & HTMLParagraphElement>} className={cn("inline-block", className)}>
      {pieces.map((piece, i) => {
        const isSpace = /^\s+$/.test(piece);
        if (isSpace) return <span key={i}>&nbsp;</span>;
        return (
          <span
            key={i}
            className="inline-block"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "none" : fromTransform,
              transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`,
              transitionDelay: isVisible ? `${i * delay}ms` : "0ms",
              willChange: "opacity, transform",
            }}
          >
            {piece}
          </span>
        );
      })}
    </Tag>
  );
}
