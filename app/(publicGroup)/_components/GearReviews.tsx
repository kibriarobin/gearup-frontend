import { MessageSquare } from "lucide-react";
import { IReview } from "@/lib/type";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export function GearReviews({ reviews }: { reviews: IReview[] }) {
  return (
    <div className="mt-8">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold tracking-tight">
        <MessageSquare className="size-4.5" />
        Reviews {reviews.length > 0 && `(${reviews.length})`}
      </h2>

      {reviews.length === 0 ? (
        <p className="rounded-md border border-dashed py-8 text-center text-sm text-muted-foreground">
          No reviews yet for this gear.
        </p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-lg border p-4">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium">
                  {review.customer?.name ?? "Anonymous"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(review.createdAt)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}