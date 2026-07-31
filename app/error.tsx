"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="size-8 text-destructive" strokeWidth={1.5} />
      </div>

      <h1 className="text-2xl font-semibold tracking-tight">
        Something went wrong
      </h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        An unexpected error occurred. You can try again, or head back to the
        homepage.
      </p>

      <div className="mt-8 flex gap-3">
        <Button onClick={reset}>
          <RefreshCcw className="mr-1 size-4" />
          Try again
        </Button>
        <Button asChild variant="outline">
          <Link href="/">
            <Home className="mr-1 size-4" />
            Home
          </Link>
        </Button>
      </div>
    </div>
  );
}