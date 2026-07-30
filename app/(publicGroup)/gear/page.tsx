"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getGear } from "../_actions/getGear";
import { useRouter } from "next/navigation";
import { GearFilters } from "../_components/GearFilters";
import { GearSkeleton } from "../_components/GearSkeleton";
import { GearGrid } from "../_components/GearGrid";

export default function GearBrowsePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get("category") ?? undefined;
  const brand = searchParams.get("brand") ?? undefined;
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const searchItem = searchParams.get("searchItem") ?? undefined;

  const { data, isLoading } = useQuery({
    queryKey: ["gear-list", category, brand, minPrice, maxPrice, searchItem],
    queryFn: () =>
      getGear({
        category,
        brand,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        searchItem,
        limit: 20,
      }),
  });

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("searchItem", value);
    } else {
      params.delete("searchItem");
    }
    router.push(`/gear?${params.toString()}`);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Browse Gear</h1>
        <p className="text-sm text-muted-foreground">
          Find the right gear for your next adventure.
        </p>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search gear..."
          defaultValue={searchItem}
          className="pr-9"
          onBlur={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <GearFilters />

        <div>
          {isLoading ? <GearSkeleton /> : <GearGrid gear={data?.data ?? []} />}
        </div>
      </div>
    </div>
  );
}
