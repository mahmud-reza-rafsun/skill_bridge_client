"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  menu?: MenuItem[];
  auth?: {
    login: { title: string; url: string };
    signup: { title: string; url: string };
  };
}

const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 6H10V10H6V6Z" fill="#F97316" />
    <path d="M14 6H18V10H14V6Z" fill="#F97316" />
    <path d="M6 14H10V18H6V14Z" fill="#F97316" />
    <path d="M14 14H18V18H14V14Z" fill="#F97316" fillOpacity="0.5" />
  </svg>
);

export const Navbar = ({
  menu = [
    { title: "Home", url: "/" },
    { title: "Tutors", url: "/tutors" },
    { title: "Dashboard", url: "/dashboard" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Register", url: "/register" },
  },
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* 1. Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
            <LogoIcon />
            <span className="text-xl font-bold text-foreground group-hover:text-orange-500 transition-colors">
              Skill Bridge
            </span>
          </Link>

          {/* 2. Desktop Navigation (Simplified to prevent reloads) */}
          <nav className="hidden lg:flex items-center space-x-1 bg-muted/50 p-1 rounded-full border border-orange-500/10">
            {menu.map((item) => {
              const isActive = pathname === item.url;
              return (
                <Link
                  key={item.title}
                  href={item.url}
                  className={`inline-flex h-9 px-5 items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ease-in-out
                    ${isActive
                      ? "text-orange-500 font-bold"
                      : "text-muted-foreground hover:text-orange-500"
                    }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* 3. Right Side Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <ModeToggle />

            <Button asChild variant="secondary" className="rounded-lg font-semibold text-sm bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20 border-none transition-colors">
              <Link href={auth.login.url}>{auth.login.title}</Link>
            </Button>

            <Button asChild className="rounded-lg font-semibold text-sm bg-orange-500 hover:bg-orange-600 text-white border-none shadow-md shadow-orange-500/20 transition-all transform hover:scale-105 active:scale-95">
              <Link href={auth.signup.url}>{auth.signup.title}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-muted-foreground hover:text-orange-500"
            >
              {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-background border-b p-4 space-y-2 shadow-xl animate-in slide-in-from-top-5">
          {menu.map((item) => {
            const isActive = pathname === item.url;
            return (
              <Link
                key={item.title}
                href={item.url}
                className={`block px-4 py-2 text-base font-medium rounded-md transition-colors 
                  ${isActive ? "text-orange-500 font-bold" : "hover:text-orange-500 hover:bg-accent"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </Link>
            );
          })}
          <div className="pt-4 border-t space-y-2">
            <Button asChild variant="secondary" className="w-full justify-center rounded-lg bg-orange-500/10 text-orange-600 border-none">
              <Link href={auth.login.url} onClick={() => setIsMenuOpen(false)}>
                {auth.login.title}
              </Link>
            </Button>
            <Button asChild className="w-full justify-center rounded-lg bg-orange-500 hover:bg-orange-600 text-white border-none">
              <Link href={auth.signup.url} onClick={() => setIsMenuOpen(false)}>
                {auth.signup.title}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};