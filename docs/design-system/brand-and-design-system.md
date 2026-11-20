# Phronesis Brand & Design System

| Item | Detail |
|---|---|
| Version | 1.0 — 20 November 2026 |
| Source artwork | `public/new-logos-phronesis/` (to be renamed `public/brand/source/` in Phase 0): the Phronesis Homeschool seal and emblem, supplied as JPEG |
| Replaces | `PHRONESIS-BRAND-GUIDELINES.md`, `docs/brand/PHRONESIS-BRAND-GUIDELINES.md`, `branding-and-typography.md`, `branding-ui-typography2.md`, `logo-guidelines.md` (blue/teal identity, retired) |
| Implementation | Phase 1 of the [implementation plan](../../../phronesis-platform/docs/plan/implementation-plan.md) (`phronesis-platform/docs/plan/implementation-plan.md`) |

---

## 1. Brand essence

The new seal says what Phronesis is: **a tree of open books growing from a foundation of three stacked books, radiating light**, framed by "PHRONESIS · HOMESCHOOL" in classical Roman capitals.

| Element | Meaning | Design consequence |
|---|---|---|
| Stacked books (crimson, gold, crimson) | Foundation: structured, curriculum-aligned knowledge | Layered, orderly layouts; clear hierarchy |
| Crimson tree | Growth, life, character | Crimson is the brand's voice: primary actions, key highlights |
| Open books as leaves | Knowledge that branches out | Book and page motifs; "open" states; reading-first screens |
| Radiating gold rays | Enlightenment, practical wisdom (*phronesis*) | Gold for distinction and achievement, used sparingly; fine line-work as an ornament |
| Roman capitals in a seal | Tradition, trust, institution | Classical serif display type; restrained, dignified composition |

**Personality:** wise, warm, trustworthy, disciplined, hopeful. Christ-centred values expressed through care and excellence, not decoration.
**Not:** playful-cartoonish, neon-techy, corporate-cold.

---

## 2. Logo system

### 2.1 Required variants (O-12: vector masters needed)

The supplied files are raster JPEGs from WhatsApp. Before launch, a vector master (SVG + PDF) must be produced, from which every variant is exported.

| Variant | Content | Use |
|---|---|---|
| Seal (primary) | Full roundel: rings, wordmark arcs, emblem | Certificates, receipts, about page, social profile, print |
| Emblem | Tree + books + rays, no ring | Hero illustration, loading screens, large brand moments |
| Mark (simplified) | Tree + book stack, **no rays**, thicker strokes | Favicon, app icon, ≤ 48 px, avatars, PWA icon |
| Horizontal lockup | Mark + "PHRONESIS" wordmark (+ "HOMESCHOOL" small caps) | Site header, emails, documents |
| Stacked lockup | Mark above wordmark | Square placements, splash |
| Wordmark | "PHRONESIS" in display capitals | Tight horizontal spaces |
| Colour versions | Full colour · crimson-only · ink-only · reversed (white/gold on crimson or ink) | Per background |

### 2.2 Rules

- **Clear space:** at least the height of one book in the stack on all sides.
- **Minimum size:** seal 96 px / 25 mm; emblem 64 px; mark 16 px (favicon) — rays removed below 64 px because fine lines turn to grey noise.
- **Backgrounds:** white, parchment, or crimson/ink (reversed version). Never on photos without a solid plate.
- **Never:** recolour outside the palette, stretch, rotate, add shadows/glows, place rays behind text, rebuild the wordmark in another font, use the JPEG with its white box on coloured backgrounds.

---

## 3. Colour

Sampled from the seal (median of logo pixels) and extended into a usable UI palette. Contrast ratios are against white (`#FFFFFF`) unless stated.

### 3.1 Brand colours

| Token | Hex | Role | Contrast on white |
|---|---|---|---|
| `--brand-crimson` | `#C01B22` | Primary brand colour; primary buttons, links, active navigation, key highlights | 6.1 : 1 (AA text) |
| `--brand-crimson-deep` | `#8E1218` | Hover/pressed, headings on parchment, reversed backgrounds | 9.3 : 1 |
| `--brand-crimson-soft` | `#FBE9EA` | Tinted backgrounds, selected rows | — |
| `--brand-gold` | `#BC8D3F` | Ornament, rays, dividers, achievement badges, icons ≥ 24 px | 3.0 : 1 — **not for body text** |
| `--brand-gold-text` | `#8A6420` | Gold-coloured text (eyebrows, labels) | 5.4 : 1 (AA text) |
| `--brand-gold-soft` | `#F6EEDC` | Highlights, certificate backgrounds | — |
| `--brand-ink` | `#1F1E1C` | Primary text, line-work, footer | 16.7 : 1 |

### 3.2 Neutrals (warm, paper-like — chosen to sit with crimson and gold)

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#FFFFFF` | Main surfaces (cards, forms) |
| `--parchment` | `#FAF7F2` | App background, public site sections |
| `--parchment-2` | `#F2EDE4` | Alternate sections, table headers |
| `--line` | `#E4DDD2` | Borders, dividers |
| `--line-strong` | `#CFC6B8` | Input borders |
| `--ink-2` | `#4A4640` | Secondary text (9.4 : 1) |
| `--ink-3` | `#6E685F` | Captions, placeholders (5.5 : 1 on white, 5.2 : 1 on parchment) |

