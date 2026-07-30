"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { adminSidebarItems, customerSidebarItems, providerSidebarItems } from "../_config/sidebarMenuItems";
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

export function DashboardSidebar({ role }: { role: TRole }) {
  const pathname = usePathname();
   const items = getSidebarItems(role);

  return (
    <aside className="w-56 shrink-0 border-r bg-background md:block">
      <nav className="flex flex-col gap-1 p-4">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
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
    </aside>
  );
}