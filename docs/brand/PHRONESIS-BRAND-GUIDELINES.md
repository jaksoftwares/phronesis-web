# Phronesis Homeschool: Official Brand & Design Guidelines

This document serves as the single source of truth for the visual identity and design engineering of Phronesis Homeschool. It defines the strict aesthetic rules, typographic scales, and color mathematics used to maintain a premium, institutional, and highly professional standard across all applications and marketing materials.

---

## 1. Core Identity & Philosophy

**Brand Name:** Phronesis Homeschool  
**Motto:** *Genesis of Knowledge*  

### Core Design Principles
1. **Clarity Before Decoration:** Every design element must serve a functional purpose. Avoid superfluous gradients, unnecessary drop shadows, and complex textures. We rely on pristine geometry.
2. **Academic Credibility Before Novelty:** The visual identity must exude trust, heritage, and modern institutional excellence. We do not chase fleeting web-design trends. 
3. **Uncompromising Accessibility:** All foreground and background color pairings must adhere strictly to **WCAG 2.2 AA** accessibility standards for contrast. Legibility is non-negotiable.

---

## 2. Color System

The palette is highly constrained to ensure a consistent, premium feel.

| Role | Color Name | HEX Code | Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | Deep Blue | `#163A5F` | Primary brand color, headers, primary buttons, major lockup typography. Represents depth, wisdom, and institutional stability. |
| **Secondary** | Teal | `#197C7A` | Secondary accents, active states, "HOMESCHOOL" typography in lockups. Represents growth, nature, and the sprouting tree. |
| **Accent** | Knowledge Gold | `#D5A63A` | Highlights, warnings, sunburst rays, italicized motto text. Represents illumination and genesis. |
| **Text (Dark)** | Ink Black | `#17212B` | Standard body text. We never use pure black (`#000000`) for text as it causes eye strain. |
| **Background** | Pristine White | `#FFFFFF` | Standard page backgrounds. Clean and uncluttered. |
| **Surface** | Cloud Gray | `#F5F7F9` | Secondary backgrounds, cards, or subtle bounding boxes. |

---

## 3. Typography Architecture

We use a modern, dual-font system. 

### Primary Interface & Heading Font: **Inter**
*Fallback stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`*
- **Usage:** All UI elements, primary headers, navigation, buttons, and the main logo text ("PHRONESIS HOMESCHOOL").
- **Weights:**
  - `400` (Regular): Body copy and standard UI text.
  - `500` (Medium): Subtitles, standard buttons.
  - `600` (Semi-Bold): Small headers.
  - `700` (Bold): Page titles, major logo text.
- **Rules:** Do not use weights below 400. Maintain strict line heights (e.g., `1.5` for body, `1.2` for headings).

### Secondary Serif Font: **Georgia** 
*Fallback stack: `Source Serif 4, "Times New Roman", serif`*
- **Usage:** Strictly reserved for the brand motto (*"Genesis of Knowledge"*) and highly specific editorial quotes.
- **Styling:** Always used in **Italic** (`font-style: italic`), weight `400`.

---

## 4. Logo System & Usage

The brand assets are mathematically generated as vector files (`.svg`) ensuring perfect scalability.

### The Lockups
1. **01 Master Seal:** The official crest. Used on certificates, official documents, and high-level branding. Requires significant clear space.
2. **02 Horizontal Lockup:** The standard logo for web navigation headers and banners. Features a gold vertical separator anchoring the seal to the typography.
3. **03 Stacked Lockup:** Designed for vertical spaces, profile cards, and footers. The seal is scaled up to visually anchor the text below it.
4. **04 Brand Mark:** The central emblem (tree, sunburst, books) without text or rings. Used for favicons and micro-UI elements.

### Clear Space & Sizing Rules
- **Clear Space:** Always maintain a clear space around the logo equal to the width of the letter "P" in "PHRONESIS". Do not crowd the logo with other UI elements.
- **Minimum Size:** 
  - Master Seal: Never render below `80x80` pixels.
  - Horizontal Lockup: Never render below `200px` width.
  - Brand Mark (Favicon): Rendered at `16x16`, `32x32`, and `180x180`.

---

## 5. UI Components & Geometry Rules

When translating this brand into web components (e.g., Tailwind CSS):

- **Border Radius:** Use a subtle, institutional rounding. Avoid pill-shaped buttons unless explicitly required for a specific marketing CTA.
  - Default rounding: `rounded-md` (`0.375rem` / `6px`).
- **Shadows:** Shadows should mimic real-world lighting—soft, diffused, and slightly tinted with `Deep Blue`. Avoid harsh, muddy black shadows. 
  - Standard shadow: `box-shadow: 0 4px 6px -1px rgba(22, 58, 95, 0.1), 0 2px 4px -1px rgba(22, 58, 95, 0.06);`
- **Borders:** Use thin, `1px` borders using a highly transparent `Deep Blue` or `Cloud Gray` for structural separation.

---
*End of Guidelines. These rules must be referenced during all future frontend development to ensure the institutional integrity of Phronesis Homeschool.*
