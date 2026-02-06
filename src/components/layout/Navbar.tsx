"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, User, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

interface NavbarProps {
  user?: any;
  menu?: { title: string; url: string }[];
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
  user,
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
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully");
            window.location.href = "/";
          },
        },
      });
    } catch (error) {
      toast.error("Failed to logout");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
            <LogoIcon />
            <span className="text-xl font-bold text-foreground group-hover:text-orange-500 transition-colors">
              Skill Bridge
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1 bg-muted/50 p-1 rounded-full border border-orange-500/10">
            {menu.map((item) => {
              const isActive = pathname === item.url;
              return (
                <Link
                  key={item.title}
                  href={item.url}
                  className={`inline-flex h-9 px-5 items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ease-in-out
                    ${isActive ? "text-orange-500 font-bold" : "text-muted-foreground hover:text-orange-500"}`}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <ModeToggle />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full border-2 border-orange-500/20 p-0 hover:bg-orange-500/10 transition-transform active:scale-95 focus-visible:ring-0">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback className="bg-orange-500 text-white font-bold">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-60 mt-2" align="end" sideOffset={8}>
                  <DropdownMenuLabel className="p-3">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer focus:bg-orange-50 focus:text-orange-600 dark:focus:bg-orange-950/20">
                    <Link href="/dashboard" className="flex items-center w-full px-2 py-1.5">
                      <LayoutDashboard className="mr-3 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer focus:bg-orange-50 focus:text-orange-600 dark:focus:bg-orange-950/20">
                    <Link href="/dashboard/profile" className="flex items-center w-full px-2 py-1.5">
                      <User className="mr-3 h-4 w-4" />
                      <span>Profile Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="flex items-center w-full px-2 py-1.5 text-red-500 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950/20 cursor-pointer"
                    disabled={isLoading}
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    <span>{isLoading ? "Logging out..." : "Logout"}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Button asChild variant="secondary" className="rounded-lg font-semibold text-sm bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20 border-none transition-colors">
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>
                <Button asChild className="rounded-lg font-semibold text-sm bg-orange-500 hover:bg-orange-600 text-white border-none shadow-md shadow-orange-500/20 transition-all transform hover:scale-105 active:scale-95">
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </div>
            )}
          </div>

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

      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-background border-b p-4 space-y-2 shadow-xl animate-in slide-in-from-top-5 duration-200">
          {menu.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className={`block px-4 py-2 text-base font-medium rounded-md transition-colors 
                ${pathname === item.url ? "text-orange-500 font-bold bg-orange-50/50 dark:bg-orange-950/10" : "hover:text-orange-500 hover:bg-accent"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.title}
            </Link>
          ))}
          <div className="pt-4 mt-2 border-t space-y-2">
            {user ? (
              <>
                <Link
                  href="/dashboard/profile"
                  className="block px-4 py-2 text-base font-medium hover:bg-accent rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Button
                  onClick={handleLogout}
                  disabled={isLoading}
                  variant="destructive"
                  className="w-full justify-center rounded-lg"
                >
                  {isLoading ? "Logging out..." : "Logout"}
                </Button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};