"use server";

import { cookies } from "next/headers";
import { IGearItem, IPaginationMeta, IRentalOrder, IUser} from "@/lib/type";

const authHeader = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  return { Cookie: `accessToken=${accessToken}` };
};

export const getAllUsers = async (params: {
  search?: string;
  page?: number;
  limit?: number;
}): Promise<{
  success: boolean;
  message: string;
  data: IUser[];
  meta?: IPaginationMeta;
}> => {
  const headers = await authHeader();

  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  query.set("page", String(params.page ?? 1));
  query.set("limit", String(params.limit ?? 10));

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/users?${query.toString()}`,
    {
      headers,
      cache: "no-store",
    },
  );

  const result = await res.json();

  return {
    success: result.success,
    message: result.message,
    data: result.data ?? [],
    meta: result.meta,
  };
};

export const updateUserStatus = async (
  userId: string,
  status: "ACTIVE" | "SUSPENDED",
) => {
  const headers = await authHeader();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/users/${userId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({ status }),
    },
  );

  return res.json();
};

export const getAllGearAdmin = async (): Promise<{
  success: boolean;
  message: string;
  data: IGearItem[];
  total: number;
}> => {
  const headers = await authHeader();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/gears`, {
    headers,
    cache: "no-store",
  });

  const result = await res.json();

  return {
    success: result.success,
    message: result.message,
    data: result.data ?? [],
    total: result.meta?.total ?? (result.data?.length ?? 0),
  };
};

export const getAllRentalsAdmin = async (): Promise<{
  success: boolean;
  message: string;
  data: IRentalOrder[];
  total: number;
}> => {
  const headers = await authHeader();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/orders`, {
    headers,
    cache: "no-store",
  });

  const result = await res.json();
  console.log("ADMIN RENTALS RESPONSE:", JSON.stringify(result, null, 2))

  return {
    success: result.success,
    message: result.message,
    data: result.data ?? [],
    total: result.meta?.total ?? (result.data?.length ?? 0),
  };
};