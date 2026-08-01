# GearUp Frontend 🏋️
**"Rent Sports & Outdoor Gear Instantly"**

A responsive Next.js frontend for a sports and outdoor equipment rental platform. Customers browse gear, place rental orders, and pay securely online. Providers manage their inventory and fulfill incoming orders. Admins moderate the entire platform through a dedicated dashboard.

> This is the frontend-only client for the [GearUp backend](https://github.com/kibriarobin/gearup-server) — a separate Node.js/Express/Prisma REST API.

**Live Frontend:** https://gearup-frontend-amber.vercel.app
**Frontend Repo:** https://github.com/kibriarobin/gearup-frontend
**Live Backend API:** https://gearup-server-mocha.vercel.app
**Backend Repo:** https://github.com/kibriarobin/gearup-server

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 (App Router) | React framework, routing, Server/Client Components |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| shadcn/ui (Radix) | UI component library |
| TanStack Query (React Query) | Server state management & data fetching |
| Zod | Schema validation for forms |
| next/image | Optimized image loading |
| SSLCommerz | Payment gateway (frontend redirect flow) |
| Custom JWT Middleware (`proxy.ts`) | Route protection & silent access-token refresh |
| Sonner | Toast notifications |
| pnpm | Package manager |

---

## 👥 Roles & Permissions

| Role | Description | What they can do |
|------|-------------|-------------------|
| **Customer** | Users who rent gear | Browse/filter gear, view details & reviews, place rental orders, pay via SSLCommerz, track order status, view payment history, leave reviews on returned gear |
| **Provider** | Gear vendors | Manage their own gear inventory (add/edit/delete, multiple image URLs), view and update status of incoming orders |
| **Admin** | Platform moderators | View/suspend/activate users, manage gear categories, moderate all gear listings and rental orders platform-wide |

> Role is selected at registration (`CUSTOMER` or `PROVIDER`). `ADMIN` accounts are not available via public registration and must be seeded directly in the database.

---

## ✨ Features

### Public
- Home page with a featured gear grid
- Browse & filter gear by category, brand, and price range
- Gear details page with image gallery, specifications, provider info, reviews, and an interactive date-picker-based "Rent Now" flow
- Category listing and static contact page

### Customer
- Registration/login with Zod-validated forms and inline field errors
- Rental order placement with live price calculation (days × quantity × rate)
- SSLCommerz payment flow with dedicated `/payment/success` and `/payment/cancel` pages
- Order history with status badges (`PLACED → CONFIRMED → PAID → PICKED_UP → RETURNED`), cancel action, and payment history
- Review submission for returned gear

### Provider
- Dashboard overview (total gear, active rentals, pending orders)
- Full gear CRUD via a shared create/edit dialog, including multiple image URLs
- Incoming order management with status-transition action buttons (Confirm / Mark Picked Up / Mark Returned)

### Admin
- Platform-wide overview stats (total users, active gear, total rentals)
- User management with search, pagination, and suspend/activate actions
- Category CRUD (create/edit/delete)
- Read-only moderation views for all gear and all rental orders across the platform

### Cross-cutting
- Role-based route protection via Next.js Middleware (`proxy.ts`), including silent access-token refresh using a `refreshToken` cookie
- Mobile-responsive navigation (Sheet-based menus) and dashboard sidebars
- Toast notifications and inline form errors for consistent error handling
- Custom `not-found.tsx`, `loading.tsx`, and `error.tsx` boundaries

---

## 📁 Folder Structure (high level)

```
app/
  (authGroup)/          # /login, /register
    _actions/  _components/
  (dashboardGroup)/      # /customer-dashboard, /provider-dashboard, /admin-dashboard
    _actions/  _components/  _config/  _utils/
  (publicGroup)/         # /, /gear, /gear/[id], /categories, /contact, /payment/*
    _actions/  _components/
  layout.tsx  error.tsx  loading.tsx  not-found.tsx

components/            # shared UI (Navbar, Footer, shadcn ui/, providers/)
lib/                   # type.ts, utils.ts
service/               # getMe.ts, logout.ts, refreshToken.ts
utils/                 # jwt.ts

proxy.ts                 # root middleware — role-based route protection + token refresh
```

---

## 🚀 Getting Started

```bash
# install dependencies
pnpm install

# run the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables (`.env.local`)

```env
BACKEND_API_URL=http://localhost:5000
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:5000

JWT_ACCESS_SECRET=<same value as the backend's JWT_ACCESS_SECRET>
JWT_REFRESH_SECRET=<same value as the backend's JWT_REFRESH_SECRET>
```

> `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET` must match the backend exactly — the middleware verifies the JWT cookies locally using these secrets.

For production (Vercel), set `BACKEND_API_URL` / `NEXT_PUBLIC_BACKEND_API_URL` to the deployed backend URL, and make sure the backend's `FRONTEND_URL` env var points back to this deployed frontend (used for SSLCommerz success/cancel redirects).

---

## 📄 Related Docs

- [`API_INTEGRATION.md`](./API_INTEGRATION.md) — full mapping of frontend components to backend endpoints