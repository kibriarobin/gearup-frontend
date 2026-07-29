import { redirect } from "next/navigation";
import { Mail, Phone, ShieldCheck, CalendarDays, Compass } from "lucide-react";

import { getMe } from "@/service/getMe";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const roleLabel: Record<string, string> = {
  CUSTOMER: "Customer",
  PROVIDER: "Gear Provider",
  ADMIN: "Admin",
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default async function ProfilePage() {
  const result = await getMe();

  if (!result.success) {
    redirect("/login");
  }

  const user = result.data.profile;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">My Profile</h1>
        <p className="text-sm text-muted-foreground">
          Your account details on GearUp.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="size-16">
            <AvatarImage
              src={user.profile.profilePhoto ?? undefined}
              alt={user.name}
            />
            <AvatarFallback className="text-lg">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1">
            <span className="text-lg font-medium">{user.name}</span>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{roleLabel[user.role] ?? user.role}</Badge>
              <Badge
                variant={user.status === "ACTIVE" ? "default" : "destructive"}
              >
                {user.status}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="grid gap-4 pt-6">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">Email</span>
            <span className="ml-auto font-medium">{user.email}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Phone className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">Phone</span>
            <span className="ml-auto font-medium">
              {user.phone ?? "Not added"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <ShieldCheck className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">Role</span>
            <span className="ml-auto font-medium">
              {roleLabel[user.role] ?? user.role}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <CalendarDays className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">Member since</span>
            <span className="ml-auto font-medium">
              {formatDate(user.createdAt)}
            </span>
          </div>

          {user.profile.bio && (
            <>
              <Separator />
              <div className="text-sm">
                <span className="mb-1 block text-muted-foreground">Bio</span>
                <p>{user.profile.bio}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <Compass className="size-3.5" />
        <span>GearUp</span>
      </div>
    </div>
  );
}