"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { format, differenceInCalendarDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

import { IGearItem, IUser } from "@/lib/type";
import { createRentalOrder } from "../_actions/rentalActions";

type RentDatePickerProps = {
  gear: IGearItem;
  currentUser: IUser | null;
};

export function RentDatePicker({ gear, currentUser }: RentDatePickerProps) {
  const router = useRouter();

  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [quantity, setQuantity] = useState(1);

  const days =
    startDate && endDate
      ? Math.max(1, differenceInCalendarDays(endDate, startDate))
      : 0;

  const totalPrice = days * quantity * gear.pricePerDay;

  const mutation = useMutation({
    mutationFn: () =>
      createRentalOrder({
        gearId: gear.id,
        startTime: startDate!.toISOString(),
        endTime: endDate!.toISOString(),
        quantity,
      }),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Rental order placed! Track it from your dashboard.");
        router.push("/customer-dashboard/orders");
      } else {
        toast.error(result.message || "Could not place order");
      }
    },
    onError: () => {
      toast.error("Could not place order");
    },
  });

  const isCustomer = currentUser?.role === "CUSTOMER";
  const isOutOfStock = gear.availableCount <= 0;
  const canSubmit = startDate && endDate && quantity > 0 && !isOutOfStock;

  const handleRentNow = () => {
    if (!currentUser) {
      toast.error("Please login as a customer to rent gear");
      router.push(`/login?redirectTo=/gear/${gear.id}`);
      return;
    }
    if (!isCustomer) {
      toast.error("Only customer accounts can rent gear");
      return;
    }
    mutation.mutate();
  };

  return (
    <div className="rounded-xl border p-5">
      <h3 className="mb-4 font-medium">Rent this gear</h3>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="grid gap-1.5">
          <Label>Start date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start font-normal">
                <CalendarIcon className="mr-2 size-4" />
                {startDate ? format(startDate, "MMM d, yyyy") : "Pick date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                disabled={(date) => date < new Date(new Date().toDateString())}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid gap-1.5">
          <Label>End date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start font-normal">
                <CalendarIcon className="mr-2 size-4" />
                {endDate ? format(endDate, "MMM d, yyyy") : "Pick date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                disabled={(date) =>
                  date < new Date(new Date().toDateString()) ||
                  (startDate ? date <= startDate : false)
                }
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="mb-4 grid gap-1.5">
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          type="number"
          min={1}
          max={gear.availableCount}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value) || 1)}
        />
        <p className="text-xs text-muted-foreground">
          {gear.availableCount} available
        </p>
      </div>

      {days > 0 && (
        <div className="mb-4 rounded-md bg-muted p-3 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>
              ${gear.pricePerDay} × {days} day{days > 1 ? "s" : ""} × {quantity}
            </span>
            <span>${totalPrice}</span>
          </div>
          <div className="mt-1 flex justify-between font-semibold">
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>
        </div>
      )}

      <Button
        className="w-full"
        disabled={!canSubmit || mutation.isPending}
        onClick={handleRentNow}
      >
        {mutation.isPending ? (
          <>
            <Spinner className="mr-2 h-4 w-4" />
            Placing order...
          </>
        ) : isOutOfStock ? (
          "Out of stock"
        ) : (
          "Rent Now"
        )}
      </Button>
    </div>
  );
}