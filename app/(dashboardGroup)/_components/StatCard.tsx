import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type StatCardProps = {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  isLoading: boolean;
};

export function StatCard({ label, value, icon: Icon, isLoading }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <span className="text-sm font-medium text-muted-foreground">
          {label}
        </span>
        <Icon className="size-4 text-primary" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-16" />
        ) : (
          <span className="text-3xl font-semibold">{value}</span>
        )}
      </CardContent>
    </Card>
  );
}