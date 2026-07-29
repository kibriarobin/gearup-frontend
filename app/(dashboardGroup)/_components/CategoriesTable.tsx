"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
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

import { ICategory } from "@/lib/type";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../_actions/categoryAction";

export default function CategoriesTable() {
  const queryClient = useQueryClient();

  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<ICategory | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["categories"] });

  const createMutation = useMutation({
    mutationFn: (name: string) => createCategory(name),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Category added");
        setNewName("");
        invalidate();
      } else {
        toast.error(result.message || "Could not add category");
      }
    },
    onError: () => toast.error("Could not add category"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateCategory(id, name),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Category updated");
        setEditingId(null);
        invalidate();
      } else {
        toast.error(result.message || "Could not update category");
      }
    },
    onError: () => toast.error("Could not update category"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Category deleted");
        invalidate();
      } else {
        toast.error(result.message || "Could not delete category");
      }
      setDeleteTarget(null);
    },
    onError: () => {
      toast.error("Could not delete category");
      setDeleteTarget(null);
    },
  });

  const startEdit = (category: ICategory) => {
    setEditingId(category.id);
    setEditingName(category.name);
  };

  return (
    <div>
      
      <div className="mb-6 flex gap-2">
        <Input
          placeholder="Enter category name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="max-w-xs"
        />
        <Button
          onClick={() =>
            newName.trim() && createMutation.mutate(newName.trim())
          }
          disabled={!newName.trim() || createMutation.isPending}
        >
          <Plus className="mr-1 size-4" />
          {createMutation.isPending ? "Adding..." : "Add"}
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : data?.data.length === 0 ? (
        <div className="rounded-md border border-dashed py-16 text-center text-muted-foreground">
          No categories yet. Add one above.
        </div>
      ) : (
        <div className="max-w-xl rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    {editingId === category.id ? (
                      <Input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="h-8"
                        autoFocus
                      />
                    ) : (
                      category.name
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {editingId === category.id ? (
                      <div className="flex justify-end gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            editingName.trim() &&
                            updateMutation.mutate({
                              id: category.id,
                              name: editingName.trim(),
                            })
                          }
                          disabled={updateMutation.isPending}
                        >
                          <Check className="size-4 text-primary" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setEditingId(null)}
                        >
                          <X className="size-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex justify-end gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => startEdit(category)}
                          aria-label="Edit category"
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setDeleteTarget(category)}
                          aria-label="Delete category"
                        >
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this category?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove &quot;{deleteTarget?.name}&quot;. Gear items
              using this category may be affected.
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
