'use client';
import { Text } from "@/components/ui/Text"
import { ChatInput } from "@/components/shared/ChatInput"

export default function Home() {
  const handleBuild = (values: { prompt: string }) => {
    console.log("Building:", values.prompt)
    // Your build logic here
  }

  return (
    <section className="dark min-h-screen bg-background flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      
      {/* Background Decorative Circles (optional) */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-teal-900/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-900/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        
        {/* Main Title */}
        <Text 
          firstText="Welcome to OXYGEN"
          lastText="AI builder"
          className="text-4xl sm:text-5xl lg:text-6xl"
        />

        {/* Subtitle */}
        <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto">
          Next revolution of clean ui web apps and mobile apps
        </p>

        {/* Chat Input */}
        <div className="pt-8">
          <ChatInput 
            placeholder="Let's build an digital marketing landing page"
            buttonText="Build Now"
            onSubmit={handleBuild}
          />
        </div>
      </div>
    </section>
  )
}
