"use client";

import { useQuery } from "@tanstack/react-query";
import { ClipboardList, CheckCircle2, Wallet } from "lucide-react";
import { getCustomerOrders } from "../_actions/orderActions";
import { getPaymentHistory } from "../_actions/paymentActions";
import { StatCard } from "../_components/StatCard";
import { calculateCustomerStats } from "../_utils/dashboardStats";

export default function CustomerOverviewPage() {
  const { data: ordersData, isLoading: ordersLoading } = useQuery({
    queryKey: ["customer-orders"],
    queryFn: getCustomerOrders,
  });

  const { data: paymentsData, isLoading: paymentsLoading } = useQuery({
    queryKey: ["customer-payments"],
    queryFn: getPaymentHistory,
  });

  const isLoading = ordersLoading || paymentsLoading;

  const { activeOrders, completedOrders, totalSpent } = calculateCustomerStats(
    ordersData?.data ?? [],
    paymentsData?.data ?? [],
  );

  const stats = [
    { label: "Active Orders", value: activeOrders, icon: ClipboardList },
    { label: "Completed Rentals", value: completedOrders, icon: CheckCircle2 },
    { label: "Total Spent", value: totalSpent, icon: Wallet },
  ];

  return (
    <div>
      <h1 className="mb-1 text-2xl font-semibold tracking-tight">
        My Overview
      </h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Your rental activity at a glance.
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