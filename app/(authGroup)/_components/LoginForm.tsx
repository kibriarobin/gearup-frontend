"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { loginAction } from "../_actions/authActions";

export function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "";

  const loginActionWithRedirect = loginAction.bind(null, redirectTo);
  const [state, action, pending] = useActionState(
    loginActionWithRedirect,
    null,
  );

  const fieldErrors = state && !state.success ? state.errors : undefined;

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="Enter your email" required />
        {fieldErrors?.email && (
          <p className="text-sm text-destructive">{fieldErrors.email[0]}</p>
        )}
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" placeholder="Enter your password" required />
        {fieldErrors?.password && (
          <p className="text-sm text-destructive">{fieldErrors.password[0]}</p>
        )}
      </div>

      {state && !state.success && !fieldErrors && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}

      <Button type="submit" className="mt-1 w-full" disabled={pending}>
        {pending ? (
          <>
            <Spinner className="mr-2 h-4 w-4" />
            Logging...
          </>
        ) : (
          "Login"
        )}
      </Button>
    </form>
  );
}