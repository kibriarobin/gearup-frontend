"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { updateOrderStatus } from "../_actions/orderActions";
import { createPayment } from "../_actions/paymentActions";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { ReviewDialog } from "./ReviewDialog";
import { IRentalOrder } from "@/lib/type";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export function CustomerOrderTable({ orders }: { orders: IRentalOrder[] }) {
  const queryClient = useQueryClient();
  const [reviewTarget, setReviewTarget] = useState<IRentalOrder | null>(null);

  const cancelMutation = useMutation({
    mutationFn: (orderId: string) => updateOrderStatus(orderId, "CANCELLED"),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Order cancelled");
        queryClient.invalidateQueries({ queryKey: ["customer-orders"] });
      } else {
        toast.error(result.message || "Could not cancel order");
      }
    },
    onError: () => toast.error("Could not cancel order"),
  });

  const payMutation = useMutation({
  mutationFn: (orderId: string) => createPayment(orderId),
  onSuccess: (result) => {
    if (result.success && result.data?.paymentUrl) {
      window.location.assign(result.data.paymentUrl);
    } else {
      toast.error(result.message || "Could not initiate payment");
    }
  },
  onError: () => toast.error("Could not initiate payment"),
});

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Gear</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              const isCancelling =
                cancelMutation.isPending &&
                cancelMutation.variables === order.id;
              const isPaying =
                payMutation.isPending && payMutation.variables === order.id;

              return (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    {order.gear?.name ?? "-"}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(order.startTime)} - {formatDate(order.endTime)}
                  </TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>${order.totalPrice}</TableCell>
                  <TableCell>
                    <OrderStatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {order.status === "PLACED" && (
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={isCancelling}
                          onClick={() => cancelMutation.mutate(order.id)}
                        >
                          {isCancelling ? "Cancelling..." : "Cancel"}
                        </Button>
                      )}

                      {order.status === "CONFIRMED" && (
                        <Button
                          size="sm"
                          disabled={isPaying}
                          onClick={() => payMutation.mutate(order.id)}
                        >
                          {isPaying ? "Redirecting..." : "Pay Now"}
                        </Button>
                      )}

                      {order.status === "RETURNED" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setReviewTarget(order)}
                        >
                          Leave Review
                        </Button>
                      )}

                      {!["PLACED", "CONFIRMED", "RETURNED"].includes(
                        order.status,
                      ) && <span className="text-xs text-muted-foreground">-</span>}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {reviewTarget && (
        <ReviewDialog
          open={!!reviewTarget}
          onOpenChange={(open) => !open && setReviewTarget(null)}
          gearId={reviewTarget.gearId}
          gearName={reviewTarget.gear?.name ?? "this gear"}
        />
      )}
    </>
  );
}