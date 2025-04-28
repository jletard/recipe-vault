# Recipe Vault

**The Unseen Chef Archive**

A mobile-first web application for browsing and managing recipes stored in Airtable.

---

## 📋 Project Overview

Recipe Vault is a Next.js app (with TypeScript and TailwindCSS) that connects to an Airtable database to fetch and display recipes.  
It is designed primarily for mobile screens but will scale up cleanly on larger devices.

Each recipe currently displays:
- The recipe name
- Associated tags (as styled color-coded badges)
- (Future) Expandable full recipe details

---

## 🚀 Current Status

- Basic UI structure is complete.
- Data is fetched live from Airtable.
- Recipes are displayed as individual cards.
- Recipes are sorted alphabetically by name.
- Tags are displayed as colorful badges (systematically assigned).
- Tag filtering is fully functional.
- Live search filtering by recipe name is fully functional.
- Project architecture is modular, clean, and scalable.

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

## 🛣️ Planned TODO Features

### 🥇 First Priority (MVP - Minimum Working Version)

- Expand/Contract Recipe Cards
- Format Ingredients into Bulleted List
- Format Procedure into Numbered List

### 🥈 Second Priority (Adding New Content)

- Add New Recipe Method (Floating "+" Button)
- Popup Form for New Recipe
- Tag Picker from Existing Tags (with "Add New Tag" option)

### 🥉 Third Priority (Polishing for Personal Use)

- Required Tag Colors (specific tags = specific colors)
- Random Color for Unknown/New Tags
- General UI/UX Polishing

### 🚀 Fourth Priority (Deployment)

- Deploy to Vercel for mobile phone usage
- Tweak layout and responsiveness for different screen sizes

### 🌎 Fifth Priority (Optional Future Expansion - "World Domination")

- Assign specific colors to specific tags
- Add user accounts
- Allow photo uploads
- Advanced filtering and searching
- Public version for recipe sharing (TBD)

---

## 📄 Technical Notes

- This project uses **TypeScript** with strict typing across all modules.
- All Airtable field names are **strongly typed constants** to prevent future bugs.
- The project structure is modular and cleanly separated (`/app`, `/lib`, `/types`, `/components`, `/utils`, `/hooks`).
- Fully mobile-first design philosophy, scaling cleanly to desktop.

---
