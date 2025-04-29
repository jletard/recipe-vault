# AIFieldManual.md

## 📋 Overview

This document defines the operational rules and behavioral expectations for any ChatGPT or AI assistant interacting with the **Recipe Vault** project.

It ensures consistent, efficient, and focused collaboration every session — no assumptions, no wasted time.

---

## 🦇 Project Summary

- **Name:** Recipe Vault
- **Purpose:** Private, mobile-first web application for managing, safeguarding, and selectively sharing recipes.
- **Architecture:** Built with Next.js (App Router), TypeScript (strict mode), and TailwindCSS.
- **Data Source:** Airtable database (recipes pulled server-side).

---

## 📂 Key Project Structure

| Path | Purpose |
|:---|:---|
| `/src/app/page.tsx` | Primary homepage UI — handles browsing, searching, filtering, pagination, modal control |
| `/src/components/` | Modular UI elements (Buttons, Modals, RecipeCard, etc.) |
| `/src/hooks/` | Reusable logic (e.g., `useTagFilter`, `useAddRecipe`) |
| `/src/lib/` | External service connections (e.g., Airtable API handler) |
| `/src/types/` | TypeScript interfaces and types |
| `/src/utils/` | Helper functions (e.g., `tagColors.ts`) |
| `/documents/` | Internal planning documents |

---

## 📜 Rules of Engagement (ChatGPT Behavior Expectations)

1. **No assumptions without confirmation.**
2. **Never use `any` type.**  
   Always strict TypeScript typing.
3. **Comment headers at top of every code file.**  
   (Filename and purpose.)
4. **No spaghetti code.**  
   Modular, clean, small logical components.
5. **Only one modal open at any time.**  
   No stacked modals.
6. **Client-side pagination only.**  
   Full recipe set is always fetched at once.
7. **Tag colors are dynamic.**  
   They can change — no permanent color locks.
8. **Vaults are private unless explicitly shared.**
9. **Kitchen hierarchy is sacred:**  
   Chefs control Kitchens; Cooks suggest but do not command.

---

## 📄 Primary Internal Documents (Located in `/documents/`)

| File | Purpose |
|:---|:---|
| `VaultManifest.md` | Full system vision and overview |
| `ChefOrders.md` | User roles, powers, and permissions |
| `KitchenConstitution.md` | Recipe sharing and access rules |
| `PrepList.md` | Tactical build checklist |
| `GothamGuideToNextJS.md` | Internal Next.js technical guide |
| `AIFieldManual.md` | This behavior and protocol manual |

---

## ⚡ Session Protocol Reminders

- **Listen fully before acting.**
- **Confirm understanding before offering solutions.**
- **Use one-question-at-a-time mode if user requests.**
- **Stay tactical, dark, focused — Gotham mindset.**
- **Ask permission before generating big changes.**

---

🔧 **The AIFieldManual ensures the Recipe Vault project remains dark, minimalistic, tactical, and under full user control.**
