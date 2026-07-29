"use client";

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
import { OrderStatusBadge } from "./OrderStatusBadge";
import { IRentalOrder, TOrderStatus } from "@/lib/type";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const getProviderAction = (
  order: IRentalOrder,
): { label: string; nextStatus: TOrderStatus } | null => {
  if (order.status === "PLACED") {
    return { label: "Confirm", nextStatus: "CONFIRMED" };
  } else if (order.status === "PAID") {
    return { label: "Mark Picked Up", nextStatus: "PICKED_UP" };
  } else if (order.status === "PICKED_UP") {
    return { label: "Mark Returned", nextStatus: "RETURNED" };
  } else {
    return null;
  }
};

export function OrderTable({ orders }: { orders: IRentalOrder[] }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: TOrderStatus }) =>
      updateOrderStatus(id, status),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Order status updated");
        queryClient.invalidateQueries({ queryKey: ["provider-orders"] });
      } else {
        toast.error(result.message || "Could not update order");
      }
    },
    onError: () => {
      toast.error("Could not update order");
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Gear</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Start date</TableHead>
            <TableHead>End date</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            const action = getProviderAction(order);
            const isPending =
              mutation.isPending && mutation.variables?.id === order.id;

            return (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  {order.gear?.name ?? "—"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {order.customer?.name ?? "—"}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDate(order.startTime)}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDate(order.endTime)}
                </TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>${order.totalPrice}</TableCell>
                <TableCell className="text-center">
                  <OrderStatusBadge status={order.status} />
                </TableCell>
                <TableCell className="text-right">
                  {action ? (
                    <Button
                      size="sm"
                      disabled={isPending}
                      onClick={() =>
                        mutation.mutate({
                          id: order.id,
                          status: action.nextStatus,
                        })
                      }
                    >
                      {isPending ? "Updating..." : action.label}
                    </Button>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      {order.status === "CONFIRMED" ? "Awaiting payment" : "-"}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
