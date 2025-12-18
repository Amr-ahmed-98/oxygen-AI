import { cn } from "@/lib/utils"

interface TextProps {
  firstText: string
  lastText: string
  firstClassName?: string
  lastClassName?: string
  className?: string
}

export function Text({
  firstText,
  lastText,
  firstClassName,
  lastClassName = "text-secondary", // cyan/blue accent from your design
  className,
}: TextProps) {
  return (
    <h1 className={cn("font-bold tracking-wide", className)}>
      <span className={cn("text-foreground", firstClassName)}>
        {firstText}{" "}
      </span>
      <span className={lastClassName}>
        {lastText}
      </span>
    </h1>
  )
}
