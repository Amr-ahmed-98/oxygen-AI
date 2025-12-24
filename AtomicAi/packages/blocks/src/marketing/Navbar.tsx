/**
 * ============================================
 * Marketing Block: Navbar
 * ============================================
 */

import React, { useState } from "react";
import { AtomButton } from "@atomic-ai/ui";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarProps {
  logo?: React.ReactNode;
  links?: NavLink[];
  ctaText?: string;
  ctaHref?: string;
  mobileMenu?: boolean;
}

export function Navbar({
  logo,
  links = [],
  ctaText = "Get Started",
  ctaHref = "#",
  mobileMenu = true,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar-section border-b border-neutral-200 bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {logo && <div className="flex-shrink-0">{logo}</div>}
          
          {links.length > 0 && (
            <>
              {mobileMenu && (
                <button
                  className="md:hidden"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label="Toggle menu"
                >
                  {isOpen ? "✕" : "☰"}
                </button>
              )}
              <div className={`${mobileMenu ? "hidden md:flex" : "flex"} items-center gap-6`}>
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-neutral-700 hover:text-primary-600 font-medium"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </>
          )}
          
          {ctaText && (
            <AtomButton variant="solid" tone="primary" size="md">
              {ctaText}
            </AtomButton>
          )}
        </div>
        
        {mobileMenu && isOpen && links.length > 0 && (
          <div className="md:hidden py-4 border-t border-neutral-200">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="block py-2 text-neutral-700 hover:text-primary-600"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

