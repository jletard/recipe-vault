# Recipe Vault

**The Unseen Chef Archive**

A mobile-first web application for browsing and managing recipes stored in Airtable.

---

## 📋 Project Overview

Recipe Vault is a Next.js app (with TypeScript and TailwindCSS) that connects to an Airtable database to fetch and display recipes.  
It is designed primarily for mobile screens but will scale up cleanly on larger devices.

Each recipe currently displays:
- The recipe name
- Expand/Collapse control for full details
- Associated tags (as styled color-coded badges)
- Ingredients formatted into a bulleted list
- Instructions formatted into a numbered list
- Notes (optional)

---

## 🚀 Current Status

✅ **As of today’s milestone:**

- Full live Airtable connection (Add, Fetch, Delete recipes)
- Recipes are displayed as expandable/collapsible cards
- Expand/Collapse now controlled by a clean, independent button (no card click conflicts)
- Tags are dynamically extracted, color-coded, and displayed as badges
- Tag filtering and live search filtering both fully functional
- **Dynamic Tag System:** Tags update automatically — no stale tags if recipes are deleted
- Add New Recipe with new or existing tags
- Confirmed Delete flow with confirmation modal
- Full reload after Add/Delete operations to ensure fresh data
- Project architecture remains modular, clean, and scalable

---

## 🔥 Fetch Strategy

For security and best practices:

- Airtable API requests **are not made directly from the browser**.
- Instead, a **Next.js internal API route** (`/api/recipes`, `/api/add-recipe`, `/api/delete-recipe`) handles server-side fetching and mutations.
- The server routes:
  - Read Airtable credentials from `.env.local`
  - Interact securely with the Airtable base
  - Map responses into clean, strongly-typed objects
- Client (`page.tsx`) fetches recipes from `/api/recipes` at runtime and renders them.

✅ Airtable API token is **completely hidden**.

✅ All data interactions are server-controlled.

---

## 🛣️ Planned TODO Features

### 🥇 First Priority (Next)

- Small UI Polish for Expand/Collapse Button (make it visually match site style)
- Tighten mobile layout further (spacing, text sizing)

### 🥈 Second Priority (Enhancements)

- Add Edit Recipe functionality (optional)
- Allow deleting multiple recipes at once (batch mode)

### 🥉 Third Priority (Advanced Personalization)

- Assign specific colors to specific tags
- Tag sorting and grouping (optional)

### 🚀 Fourth Priority (Deployment)

- Deploy clean version to Vercel
- Add meta tags, favicon, PWA tweaks

### 🌎 Fifth Priority (Optional Future Expansion)

- Upload photos per recipe
- Add public browsing mode
- Share recipe links

---

## 📄 Technical Notes

- Full **TypeScript** enforcement, no `any` types allowed
- Strongly-typed Airtable field names prevent bugs
- Clean project structure (`/app`, `/lib`, `/types`, `/components`, `/utils`, `/hooks`)
- Mobile-first responsive design

---

## 🏆 Notes on Today’s Win (April 28, 2025)

Today was a critical day for stability and structure:

- Solved major UX problem with card clicks
- Created clean Expand/Collapse component
- Built real Delete flow with confirmation
- Airtable live sync verified
- Dynamic Tag system verified
- Structure ready for full feature expansion

✅ A serious professional milestone.  
✅ No hidden broken behaviors.  
✅ Ready for polish and future scaling.

---
