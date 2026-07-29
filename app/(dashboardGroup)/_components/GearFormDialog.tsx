"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";

import { createGear, updateGear } from "../_actions/gearActions";
import { getCategories } from "../_actions/categoryAction";
import { IGearItem } from "@/lib/type";

const gearSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  pricePerDay: z.coerce.number().positive("Price must be greater than 0"),
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  totalStock: z.coerce.number().int().positive("Stock must be at least 1"),
  categoryId: z.string().min(1, "Select a category"),
});

type GearFormValues = z.infer<typeof gearSchema>;

type GearFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: IGearItem | null;
};

export function GearFormDialog({
  open,
  onOpenChange,
  initialData,
}: GearFormDialogProps) {
  const isEditMode = !!initialData;
  const queryClient = useQueryClient();

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const form = useForm<GearFormValues>({
    resolver: zodResolver(gearSchema),
    defaultValues: {
      name: "",
      description: "",
      pricePerDay: 0,
      brand: "",
      model: "",
      totalStock: 1,
      categoryId: "",
    },
  });

  useEffect(() => {
    if (open && initialData) {
      form.reset({
        name: initialData.name,
        description: initialData.description,
        pricePerDay: initialData.pricePerDay,
        brand: initialData.brand,
        model: initialData.model,
        totalStock: initialData.totalStock,
        categoryId: initialData.categoryId,
      });
    } else if (open && !initialData) {
      form.reset({
        name: "",
        description: "",
        pricePerDay: 0,
        brand: "",
        model: "",
        totalStock: 1,
        categoryId: "",
      });
    }
  }, [open, initialData, form]);

  const mutation = useMutation({
    mutationFn: (values: GearFormValues) =>
      isEditMode ? updateGear(initialData!.id, values) : createGear(values),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(isEditMode ? "Gear updated successfully" : "Gear added successfully");
        queryClient.invalidateQueries({ queryKey: ["my-gear"] });
        onOpenChange(false);
      } else {
        toast.error(result.message || "Something went wrong");
      }
    },
    onError: () => {
      toast.error("Something went wrong, please try again");
    },
  });

  const onSubmit = (values: GearFormValues) => {
    mutation.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Gear" : "Add New Gear"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...form.register("name")} placeholder="Life Jacket - Adult Size" />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...form.register("description")}
              placeholder="Coast guard approved life vest for water activities"
              rows={3}
            />
            {form.formState.errors.description && (
              <p className="text-sm text-destructive">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="brand">Brand</Label>
              <Input id="brand" {...form.register("brand")} placeholder="Stohlquist" />
              {form.formState.errors.brand && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.brand.message}
                </p>
              )}
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="model">Model</Label>
              <Input id="model" {...form.register("model")} placeholder="Fit Adult" />
              {form.formState.errors.model && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.model.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="pricePerDay">Price / day</Label>
              <Input
                id="pricePerDay"
                type="number"
                step="0.01"
                {...form.register("pricePerDay")}
              />
              {form.formState.errors.pricePerDay && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.pricePerDay.message}
                </p>
              )}
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="totalStock">Total stock</Label>
              <Input id="totalStock" type="number" {...form.register("totalStock")} />
              {form.formState.errors.totalStock && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.totalStock.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="categoryId">Category</Label>
            <Select
              onValueChange={(value) => form.setValue("categoryId", value, { shouldValidate: true })}
              value={form.watch("categoryId")}
            >
              <SelectTrigger id="categoryId">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categoriesData?.data.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.categoryId && (
              <p className="text-sm text-destructive">
                {form.formState.errors.categoryId.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Saving...
                </>
              ) : isEditMode ? (
                "Save changes"
              ) : (
                "Add gear"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}