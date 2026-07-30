"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getGear } from "./_actions/getGear";
import { GearSkeleton } from "./_components/GearSkeleton";
import { GearGrid } from "./_components/GearGrid";

export default function HomePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["featured-gear"],
    queryFn: () => getGear({ limit: 8, sortBy: "createdAt", sortOrder: "desc" }),
  });

  return (
    <div>
      <section className="mb-10 rounded-2xl bg-primary/5 px-6 py-14 text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Rent Sports &amp; Outdoor Gear Instantly
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Browse gear from trusted local providers and get equipped for your
          next adventure.
        </p>
        <Button asChild size="lg" className="mt-6">
          <Link href="/gear">Browse Gear</Link>
        </Button>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">
            Featured Gear
          </h2>
          <Link href="/gear" className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div>

        {isLoading ? (
          <GearSkeleton />
        ) : (
          <GearGrid gear={data?.data ?? []} />
        )}
      </section>
    </div>
  );
}