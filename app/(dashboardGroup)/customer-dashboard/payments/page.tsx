"use client";

import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { getPaymentHistory } from "../../_actions/paymentActions";
import { PaymentHistoryTable } from "../../_components/PaymentHistoryTable";

export default function CustomerPaymentsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["customer-payments"],
    queryFn: getPaymentHistory,
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Payments</h1>
        <p className="text-sm text-muted-foreground">
          Your payment history for gear rentals.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : data?.data.length === 0 ? (
        <div className="rounded-md border border-dashed py-16 text-center text-muted-foreground">
          No payments yet.
        </div>
      ) : (
        <PaymentHistoryTable payments={data?.data ?? []} />
      )}
    </div>
  );
}