"use client"

import React, { useState } from 'react'
import { Sidebar } from '@/components/shared/Sidebar'
import { SidebarToggle } from '@/components/shared/SidebarToggle'
import { ChatHeader } from '@/components/shared/ChatHeader'
import { ChatInput } from '@/components/shared/ChatInput'
import { cn } from '@/lib/utils'

export default function ChatPage({ params }: { params: { chatId: string } }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleSubmit = (values: { prompt: string }) => {
    console.log("Chat message:", values.prompt)
    // Handle chat submission
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Main Content */}
      <main className={cn(
        "flex-1 flex flex-col overflow-hidden transition-all duration-300",
        isSidebarOpen ? "lg:ml-72" : "lg:ml-0"
      )}>
        {/* Chat Header */}
        <div className="p-4 sm:p-6 border-b border-sidebar-border">
          <ChatHeader />
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="p-6 bg-card rounded-lg border border-border">
              <p className="text-foreground">
                This is where your chat conversation would appear. The sidebar on the left 
                provides navigation and access to your recent conversations.
              </p>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 sm:p-6 border-t border-sidebar-border">
          <ChatInput 
            placeholder="Type your message..."
            buttonText="Send"
            onSubmit={handleSubmit}
            showIcons={false}
          />
        </div>
      </main>

      {/* Sidebar Toggle Button */}
      <SidebarToggle onClick={toggleSidebar} isOpen={isSidebarOpen} />
    </div>
  )
}