"use server";

import { ICategory } from "@/lib/type";

export const getCategories = async (): Promise<{
  success: boolean;
  data: ICategory[];
}> => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
    cache: "no-store",
  });

  const result = await res.json();

  return { success: result.success, data: result.data ?? [] };
};