All text colours in this document were checked with the WCAG 2 contrast formula: every text pair, including dark mode and white text on crimson buttons (6.1 : 1), meets AA.

### 3.3 Semantic colours (separate from the brand)

Crimson is the brand colour, so errors must not rely on red alone: always pair with an icon and text.

| Token | Hex | Use |
|---|---|---|
| `--success` / `--success-soft` | `#1F7A4D` / `#E5F3EB` | Confirmed payments, published, present |
| `--warning` / `--warning-soft` | `#9A5B00` / `#FCF0DC` | Awaiting confirmation, expiring, review pending |
| `--danger` / `--danger-soft` | `#A3131A` / `#FCE8E8` | Errors, rejected, destructive actions (with icon) |
| `--info` / `--info-soft` | `#1F5B8F` / `#E6F0F8` | Neutral information, links in dense staff tables if needed |

### 3.4 Usage ratio

Roughly **70 % neutrals · 20 % ink text · 7 % crimson · 3 % gold**. Gold is the reward colour: if everything is gold, nothing is special.

### 3.5 Dark mode

Supported for the Learner, Teacher and Staff surfaces (night study, long sessions); the public site is light-only. Dark tokens: background `#16130F`, surface `#211D18`, line `#3A342C`, text `#F3EEE6`, secondary `#BDB4A6`, crimson `#E5484D` (readable on dark), gold `#D4A85A`. All pairs re-checked for AA.

---

## 4. Typography

The seal uses classical Roman capitals. The UI pairs a classical display face with a highly legible humanist sans for long reading on low-cost Android phones.

| Role | Typeface (Google Fonts, self-hosted via `next/font`) | Use |
|---|---|---|
| Display / wordmark | **Cinzel** (600–700) | Wordmark, hero eyebrows, certificate titles, section labels in small caps. Uppercase only; never for paragraphs |
| Headings | **EB Garamond** (500–700) | H1–H3 on public pages and learning content; page titles in portals |
| Body & UI | **Source Sans 3** (400, 600, 700) | All interface text, forms, tables, body copy, buttons |
| Data / codes | **JetBrains Mono** (400–500) | M-PESA transaction codes, invoice references, IDs |

Fallback stacks: `Cinzel, "Times New Roman", serif` · `"EB Garamond", Georgia, serif` · `"Source Sans 3", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` · `"JetBrains Mono", ui-monospace, Consolas, monospace`.

### 4.1 Type scale (rem; base 16 px; ratio ≈ 1.2 for UI, larger steps for public headings)

| Token | Size / line-height | Font | Use |
|---|---|---|---|
| `display-xl` | 3.5 / 1.1 | EB Garamond 600 | Public hero |
| `display-l` | 2.75 / 1.15 | EB Garamond 600 | Public section titles |
| `h1` | 2.0 / 1.2 | EB Garamond 600 | Page titles |
| `h2` | 1.5 / 1.25 | EB Garamond 600 | Section titles |
| `h3` | 1.25 / 1.3 | Source Sans 3 700 | Card titles, sub-sections |
| `body-l` | 1.125 / 1.6 | Source Sans 3 400 | Reading content, public paragraphs |
| `body` | 1.0 / 1.55 | Source Sans 3 400 | Default UI text |
| `body-s` | 0.875 / 1.5 | Source Sans 3 400 | Secondary text, table cells in staff console |
| `caption` | 0.75 / 1.4 | Source Sans 3 600 | Captions, helper text |
| `eyebrow` | 0.75 / 1.2, letter-spacing 0.14em, uppercase | Cinzel 700 | Section labels |

Rules: headings `text-wrap: balance`; reading width 60–75 characters; numbers in tables use tabular figures; never set Cinzel below 12 px or in lowercase.

---

## 5. Layout, spacing, shape

- **Spacing scale (px):** 4, 8, 12, 16, 24, 32, 48, 64, 96. Layout gaps use `gap`, not margins.
- **Grid:** public site 12 columns, max content width 1200 px, reading width 720 px; portals: sidebar 264 px + fluid content; staff console allows denser tables.
- **Breakpoints:** 360 (min supported), 640, 768, 1024, 1280, 1536.
- **Radius:** `--radius-s` 4 px (inputs, chips), `--radius-m` 8 px (cards, buttons), `--radius-l` 12 px (dialogs). Classic, not bubbly.
- **Elevation:** flat surfaces with hairline borders by default; shadows only for overlays (menus, dialogs, toasts).
- **Ornament:** a thin gold rule or a small rays motif may mark a page header or achievement — at most one ornament per screen.

## 6. Iconography and imagery

