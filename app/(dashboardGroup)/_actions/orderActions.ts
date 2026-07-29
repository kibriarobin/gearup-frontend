"use server"

import { IRentalOrder } from "@/lib/type";
import { cookies } from "next/headers";

export const getProviderOrders = async (): Promise<{
  success: boolean;
  message: string;
  data: IRentalOrder[];
}> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "Not logged in", data: [] };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals/orders`, {
    headers: { Cookie: `accessToken=${accessToken}` },
    cache: "no-store",
  });

  const result = await res.json();

  return {
    success: result.success,
    message: result.message,
    data: result.data ?? [],
  };
};