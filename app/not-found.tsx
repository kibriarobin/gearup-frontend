import Link from "next/link";
import { Compass, MapPinOff, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden bg-background px-4">
      {/* dotted trail line, decorative */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
        aria-hidden="true"
      >
        <line
          x1="0"
          y1="30%"
          x2="100%"
          y2="70%"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="10 14"
          className="text-primary"
        />
      </svg>

      <div className="relative flex flex-col items-center text-center">
        <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-primary/10">
          <MapPinOff className="size-8 text-primary" strokeWidth={1.5} />
        </div>

        <span className="mb-2 text-sm font-medium tracking-wide text-primary">
          404
        </span>

        <h1 className="max-w-md text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Page not found
        </h1>

        <p className="mt-3 max-w-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="mr-1" />
              Home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/gear">
              <Search className="mr-1" />
              Browse gear
            </Link>
          </Button>
        </div>

        <div className="mt-12 flex items-center gap-2 text-xs text-muted-foreground">
          <Compass className="size-3.5" />
          <span>GearUp</span>
        </div>
      </div>
    </div>
  );
}