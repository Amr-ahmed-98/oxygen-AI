"use client"

import { cn } from "@/lib/utils"

interface SidebarToggleProps {
  onClick: () => void
  isOpen?: boolean
}

export function SidebarToggle({ onClick, isOpen = false }: SidebarToggleProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed left-4 bottom-4 z-50",
        "flex flex-col items-center gap-2",
        "p-3 rounded-xl",
        "bg-sidebar border border-sidebar-border",
        "hover:bg-sidebar-accent transition-colors",
        "shadow-lg shadow-black/20",
        "group cursor-pointer"
      )}
      aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
    >
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-105 transition-transform">
        <span className="text-primary-foreground font-bold text-sm">N</span>
      </div>
      
      {/* Sidebar Icon */}
      <div className="w-8 h-8 rounded border border-muted-foreground/30 flex items-center justify-center bg-sidebar-accent/30 group-hover:border-muted-foreground/50 transition-colors">
        <div className="relative w-5 h-5">
          {/* Left sidebar section */}
          <div className="absolute left-0 top-0 w-2 h-full bg-muted-foreground/40 rounded-l" />
          {/* Right main section */}
          <div className="absolute right-0 top-0 w-3 h-full border-l border-muted-foreground/30" />
        </div>
      </div>
    </button>
  )
}

