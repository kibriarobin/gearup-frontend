"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";

import { getMyGear, deleteGear } from "../../_actions/gearActions";
import { GearFormDialog } from "../../_components/GearFormDialog";
import { IGearItem } from "@/lib/type";

export default function MyGearPage() {
  const queryClient = useQueryClient();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingGear, setEditingGear] = useState<IGearItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<IGearItem | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["my-gear"],
    queryFn: getMyGear,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteGear(id),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Gear deleted");
        queryClient.invalidateQueries({ queryKey: ["my-gear"] });
      } else {
        toast.error(result.message || "Could not delete gear");
      }
      setDeleteTarget(null);
    },
    onError: () => {
      toast.error("Could not delete gear");
      setDeleteTarget(null);
    },
  });

  const openAddDialog = () => {
    setEditingGear(null);
    setDialogOpen(true);
  };

  const openEditDialog = (gear: IGearItem) => {
    setEditingGear(gear);
    setDialogOpen(true);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">My Gear</h1>
          <p className="text-sm text-muted-foreground">
            Manage your gear inventory.
          </p>
        </div>
        <Button onClick={openAddDialog}>
          <Plus className="mr-1 size-4" />
          Add Gear
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : data?.data.length === 0 ? (
        <div className="rounded-md border border-dashed py-16 text-center text-muted-foreground">
          No gear listed yet. Add your first item to get started.
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Brand / Model</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price/Day</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Update</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((gear) => (
                <TableRow key={gear.id}>
                  <TableCell className="font-medium">{gear.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {gear.brand} · {gear.model}
                  </TableCell>
                  <TableCell>{gear.category?.name}</TableCell>
                  <TableCell>${gear.pricePerDay}</TableCell>
                  <TableCell>{gear.totalStock}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        gear.availableCount > 0 ? "secondary" : "destructive"
                      }
                    >
                      {gear.availableCount} available
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(gear)}
                      aria-label="Edit gear"
                    >
                      <Pencil className="size-4" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteTarget(gear)}
                      aria-label="Delete gear"
                    >
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <GearFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initialData={editingGear}
      />

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this gear?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove &quot;{deleteTarget?.name}&quot; from
              your inventory. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                deleteTarget && deleteMutation.mutate(deleteTarget.id)
              }
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
