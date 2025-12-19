"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  MessageSquarePlus, 
  Search, 
  MessageCircle, 
  Settings, 
  HelpCircle, 
  CreditCard,
  Users,
  LogOut,
  Sparkles,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { Images } from "@/assets/images"

interface ChatItem {
  id: string
  title: string
  href: string
}

interface ChatCategory {
  label: string
  chats: ChatItem[]
}

const chatCategories: ChatCategory[] = [
  {
    label: "Today",
    chats: [
      { id: "1", title: "E-commerce Platform Design", href: "/chat/1" },
      { id: "2", title: "Mobile App Wireframe", href: "/chat/2" },
    ]
  },
  {
    label: "This Week",
    chats: [
      { id: "3", title: "Dashboard Analytics UI", href: "/chat/3" },
      { id: "4", title: "Landing Page Concepts", href: "/chat/4" },
      { id: "5", title: "Portfolio Website", href: "/chat/5" },
    ]
  },
  {
    label: "Earlier",
    chats: [
      { id: "6", title: "SaaS Product Interface", href: "/chat/6" },
    ]
  }
]

const menuItems = [
  { icon: Sparkles, label: "Upgrade Plan", href: "/upgrade", color: "text-primary" },
  { icon: Settings, label: "Preferences", href: "/settings", color: "text-foreground" },
  { icon: HelpCircle, label: "Documentation", href: "/docs", color: "text-foreground" },
  { icon: CreditCard, label: "Billing & Plans", href: "/billing", color: "text-foreground" },
  { icon: Users, label: "Team Members", href: "/team", color: "text-foreground" },
  { icon: LogOut, label: "Sign Out", href: "/logout", color: "text-destructive" },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeChat, setActiveChat] = useState<string | null>(null)

  const filteredCategories = chatCategories.map(category => ({
    ...category,
    chats: category.chats.filter(chat => 
      chat.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.chats.length > 0)

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden cursor-pointer"
          onClick={onClose}
        />
      )}
      <aside className={cn(
        "dark fixed left-0 top-0 h-screen w-72 bg-sidebar border-r border-sidebar-border flex flex-col z-40 transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
      {/* Header Section */}
      <div className="p-6 border-b border-sidebar-border">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 mb-6 group cursor-pointer">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-105 transition-transform">
            <Image 
              src={Images.logo} 
              alt="OxyGen AI Logo" 
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground leading-tight">
              OxyGen <span className="text-primary">AI</span>
            </span>
            <span className="text-xs text-muted-foreground">Creative Studio</span>
          </div>
        </Link>

        {/* New Conversation Button */}
        <Button 
          className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90 font-semibold shadow-lg shadow-primary/20 mb-4"
          asChild
        >
          <Link href="/chat/new">
            <MessageSquarePlus className="w-5 h-5" />
            New Conversation
          </Link>
        </Button>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-sidebar-accent/50 border border-sidebar-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sidebar-ring focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Chat List Section */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
          Recent Conversations
        </h3>
        
        <div className="space-y-6">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <div key={category.label} className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground px-2">
                  {category.label}
                </h4>
                <div className="space-y-1">
                  {category.chats.map((chat) => (
                    <Link
                      key={chat.id}
                      href={chat.href}
                      onClick={() => setActiveChat(chat.id)}
                      className={cn(
                        "group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer",
                        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        activeChat === chat.id 
                          ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm" 
                          : "text-foreground"
                      )}
                    >
                      <MessageCircle className="w-4 h-4 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                      <span className="text-sm font-medium truncate flex-1">
                        {chat.title}
                      </span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-60 transition-opacity shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No conversations found
            </div>
          )}
        </div>
      </div>

      {/* Menu Items Section */}
      <div className="border-t border-sidebar-border p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group cursor-pointer",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                "text-foreground"
              )}
            >
              <Icon className={cn("w-4 h-4 shrink-0", item.color)} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>

      {/* User Profile Section */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-sidebar-accent/50 transition-colors cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <span className="text-primary-foreground font-bold text-sm">U</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">
              user@oxygenai.com
            </p>
            <p className="text-xs text-muted-foreground truncate">
              Pro Member
            </p>
          </div>
        </div>
      </div>
    </aside>
    </>
  )
}

