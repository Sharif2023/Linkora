# Quality Assurance Test Plan — Linkora

**Project:** Linkora (Full-Stack Next.js 15 Platform)  
**QA Lead:** Senior SQA & QA Automation Engineer  
**Date:** October 2026  
**Document Version:** 1.0  
**Testing Framework:** Playwright (TypeScript)  
**Database Provider:** Neon Serverless PostgreSQL (Prisma ORM)

---

## 1. Executive Summary & Objective

Linkora is a production full-stack platform designed to help builders, creators, and founders discover curated digital resources, explore structured ambition blueprints (Implement Ideas), and organize actionable bookmarks into personal collections. 

The primary objective of this SQA Test Plan is to establish a rigorous, repeatable automated testing infrastructure that validates end-to-end user journeys, RESTful API contracts, security invariants, data integrity, and cross-feature workflows without disrupting core software engineering capabilities.

---

## 2. Scope of Testing

### 2.1 In Scope

| Area | Scope Description |
| :--- | :--- |
| **Authentication & Authorization** | Credential registration, login, logout, password reset flow (token generation & reset), NextAuth session enforcement on protected routes (`/dashboard`, `/settings`). |
| **Explore & Resource Discovery** | Instant query filtering, category pills, layout toggling (grid vs list), empty state handling, and resource detail modal / page navigation. |
| **Implement Ideas (Execution Blueprints)** | Blueprint directory, category filtering, roadmap detail pages (`/implement-ideas/[slug]`), interactive task completion toggling, progress percentage calculation, local storage guest persistence, server-side task sync, bookmarking, and backward-compatible redirects from legacy `/stacks` & `/stack/[slug]`. |
| **Curated Collections** | Themed collections directory (`/collections`), collection detail (`/collections/[slug]`), cross-linking to associated blueprints, and core tools navigation. |
| **User Settings & Intelligence Dashboard** | User dashboard (`/dashboard`), active roadmaps tracking tab (`/dashboard/roadmaps`), personal profile update (`PUT /api/profile`), and password change (`PUT /api/profile/password`). |
| **API Endpoints** | Status codes, error payloads, parameter validation (via Zod schemas), idempotency, email normalization, authentication guard rails (`401 Unauthorized`), and response schema validation. |

### 2.2 Out of Scope
- Third-party OAuth provider login interactions with live external servers (Google/GitHub accounts) in automated local suites (mocked/stubbed or verified via credentials provider).
- External external URL reachability testing for outgoing external resources (e.g. Canva, DaVinci Resolve external website domains).
- Performance load testing exceeding 10,000 concurrent RPS (benchmarking is reserved for dedicated stress testing cycles).

---

## 3. Test Pyramid Strategy

Linkora adheres to a balanced, high-confidence test pyramid:

```
          / \
         /   \     E2E UI Tests (Playwright)
        / E2E \    - 22 Automated Scenarios
       /-------\   - Critical User Journeys & LocalStorage
      /   API   \  RESTful API Integration Tests
     / Integration\ - 21 Automated Scenarios
    /--------------\- Zod Validation, Auth Guards, DB Integrity
   /  Prisma Schema \ Schema Validations & Migrations
  /__________________\
```

1. **API Integration Tier (`tests/api/`):** Fast, direct HTTP assertions against Next.js route handlers. Validates status codes (200, 201, 400, 401, 409), error responses, input validation boundaries, token lifecycles, and database side-effects.
2. **End-to-End Tier (`tests/e2e/`):** Real user journeys executed in headless Chromium using Playwright. Validates DOM interactions, client-side React state, form submissions, navigation redirects, local storage synchronization, and visual feedback.

---

## 4. Test Environment & Tools

| Component | Specification |
| :--- | :--- |
| **Runtime** | Node.js v20.x, Windows / Ubuntu (CI) |
| **Framework** | Next.js 15 (App Router, React 19) |
| **Database** | Neon PostgreSQL via `@prisma/client` |
| **Test Automation Tool** | `@playwright/test` v1.58+ |
| **Browsers** | Chromium (Desktop viewport 1280x720) |
| **CI/CD** | GitHub Actions (`.github/workflows/playwright.yml`) |
| **Reporting** | Playwright Built-in HTML Reporter & Failure Traces |

---

## 5. Test Data Management

- **User Accounts:** Automated test runs dynamically generate isolated, non-colliding test accounts via `generateTestUser()` in `tests/helpers/test-data.ts` using timestamped UUIDs.
- **Seeded Datasets:** Tested against existing production-grade seeds in Neon DB (5 execution blueprints, 10 curated collections, categories, and resources).
- **Cleanup Strategy:** Ephemeral sessions; API tests leverage isolated email addresses ensuring zero interference between concurrent test runners.

---

## 6. Roles & Security Boundaries

Linkora enforces two primary role paradigms:
1. **Guest (Unauthenticated):**
   - Can explore resources, search, filter categories, view curated collections, view execution blueprints.
   - Roadmap task checklist toggling is preserved in browser `localStorage`.
   - Cannot access `/dashboard` or `/settings` (automatically redirected with 307/302 to `/login`).
   - Direct API calls to mutate user data (`POST /api/bookmarks`, `POST /api/collections`, `PUT /api/profile`) are rejected with `401 Unauthorized`.
2. **Authenticated User:**
   - Full read/write access to personal bookmarks, active roadmap progress syncing to PostgreSQL, personal collections, and profile preferences.

---

## 7. Entry, Exit, and Suspension Criteria

- **Entry Criteria:**
  - Next.js development server running on `http://localhost:3000`.
  - Neon PostgreSQL reachable via `DATABASE_URL`.
  - Prisma client generated and up-to-date.
- **Exit Criteria:**
  - 100% of automated E2E and API tests passing.
  - Zero critical or high-severity defect regressions.
  - Test reports and traces successfully generated without flakiness.
- **Suspension Criteria:**
  - Database connection outage or server crash on initialization.
