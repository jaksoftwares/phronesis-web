# Frontend Reorganisation Map

How each of today's 61 pages and the shared code move into the target structure, and in which phase of the [implementation plan](../../../phronesis-platform/docs/plan/implementation-plan.md) (`phronesis-platform/docs/plan/implementation-plan.md`) they are rebuilt. Target conventions: `phronesis-platform/docs/plan/target-architecture.md` §5. Design: [brand & design system](../design-system/brand-and-design-system.md).

**Rules:**
- In Phase 0 all legacy pages move out of `src/app` into `legacy/` (outside the build). The routed app starts clean and only gains a route when its screen is finished.
- Each legacy page is rebuilt on the design system and the generated API client in the phase of its module; its `legacy/` reference copy is deleted in the same pull request. No legacy page is reskinned in place.
- The app never shows unfinished work: no "coming soon" pages, disabled menu items for unbuilt features, placeholder pages or mock data. Unreleased modules are switched off by server-side feature flags (routes 404, navigation hidden). See implementation plan §3.5.

## 1. Route moves

### Public and authentication

| Legacy route | Target route | Phase | Action |
|---|---|---|---|
| `/` (public home) | `/` | P11 | Rebuild (new brand, real content) |
| `/about`, `/contact`, `/subjects`, `/pricing` | same | P11 (pricing after P7 data) | Rebuild — currently heading-only |
| `/admin/login`, `/learner/login`, `/guardian/login`, `/teacher/login` | `/login` | P2 | Replace with one login (D-010) |
| `/learner/register`, `/guardian/register` | `/register` (choose learner or guardian) | P2–P3 | Rebuild |
| `/teacher/apply` | `/teach/apply` (public entry) → `/teach/application` | P3 | Rebuild as wizard |
| `/shared/forgot-password`, `/shared/reset-password`, `/shared/verify-email`, `/shared/resend-verification` | `/forgot-password`, `/reset-password`, `/verify-email` | P2 | Rebuild |
| `/brand-audit`, `/identity` | — | P0 | Delete (dev pages) |

### Learner portal → `/learn`

| Legacy | Target | Phase |
|---|---|---|
| `/learner/dashboard` | `/learn` | P6 (shell P3) |
| `/learner/catalog`, `/learner/catalog/[contentId]` | `/learn/library`, `/learn/subjects/[subject]/[topic]`, `/learn/resources/[id]` | P5 |
| `/learner/bookmarks` | `/learn/saved` | P6 |
| `/learner/assessments`, `/[id]`, `/[id]/results` | `/learn/assessments`, `/learn/assessments/[id]/attempt`, `/learn/assessments/[id]/results/[attemptId]` | P6 |
| `/learner/progress` | `/learn/progress` | P6 |
| `/learner/calendar` | `/learn/schedule` | P8 |
| `/learner/classroom/[id]` | `/learn/classes/[sessionId]` | P8 |
| `/learner/subscription` | `/learn/plan` + `/checkout/[invoice]` | P7 |
| `/learner/support` | `/support` | P9 |
| `/learner/settings` | `/account` | P2 |

### Guardian portal → `/family`

| Legacy | Target | Phase |
|---|---|---|
| `/guardian/dashboard` | `/family` | P3 (enriched P6) |
| `/guardian/dependents`, `/[id]` | `/family/learners`, `/family/learners/[id]` | P3 (progress P6) |
| `/guardian/billing` | `/family/payments` | P7 |
| `/guardian/messages` | `/family/messages` (school announcements, support) | P9 |
| `/guardian/settings` | `/account` | P2 |

### Teacher Arena → `/teach`

| Legacy | Target | Phase |
|---|---|---|
| `/teacher/onboarding` | `/teach/application` | P3 |
| `/teacher/profile` | `/teach/profile` | P3 |
| `/teacher/dashboard` | `/teach` | P3 (shell), P8 (full) |
| `/teacher/content`, `/content/new` | `/teach/contributions`, `/teach/contributions/new` | P5 |
| `/teacher/assessments` | `/teach/assessments` | P6 |
| `/teacher/grading`, `/[id]` | `/teach/grading`, `/teach/grading/[attemptId]` | P6 |
| `/teacher/classes`, `/[classId]`, `/classroom/[id]`, `/calendar` | `/teach/classes`, `/teach/classes/[id]`, `/teach/sessions/[id]`, `/teach/schedule` | P8 |
| `/teacher/earnings` | `/teach/earnings` | P8 |
| `/teacher/settings` | `/account` | P2 |

