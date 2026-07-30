"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategories } from "../_actions/getCategories";

export function GearFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const currentCategory = searchParams.get("category") ?? "";
  const currentBrand = searchParams.get("brand") ?? "";
  const currentMinPrice = searchParams.get("minPrice") ?? "";
  const currentMaxPrice = searchParams.get("maxPrice") ?? "";

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/gear?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/gear");
  };

  const hasActiveFilters =
    currentCategory || currentBrand || currentMinPrice || currentMaxPrice;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="font-medium">Filters</h2>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        )}
      </div>

      <div className="grid gap-1.5">
        <Label>Category</Label>
        <Select
          value={currentCategory || "all"}
          onValueChange={(value) =>
            updateParam("category", value === "all" ? "" : value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categoriesData?.data.map((cat) => (
              <SelectItem key={cat.id} value={cat.name}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="brand">Brand</Label>
        <Input
          id="brand"
          placeholder="Brand name"
          defaultValue={currentBrand}
          onBlur={(e) => updateParam("brand", e.target.value)}
        />
      </div>

      <div className="grid gap-1.5">
        <Label>Price per day</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            defaultValue={currentMinPrice}
            onBlur={(e) => updateParam("minPrice", e.target.value)}
          />
          <span className="text-muted-foreground">-</span>
          <Input
            type="number"
            placeholder="Max"
            defaultValue={currentMaxPrice}
            onBlur={(e) => updateParam("maxPrice", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}