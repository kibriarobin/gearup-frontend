import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { IRentalOrder } from "@/lib/type";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export function AdminRentalsTable({ orders }: { orders: IRentalOrder[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Gear</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">
                {order.gear?.name ?? "-"}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {order.customer?.name ?? "-"}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDate(order.startTime)} - {formatDate(order.endTime)}
              </TableCell>
              <TableCell>${order.totalPrice}</TableCell>
              <TableCell className="text-center">
                <OrderStatusBadge status={order.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}