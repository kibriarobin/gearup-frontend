"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Compass,
  Menu,
  User,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

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
import { NavbarProps } from "@/lib/type";
import { logout } from "@/service/logout";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Browse Gear", href: "/gear" },
  { label: "Categories", href: "/categories" },
  { label: "Contact", href: "/contact" },
];

const userMenuItems = [
  { label: "Profile", action: "profile", icon: User },
  { label: "Dashboard", action: "dashboard", icon: LayoutDashboard },
];

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

    const profile = user.success ? user.data.profile : null;

  const handleUserMenuAction = async (action: string) => {
    if (!profile) return;

    if (action === "dashboard") {
      if (profile?.role === "CUSTOMER") {
        router.push("/customer-dashboard");
      } else if (profile?.role === "PROVIDER") {
        router.push("/provider-dashboard");
      } else if (profile?.role === "ADMIN") {
        router.push("/admin-dashboard");
      }
      return;
    }

    if (action === "profile") {
      router.push("/profile");
      return;
    }

    if (action === "logout") {
      await logout();
      toast.success("User logged out successfully");
      window.location.assign("/login");
    }
  };

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
          {navItems.map((item) => (
            <Button key={item.href} variant="ghost" size="sm" asChild>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>

      
        <div className="hidden lg:flex">
          {user?.success ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="size-9 rounded-full p-0"
                  aria-label="Open user menu"
                >
                  <Avatar className="size-10 cursor-pointer">
                    <AvatarImage
                      src={profile?.profile?.profilePhoto ?? undefined}
                      alt={profile?.name}
                    />
                    <AvatarFallback>{profile?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {profile?.name}
                      </span>
                      <span className="text-xs font-normal text-muted-foreground">
                        {profile?.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {userMenuItems.map((item) => (
                    <DropdownMenuItem
                      key={item.action}
                      onClick={() => handleUserMenuAction(item.action)}
                      className="focus:bg-primary focus:text-primary-foreground"
                    >
                      <item.icon data-icon="inline-start" />
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => handleUserMenuAction("logout")}
                    className="focus:bg-primary focus:text-primary-foreground"
                  >
                    <LogOut data-icon="inline-start" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button className="cursor-pointer">Login</Button>
            </Link>
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
          <SheetContent
            side="right"
            className="flex w-[85%] flex-col sm:max-w-sm"
          >
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2 text-left">
                <span className="flex size-7 items-center justify-center rounded-md bg-primary">
                  <Compass className="size-4 text-primary-foreground" />
                </span>
                Gear<span className="text-primary">Up</span>
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-4">
              {navItems.map((item) => (
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

              {user ? (
                <>
                  <div className="mb-2 flex items-center gap-3 px-2">
                    <Avatar className="size-9">
                      <AvatarImage
                        src={profile?.profile.profilePhoto ?? undefined}
                        alt={profile?.name}
                      />
                      <AvatarFallback>{profile?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{profile?.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {profile?.email}
                      </span>
                    </div>
                  </div>

                  {userMenuItems.map((item) => (
                    <button
                      key={item.action}
                      onClick={() => {
                        handleUserMenuAction(item.action);
                        setMobileOpen(false);
                      }}
                      className="flex items-center gap-2 rounded-md px-2 py-2.5 text-left text-sm font-medium hover:bg-accent"
                    >
                      <item.icon className="size-4" />
                      {item.label}
                    </button>
                  ))}

                  <button
                    onClick={() => {
                      handleUserMenuAction("logout");
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-2 rounded-md px-2 py-2.5 text-left text-sm font-medium text-destructive hover:bg-accent"
                  >
                    <LogOut className="size-4" />
                    Log out
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full cursor-pointer">Login</Button>
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
