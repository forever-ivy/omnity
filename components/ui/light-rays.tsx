"use client";

import { cn } from "@/lib/utils";

export function LightRays({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-gradient-radial from-orange-200/40 via-orange-100/20 to-transparent" />
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 800"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        <defs>
          <linearGradient id="ray-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(249, 115, 22, 0.4)" />
            <stop offset="100%" stopColor="rgba(249, 115, 22, 0)" />
          </linearGradient>
        </defs>
        <g transform="translate(400, 400)">
          {Array.from({ length: 16 }).map((_, i) => (
            <line
              key={i}
              x1="0"
              y1="0"
              x2="0"
              y2="-400"
              stroke="url(#ray-gradient)"
              strokeWidth="3"
              transform={`rotate(${i * 22.5})`}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