### Admin → Staff Console `/staff` (D-009)

| Legacy | Target | Phase |
|---|---|---|
| `/admin/dashboard` | `/staff` (home; management dashboard in P10) | P2 / P10 |
| `/admin/users` | `/staff/users` | P2 |
| `/admin/teachers/applications`, `/[id]` | `/staff/reviews/teachers`, `/staff/reviews/teachers/[id]` | P3 |
| `/admin/content` | `/staff/content`, `/staff/reviews/content` | P5 |
| `/admin/finance` | `/staff/finance` (payments queue, invoices, refunds, reconciliation) | P7 |
| `/admin/classes` | `/staff/classes` | P8 |
| `/admin/notifications` | `/staff/announcements` | P9 |
| `/admin/reports` | `/staff/reports` | P10 |
| `/admin/settings` | `/staff/settings` | P10 |
| `/admin/compliance/data-requests` | `/staff/compliance` | P10 |

### New routes (no legacy equivalent)

| Route | Phase |
|---|---|
| `/account/*` (profile, security, MFA, sessions, agreements, notifications) | P2 (notifications P9) |
| `/staff/roles`, `/staff/staff`, `/staff/security` | P2 |
| `/family/consent` | P3 |
| `/staff/curriculum` | P4 |
| `/checkout/[invoice]`, `/staff/finance/payments/[id]` | P7 |
| Exam papers store: `/exams` (browse, filters), `/exams/[slug]` (product + watermarked preview), `/cart`, `/account/purchases` (library, downloads), `/account/purchases/[id]/marking-scheme` (request and status) | P7 (P7.20) |
| Staff Console store: `/staff/store` (products, bundles, pricing, sales), `/staff/store/marking-scheme-requests` (review queue) | P7 (P7.20) |
| `/teach/availability` | P8 |
| `/notifications`, `/staff/support` | P9 |
| `/staff/audit`, `/staff/safeguarding`, report-a-concern dialog | P10 |
| `/legal/*`, `/faq`, `/how-it-works`, `/live-classes` | P11 |
| `403`, `404`, `500`, offline page | P1 |

## 2. Shared code

| Legacy | Decision | Phase |
|---|---|---|
| `src/lib/api.ts` | Delete (dead, wrong port, reads a different token) | P0 |
| `src/lib/api/axios.ts` | Replace with generated client + `lib/api/session.ts` | P1 |
| `src/middleware.ts` | Replace with `src/proxy.ts` (Next 16 convention), optimistic redirect only | P1 |
| `src/store/authStore.ts` | Replace: no persisted tokens; session state from `/auth/me` | P1–P2 |
| `src/store/uiStore.ts` | Keep if still needed after shells are built | P1 |
| `src/hooks/api/*` | Replace with generated TanStack Query hooks | P1+ |
| `src/components/ui/*` (FloatingLabelInput, PrimaryButton, PasswordStrengthMeter, Logo) | Replace with design-system components; keep password-strength logic | P1 |
| `src/components/layout/Header`, `Footer` vs `layout/public/PublicHeader`, `PublicFooter` | Consolidate into one public header/footer | P1 / P11 |
| `src/components/layout/dashboard/*`, `GuardianSidebar` | Replace with Portal shell and Staff Console shell | P1 |
| `src/components/home/*` | Rebuild with the public site | P11 |
| `src/components/{learner,guardian,teacher}/*` | Move into `src/features/<module>/` as each module is rebuilt | P3–P8 |
| `src/components/providers/query-provider.tsx` | Keep, move to `src/app/providers.tsx` with defaults | P1 |
| `public/brand/0x-*` (old logo PDFs) | Archive | P0 |
| `public/new-logos-phronesis/` | Rename `public/brand/source/`; vector exports added when available | P0 |
| `public/shared/phronesis-hero.mp4` | Review against new brand; re-encode or replace | P11 |
| `scripts/generate-brand-assets.js` | Remove after vector exports exist | P1 |

## 3. Target `src/features` modules

`auth`, `account`, `access` (roles/permissions UI), `staff`, `people` (learners/guardians), `teachers`, `teacher-compliance`, `academic`, `content`, `media` (viewer), `discovery`, `learning`, `assessment`, `commerce`, `payments`, `classes`, `booking`, `communication`, `support`, `safeguarding`, `admin`, `reporting`, `audit` — mirroring the backend modules so a feature can be found in the same place in both repositories.
