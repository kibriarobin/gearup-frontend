"use client";
 
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
 
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React from "react";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <form action="" className="mt-6 flex flex-col gap-5">
      
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            name="email"
            type="email"
            placeholder="Enter your email"
            className="pl-9"
            required
          />
        </div>
        {/* TODO: inline Zod error message goes here */}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          {/* Kept here since it's tightly bound to this field; move it out
              to the page if you'd rather group all links there. */}
        </div>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="pl-9 pr-9"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
        {/* TODO: inline Zod error message goes here */}
      </div>

      {/* Submit */}
      <Button type="submit" className="mt-1 w-full">
        Log In
      </Button>
    </form>
  );
};

export default LoginForm;
