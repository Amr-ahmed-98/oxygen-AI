/**
 * ============================================
 * Marketing Block: Footer
 * ============================================
 */

import React from "react";

export interface FooterLink {
  title: string;
  links: Array<{ label: string; href: string }>;
}

export interface FooterProps {
  logo?: React.ReactNode;
  description?: string;
  links?: FooterLink[];
  socialLinks?: Array<{ name: string; href: string; icon?: React.ReactNode }>;
  copyright?: string;
}

export function Footer({
  logo,
  description,
  links,
  socialLinks,
  copyright = `© ${new Date().getFullYear()} Company. All rights reserved.`,
}: FooterProps) {
  return (
    <footer className="footer-section bg-neutral-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {logo && (
            <div>
              {logo}
              {description && <p className="mt-4 text-neutral-400 text-sm">{description}</p>}
            </div>
          )}
          {links?.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className="text-neutral-400 hover:text-white text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {socialLinks && (
          <div className="flex gap-4 mb-8">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="text-neutral-400 hover:text-white"
                aria-label={social.name}
              >
                {social.icon || social.name}
              </a>
            ))}
          </div>
        )}
        <div className="border-t border-neutral-800 pt-8 text-center text-neutral-400 text-sm">
          {copyright}
        </div>
      </div>
    </footer>
  );
}

