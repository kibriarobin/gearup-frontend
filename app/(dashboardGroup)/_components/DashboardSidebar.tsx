"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  adminSidebarItems,
  customerSidebarItems,
  providerSidebarItems,
} from "../_config/sidebarMenuItems";
import { TRole } from "@/lib/type";

const getSidebarItems = (role: TRole) => {
  if (role === "ADMIN") {
    return adminSidebarItems;
  } else if (role === "PROVIDER") {
    return providerSidebarItems;
  } else if (role === "CUSTOMER") {
    return customerSidebarItems;
  } else {
    return [];
  }
};

type SidebarItem = ReturnType<typeof getSidebarItems>[number];

function SidebarNav({
  items,
  pathname,
  onNavigate,
}: {
  items: SidebarItem[];
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-col gap-1 p-4">
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            <item.icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function DashboardSidebar({ role }: { role: TRole }) {
  const pathname = usePathname();
  const items = getSidebarItems(role);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      
      <aside className="hidden w-56 shrink-0 border-r bg-background md:block">
        <SidebarNav items={items} pathname={pathname} />
      </aside>

      <div className="border-b bg-background px-4 py-2 md:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <Menu className="mr-2 size-4" />
              Menu
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="border-b p-4">
              <SheetTitle className="text-left">Dashboard</SheetTitle>
            </SheetHeader>
            <SidebarNav
              items={items}
              pathname={pathname}
              onNavigate={() => setMobileOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}