import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { IGearItem } from "@/lib/type";

export function AdminGearTable({ gear }: { gear: IGearItem[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price/Day</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Available</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {gear.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell className="text-muted-foreground">
                {item.provider?.name ?? "—"}
              </TableCell>
              <TableCell>{item.category?.name ?? "—"}</TableCell>
              <TableCell>${item.pricePerDay}</TableCell>
              <TableCell>{item.totalStock}</TableCell>
              <TableCell>
                <Badge variant={item.availableCount > 0 ? "secondary" : "destructive"}>
                  {item.availableCount} available
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}