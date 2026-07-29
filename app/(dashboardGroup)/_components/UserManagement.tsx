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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { updateUserStatus } from "../_actions/adminActions";
import { IUser } from "@/lib/type";

const roleLabel: Record<string, string> = {
  CUSTOMER: "Customer",
  PROVIDER: "Provider",
  ADMIN: "Admin",
};

export function UserManagement({ users }: { users: IUser[] }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "ACTIVE" | "SUSPENDED";
    }) => updateUserStatus(id, status),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("User status updated");
        queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      } else {
        toast.error(result.message || "Could not update user");
      }
    },
    onError: () => {
      toast.error("Could not update user");
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            const isPending =
              mutation.isPending && mutation.variables?.id === user.id;
            const nextStatus =
              user.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";

            return (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {user.email}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {roleLabel[user.role] ?? user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={user.status === "ACTIVE" ? "default" : "destructive"}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {user.role !== "ADMIN" && (
                    <Button
                      size="sm"
                      variant={user.status === "ACTIVE" ? "destructive" : "default"}
                      disabled={isPending}
                      onClick={() =>
                        mutation.mutate({ id: user.id, status: nextStatus })
                      }
                    >
                      {isPending
                        ? "Updating..."
                        : user.status === "ACTIVE"
                          ? "Suspend"
                          : "Activate"}
                    </Button>
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