import { LayoutDashboard, Package, ClipboardList } from "lucide-react";

export const providerSidebarItems = [
  { label: "Overview", href: "/provider-dashboard", icon: LayoutDashboard },
  { label: "My Gear", href: "/provider-dashboard/gear", icon: Package },
  { label: "Orders", href: "/provider-dashboard/orders", icon: ClipboardList },
];
