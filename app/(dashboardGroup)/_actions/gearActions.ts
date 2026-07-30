"use server";

import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { z } from "zod";
import { IGearItem, GearFormState } from "@/lib/type";

const gearSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  pricePerDay: z.coerce.number().positive("Price must be greater than 0"),
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  totalStock: z.coerce.number().int().positive("Stock must be at least 1"),
  categoryId: z.string().min(1, "Select a category"),
  images: z.array(z.string().url("Must be a valid URL")).optional().default([]),
});

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

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear?limit=100`, {
    headers: { Cookie: `accessToken=${accessToken}` },
    cache: "no-store",
  });

  const result = await res.json();
  const allGear: IGearItem[] = result.data ?? [];
  const myGear = allGear.filter((item) => item.providerId === decoded.id);

  return { success: true, message: "Fetched", data: myGear };
};

export const gearAction = async (
  gearId: string | null,
  prevState: GearFormState,
  formData: FormData,
): Promise<GearFormState> => {
  const data = {
    name: formData.get("name"),
    description: formData.get("description"),
    pricePerDay: formData.get("pricePerDay"),
    brand: formData.get("brand"),
    model: formData.get("model"),
    totalStock: formData.get("totalStock"),
    categoryId: formData.get("categoryId"),
    images: formData.getAll("images"),
  };

  const validated = gearSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      message: "Please fix the errors below",
      errors: validated.error.flatten().fieldErrors,
    };
  }


  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;


  const url = gearId
    ? `${process.env.BACKEND_API_URL}/api/gear/${gearId}`
    : `${process.env.BACKEND_API_URL}/api/gear`;

  const res = await fetch(url, {
    method: gearId ? "PATCH" : "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify(validated.data),
  });
  

  const result = await res.json();

  if (!result.success) {
    return {
      success: false,
      message: result.message || "Something went wrong",
    };
  }

  return {
    success: true,
    message: gearId ? "Gear updated successfully" : "Gear added successfully",
    data: result.data,
  };
};

export const deleteGear = async (id: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear/${id}`, {
    method: "DELETE",
    headers: { Cookie: `accessToken=${accessToken}` },
  });

  return res.json();
};