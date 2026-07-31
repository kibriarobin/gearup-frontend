import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Get in touch
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Have a question about renting or listing gear? We&apos;d love to
          hear from you.
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-5 py-6">
          <a
            href="mailto:support@gearup.com"
            className="flex items-center gap-3 rounded-md p-2 transition-colors"
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
              <Mail className="size-4 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">support@gearup.com</p>
            </div>
          </a>

          <a
            href="tel:+8801700000000"
            className="flex items-center gap-3 rounded-md p-2 transition-colors"
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
              <Phone className="size-4 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">+880 1700-000000</p>
            </div>
          </a>

          <div className="flex items-center gap-3 rounded-md p-2">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
              <MapPin className="size-4 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">Dhaka, Bangladesh</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}