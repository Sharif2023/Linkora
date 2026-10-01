# QA Test Cases Specification — Linkora

This catalog documents all test scenarios implemented and automated within Linkora's Playwright test suite.

---

## 1. Authentication & User Management (API)

| Test ID | Module | Scenario | Preconditions | Steps | Test Data | Expected Result | Priority | Type |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-AUTH-API-01** | Auth API | Register new user with valid credentials | None | Send `POST /api/auth/register` with valid JSON payload | `{name, email, password}` | HTTP 201 Created, user object returned without password | P1 | API / Functional |
| **TC-AUTH-API-02** | Auth API | Prevent duplicate email registration | User already exists | Send `POST /api/auth/register` with same email | `{name: "Duplicate", email: existingEmail, ...}` | HTTP 409 Conflict with duplicate email error message | P1 | API / Negative |
| **TC-AUTH-API-03** | Auth API | Reject registration with short name | None | Send `POST /api/auth/register` with name < 2 chars | `{name: "A", ...}` | HTTP 400 Bad Request with Zod validation error | P2 | API / Validation |
| **TC-AUTH-API-04** | Auth API | Reject registration with invalid email format | None | Send `POST /api/auth/register` with malformed email | `{email: "invalid-email-string", ...}` | HTTP 400 Bad Request | P1 | API / Validation |
| **TC-AUTH-API-05** | Auth API | Reject registration with short password | None | Send `POST /api/auth/register` with password < 6 chars | `{password: "123", ...}` | HTTP 400 Bad Request | P1 | API / Validation |
| **TC-AUTH-API-06** | Auth API | Reject registration with empty payload | None | Send `POST /api/auth/register` with empty body `{}` | `{}` | HTTP 400 Bad Request | P2 | API / Boundary |
| **TC-AUTH-API-07** | Auth API | Normalize email to lowercase and prevent case mismatch | None | Send `POST /api/auth/register` with mixed-case email, then lowercase | `CASE_123@Example.COM` | First returns 201 with lowercase email in DB; second returns 409 Conflict | P1 | API / Regression (BUG-01) |

---

## 2. Password Reset Lifecycle (API)

| Test ID | Module | Scenario | Preconditions | Steps | Test Data | Expected Result | Priority | Type |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-PWD-API-01** | Password API | Accept forgot password request without email enumeration | Registered email | Send `POST /api/auth/forgot-password` with email | `{email: "registered@example.com"}` | HTTP 200 with success message; no user existence disclosed | P1 | API / Security |
| **TC-PWD-API-02** | Password API | Reject forgot password with malformed email | None | Send `POST /api/auth/forgot-password` with invalid string | `{email: "not-an-email"}` | HTTP 400 Bad Request | P2 | API / Validation |
| **TC-PWD-API-03** | Password API | Reject reset password with invalid or fake token | None | Send `POST /api/auth/reset-password` with fake token | `{token: "fake-uuid-token", password: "NewPassword123!"}` | HTTP 400 Bad Request ("Invalid or expired reset token") | P1 | API / Security |
| **TC-PWD-API-04** | Password API | Reject reset password with password < 6 chars | Valid token | Send `POST /api/auth/reset-password` with short password | `{token: "valid-token", password: "123"}` | HTTP 400 Bad Request | P2 | API / Validation |
| **TC-PWD-API-05** | Password API | Complete full forgot -> reset token lifecycle | Registered user in dev environment | 1. Request forgot-password<br>2. Extract reset token from DB/dev response<br>3. Submit reset-password | Valid user + valid token + new password | HTTP 200 Password reset successful | P1 | API / Integration |

---

## 3. Protected Resource Authorization (API)

