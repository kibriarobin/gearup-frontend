"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-destructive/10">
        <XCircle className="size-8 text-destructive" strokeWidth={1.5} />
      </div>

      <h1 className="text-2xl font-semibold tracking-tight">
        Payment cancelled
      </h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Your payment was not completed. You can try again from your orders
        page whenever you&apos;re ready.
      </p>

      <div className="mt-8 flex gap-3">
        <Button asChild>
          <Link href="/customer-dashboard/orders">Back to My Orders</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  );
}