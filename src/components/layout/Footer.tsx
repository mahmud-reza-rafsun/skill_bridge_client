"use client";

import Link from "next/link";

const Footer = () => {
  const footerLinks = {
    "Skill Bridge": [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Pricing", href: "/pricing" },
      { name: "Mentors", href: "/mentors" },
    ],
    Learning: [
      { name: "All Courses", href: "/courses" },
      { name: "Learning Paths", href: "/paths" },
      { name: "Student Stories", href: "/stories" },
      { name: "Community", href: "/community" },
    ],
    Resources: [
      { name: "FAQs", href: "/faq" },
      { name: "Quick Start", href: "/start" },
      { name: "Documentation", href: "/docs" },
      { name: "User Guide", href: "/guide" },
    ],
    Support: [
      { name: "Help Center", href: "/help" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Contact", href: "/contact" },
    ],
  };

  const socialLinks = [
    {
      label: "Twitter", href: "#", icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
      )
    },
    {
      label: "LinkedIn", href: "#", icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93-1.11 0-1.62.77-1.62 1.93V19h-3v-9h2.93v1.3a2.93 2.93 0 012.71-1.55c1.8 0 3.36 1.08 3.36 3.93z" /></svg>
      )
    },
    {
      label: "YouTube", href: "#", icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
      )
    }
  ];

  return (
    <footer className="w-full bg-background border-t border-orange-500/10">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8 py-16">

          {/* Brand Column */}
          <div className="col-span-full lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 justify-center lg:justify-start">
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 bg-orange-500 rounded-sm"></span>
                <span className="w-2.5 h-2.5 bg-orange-500/50 rounded-sm"></span>
              </div>
              <span className="text-xl font-bold">Skill Bridge</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-8 text-center lg:text-left max-w-xs">
              Empowering learners worldwide through quality education and expert mentorship. Build your future with us.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Button asChild className="rounded-full bg-orange-500 hover:bg-orange-600 text-white border-none h-10 px-6">
                <Link href="/contact">Contact us</Link>
              </Button>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="text-left">
              <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-6">
                {title}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-orange-500 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-orange-500/10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <span className="text-sm text-muted-foreground">
            © 2026 <span className="text-orange-500 font-semibold">Skill Bridge</span>. All rights reserved.
          </span>

          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="w-10 h-10 rounded-full bg-muted flex justify-center items-center text-muted-foreground hover:bg-orange-500/10 hover:text-orange-500 transition-all duration-300 shadow-sm"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// Re-using Shadcn Button for consistency
import { Button } from "@/components/ui/button";

export default Footer;