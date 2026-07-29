"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllUsers } from "../../_actions/adminActions";
import { UserManagement } from "../../_components/UserManagement";
import { PaginationControls } from "../../_components/PaginationControl";
import { useDebouncedValue } from "@/hook/useDebounced";

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebouncedValue(search, 400);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-users", debouncedSearch, page],
    queryFn: () => getAllUsers({ search: debouncedSearch, page, limit: 4 }),
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
        <p className="text-sm text-muted-foreground">
          View and manage all users.
        </p>
      </div>

      <Input
        placeholder="Search user"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="mb-4 max-w-sm"
      />

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : data?.data.length === 0 ? (
        <div className="rounded-md border border-dashed py-16 text-center text-muted-foreground">
          No users found.
        </div>
      ) : (
        <>
          <UserManagement users={data?.data ?? []} />
          {data?.meta && (
            <PaginationControls
              currentPage={data.meta.page}
              totalPages={data.meta.totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
}