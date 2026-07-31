"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-primary/10">
        <CheckCircle2 className="size-8 text-primary" strokeWidth={1.5} />
      </div>

      <h1 className="text-2xl font-semibold tracking-tight">
        Payment successful
      </h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Your payment has been confirmed. The provider will prepare your gear
        for pickup soon.
      </p>

      {orderId && (
        <p className="mt-3 rounded-md bg-muted px-3 py-1.5 font-mono text-xs text-muted-foreground">
          Order ID: {orderId}
        </p>
      )}

      <div className="mt-8 flex gap-3">
        <Button asChild>
          <Link href="/customer-dashboard/orders">View My Orders</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/gear">Continue Browsing</Link>
        </Button>
      </div>
    </div>
  );
}