| Test ID | Module | Scenario | Preconditions | Steps | Test Data | Expected Result | Priority | Type |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-BOOK-API-01** | Bookmarks API | Reject unauthenticated bookmark creation | No session cookie | Send `POST /api/bookmarks` | `{resourceId: "res-123"}` | HTTP 401 Unauthorized | P1 | API / Authorization |
| **TC-BOOK-API-02** | Bookmarks API | Reject unauthenticated bookmark deletion | No session cookie | Send `DELETE /api/bookmarks/fake-id` | None | HTTP 401 Unauthorized | P1 | API / Authorization |
| **TC-COL-API-01** | Collections API | Reject unauthenticated collection creation | No session cookie | Send `POST /api/collections` | `{title: "My Collection"}` | HTTP 401 Unauthorized | P1 | API / Authorization |
| **TC-IDEA-API-01** | Ideas API | Return empty bookmarks for guest | No session cookie | Send `GET /api/ideas/bookmark` | None | HTTP 200 with `{bookmarkedIdeaIds: []}` | P2 | API / Functional |
| **TC-IDEA-API-02** | Ideas API | Reject unauthenticated idea bookmark toggle | No session cookie | Send `POST /api/ideas/bookmark` | `{ideaId: "youtube-career-launchpad"}` | HTTP 401 Unauthorized | P1 | API / Authorization |
| **TC-IDEA-API-03** | Ideas API | Return empty progress for guest | No session cookie | Send `GET /api/ideas/progress?ideaId=xxx` | None | HTTP 200 with `{completedTaskIds: []}` | P2 | API / Functional |
| **TC-IDEA-API-04** | Ideas API | Reject unauthenticated idea progress update | No session cookie | Send `POST /api/ideas/progress` | `{taskId: "task-1", ideaId: "xxx", completed: true}` | HTTP 401 Unauthorized | P1 | API / Authorization |
| **TC-PROF-API-01** | Profile API | Reject unauthenticated profile update | No session cookie | Send `PUT /api/profile` | `{name: "New Name"}` | HTTP 401 Unauthorized | P1 | API / Authorization |
| **TC-PROF-API-02** | Profile API | Reject unauthenticated password change | No session cookie | Send `PUT /api/profile/password` | `{currentPassword: "...", newPassword: "..."}` | HTTP 401 Unauthorized | P1 | API / Authorization |

---

## 4. End-to-End User Journeys (UI)

### 4.1 Authentication & Protected Access
| Test ID | Module | Scenario | Preconditions | Steps | Expected Result | Priority | Type |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-AUTH-E2E-01** | Auth UI | Register new user and auto-redirect to dashboard | Fresh test user | 1. Navigate `/register`<br>2. Fill name, email, password<br>3. Submit form | URL redirects to `/dashboard`, greeting displays user name | P1 | E2E / Smoke |
| **TC-AUTH-E2E-02** | Auth UI | Display validation error on existing email | User registered | 1. Navigate `/register`<br>2. Enter existing email<br>3. Submit | Inline error message "User with this email already exists" | P1 | E2E / Negative |
| **TC-AUTH-E2E-03** | Auth UI | Log in with valid credentials | User exists | 1. Navigate `/login`<br>2. Fill credentials<br>3. Submit | URL redirects to `/dashboard`, greeting shows user name | P1 | E2E / Smoke |
| **TC-AUTH-E2E-04** | Auth UI | Display error on invalid credentials | None | 1. Navigate `/login`<br>2. Enter bad password<br>3. Submit | Inline error "Invalid email or password" displayed | P1 | E2E / Negative |
| **TC-AUTH-E2E-05** | Auth UI | Redirect guest away from `/dashboard` | No session | Navigate `/dashboard` | Redirects to `/login` | P1 | E2E / Authorization |
| **TC-AUTH-E2E-06** | Auth UI | Redirect guest away from `/settings` | No session | Navigate `/settings` | Redirects to `/login` | P1 | E2E / Authorization |
| **TC-AUTH-E2E-07** | Auth UI | Open and submit forgot password modal | None | 1. Navigate `/login`<br>2. Click "Forgot password?"<br>3. Fill email & submit | Success message displayed ("If this email exists...") | P2 | E2E / Functional |

