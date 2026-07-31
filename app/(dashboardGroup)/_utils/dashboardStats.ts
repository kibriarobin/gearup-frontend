import { IGearItem, IRentalOrder, IPayment } from "@/lib/type";

export function calculateProviderStats(
  gear: IGearItem[],
  orders: IRentalOrder[],
) {
  const totalGear = gear.length;

  const activeRentals = orders.filter((order) =>
    ["PAID", "PICKED_UP"].includes(order.status),
  ).length;

  const pendingOrders = orders.filter(
    (order) => order.status === "PLACED",
  ).length;

  return { totalGear, activeRentals, pendingOrders };
}

export function calculateCustomerStats(
  orders: IRentalOrder[],
  payments: IPayment[],
) {
  const activeOrders = orders.filter((order) =>
    ["PLACED", "CONFIRMED", "PAID", "PICKED_UP"].includes(order.status),
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "RETURNED",
  ).length;

  const totalSpent = payments
    .filter((payment) => payment.status === "COMPLETED")
    .reduce((sum, payment) => sum + payment.amount, 0);

  return { activeOrders, completedOrders, totalSpent };
}
