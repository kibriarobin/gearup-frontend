import { LayoutDashboard, Package, ClipboardList, Users, Tag, CreditCard } from "lucide-react";

export const providerSidebarItems = [
  { label: "Overview", href: "/provider-dashboard", icon: LayoutDashboard },
  { label: "My Gear", href: "/provider-dashboard/gear", icon: Package },
  { label: "Orders", href: "/provider-dashboard/orders", icon: ClipboardList },
];

export const adminSidebarItems = [
  { label: "Overview", href: "/admin-dashboard", icon: LayoutDashboard },
  { label: "Users", href: "/admin-dashboard/users", icon: Users },
  { label: "Categories", href: "/admin-dashboard/categories", icon: Tag },
  { label: "Gear", href: "/admin-dashboard/gear", icon: Package },
  { label: "Rentals", href: "/admin-dashboard/rentals", icon: ClipboardList },
];

export const customerSidebarItems = [
  { label: "Overview", href: "/customer-dashboard", icon: LayoutDashboard },
  { label: "My Orders", href: "/customer-dashboard/orders", icon: ClipboardList },
  { label: "Payments", href: "/customer-dashboard/payments", icon: CreditCard },
];