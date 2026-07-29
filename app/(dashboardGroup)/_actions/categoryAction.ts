"use server";

import { ICategory } from "@/lib/type";
import { cookies } from "next/headers";

export const getCategories = async (): Promise<{
  success: boolean;
  data: ICategory[];
}> => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
    cache: "no-cache",
  });

  const result = await res.json();

  return { success: result.success, data: result.data ?? [] };
};

export const createCategory = async (name: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify({ name }),
  });

  return res.json();
};

export const updateCategory = async (id: string, name: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/categories/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ name }),
    },
  );

  return res.json();
};

export const deleteCategory = async (id: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/categories/${id}`,
    {
      method: "DELETE",
      headers: { Cookie: `accessToken=${accessToken}` },
    },
  );

  return res.json();
};
