# Recipe Vault

**The Unseen Chef Archive**

A mobile-first web application for browsing and managing recipes stored in Airtable.

---

## 📋 Project Overview

Recipe Vault is a Next.js app (with TypeScript and TailwindCSS) that connects to an Airtable database to fetch and display recipes.  
It is designed primarily for mobile screens but will scale up cleanly on larger devices.

Each recipe currently displays:
- The recipe name
- Associated tags (as styled badges)

---

## 🚀 Current Status

- Basic UI structure is complete.
- Data is fetched live from Airtable.
- Recipes are displayed as individual cards.
- Recipes are sorted alphabetically by name.
- Background, card, and tag styling are in place for a clean visual experience.

---

## 🔥 Fetch Strategy

For security and best practices:

- Airtable API requests **are not made directly from the browser**.
- Instead, a **Next.js internal API route** (`/api/recipes`) handles server-side fetching.
- The server route:
  - Reads Airtable credentials from `.env.local`
  - Fetches records from the Airtable base
  - Maps them into a clean `Recipe` type
  - Sends them as JSON to the client
- Client (`page.tsx`) fetches recipes from `/api/recipes` at runtime and renders them.

This keeps the Airtable API token **completely hidden from users** and ensures safe, maintainable data access.

---

## 🛣️ Future Plans

- Build a full recipe detail view.
- Enable search functionality.
- Add filtering by tags.
- Create admin-only editing and upload capabilities (TBD).
- Improve UI/UX with animations and transitions.

---

## 📄 Technical Notes

- This project uses **TypeScript** with strict typing across all modules.
- All Airtable field names are **strongly typed constants** to prevent future bugs.
- The project structure is modular and cleanly separated (`/app`, `/lib`, `/types`, `/components`).

---
