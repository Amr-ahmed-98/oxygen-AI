"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/Button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import {Icons} from "@/assets/icons"
import { Images } from "@/assets/images"

const navLinks = [
  { name: "SOLUTIONS", href: "/solutions" },
  { name: "PRICING", href: "/pricing" },
  { name: "SAMPLES", href: "/samples" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="dark w-full border-b border-white/10 bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-7 h-7 sm:w-8 sm:h-8">
            <Image 
              src={Images.logo} 
              alt="Atomic AI Logo" 
              fill
              className="object-contain"
            />
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-wide text-foreground">
            ATOMIC <span className="text-primary">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors tracking-wider"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button 
            variant="ghost" 
            className="text-primary hover:text-primary hover:bg-primary/10 font-medium"
          >
            Login
          </Button>
          
          <Button 
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-6"
          >
            Get started
          </Button>
        </div>

        {/* Mobile Hamburger Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-foreground hover:text-primary"
            >
              <Icons.Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent 
            side="right" 
            className="dark bg-background border-l border-white/10 w-[300px] sm:w-[400px]"
          >
            {/* Close Button */}
            <SheetClose className="absolute right-4 top-4">
              <Icons.X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </SheetClose>

            {/* Mobile Menu Content */}
            <div className="flex flex-col gap-8 mt-12">
              
              {/* Navigation Links */}
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-base font-medium text-muted-foreground hover:text-primary transition-colors tracking-wider py-2"
                      onClick={() => setOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </SheetClose>
                ))}
              </div>

              {/* Auth Buttons */}
              <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                <Button 
                  variant="outline" 
                  className="w-full border-primary text-primary hover:bg-primary/10 font-medium"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Button>
                
                <Button 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
                  onClick={() => setOpen(false)}
                >
                  Get started
                </Button>
              </div>

            </div>
          </SheetContent>
        </Sheet>

      </div>
    </nav>
  )
}
