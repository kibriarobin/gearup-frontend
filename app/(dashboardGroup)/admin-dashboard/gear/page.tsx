"use client";

import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllGearAdmin } from "../../_actions/adminActions";
import { AdminGearTable } from "../../_components/AdminGearTable";

export default function AdminGearPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-gear"],
    queryFn: getAllGearAdmin,
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">All Gear</h1>
          <p className="text-sm text-muted-foreground">
            Every gear listing across the platform.
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
          No gear listed yet.
        </div>
      ) : (
        <AdminGearTable gear={data?.data ?? []} />
      )}
    </div>
  );
}