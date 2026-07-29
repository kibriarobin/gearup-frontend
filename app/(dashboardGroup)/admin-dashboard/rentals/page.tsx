"use client";

import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllRentalsAdmin } from "../../_actions/adminActions";
import { AdminRentalsTable } from "../../_components/AdminRentalsTable";

export default function AdminRentalsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-rentals"],
    queryFn: getAllRentalsAdmin,
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">All Rentals</h1>
          <p className="text-sm text-muted-foreground">
            Every rental order across the platform.
          </p>
        </div>
        {!isLoading && (
          <span className="text-sm font-medium text-muted-foreground">
            Total: {data?.total ?? 0}
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : data?.data.length === 0 ? (
        <div className="rounded-md border border-dashed py-16 text-center text-muted-foreground">
          No rentals yet.
        </div>
      ) : (
        <AdminRentalsTable orders={data?.data ?? []} />
      )}
    </div>
  );
}