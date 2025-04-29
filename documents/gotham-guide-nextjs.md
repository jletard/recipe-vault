# Gotham Guide to Next.js 🦇

_A tactical reference for navigating and mastering Next.js like Gotham itself._

---

## 📋 Core Concepts

- **App Directory (`/app`)**  
  Modern Next.js uses the `app/` directory by default (App Router).  
  Pages are defined by **folder structure**, not manual routes.

- **Page Components (`page.tsx`)**  
  Every folder with a `page.tsx` becomes a route:
  - `/app/page.tsx` → `/`
  - `/app/about/page.tsx` → `/about`
  
- **Server vs Client**  
  Files default to **Server Components**.  
  If you need browser features (`useState`, `useEffect`), add at the top:  
  ```tsx
  "use client";
  ```

---

## 🦇 Gotham Philosophy

- **`page.tsx`** is the **Batcave**:  
  The master control room where Gotham’s operations are coordinated.

- **`/components/`** is the **Utility Belt**:  
  Modular tools (buttons, modals, cards) crafted for specific missions.

---

## 🔥 Data Fetching Tactics

- **Server Side Fetching (`async` components)**  
  In server components, you can directly `await` fetches.

- **Client Side Fetching (`useEffect`)**  
  Inside `"use client"` components, use `useEffect` to trigger fetches after render.

- **Internal API Routes (`/app/api/`)**  
  Create your own serverless API functions under `/app/api/`.  
  Example:
  - `/app/api/recipes/route.ts`
  - Can `GET`, `POST`, `PATCH`, `DELETE` inside them.

---

## 🛡 State Management

- **useState()**  
  Local component state (small, fast).

- **Lifting State Up**  
  Pass state control functions (`setSomething`) down into components via props.

- **Custom Hooks**  
  Create organized logic like `/hooks/useTagFilter.ts` to keep components lean.

---

## 🏗 File and Folder Structure (Recommended Gotham Standard)

```
/app          ← Pages and routes
/components   ← Reusable UI pieces
/hooks        ← Reusable logic hooks
/lib          ← External services (ex: Airtable connection)
/types        ← Strong TypeScript types
/utils        ← Helper functions (sorting, colors, scroll)
```

---

## ⚡ Deployment Basics

- Use **Vercel** (built by the same creators of Next.js).
- Create a `.env.production` if needed for server variables.
- Push to GitHub → Connect to Vercel → Deploy.
- ✅ Serverless-ready by default.
- ✅ Automatic SSR and optimization.

---

## 🧹 Gotham Coding Principles

- **"No 'any' shall live in Gotham."**  
  Always type your variables.

- **"All pages load at the top."**  
  Fix scroll position resets where needed.

- **"The Batcave stays modular."**  
  No massive god-components — break into smaller focused pieces.

- **"Darkness must be clean."**  
  TailwindCSS for minimalist styling; no visual clutter.

- **"The Signal must be strong."**  
  Clear commit messages. Clear documentation. Clear intentions.

---

## 📜 Important Next.js Facts to Remember

| Topic | Gotham Rule |
|:---|:---|
| Routing | Folder structure is law |
| Server Actions | Await directly inside server components |
| Client Components | `"use client"` at top |
| Caching | Automatic unless `cache: "no-store"` |
| Environment Vars | Only exposed manually if needed (`NEXT_PUBLIC_`) |

---

# 🦇 Final Reminder

> _"Next.js is not just a tool. It is Gotham’s power grid.  
> Protect it. Use it. Master it."_

---

🔧 **Built for stealth.  
Built for speed.  
Built for Gotham.**
