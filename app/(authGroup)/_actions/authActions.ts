"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import { LoginState, RegisterState } from "@/lib/type";

// Login

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const loginAction = async (
  redirectTo: string,
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validated = loginSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      message: "Please fix the errors below",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validated.data),
  });

  const result = await res.json();

  if (!result.success) {
    return {
      success: false,
      message: result.message || "Login failed",
    };
  }

  const cookieStore = await cookies();

  cookieStore.set("accessToken", result.data.accessToken, {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });

  cookieStore.set("refreshToken", result.data.refreshToken, {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  });

  const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

  if (
    redirectTo &&
    typeof redirectTo === "string" &&
    redirectTo.startsWith("/") &&
    !redirectTo.startsWith("//")
  ) {
    redirect(redirectTo);
  }

  if (decodedToken.role === "CUSTOMER") {
    redirect("/customer-dashboard");
  } else if (decodedToken.role === "ADMIN") {
    redirect("/admin-dashboard");
  } else if (decodedToken.role === "PROVIDER") {
    redirect("/provider-dashboard");
  }

  return result;
};

// Register

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["CUSTOMER", "PROVIDER"]),
});

export const registerAction = async (
  prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> => {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    password: formData.get("password"),
    role: formData.get("role"),
  };

  const validated = registerSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      message: "Please fix the errors below",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validated.data),
  });

  const result = await res.json();

  return result;
};
