"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/Button"
import { Sparkles, Globe, Smartphone } from "lucide-react"
import { cn } from "@/lib/utils"

// Zod Schema
const chatInputSchema = z.object({
  prompt: z
    .string()
    .min(3, "Prompt must be at least 3 characters")
    .max(500, "Prompt must be less than 500 characters"),
})

type ChatInputValues = z.infer<typeof chatInputSchema>

interface ChatInputProps {
  placeholder?: string
  buttonText?: string
  onSubmit?: (values: ChatInputValues) => void
  className?: string
  showIcons?: boolean
}

export function ChatInput({
  placeholder = "Let's build an digital marketing landing page",
  buttonText = "Build Now",
  onSubmit,
  className,
  showIcons = true,
}: ChatInputProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ChatInputValues>({
    resolver: zodResolver(chatInputSchema),
    defaultValues: {
      prompt: "",
    },
  })

  const onSubmitForm = async (data: ChatInputValues) => {
    await onSubmit?.(data)
    reset() // Clear form after submission
  }

  return (
    <div
      className={cn(
        "w-full max-w-3xl mx-auto",
        "border-2 border-secondary rounded-lg",
        "bg-card/50 backdrop-blur-sm",
        "p-6",
        className
      )}
    >
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
        {/* Input Field */}
        <div>
          <input
            {...register("prompt")}
            type="text"
            placeholder={placeholder}
            className={cn(
              "w-full bg-transparent border-none outline-none",
              "text-foreground placeholder:text-muted-foreground",
              "text-base sm:text-lg font-normal",
              "focus:outline-none",
              errors.prompt && "text-destructive"
            )}
          />
          {errors.prompt && (
            <p className="text-destructive text-sm mt-2">
              {errors.prompt.message}
            </p>
          )}
        </div>

        {/* Bottom Section: Icons + Button */}
        <div className="flex items-center justify-between pt-2">
          {/* Icon Buttons */}
          {showIcons && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors"
                aria-label="Add content"
              >
                <div className="w-4 h-4 bg-primary/20 rounded-sm" />
              </button>

              <button
                type="button"
                className="p-2 rounded-md hover:bg-muted/30 transition-colors text-muted-foreground"
                aria-label="AI Assistant"
              >
                <Sparkles className="w-5 h-5 text-orange-500" />
              </button>

              <div className="flex items-center gap-1 px-3 py-1.5 bg-muted/30 rounded-md text-sm text-muted-foreground">
                <span>Claude 3.5</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              <button
                type="button"
                className="p-2 rounded-md hover:bg-muted/30 transition-colors text-muted-foreground"
                aria-label="Web"
              >
                <Globe className="w-5 h-5" />
              </button>

              <button
                type="button"
                className="p-2 rounded-md hover:bg-muted/30 transition-colors text-muted-foreground"
                aria-label="Mobile"
              >
                <Smartphone className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-6 ml-auto disabled:opacity-50"
          >
            {isSubmitting ? "Building..." : buttonText}
          </Button>
        </div>
      </form>
    </div>
  )
}
