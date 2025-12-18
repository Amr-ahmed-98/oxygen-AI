import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Text } from "@/components/ui/Text"

export default function NotFound() {
  return (
    <div className="dark min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        
        {/* 404 Title */}
        <Text 
          firstText="404"
          lastText="Page Not Found"
          className="text-5xl sm:text-6xl lg:text-7xl"
        />

        {/* Description */}
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Back Home Button */}
        <div className="pt-4">
          <Button 
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8"
          >
            <Link href="/">
              Go Back Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
