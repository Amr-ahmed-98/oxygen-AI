"use client"

import { useState } from "react"
import { Sparkles, Globe, ChevronDown, ChevronUp, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export function ChatHeader() {
  const [isModelOpen, setIsModelOpen] = useState(false)
  const [isGlobeOpen, setIsGlobeOpen] = useState(false)

  return (
    <div className="w-full border-b border-secondary/30 pb-3">
      <div className="flex items-center gap-3">
        {/* New Conversation Button - Square with teal background and black plus */}
        <button
          className="w-9 h-9 rounded-md bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors shrink-0 cursor-pointer"
          aria-label="New conversation"
        >
          <Plus className="w-5 h-5 text-foreground" strokeWidth={3} />
        </button>

        {/* AI Sparkles Icon - Orange with plus overlay */}
        <div className="relative">
          <Sparkles className="w-5 h-5 text-orange-500" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full flex items-center justify-center">
            <Plus className="w-1.5 h-1.5 text-orange-600" strokeWidth={3} />
          </div>
        </div>

        {/* Model Selector - "Claude 3.5" with up/down chevrons */}
        <button
          onClick={() => setIsModelOpen(!isModelOpen)}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-sidebar-accent/50 transition-colors group cursor-pointer"
        >
          <span className="text-sm font-medium text-foreground">Claude 3.5</span>
          <div className="flex flex-col gap-0">
            <ChevronUp className="w-3 h-3 text-muted-foreground group-hover:text-foreground transition-colors -mb-0.5" />
            <ChevronDown className="w-3 h-3 text-muted-foreground group-hover:text-foreground transition-colors -mt-0.5" />
          </div>
        </button>

        {/* Globe Icon with Dropdown */}
        <button
          onClick={() => setIsGlobeOpen(!isGlobeOpen)}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-sidebar-accent/50 transition-colors group ml-auto cursor-pointer"
        >
          <Globe className="w-5 h-5 text-secondary" />
          <div className="flex flex-col gap-0">
            <ChevronUp className="w-3 h-3 text-muted-foreground group-hover:text-foreground transition-colors -mb-0.5" />
            <ChevronDown className="w-3 h-3 text-muted-foreground group-hover:text-foreground transition-colors -mt-0.5" />
          </div>
        </button>
      </div>
    </div>
  )
}

