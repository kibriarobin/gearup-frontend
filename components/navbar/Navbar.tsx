"use client";

import { useState } from "react";
import Link from "next/link";
import { Compass, Menu, User, LayoutDashboard, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const publicRoutes = [
  { label: "Home", href: "/" },
  { label: "Browse Gear", href: "/gear" },
  { label: "Categories", href: "/gear?category=all" },
  { label: "Contact", href: "/contact" },
];


const demoUser = {
  name: "Rafi Ahmed",
  email: "rafi@example.com",
  photo: "",
};

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4">
        
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary">
            <Compass className="size-5 text-primary-foreground" />
          </span>
          <span className="text-lg font-semibold tracking-tight">
            Gear<span className="text-primary">Up</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {publicRoutes.map((item) => (
            <Button key={item.href} variant="ghost" size="sm" asChild>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="hidden items-center lg:flex">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="size-9 rounded-full p-0"
                  aria-label="Open user menu"
                >
                  <Avatar className="size-10 cursor-pointer">
                    <AvatarImage src={demoUser.photo} alt={demoUser.name} />
                    <AvatarFallback>{demoUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {demoUser.name}
                      </span>
                      <span className="text-xs font-normal text-muted-foreground">
                        {demoUser.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => {} /* TODO: router.push("/profile") */}>
                    <User data-icon="inline-start" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {} /* TODO: router.push("/dashboard") */}>
                    <LayoutDashboard data-icon="inline-start" />
                    Dashboard
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => setIsLoggedIn(false) /* TODO: call real logout() */}
                  >
                    <LogOut data-icon="inline-start" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              className="cursor-pointer"
              onClick={() => setIsLoggedIn(true) /* TODO: router.push("/auth/login") */}
            >
              Login
            </Button>
          )}
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              className="lg:hidden"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex w-[85%] flex-col sm:max-w-sm">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2 text-left">
                <span className="flex size-7 items-center justify-center rounded-md bg-primary">
                  <Compass className="size-4 text-primary-foreground" />
                </span>
                Gear<span className="text-primary">Up</span>
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-4">
              {publicRoutes.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-2 py-2.5 text-sm font-medium hover:bg-accent"
                >
                  {item.label}
                </Link>
              ))}

              <DropdownMenuSeparator className="my-3" />

              {isLoggedIn ? (
                <>
                  <div className="mb-2 flex items-center gap-3 px-2">
                    <Avatar className="size-9">
                      <AvatarImage src={demoUser.photo} alt={demoUser.name} />
                      <AvatarFallback>{demoUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{demoUser.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {demoUser.email}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {} /* TODO: router.push("/profile") */}
                    className="flex items-center gap-2 rounded-md px-2 py-2.5 text-left text-sm font-medium hover:bg-accent"
                  >
                    <User className="size-4" />
                    My Profile
                  </button>
                  <button
                    onClick={() => {} /* TODO: router.push("/dashboard") */}
                    className="flex items-center gap-2 rounded-md px-2 py-2.5 text-left text-sm font-medium hover:bg-accent"
                  >
                    <LayoutDashboard className="size-4" />
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setIsLoggedIn(false); // TODO: call real logout()
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-2 rounded-md px-2 py-2.5 text-left text-sm font-medium text-destructive hover:bg-accent"
                  >
                    <LogOut className="size-4" />
                    Logout
                  </button>
                </>
              ) : (
                <Button
                  className="w-full cursor-pointer"
                  onClick={() => {
                    setIsLoggedIn(true); // TODO: router.push("/auth/login")
                    setMobileOpen(false);
                  }}
                >
                  Login
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}