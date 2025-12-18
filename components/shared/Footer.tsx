import Link from "next/link"
import Image from "next/image"
import { Icons } from "@/assets/icons" 
import { Images } from "@/assets/images"

const footerLinks = {
  resources: [
    { name: "Blog", href: "/blog" },
    { name: "Gallery", href: "/gallery" },
    { name: "Samples", href: "/samples" },
  ],
  company: [
    { name: "FAQ", href: "/faq" },
    { name: "Terms", href: "/terms" },
    { name: "About", href: "/about" },
  ],
  community: [
    { name: "Linkedin", href: "https://linkedin.com", icon: Icons.Linkedin },
    { name: "Instagram", href: "https://instagram.com", icon: Icons.Instagram },
    { name: "Facebook", href: "https://facebook.com", icon: Icons.Facebook },
  ],
}

const Footer = () => {
  return (
    <footer className="dark w-full bg-background">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Logo Section */}
          <div className="flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-10 h-10">
                <Image 
                  src={Images.logo} 
                  alt="Oxygen AI Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-wide text-foreground">
                OXYGEN <span className="text-primary">AI</span>
              </span>
            </Link>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-foreground font-bold text-lg mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-foreground font-bold text-lg mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Column */}
          <div>
            <h3 className="text-foreground font-bold text-lg mb-4">
              Community
            </h3>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => {
                const Icon = link.icon
                return (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm group"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

        </div>
      </div>

      {/* Copyright Section */}
      <div className="w-full bg-primary py-4">
        <div className="container mx-auto px-4">
          <p className="text-center text-primary-foreground text-sm font-medium">
            © 2025 Oxygen Ai - All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
