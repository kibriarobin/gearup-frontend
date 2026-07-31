import Link from "next/link";
import { Compass, Mail, Phone } from "lucide-react";

const footerLinks = {
  explore: [
    { label: "Home", href: "/" },
    { label: "Browse Gear", href: "/gear" },
    { label: "Categories", href: "/categories" },
  ],
  account: [
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" },
    { label: "My Profile", href: "/profile" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-md bg-primary">
                <Compass className="size-5 text-primary-foreground" />
              </span>
              <span className="text-lg font-semibold tracking-tight">
                Gear<span className="text-primary">Up</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Rent sports and outdoor gear instantly from trusted local
              providers.
            </p>
          </div>

          
          <div>
            <h3 className="mb-3 text-sm font-semibold">Explore</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Account</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.account.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Contact</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="mailto:support@gearup.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <Mail className="size-3.5" />
                  support@gearup.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+8801700000000"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <Phone className="size-3.5" />
                  +880 1700-000000
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} GearUp. All rights reserved.
        </div>
      </div>
    </footer>
  );
}