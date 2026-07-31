"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getCategories } from "../_actions/getCategories";

export default function CategoriesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Categories</h1>
        <p className="text-sm text-muted-foreground">
          Browse gear by category.
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      ) : data?.data.length === 0 ? (
        <p className="rounded-md border border-dashed py-16 text-center text-muted-foreground">
          No categories available yet.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data?.data.map((category) => (
            <Link key={category.id} href={`/gear?category=${encodeURIComponent(category.name)}`}>
              <Card className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30">
                <CardContent className="flex items-center gap-3 py-5">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                    <Tag className="size-5 text-primary" />
                  </div>
                  <span className="font-medium">{category.name}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}