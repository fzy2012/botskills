"use client";

import { Aurora } from "./ui/aurora";

export function AuroraHero() {
  return (
    <div className="absolute inset-x-0 top-0 h-[700px] overflow-hidden pointer-events-none">
      <Aurora
        colorStops={["#00d4ff", "#7c3aed", "#00d4ff"]}
        amplitude={1.2}
        blend={0.6}
        speed={0.8}
        className="absolute inset-0 opacity-30"
      />
      {/* Fade out at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
