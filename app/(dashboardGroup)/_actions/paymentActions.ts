"use server";

import { cookies } from "next/headers";
import { IPayment } from "@/lib/type";

export const getPaymentHistory = async (): Promise<{
  success: boolean;
  message: string;
  data: IPayment[];
}> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "Not logged in", data: [] };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments`, {
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

export const createPayment = async (rentalOrderId: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/payments/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ rentalOrderId }),
    },
  );

  const result = await res.json();

  return result;
};
