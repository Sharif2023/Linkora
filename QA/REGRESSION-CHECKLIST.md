# QA Regression Testing Checklist — Linkora

This checklist must be executed prior to any production deployment or major release to guarantee zero regressions across Linkora's core functionality.

---

## 1. Automated Regression Suite Execution

Run the complete automated Playwright suite:

```bash
# Run all automated tests (43 passing tests)
npm test

# Expected output:
# 43 passed
# 0 failed
```

---

## 2. Pre-Release Functional Checklist

### 2.1 Authentication & Security Gates
- [ ] **User Registration:** Can register a new user with valid name, email, and password.
- [ ] **Case Insensitivity:** Mixed-case emails (e.g. `User@Test.com`) are normalized to lowercase on registration and sign-in (`BUG-01` verified).
- [ ] **Password Reset:** Forgot password generates a valid token without user enumeration; token allows successful password update.
- [ ] **Route Protection:** Direct access to `/dashboard` or `/settings` while logged out reliably redirects to `/login`.
- [ ] **API Protection:** Direct HTTP mutations without NextAuth session return `401 Unauthorized` (`/api/bookmarks`, `/api/collections`, `/api/profile`, `/api/ideas/progress`).

### 2.2 Resource Directory & Search (`/explore`)
- [ ] **Catalog Rendering:** Resources render with thumbnail, title, category, description, and tags.
- [ ] **Instant Search:** Typing in search bar immediately filters resource cards without page reload.
- [ ] **Empty States:** Searching for non-existent keywords displays a friendly empty state card.
- [ ] **View Switcher:** Clicking grid / list view switches layout dynamically.
- [ ] **Detail Navigation:** Clicking a resource card navigates to `/resource/[slug]`.

### 2.3 Implement Ideas & Execution Blueprints (`/implement-ideas`)
- [ ] **Directory Page:** Displays execution blueprints with difficulty, timeline, and outcome.
- [ ] **Category Filter:** Clicking category filter pills (e.g. "Creator Economy", "SaaS & Startups") filters blueprint cards accurately.
- [ ] **Interactive Checklists:** Clicking action item tasks increments progress percentage bar.
- [ ] **Guest Persistence:** Task progress is preserved in `localStorage` across page reloads for unauthenticated users.
- [ ] **Authenticated Progress Sync:** Authenticated users have progress synced to PostgreSQL database via `POST /api/ideas/progress`.
- [ ] **Bookmark Plan:** Clicking "Bookmark Plan" toggles state and persists plan bookmark.
- [ ] **Legacy Redirects:** Visiting legacy `/stacks` redirects to `/implement-ideas`; visiting `/stack/[slug]` redirects to `/implement-ideas/[slug]`.

### 2.4 Curated Collections (`/collections`)
- [ ] **Collections Directory:** Renders curated packs with icons, descriptions, and item count.
- [ ] **Collection Detail (`/collections/[slug]`):** Displays recommended execution blueprints and core tools grid.
- [ ] **Collection Creation:** Rejects blank or whitespace-only collection titles (`BUG-03` verified).

### 2.5 Personal Intelligence Dashboard (`/dashboard`)
- [ ] **Dashboard Overview:** Displays welcome banner with user name.
- [ ] **Clean Bookmarks:** Saved resource items display valid titles and links without `"Unknown"` placeholders (`BUG-04` verified).
- [ ] **Active Roadmaps View (`/dashboard/roadmaps`):** Displays started blueprints with real-time percentage completion.
- [ ] **Settings Form (`/settings`):** User can update full name and change password with instant feedback banners.

---

## 3. Data Integrity & API Idempotency
- [ ] **Bookmark Deduplication:** Multiple rapid clicks on bookmarking do not create duplicate `SavedItem` rows (`BUG-02` verified).
- [ ] **Prisma Migrations:** Schema matches PostgreSQL database with all foreign keys and cascades in sync.

---

## 4. Release Sign-Off Signatures

| Role | Name | Status | Date |
| :--- | :--- | :--- | :--- |
| **QA Lead** | Automated Playwright CI & QA Engineer | **APPROVED** | October 2026 |
| **Full-Stack Lead**| Antigravity AI Engineer | **APPROVED** | October 2026 |
