"use client";

import Image from "next/image";
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
      <section className="relative mb-12 overflow-hidden rounded-2xl">
        <div className="relative h-72 w-full sm:h-80 lg:h-96">
          <Image
            src="https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Camping tent set up in the mountains at sunset"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-black/10" />
        </div>

        <div className="absolute inset-0 flex flex-col items-start justify-end p-6 sm:p-10 lg:items-center lg:justify-center lg:p-14 lg:text-center">
          <h1 className="max-w-lg text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:max-w-2xl">
            Rent Sports &amp; Outdoor Gear Instantly
          </h1>
          <p className="mt-3 max-w-md text-white/85 lg:max-w-xl">
            Browse gear from trusted local providers and get equipped for
            your next adventure.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link href="/gear">Browse Gear</Link>
          </Button>
        </div>
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