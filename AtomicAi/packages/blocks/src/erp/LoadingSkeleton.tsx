/**
 * ============================================
 * ERP Block: Loading Skeleton
 * ============================================
 */

import React from "react";

export interface LoadingSkeletonProps {
  rows?: number;
  columns?: number;
  variant?: "table" | "card" | "list";
}

export function LoadingSkeleton({
  rows = 5,
  columns = 4,
  variant = "table",
}: LoadingSkeletonProps) {
  if (variant === "table") {
    return (
      <div className="loading-skeleton">
        <div className="animate-pulse">
          <div className="space-y-4">
            {Array.from({ length: rows }).map((_, i) => (
              <div key={i} className="flex gap-4">
                {Array.from({ length: columns }).map((_, j) => (
                  <div
                    key={j}
                    className="h-4 bg-neutral-200 rounded flex-1"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className="loading-skeleton">
        <div className="animate-pulse space-y-4">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="p-4 border border-neutral-200 rounded-lg">
              <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-neutral-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="loading-skeleton">
      <div className="animate-pulse space-y-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-4 bg-neutral-200 rounded" />
        ))}
      </div>
    </div>
  );
}

