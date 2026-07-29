"use client";

import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { getProviderOrders } from "../../_actions/orderActions";
import { OrderTable } from "../../_components/OrderTable";

export default function ProviderOrdersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["provider-orders"],
    queryFn: getProviderOrders,
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
        <p className="text-sm text-muted-foreground">
          Manage incoming rental orders for your gear.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : data?.data.length === 0 ? (
        <div className="rounded-md border border-dashed py-16 text-center text-muted-foreground">
          No orders yet.
        </div>
      ) : (
        <OrderTable orders={data?.data ?? []} />
      )}
    </div>
  );
}