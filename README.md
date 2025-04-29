# Recipe Vault 🥘🔧

**The Unseen Chef Archive**

A mobile-first web application for browsing, managing, and safeguarding recipes —  
**dark, tactical, and elegant** like Gotham itself.

---

## 📋 Project Overview

Recipe Vault is a Next.js app (built with TypeScript and TailwindCSS) that connects securely to an Airtable database to manage recipes.

Designed with a **mobile-first Gotham philosophy** —  
**sleek** on large screens, but always **combat-ready** for mobile.

Each recipe card features:

- 🔧 Recipe name (dark-mode styling)
- 🔧 Expand/Collapse control (no accidental clicks)
- 🔧 Dynamic, color-coded tag badges
- 🔧 Ingredients formatted as a bulleted list
- 🔧 Procedure steps numbered cleanly
- 🔧 Optional notes section

---

## 🚀 Current Status

✅ **Major Gotham Milestone Reached:**

- Full live Airtable connection (Add ➔ Fetch ➔ Edit ➔ Delete)
- Expand/Collapse control via dedicated button (no more click conflicts)
- Dynamic, color-coded Tag System fully operational
- Real-time Tag Filtering and Live Search filtering
- Add New Recipes (with either existing tags or brand-new tags)
- Confirmed Edit and Delete flows with sleek confirmation modals
- Full Pagination and Display Count Selector integrated
- Automatic reloads after Add/Edit/Delete to ensure fresh, accurate UI
- Fully modular, scalable, and organized project architecture

---

## 🔥 Data Fetch Strategy

**For maximum security and elegance:**

- No Airtable API exposure to the browser
- All interactions via **Next.js internal API routes**:
  - `/api/recipes`
  - `/api/add-recipe`
  - `/api/edit-recipe`
  - `/api/delete-recipe`
- Server Routes:
  - Read Airtable credentials securely from `.env.local`
  - Map Airtable fields into clean, strongly-typed Recipe objects
- Client (`page.tsx`) fetches pre-sanitized data safely

✅ Airtable API token stays hidden — always.  
✅ All Airtable interactions are **server-controlled and bat-proof**.

---

## 🛃️ Planned TODO Features

### 🥇 Immediate Priorities

- Minor UI polish for Expand/Collapse button (visual tightness)
- Slight adjustments for perfect mobile responsiveness
- Optional Pagination UI refinement (minor styling for mobile)

### 🥈 Enhancement Wave

- Batch Delete capability for multiple recipes at once
- Optional tag editing features (in-place tag management)

### 🥉 Personalization Level

- Permanent color assignments to key tags
- Optional tag grouping/sorting features

### 🚀 Deployment Targets

- Deploy to Vercel
- Add SEO meta tags, favicon, and minor PWA optimizations

### 🌎 Future Optional Expansions

- Upload and display recipe photos
- Public recipe browsing mode
- Shareable recipe links

---

## 📄 Technical Strengths

    Full strict TypeScript coverage — no any left in Gotham

    Airtable field names are strongly typed and protected

    Modular folder structure (/app, /components, /hooks, /lib, /types, /utils)

    Mobile-first philosophy — responsive across all devices, including Samsung Fold, iPhones, and Batphones

    🔧 Unified Tag System:
    All tag visual styles are handled through a single reusable TagPill component (/components/TagPill.tsx).
    This ensures consistent appearance across Recipe Cards, Tag Filters, and the Add Recipe modal.
    Selected and unselected visual states are automatically managed inside the component —
    eliminating duplicated Tailwind class definitions and hardening the design for future scalability.

---

## 🏆 Notes on Today’s Triumph (April 30, 2025)

Today, Gotham grew even stronger:

- Full Edit Recipe functionality implemented
- Pagination system added with Display Count control
- Gotham-style Card layout standardized across pages
- Page.tsx refactored into a true Batcave control center
- Minor UI skews eliminated (no Smallville issues left)
- Full CRUD cycle (Add/Edit/Delete) confirmed clean and robust

✅ True professional-grade engineering  
✅ Zero hidden bugs  
✅ Platform fully battle-hardened and ready for expansion

---

🔧  
**Built for speed.  
Built for stealth.  
Built for victory.**

**This is the Recipe Vault.**
