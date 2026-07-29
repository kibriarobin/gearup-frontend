"use client";

import { useActionState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from "@/components/ui/spinner";
import { registerAction } from "../_actions/authActions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function RegisterForm() {

    const router = useRouter()

  const [state, action, pending] = useActionState(registerAction, null);

  const fieldErrors = state && !state.success ? state.errors : undefined;

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Registration successful");
      router.push("/login")
    }

    if (!state.success) {
      toast.error(state.message || "Registration failed");
    }
  }, [state, router]);

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="name">Full name</Label>
        <Input id="name" name="name" placeholder="Enter your name" required />
        {fieldErrors?.name && (
          <p className="text-sm text-destructive">{fieldErrors.name[0]}</p>
        )}
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="Enter your email" required />
        {fieldErrors?.email && (
          <p className="text-sm text-destructive">{fieldErrors.email[0]}</p>
        )}
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="phone">Phone (optional)</Label>
        <Input id="phone" name="phone" placeholder="Enter your phone" />
        {fieldErrors?.phone && (
          <p className="text-sm text-destructive">{fieldErrors.phone[0]}</p>
        )}
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password"placeholder="Enter password" required />
        {fieldErrors?.password && (
          <p className="text-sm text-destructive">{fieldErrors.password[0]}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label>Role</Label>
        <RadioGroup defaultValue="CUSTOMER" name="role" className="flex gap-4">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="CUSTOMER" id="role-customer" />
            <Label htmlFor="role-customer" className="font-normal">
              Customer
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="PROVIDER" id="role-provider" />
            <Label htmlFor="role-provider" className="font-normal">
              Provider
            </Label>
          </div>
        </RadioGroup>
      </div>

      {state && !state.success && !fieldErrors && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}

      <Button type="submit" className="mt-1 w-full" disabled={pending}>
        {pending ? (
          <>
            <Spinner className="mr-2 h-4 w-4" />
            Creating account...
          </>
        ) : (
          "Create account"
        )}
      </Button>
    </form>
  );
}