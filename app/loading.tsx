import { Compass } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 bg-background px-4">
      <div className="relative flex size-14 items-center justify-center">
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
        <Compass className="size-6 text-primary" strokeWidth={1.5} />
      </div>
      <p className="text-sm text-muted-foreground">Gearing up…</p>
    </div>
  );
}