### 4.2 Explore Directory & Resource Discovery
| Test ID | Module | Scenario | Preconditions | Steps | Expected Result | Priority | Type |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-EXP-E2E-01** | Explore UI | Display directory header and resources | Seeded resources | Navigate `/explore` | Title matches, resource count displayed, cards visible | P1 | E2E / Smoke |
| **TC-EXP-E2E-02** | Explore UI | Filter resources dynamically via search bar | Seeded resources | Type "Next.js" into search input | Filtered resource grid updates dynamically | P1 | E2E / Functional |
| **TC-EXP-E2E-03** | Explore UI | Display empty state on unmatched query | Seeded resources | Type "xyznonexistentquery999" | "No resources found" empty state card is displayed | P2 | E2E / Boundary |
| **TC-EXP-E2E-04** | Explore UI | Toggle between grid and list views | Seeded resources | Click List view icon, then Grid icon | Layout classes change dynamically | P2 | E2E / Functional |
| **TC-EXP-E2E-05** | Explore UI | Navigate to resource detail page on card click | Seeded resources | Click resource card title | Navigates to `/resource/[slug]`, H1 matches resource title | P1 | E2E / Functional |

### 4.3 Implement Ideas & Execution Roadmaps
| Test ID | Module | Scenario | Preconditions | Steps | Expected Result | Priority | Type |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-IDEA-E2E-01** | Ideas UI | Display Implement Ideas directory with hero | Seeded ideas | Navigate `/implement-ideas` | Hero heading visible, category pills visible, blueprint cards rendered | P1 | E2E / Smoke |
| **TC-IDEA-E2E-02** | Ideas UI | Filter blueprints by category pill | Seeded ideas | Click "Creator Economy" category pill | Blueprints filtered, "YouTube Career" card visible | P1 | E2E / Functional |
| **TC-IDEA-E2E-03** | Ideas UI | Toggle checklist items and persist for guest | Seeded idea | 1. Navigate `/implement-ideas/youtube-career-launchpad`<br>2. Click task item<br>3. Verify progress increment<br>4. Reload page | Progress bar updates and persists state after reload | P1 | E2E / Functional |
| **TC-IDEA-E2E-04** | Ideas UI | Toggle bookmark button on roadmap detail | Seeded idea | 1. Navigate roadmap page<br>2. Click "Bookmark Plan" | Button text updates to "Bookmarked", state saved | P1 | E2E / Functional |
| **TC-IDEA-E2E-05** | Ideas UI | Redirect legacy `/stacks` to `/implement-ideas` | None | Navigate `/stacks` | Clean HTTP 307/308 redirect to `/implement-ideas` | P2 | E2E / Regression |
| **TC-IDEA-E2E-06** | Ideas UI | Redirect legacy `/stack/[slug]` to `/implement-ideas/[slug]` | None | Navigate `/stack/youtube-career-launchpad` | Clean redirect to `/implement-ideas/youtube-career-launchpad` | P2 | E2E / Regression |

### 4.4 Curated Collections & Settings
| Test ID | Module | Scenario | Preconditions | Steps | Expected Result | Priority | Type |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-COL-E2E-01** | Collections UI | Display Curated Collections directory | Seeded collections | Navigate `/collections` | Title matches, collection cards rendered | P1 | E2E / Smoke |
| **TC-COL-E2E-02** | Collections UI | Open collection detail and verify linked blueprints & tools | Seeded collection | Navigate `/collections/creator-economy` | H1 matches "The Creator Economy", blueprints and core tools sections visible | P1 | E2E / Functional |
| **TC-SET-E2E-01** | Settings UI | Authenticated user updates profile name | Authenticated user | 1. Log in<br>2. Go to `/settings`<br>3. Edit name and submit | Success banner "Profile updated successfully!" visible | P1 | E2E / Functional |
| **TC-SET-E2E-02** | Dashboard UI | View Active Roadmaps tab in user dashboard | Authenticated user | 1. Log in<br>2. Click "Active Roadmaps" in sidebar | Navigates to `/dashboard/roadmaps`, H1 "Active Implementation Plans" visible | P1 | E2E / Functional |
