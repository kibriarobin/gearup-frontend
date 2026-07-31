"use client";

import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { getCustomerOrders } from "../../_actions/orderActions";
import { CustomerOrderTable } from "../../_components/CustomerOrderTable";

export default function CustomerOrdersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["customer-orders"],
    queryFn: getCustomerOrders,
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">My Orders</h1>
        <p className="text-sm text-muted-foreground">
          Track and manage your gear rentals.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : data?.data.length === 0 ? (
        <div className="rounded-md border border-dashed py-16 text-center text-muted-foreground">
          You haven&apos;t placed any orders yet.
        </div>
      ) : (
        <CustomerOrderTable orders={data?.data ?? []} />
      )}
    </div>
  );
}