"use client";

import { useQuery } from "@tanstack/react-query";
import { Package, ClipboardList, Clock } from "lucide-react";
import { getMyGear } from "../_actions/gearActions";
import { getProviderOrders } from "../_actions/orderActions";
import { StatCard } from "../_components/StatCard";

export default function ProviderOverviewPage() {
  const { data: gearData, isLoading: gearLoading } = useQuery({
    queryKey: ["my-gear"],
    queryFn: getMyGear,
  });

  const { data: ordersData, isLoading: ordersLoading } = useQuery({
    queryKey: ["provider-orders"],
    queryFn: getProviderOrders,
  });

  const totalGear = gearData?.data.length ?? 0;

  const activeRentals =
    ordersData?.data.filter((o) =>
      ["PAID", "PICKED_UP"].includes(o.status),
    ).length ?? 0;

  const pendingOrders =
    ordersData?.data.filter((o) => o.status === "PLACED").length ?? 0;

  const isLoading = gearLoading || ordersLoading;

  const stats = [
    { label: "Total Gear Listed", value: totalGear, icon: Package },
    { label: "Active Rentals", value: activeRentals, icon: ClipboardList },
    { label: "Pending Orders", value: pendingOrders, icon: Clock },
  ];

  return (
    <div>
      <h1 className="mb-1 text-2xl font-semibold tracking-tight">
        Provider Overview
      </h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Your gear inventory and rental activity at a glance.
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