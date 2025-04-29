# ChefOrders.md

## 📋 Overview

**ChefOrders.md** defines the roles, permissions, and responsibilities of all users interacting with the Recipe Vault system.

This document ensures clarity in user behavior and authority, particularly inside Kitchens.

---

## 🧑‍🍳 User Types

### 1. **Chef**

- **Definition:** The creator and owner of a Kitchen.
- **Primary Powers:**
  - Users only become Chefs when they choose to create a Kitchen. By default, all users begin as Vault Owners.
  - Create Kitchens.
  - Invite users (Cooks) into their Kitchen.
  - Fire users from their Kitchen.
  - Share their Vault recipes into the Kitchen.
  - Review and delete notes added by Cooks.
  - Send recipes out to all Kitchen members.
- **Control:**
  - Full sovereign control over their Kitchen's membership and shared content.

### 2. **Cook**

- **Definition:** A user invited into a Kitchen by a Chef.
- **Primary Powers:**
  - Accept or reject Kitchen invitations.
  - View recipes shared into the Kitchen.
  - Add notes to shared recipes.
  - Suggest recipes (send) to the Chef for consideration.
  - Copy shared recipes into their personal Vault (before firing).
- **Limitations:**
  - Cannot invite other users.
  - Cannot fire members.
  - Cannot edit original Vault recipes.

---

## 🛡 User Flow Summary

| Action | Chef | Cook |
|:---|:---|:---|
| Create Kitchen | ✅ | ❌ |
| Invite Users | ✅ | ❌ |
| Accept Invitation | ❌ | ✅ |
| Share Vault Recipe into Kitchen | ✅ | ✅ (send for approval) |
| Fire Users | ✅ | ❌ |
| Add Notes on Recipes | ✅ | ✅ |
| Remove Notes | ✅ | ❌ |
| Copy Recipes into Vault | ✅ | ✅ (if done before firing) |

---

## ⚖ Key Behavioral Rules

- A Chef’s decision is final within their Kitchen.
- Cooks are guests within a Kitchen and must respect recipe ownership.
- Vaults remain private unless recipes are explicitly shared.
- Mutual respect governs Kitchen collaboration — abusive behavior is grounds for firing.

---

🔧 **ChefOrders ensures order, respect, and tactical efficiency inside every Kitchen.**