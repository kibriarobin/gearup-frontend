import Link from "next/link";
import { Tag, Package, Store } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IGearItem } from "@/lib/type";

export function GearCard({ gear }: { gear: IGearItem }) {
  const isAvailable = gear.availableCount > 0;

  return (
    <Link href={`/gear/${gear.id}`} className="block">
      <Card className="h-full transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg hover:border-primary/30">
        <CardHeader className="pb-2">
          <div className="mb-1 flex items-start justify-between gap-2">
            <h3 className="font-medium leading-tight">{gear.name}</h3>
            <Badge
              variant={isAvailable ? "secondary" : "destructive"}
              className="shrink-0"
            >
              {isAvailable ? "Available" : "Out of stock"}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {gear.brand}
            {gear.model && ` · ${gear.model}`}
          </p>
        </CardHeader>

        <CardContent className="flex flex-col gap-1.5 pb-3">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Tag className="size-3.5" />
            {gear.category?.name ?? "Uncategorized"}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Package className="size-3.5" />
            {gear.availableCount} of {gear.totalStock} available
          </span>
          <span className="flex items-center gap-1.5 text-xs font-medium">
            <Store className="size-3.5" />Provider: {gear.provider?.name ?? "Unknown provider"}
          </span>
        </CardContent>

        <CardFooter className="pt-0">
          <span className="text-lg font-semibold text-primary">
            ${gear.pricePerDay}
          </span>
          <span className="ml-1 text-sm text-muted-foreground">/ day</span>
        </CardFooter>
      </Card>
    </Link>
  );
}