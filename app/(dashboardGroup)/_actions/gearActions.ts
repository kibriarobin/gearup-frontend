"use server"

import { IGearItem } from "@/lib/type";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export const getMyGear = async (): Promise<{
  success: boolean;
  message: string;
  data: IGearItem[];
}> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "Not logged in", data: [] };
  }

  const decoded = jwt.decode(accessToken) as JwtPayload;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/gear?limit=100`,
    {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: "no-store",
    },
  );

  const result = await res.json();

  const allGear: IGearItem[] = result.data ?? [];

  const myGear = allGear.filter((item) => item.providerId === decoded.id);

  return { success: true, message: "Fetched", data: myGear };
};