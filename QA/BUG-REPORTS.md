# QA Defect & Bug Reports — Linkora

This report details defects discovered through systematic source code audit, API boundary testing, and Playwright execution.

---

## 1. Summary of Defects

| Bug ID | Title | Severity | Priority | Status | Classification |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **BUG-01** | Case-Sensitive Email Storage Leads to Password Reset Mismatch & Login Lockout | High | P1 | **FIXED** | Confirmed Bug |
| **BUG-02** | Unbounded Duplicate Bookmark Creation in `POST /api/bookmarks` | Medium | P2 | **FIXED** | Confirmed Bug |
| **BUG-03** | Whitespace-Only Collection Titles Allowed in `POST /api/collections` | Medium | P2 | **FIXED** | Confirmed Bug |
| **BUG-04** | Dashboard Bookmarks List Displays "Unknown" for Non-Resource Records | Low | P3 | **FIXED** | Confirmed Bug |
| **RISK-01** | In-Memory / Ephemeral Token Storage for Password Resets in Development Mode | Low | P3 | Open / Documented | Potential Risk / Needs Verification |

---

## 2. Detailed Confirmed Bug Reports

### BUG-01: Case-Sensitive Email Storage Leads to Password Reset Mismatch & Login Lockout
- **Bug ID:** BUG-01
- **Severity:** High
- **Priority:** P1
- **Environment:** Local / Staging / Production
- **Classification:** Confirmed Bug
- **Location:** `src/app/api/auth/register/route.ts` & `src/lib/auth.ts`
- **Preconditions:** None
- **Reproduction Steps:**
  1. User signs up via `/register` or `POST /api/auth/register` with email `John.Doe@Example.com`.
  2. The registration handler created the DB record with uppercase letters: `John.Doe@Example.com`.
  3. The user tries to reset their password using `john.doe@example.com` via `POST /api/auth/forgot-password`.
  4. The forgot-password handler converts email via `.toLowerCase().trim()`.
  5. The reset token was mapped to `john.doe@example.com`, causing password reset failure or credential lookup mismatch in `authOptions.authorize()`.
- **Expected Result:** Email addresses should be consistently normalized (`toLowerCase().trim()`) upon registration, authentication, and password resets.
- **Actual Result:** Registration stored raw mixed-case strings, creating potential account lockout and duplicate accounts with differing capitalization.
- **Evidence:** Source code inspection of `register/route.ts` vs `forgot-password/route.ts`.
- **Fix Applied:**
  - Added `const normalizedEmail = email.toLowerCase().trim();` to `register/route.ts` for both uniqueness checking and database creation.
  - Added `credentials.email.toLowerCase().trim()` in `src/lib/auth.ts` credentials provider.
- **Regression Test:** `TC-AUTH-API-07` in `tests/api/auth-register.api.spec.ts`.

---

### BUG-02: Unbounded Duplicate Bookmark Creation in `POST /api/bookmarks`
- **Bug ID:** BUG-02
- **Severity:** Medium
- **Priority:** P2
- **Environment:** Local / Staging / Production
- **Classification:** Confirmed Bug
- **Location:** `src/app/api/bookmarks/route.ts`
- **Preconditions:** User is authenticated.
- **Reproduction Steps:**
  1. Send `POST /api/bookmarks` with `{ resourceId: "res-id" }`.
  2. Send identical `POST /api/bookmarks` with the same `resourceId`.
- **Expected Result:** API should be idempotent. If a bookmark for the given `userId` and `resourceId` already exists, return the existing bookmark with HTTP 200 without creating a duplicate record.
- **Actual Result:** Route handler directly called `prisma.savedItem.create()`, creating duplicate rows every time the user clicked bookmark.
- **Evidence:** Unlike `POST /api/ideas/bookmark` which performs an existing check, `POST /api/bookmarks` lacked deduplication.
- **Fix Applied:** Added `prisma.savedItem.findFirst` check before calling `create()`, returning HTTP 200 if already saved.
- **Regression Test:** Verified via manual and integration API execution.

---

### BUG-03: Whitespace-Only Collection Titles Allowed in `POST /api/collections`
- **Bug ID:** BUG-03
- **Severity:** Medium
- **Priority:** P2
- **Environment:** Local / Staging / Production
- **Classification:** Confirmed Bug
- **Location:** `src/app/api/collections/route.ts`
- **Preconditions:** User is authenticated.
- **Reproduction Steps:**
  1. Send `POST /api/collections` with body `{ title: "   " }`.
  2. Validation checked `if (!title)`, which evaluates to `false` for strings of spaces.
  3. The regex generated a slug like `"-1740000000000"` with empty visible text.
- **Expected Result:** API should reject whitespace-only titles with HTTP 400 Bad Request.
- **Actual Result:** Created collections with invalid slugs and blank titles.
- **Evidence:** `src/app/api/collections/route.ts:16` `if (!title)`.
- **Fix Applied:** Updated condition to `if (!title || !title.trim())` and used `title.trim()` for slug generation and DB insertion.
- **Regression Test:** Verified via API validation rules.

---

### BUG-04: Dashboard Bookmarks List Displays "Unknown" for Non-Resource Records
- **Bug ID:** BUG-04
- **Severity:** Low
- **Priority:** P3
- **Environment:** Local / Staging / Production
- **Classification:** Confirmed Bug
- **Location:** `src/app/dashboard/page.tsx`
- **Preconditions:** User has saved items where `resourceId` is null (e.g. idea bookmarks or collections).
- **Reproduction Steps:**
  1. User saves an idea or collection.
  2. User navigates to `/dashboard`.
  3. The query fetched all `SavedItem` rows regardless of `resourceId`.
  4. Rows with `resourceId = null` were rendered with title `"Unknown"` and URL `"#"`.
- **Expected Result:** Resource bookmarks section should only display records with valid linked resources.
- **Actual Result:** Displayed placeholder `"Unknown"` cards with broken anchor links.
- **Evidence:** `src/app/dashboard/page.tsx:18-36`.
- **Fix Applied:** Added `resourceId: { not: null }` filter to `prisma.savedItem.findMany()`.
- **Regression Test:** Verified on authenticated user dashboard view.

---

## 3. Potential Risks & Items Requiring Ongoing Monitoring

### RISK-01: Development Fallback for Password Reset Token Distribution
- **Risk Level:** Low (Design Tradeoff)
- **Description:** In local development without an active SMTP server configured, `POST /api/auth/forgot-password` returns the generated token in the development response body to enable testing.
- **Verification:** In staging/production environments, ensure `NODE_ENV === 'production'` strips the token from the HTTP response payload and dispatches strictly via email provider (e.g. Resend / SendGrid).
