import { GearCard } from "./GearCard";
import { IGearItem } from "@/lib/type";

export function GearGrid({ gear }: { gear: IGearItem[] }) {
  if (gear.length === 0) {
    return (
      <div className="rounded-md border border-dashed py-16 text-center text-muted-foreground">
        No gear found.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {gear.map((item) => (
        <GearCard key={item.id} gear={item} />
      ))}
    </div>
  );
}