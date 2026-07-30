"use client";

import { useQuery } from "@tanstack/react-query";
import { Users, Package, ClipboardList } from "lucide-react";
import { getAllUsers, getAllGearAdmin, getAllRentalsAdmin } from "../_actions/adminActions";
import { StatCard } from "../_components/StatCard";

export default function AdminOverviewPage() {
  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryKey: ["admin-users-count"],
    queryFn: () => getAllUsers({ page: 1, limit: 1 }),
  });

  const { data: gearData, isLoading: gearLoading } = useQuery({
    queryKey: ["admin-gear"],
    queryFn: getAllGearAdmin,
  });

  const { data: rentalsData, isLoading: rentalsLoading } = useQuery({
    queryKey: ["admin-rentals"],
    queryFn: getAllRentalsAdmin,
  });

  const isLoading = usersLoading || gearLoading || rentalsLoading;

  const stats = [
    { label: "Total Users", value: usersData?.meta?.total ?? 0, icon: Users },
    { label: "Active Gear", value: gearData?.total ?? 0, icon: Package },
    { label: "Total Rentals", value: rentalsData?.total ?? 0, icon: ClipboardList },
  ];

  return (
    <div>
      <h1 className="mb-1 text-2xl font-semibold tracking-tight">
        Admin Overview
      </h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Platform-wide statistics at a glance.
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
}