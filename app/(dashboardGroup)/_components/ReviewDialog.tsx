"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { submitReview } from "../_actions/reviewActions";

type ReviewDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gearId: string;
  gearName: string;
};

export function ReviewDialog({
  open,
  onOpenChange,
  gearId,
  gearName,
}: ReviewDialogProps) {
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => submitReview({ gearId, comment }),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Review submitted, thank you!");
        queryClient.invalidateQueries({ queryKey: ["customer-orders"] });
        setComment("");
        onOpenChange(false);
      } else {
        toast.error(result.message || "Could not submit review");
      }
    },
    onError: () => {
      toast.error("Could not submit review");
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Review: {gearName}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-1.5">
          <Label htmlFor="comment">Your feedback</Label>
          <Textarea
            id="comment"
            placeholder="your experience with this gear!"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
          />
        </div>

        <DialogFooter>
          <Button
            disabled={!comment.trim() || mutation.isPending}
            onClick={() => mutation.mutate()}
          >
            {mutation.isPending ? "Submitting..." : "Submit Review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}