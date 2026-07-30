"use server";

import { IGearItem } from "@/lib/type";

export type TGearListParams = {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  searchItem?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
};

export const getGear = async (
  params: TGearListParams = {},
): Promise<{
  success: boolean;
  data: IGearItem[];
  meta?: { total: number; page: number; limit: number; totalPages: number };
}> => {
  const query = new URLSearchParams();
  if (params.category) query.set("category", params.category);
  if (params.brand) query.set("brand", params.brand);
  if (params.minPrice) query.set("minPrice", String(params.minPrice));
  if (params.maxPrice) query.set("maxPrice", String(params.maxPrice));
  if (params.searchItem) query.set("searchItem", params.searchItem);
  if (params.sortBy) query.set("sortBy", params.sortBy);
  if (params.sortOrder) query.set("sortOrder", params.sortOrder);
  query.set("page", String(params.page ?? 1));
  query.set("limit", String(params.limit ?? 12));

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/gear?${query.toString()}`,
    { cache: "no-store" },
  );

  const result = await res.json();

  return {
    success: result.success,
    data: result.data ?? [],
    meta: result.meta,
  };
};

export const getGearById = async (
  id: string,
): Promise<{ success: boolean; message: string; data: IGearItem | null }> => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear/${id}`, {
    cache: "no-store",
  });

  const result = await res.json();

  return {
    success: result.success,
    message: result.message,
    data: result.data ?? null,
  };
};