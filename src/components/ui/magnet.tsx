"use client";

import { useRef, useState, useCallback, type ReactNode } from "react";

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  strength?: number;
  disabled?: boolean;
  className?: string;
}

export function Magnet({
  children,
  padding = 60,
  strength = 2,
  disabled = false,
  className,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate3d(0,0,0)");
  const [active, setActive] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (disabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);
      const maxDist = Math.max(rect.width, rect.height) / 2 + padding;

      if (distance < maxDist) {
        setActive(true);
        const x = distX / strength;
        const y = distY / strength;
        setTransform(`translate3d(${x}px, ${y}px, 0)`);
      } else {
        setActive(false);
        setTransform("translate3d(0,0,0)");
      }
    },
    [disabled, padding, strength]
  );

  const handleMouseLeave = useCallback(() => {
    setActive(false);
    setTransform("translate3d(0,0,0)");
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: active ? "transform 0.2s ease-out" : "transform 0.4s ease-in-out",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
