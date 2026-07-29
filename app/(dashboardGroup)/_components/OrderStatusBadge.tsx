import { cn } from "@/lib/utils";
import { TOrderStatus } from "@/lib/type";

const statusStyles: Record<TOrderStatus, string> = {
  PLACED: "bg-amber-100 text-amber-800 border-amber-200",
  CONFIRMED: "bg-blue-100 text-blue-800 border-blue-200",
  PAID: "bg-purple-100 text-purple-800 border-purple-200",
  PICKED_UP: "bg-green-100 text-green-800 border-green-200",
  RETURNED: "bg-gray-100 text-gray-700 border-gray-200",
  CANCELLED: "bg-red-100 text-red-800 border-red-200",
};

const statusLabels: Record<TOrderStatus, string> = {
  PLACED: "Placed",
  CONFIRMED: "Confirmed",
  PAID: "Paid",
  PICKED_UP: "Picked Up",
  RETURNED: "Returned",
  CANCELLED: "Cancelled",
};

export function OrderStatusBadge({ status }: { status: TOrderStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        statusStyles[status],
      )}
    >
      {statusLabels[status]}
    </span>
  );
}