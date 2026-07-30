"use client";

import { useRef, useState, useEffect } from "react";
import { useActionState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";

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

import { gearAction } from "../_actions/gearActions";
import { IGearItem, GearFormState } from "@/lib/type";
import { getCategories } from "../_actions/categoryAction";

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
  const formRef = useRef<HTMLFormElement>(null);

  const [imageUrls, setImageUrls] = useState<string[]>(
    initialData?.images?.length ? initialData.images : [""],
  );

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const gearActionWithId = (prevState: GearFormState, formData: FormData) => {
    const validImages = imageUrls.filter((url) => url.trim() !== "");
    formData.delete("images");
    validImages.forEach((url) => formData.append("images", url));

    return gearAction(initialData?.id ?? null, prevState, formData);
  };

  const [state, action, pending] = useActionState(gearActionWithId, null);

  const fieldErrors = state && !state.success ? state.errors : undefined;

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      queryClient.invalidateQueries({ queryKey: ["my-gear"] });
      onOpenChange(false);
    }
  }, [state, queryClient, onOpenChange]);

  const addImageField = () => setImageUrls((prev) => [...prev, ""]);

  const removeImageField = (index: number) =>
    setImageUrls((prev) => prev.filter((_, i) => i !== index));

  const updateImageField = (index: number, value: string) =>
    setImageUrls((prev) => prev.map((url, i) => (i === index ? value : url)));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Gear" : "Add New Gear"}</DialogTitle>
        </DialogHeader>

        <form ref={formRef} action={action} className="flex flex-col gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={initialData?.name}
              placeholder="Gear title"
            />
            {fieldErrors?.name && (
              <p className="text-sm text-destructive">{fieldErrors.name[0]}</p>
            )}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={initialData?.description}
              placeholder="Gear description"
              rows={3}
            />
            {fieldErrors?.description && (
              <p className="text-sm text-destructive">
                {fieldErrors.description[0]}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                name="brand"
                defaultValue={initialData?.brand}
                placeholder="Brand"
              />
              {fieldErrors?.brand && (
                <p className="text-sm text-destructive">
                  {fieldErrors.brand[0]}
                </p>
              )}
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                name="model"
                defaultValue={initialData?.model}
                placeholder="Model"
              />
              {fieldErrors?.model && (
                <p className="text-sm text-destructive">
                  {fieldErrors.model[0]}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="pricePerDay">Price / day</Label>
              <Input
                id="pricePerDay"
                name="pricePerDay"
                type="number"
                step="0.01"
                defaultValue={initialData?.pricePerDay}
              />
              {fieldErrors?.pricePerDay && (
                <p className="text-sm text-destructive">
                  {fieldErrors.pricePerDay[0]}
                </p>
              )}
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="totalStock">Total stock</Label>
              <Input
                id="totalStock"
                name="totalStock"
                type="number"
                defaultValue={initialData?.totalStock}
              />
              {fieldErrors?.totalStock && (
                <p className="text-sm text-destructive">
                  {fieldErrors.totalStock[0]}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="categoryId">Category</Label>
            <Select name="categoryId" defaultValue={initialData?.categoryId}>
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
            {fieldErrors?.categoryId && (
              <p className="text-sm text-destructive">
                {fieldErrors.categoryId[0]}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label>Image URLs</Label>
            {imageUrls.map((url, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="Image URL"
                  value={url}
                  onChange={(e) => updateImageField(index, e.target.value)}
                />
                {imageUrls.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeImageField(index)}
                  >
                    <X className="size-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addImageField}
              className="w-fit"
            >
              <Plus className="mr-1 size-3.5" />
              Add another image
            </Button>
            {fieldErrors?.images && (
              <p className="text-sm text-destructive">{fieldErrors.images[0]}</p>
            )}
          </div>

          {state && !state.success && !fieldErrors && (
            <p className="text-sm text-destructive">{state.message}</p>
          )}

          <DialogFooter>
            <Button type="submit" disabled={pending}>
              {pending ? (
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