"use client";

import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { ImageOff, Tag, Store, Package } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { getMe } from "@/service/getMe";
import { RentDatePicker } from "../../_components/RentDatePicker";
import { GearReviews } from "../../_components/GearReviews";
import { getGearById } from "../../_actions/getGear";

export default function GearDetailsPage() {
  const params = useParams<{ id: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ["gear", params.id],
    queryFn: () => getGearById(params.id),
  });

  const { data: userResult } = useQuery({
    queryKey: ["current-user"],
    queryFn: getMe,
  });

  const [activeImage, setActiveImage] = useState(0);

  if (isLoading) {
    return (
      <div className="grid gap-8 lg:grid-cols-2">
        <Skeleton className="aspect-video w-full rounded-xl" />
        <div className="space-y-3">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  const gear = data?.data;

  if (!gear) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        Gear not found.
      </div>
    );
  }

  const currentUser =
    userResult?.success && "data" in userResult
      ? userResult.data.profile
      : null;

  const images = gear.images?.length ? gear.images : [];

  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-2">
        
        <div>
          <div className="relative mb-3 aspect-video w-full overflow-hidden rounded-xl bg-muted">
            {images.length > 0 ? (
              <Image
                src={images[activeImage]}
                alt={gear.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <ImageOff className="size-10 text-muted-foreground/40" />
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img, index) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(index)}
                  className={`relative size-16 shrink-0 overflow-hidden rounded-md border-2 ${
                    activeImage === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${gear.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        
        <div>
          <div className="mb-2 flex items-start justify-between gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              {gear.name}
            </h1>
            <Badge variant={gear.availableCount > 0 ? "secondary" : "destructive"}>
              {gear.availableCount > 0 ? "Available" : "Out of stock"}
            </Badge>
          </div>

          <p className="mb-4 text-2xl font-semibold text-primary">
            ${gear.pricePerDay}
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              / day
            </span>
          </p>

          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
            {gear.description}
          </p>

         
          <div className="mb-6 grid grid-cols-2 gap-3 rounded-xl border p-4 text-sm">
            <div>
              <span className="text-muted-foreground">Brand</span>
              <p className="font-medium">{gear.brand}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Model</span>
              <p className="font-medium">{gear.model || "—"}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <Tag className="size-3.5 text-muted-foreground" />
              <div>
                <span className="text-muted-foreground">Category</span>
                <p className="font-medium">{gear.category?.name ?? "—"}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Package className="size-3.5 text-muted-foreground" />
              <div>
                <span className="text-muted-foreground">Stock</span>
                <p className="font-medium">
                  {gear.availableCount} of {gear.totalStock}
                </p>
              </div>
            </div>
          </div>

         
          <div className="mb-6 flex items-center gap-2 rounded-xl border p-4 text-sm">
            <Store className="size-4 text-muted-foreground" />
            <div>
              <span className="text-muted-foreground">Provided by</span>
              <p className="font-medium">{gear.provider?.name ?? "Unknown"}</p>
            </div>
          </div>

          <RentDatePicker gear={gear} currentUser={currentUser} />
        </div>
      </div>

      <GearReviews reviews={gear.reviews ?? []} />
    </div>
  );
}