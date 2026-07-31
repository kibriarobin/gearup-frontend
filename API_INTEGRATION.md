# API Integration — GearUp Frontend

This document maps each frontend component/page to the backend API endpoint(s) it consumes.

**Backend Base URL:** `https://gearup-server-mocha.vercel.app`
**Backend Repo:** https://github.com/kibriarobin97/gearup-server

---

## Authentication

| Frontend Component | Backend Endpoint | Method |
|---|---|---|
| `(authGroup)/login/page.tsx` → `LoginForm.tsx` → `loginAction` | `/api/auth/login` | POST |
| `(authGroup)/register/page.tsx` → `RegisterForm.tsx` → `registerAction` | `/api/auth/register` | POST |
| `service/getMe.ts` (used in root/dashboard layouts, Navbar) | `/api/auth/me` | GET |
| `proxy.ts` (middleware) → `service/refreshToken.ts` | `/api/auth/refresh-token` | POST |
| `service/logout.ts` | Clears local cookies (no backend call) | — |

---

## Public — Gear Browsing

| Frontend Component | Backend Endpoint | Method |
|---|---|---|
| `(publicGroup)/page.tsx` (Home — featured gear) | `/api/gear?limit=8&sortBy=createdAt&sortOrder=desc` | GET |
| `(publicGroup)/gear/page.tsx` (Browse + filters) | `/api/gear?category=&brand=&minPrice=&maxPrice=&searchItem=&page=&limit=` | GET |
| `_components/gear/GearFilters.tsx` | `/api/categories` | GET |
| `(publicGroup)/gear/[id]/page.tsx` (Details, gallery, specs, reviews) | `/api/gear/:id` | GET |
| `_components/gear/RentDatePicker.tsx` → `createRentalOrder` | `/api/rentals` | POST |

---

## Customer Dashboard

| Frontend Component | Backend Endpoint | Method |
|---|---|---|
| `customer-dashboard/page.tsx` (Overview stats) | `/api/rentals`, `/api/payments` | GET |
| `customer-dashboard/orders/page.tsx` → `CustomerOrderTable.tsx` | `/api/rentals` | GET |
| `CustomerOrderTable.tsx` — Cancel order | `/api/rentals/:id/status` (`{status: "CANCELLED"}`) | PATCH |
| `CustomerOrderTable.tsx` — Pay Now | `/api/payments/create` | POST |
| `customer-dashboard/payments/page.tsx` → `PaymentHistoryTable.tsx` | `/api/payments` | GET |
| `_components/ReviewDialog.tsx` → `submitReview` | `/api/reviews` | POST |
| `(publicGroup)/payment/success/page.tsx`, `payment/cancel/page.tsx` | Reached via backend redirect from `/api/payments/confirm` (SSLCommerz callback) | — |

---

## Provider Dashboard

| Frontend Component | Backend Endpoint | Method |
|---|---|---|
| `provider-dashboard/page.tsx` (Overview stats) | `/api/gear?limit=100` (filtered client-side by `providerId`), `/api/rentals/orders` | GET |
| `provider-dashboard/gear/page.tsx` → `getMyGear` | `/api/gear?limit=100` | GET |
| `_components/GearFormDialog.tsx` — Add gear | `/api/gear` | POST |
| `_components/GearFormDialog.tsx` — Edit gear | `/api/gear/:id` | PATCH |
| `provider-dashboard/gear/page.tsx` — Delete gear | `/api/gear/:id` | DELETE |
| `provider-dashboard/orders/page.tsx` → `OrderTable.tsx` | `/api/rentals/orders` | GET |
| `OrderTable.tsx` — Confirm / Mark Picked Up / Mark Returned | `/api/rentals/:id/status` | PATCH |

---

## Admin Dashboard

| Frontend Component | Backend Endpoint | Method |
|---|---|---|
| `admin-dashboard/page.tsx` (Overview stats) | `/api/admin/users?limit=1`, `/api/admin/gears`, `/api/admin/orders` | GET |
| `admin-dashboard/users/page.tsx` → `UserTable.tsx` | `/api/admin/users?search=&page=&limit=4` (default page size 4) | GET |
| `UserTable.tsx` — Suspend / Activate | `/api/admin/users/:id` (`{status}`) | PATCH |
| `admin-dashboard/categories/page.tsx` — List | `/api/categories` | GET |
| `admin-dashboard/categories/page.tsx` — Add | `/api/categories` | POST |
| `admin-dashboard/categories/page.tsx` — Edit | `/api/categories/:id` | PATCH |
| `admin-dashboard/categories/page.tsx` — Delete | `/api/categories/:id` | DELETE |
| `admin-dashboard/gear/page.tsx` → `AdminGearTable.tsx` | `/api/admin/gears` | GET |
| `admin-dashboard/rentals/page.tsx` → `AdminRentalsTable.tsx` | `/api/admin/orders` | GET |

---

## Route Protection

`proxy.ts` (root middleware) verifies the `accessToken` JWT cookie on every request to a protected route (`/customer-dashboard/*`, `/provider-dashboard/*`, `/admin-dashboard/*`, `/profile/*`). If the access token is expired but a valid `refreshToken` cookie exists, the middleware silently calls `/api/auth/refresh-token` to obtain a new access token before continuing. Unauthenticated requests are redirected to `/login?redirectTo=<original path>`; authenticated requests to a dashboard that doesn't match the user's role are redirected to `/not-found`.

---

## Notes

- All authenticated requests forward the `accessToken` cookie to the backend via the `Cookie` header from Next.js Server Actions (`"use server"` files under each route group's `_actions/` folder).
- All GET requests to protected/user-specific data use `cache: "no-store"` to avoid serving stale data across role/session changes.
- Payment confirmation (`/api/payments/confirm`) is called directly by SSLCommerz as a server-to-server/browser redirect callback, not by the frontend — the backend then redirects the browser to `/payment/success` or `/payment/cancel`.