- Icons: Lucide, 1.5 px stroke (echoes the seal's line-work), 20 px in UI, 24 px in navigation; filled versions only for active states.
- Illustrations: line-art in ink and gold built from the seal's motifs (open books, rays, branches); no generic 3D blobs or stock vector people.
- Photography: real Kenyan learners and teachers, natural light, warm tones; consent on file for every photo of a minor.

## 7. Motion

Short and purposeful: 150–250 ms ease-out for UI transitions; one signature moment allowed (e.g. rays fading in on the hero or on a completed-topic celebration). Respect `prefers-reduced-motion` everywhere.

## 8. Voice and tone

Plain, respectful, encouraging. Second person, active voice. Name things as users know them ("Payment awaiting confirmation", not "Submission state: Submitted"). Learners get warmth and encouragement; guardians get clarity and reassurance; staff get precision and brevity. Errors say what happened and what to do next. Kenyan English spelling and conventions; currency as "KES 2,000"; dates as "Mon 24 Nov 2026, 4:00 pm EAT".

## 9. Components (inventory and required states)

Every component ships with: default, hover, focus-visible (2 px crimson outline + 2 px offset), active, disabled, loading, error; keyboard support; RTL-safe layout not required (English/Kiswahili are LTR).

| Group | Components |
|---|---|
| Actions | Button (primary crimson, secondary outline, tertiary text, destructive), IconButton, Link, Menu |
| Inputs | Text, Textarea, Select, Combobox, Checkbox, Radio, Switch, DatePicker (EAT), TimePicker, FileUpload (with validation messages), OTP/MFA input, Money input (KES), M-PESA code input |
| Display | Card, Badge, StatusPill (one colour + icon per business state), Avatar, Table (sortable, paginated, selectable), DescriptionList, Timeline (audit and application history), Stat tile, ProgressBar/Ring, Tag |
| Feedback | Toast, InlineAlert, Banner, Skeleton, EmptyState (with illustration + next action), ErrorState (with retry), NoPermission |
| Overlays | Dialog, ConfirmDialog (no `window.confirm`), Drawer, Popover, Tooltip |
| Navigation | Public header, Portal sidebar, Staff Console sidebar (permission-driven), Breadcrumbs, Tabs, Stepper (applications, checkout), Pagination |
| Learning | Resource card, Resource viewer frame (with watermark), Assessment question renderers per type, Timer, Result summary |
| Commerce | Plan card, Invoice summary, Paybill instructions panel (copyable number and reference), Payment status tracker |

## 10. Accessibility

WCAG 2.2 AA minimum: colour contrast per the tables above; never colour alone for meaning; visible focus; minimum target 44 × 44 px on touch; form labels always visible; errors announced (`aria-live`); dialogs trap focus; reduced motion respected; text resizable to 200 %. Automated axe checks in CI plus manual keyboard and screen-reader passes on the five core journeys before launch.

## 11. Implementation tokens

```css
/* src/styles/tokens.css */
:root {
  --brand-crimson: #C01B22; --brand-crimson-deep: #8E1218; --brand-crimson-soft: #FBE9EA;
  --brand-gold: #BC8D3F;    --brand-gold-text: #8A6420;    --brand-gold-soft: #F6EEDC;
  --brand-ink: #1F1E1C;
  --paper: #FFFFFF; --parchment: #FAF7F2; --parchment-2: #F2EDE4;
  --line: #E4DDD2; --line-strong: #CFC6B8; --ink-2: #4A4640; --ink-3: #6E685F;
  --success: #1F7A4D; --success-soft: #E5F3EB; --warning: #9A5B00; --warning-soft: #FCF0DC;
  --danger: #A3131A;  --danger-soft: #FCE8E8;  --info: #1F5B8F;    --info-soft: #E6F0F8;
  --radius-s: 4px; --radius-m: 8px; --radius-l: 12px;
  --font-display: var(--font-cinzel), "Times New Roman", serif;
  --font-heading: var(--font-eb-garamond), Georgia, serif;
  --font-body: var(--font-source-sans), system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-mono: var(--font-jetbrains), ui-monospace, Consolas, monospace;
}
[data-theme="dark"] {
  --paper: #211D18; --parchment: #16130F; --parchment-2: #1C1814; --line: #3A342C; --line-strong: #4D463C;
  --brand-ink: #F3EEE6; --ink-2: #BDB4A6; --ink-3: #9C9385;
  --brand-crimson: #E5484D; --brand-gold: #D4A85A; --brand-gold-text: #D4A85A;
}
```

Tailwind v4 maps these in `@theme` (e.g. `--color-crimson: var(--brand-crimson)`), so components use `bg-crimson`, `text-ink-2`, `font-heading`, never raw hex values. A lint rule blocks hex colours in components.

## 12. Retiring the old identity

- Replace `--color-phronesis-blue/teal/gold`, Inter/Source Serif usage and the old logo component in Phase 1.
- Move old brand PDFs (`public/brand/01-…06-…`) and old brand docs to `docs/archive/`; remove `scripts/generate-brand-assets.js` once new assets are exported from the vector master.
- Regenerate favicon, app icons, Open Graph images and email header from the new mark.
