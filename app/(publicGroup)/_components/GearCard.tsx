import Image from "next/image";
import Link from "next/link";
import { Tag, Package, Store, ImageOff } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IGearItem } from "@/lib/type";

export function GearCard({ gear }: { gear: IGearItem }) {
  const isAvailable = gear.availableCount > 0;
  const thumbnail = gear.images?.[0];

  return (
    <Link href={`/gear/${gear.id}`} className="block">
      <Card className="h-full overflow-hidden p-0 transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg hover:border-primary/30">
  <div className="relative aspect-video w-full bg-muted">
    {thumbnail ? (
      <Image
        src={thumbnail}
        alt={gear.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        className="object-cover"
      />
    ) : (
      <div className="flex h-full items-center justify-center">
        <ImageOff className="size-8 text-muted-foreground/40" />
      </div>
    )}
    <Badge
      variant={isAvailable ? "secondary" : "destructive"}
      className="absolute right-2 top-2"
    >
      {isAvailable ? "Available" : "Out of stock"}
    </Badge>
  </div>

  <CardHeader className="px-4 py-1.5">
    <h3 className="font-medium leading-tight">{gear.name}</h3>
    <p className="text-xs text-muted-foreground">
      {gear.brand}
      {gear.model && ` · ${gear.model}`}
    </p>
  </CardHeader>

  <CardContent className="flex flex-col gap-1.5 px-4 pb-3">
    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <Tag className="size-3.5" />
      {gear.category?.name ?? "Uncategorized"}
    </span>
    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <Package className="size-3.5" />
      {gear.availableCount} of {gear.totalStock} available
    </span>
    <span className="flex items-center gap-1.5 text-xs font-medium">
      <Store className="size-3.5" />
      Provider: {gear.provider?.name ?? "Unknown provider"}
    </span>
  </CardContent>

  <CardFooter className="px-4 pb-4 pt-0">
    <span className="text-lg font-semibold text-primary">
      ${gear.pricePerDay}
    </span>
    <span className="ml-1 text-sm text-muted-foreground">/ day</span>
  </CardFooter>
</Card>
    </Link>
  );
}