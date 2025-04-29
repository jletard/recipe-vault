# PrepList.md

## 📋 Overview

**PrepList.md** is the tactical checklist for building the Recipe Vault system, step-by-step, in an efficient and logically staged order.

It focuses on essential milestones first before expanding into enhancements.

---

## 🛠 Phase 1: Core Systems (Foundations)

- [ ] Set up user authentication (sign up, login, logout)
- [ ] Create personal Vaults for each new user upon account creation
- [ ] Implement basic recipe CRUD (Create, Read, Update, Delete) inside personal Vault

---

## 🛠 Phase 2: Kitchen Creation and Membership

- [ ] Allow users to create Kitchens (become Chef)
- [ ] Enable Chef to invite users to Kitchen (send invitation)
- [ ] Allow users to accept/decline Kitchen invites
- [ ] Track Kitchen membership (Chef + Cooks)

---

## 🛠 Phase 3: Recipe Sharing and Collaboration

- [ ] Enable Chef to share Vault recipes into their Kitchen
- [ ] Enable Cooks to propose recipes to the Chef for approval
- [ ] Create live linking for shared recipes (updates sync)
- [ ] Add note system to shared recipes (Kitchen-only notes)
- [ ] Allow Chefs to review and delete notes

---

## 🛠 Phase 4: Membership Management and Access Control

- [ ] Allow Chefs to fire Cooks from their Kitchens
- [ ] Ensure fired users lose Kitchen access immediately
- [ ] Ensure fired users’ notes remain unless manually deleted
- [ ] Ensure pending Kitchen invites are revoked upon firing
- [ ] Allow Cooks to copy shared recipes into their Vault before firing

---

## 🛠 Phase 5: Future Enhancements (Optional)

- [ ] Pending note notifications for Chefs
- [ ] Soft deletion/archiving of Kitchens
- [ ] Public Kitchens (future feature, not urgent)
- [ ] User roles beyond Chef/Cook (future expansions)

---

🔧 **PrepList is the tactical backbone guiding steady progress toward the full Recipe Vault + Kitchen system.**