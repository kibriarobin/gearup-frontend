"use server";

import { cookies } from "next/headers";

export const createRentalOrder = async (payload: {
  gearId: string;
  startTime: string;
  endTime: string;
  quantity: number;
}) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "Please login to rent gear" };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  return res.json();
};