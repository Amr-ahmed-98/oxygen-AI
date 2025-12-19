"use client"

import { useState } from "react"
import Image from "next/image"
import { Github, Mail, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { Images } from "@/assets/images"

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultView?: "login" | "signup"
}

export function AuthModal({ open, onOpenChange, defaultView = "login" }: AuthModalProps) {
  const [view, setView] = useState<"login" | "signup">(defaultView)

  const handleGoogleAuth = () => {
    console.log("Continue with Google")
    // Add your Google auth logic here
  }

  const handleGithubAuth = () => {
    console.log("Continue with GitHub")
    // Add your GitHub auth logic here
  }

  const handleEmailAuth = () => {
    console.log("Continue with email")
    // Add your email auth logic here
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-sidebar-border">
        <DialogHeader className="space-y-3">
          {/* Logo */}
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Image 
                src={Images.logo} 
                alt="OxyGen AI Logo" 
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
          </div>

          <DialogTitle className="text-2xl font-bold text-center text-foreground">
            {view === "login" ? "Welcome Back" : "Get Started"}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            {view === "login" 
              ? "Sign in to continue building with AI" 
              : "Create your account to start building"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          {/* Google Auth */}
          <Button
            onClick={handleGoogleAuth}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-12 relative group"
          >
            <div className="absolute left-4 flex items-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </div>
            <span>Continue with Google</span>
            {view === "login" && (
              <span className="absolute right-4 text-xs bg-blue-500 px-2 py-0.5 rounded-full">
                Last used
              </span>
            )}
          </Button>

          {/* GitHub Auth */}
          <Button
            onClick={handleGithubAuth}
            variant="outline"
            className="w-full border-sidebar-border bg-sidebar-accent/30 hover:bg-sidebar-accent/50 text-foreground font-medium h-12"
          >
            <Github className="w-5 h-5 mr-3" />
            Continue with GitHub
          </Button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-sidebar-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          {/* Email Auth */}
          <Button
            onClick={handleEmailAuth}
            variant="outline"
            className="w-full border-2 border-sidebar-border bg-background hover:bg-sidebar-accent/30 text-foreground font-medium h-12"
          >
            <Mail className="w-5 h-5 mr-3" />
            Continue with Email
          </Button>

          {/* Toggle between login and signup */}
          <div className="text-center text-sm text-muted-foreground pt-4">
            {view === "login" ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => setView("signup")}
                  className="text-primary hover:text-primary/80 font-medium underline-offset-4 hover:underline cursor-pointer"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setView("login")}
                  className="text-primary hover:text-primary/80 font-medium underline-offset-4 hover:underline cursor-pointer"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

