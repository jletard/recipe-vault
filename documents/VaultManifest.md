# VaultManifest.md

## 📋 Overview

The **Recipe Vault** is a private, mobile-first application built for managing, safeguarding, and selectively sharing recipes.

Its architecture balances **personal privacy** (each user has their own Vault) with **optional collaboration** (through Kitchens).

This document defines the high-level vision and guiding principles for the system.

---

## 🏛 Core Concepts

### 1. **Vaults**

- Every user has a **private Vault** containing only their own recipes.
- Vaults are isolated by default; no other user can access a Vault unless recipes are explicitly shared.
- Users can choose to remain in their private Vaults indefinitely without ever creating or joining a Kitchen.

### 2. **Kitchens**

- A **Kitchen** is a collaborative space created by a user.
- Users ("Cooks") can be invited into a Kitchen by the creator ("Chef").
- Kitchens are **private** spaces — there are no public Kitchens at this stage.

### 3. **Roles and Hierarchy**

- Each Kitchen has **one Chef** (the creator/owner).
- All others in the Kitchen are **Cooks**.
- **Chef Powers:** Invite, fire, share recipes, remove notes.
- **Cook Powers:** Suggest recipes to the Chef, add notes on shared recipes.

### 4. **Recipe Sharing**

- Recipes are **live-linked** when shared into a Kitchen.
- Updates to the original recipe are reflected inside the Kitchen.
- Cooks can add **notes** to shared recipes; notes are visible to all members.
- Notes persist even if a Cook is later fired.

### 5. **Access and Privacy**

- Users must **accept** invitations to Kitchens manually.
- Joining a Kitchen does **not** expose a user's personal Vault.
- If a Cook copies a recipe into their Vault before being fired, they retain it.
- Fired Cooks lose all Kitchen access immediately but their notes remain.

### 6. **Future-Proofing**

- The system architecture leaves the possibility open for **public Kitchens** in the future if user demand warrants.

---

## 📜 Foundational Principles

| Principle | Description |
|:---|:---|
| Privacy First | Vaults are sacred; no automatic exposure through Kitchens. |
| Chef is Sovereign | Full control over their Kitchen, members, and shared content. |
| Consensual Participation | Users must accept Kitchen invites; no forced membership. |
| Respect for Contribution | Notes persist even after firing, preserving team input history. |
| Tactical Flexibility | Designed for easy future expansion without compromising current integrity. |

---

🔧 **Recipe Vault is built for stealth, strength, and total user control.**
