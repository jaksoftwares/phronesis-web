# Phronesis Homeschool Web Platform

This is the official codebase for the Phronesis Homeschool web application, a modern, highly optimized Next.js platform designed with institutional-grade architecture.

## Overview

Phronesis Homeschool's digital infrastructure is built on:
- **Next.js 14+**: Utilizing the App Router for maximum performance and SEO.
- **Tailwind CSS**: Implementing a strict, mathematically driven design system enforcing WCAG 2.2 AA accessibility.
- **Brand Geometry Engine**: A custom Node.js pipeline (`scripts/generate-brand-assets.js`) that automatically compiles pristine vector brand assets into SVGs, high-res PNGs, JPEGs, and PDFs.

## Getting Started

First, install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Brand Audit Dashboard
You can review the dynamically generated brand assets (Seals, Lockups, Banners) by visiting the local Brand Audit dashboard:
[http://localhost:3000/brand-audit](http://localhost:3000/brand-audit)

## Design System & Guidelines
Before contributing to the UI, you must review the official brand guidelines located in:
- `docs/PHRONESIS-BRAND-GUIDELINES.md`

These guidelines define the strict typography (Inter / Georgia), the color palette (Deep Blue, Teal, Knowledge Gold), and the geometric constraints required to maintain the brand's premium institutional aesthetic.

## Asset Generation
To regenerate the brand assets (logos, social profiles, banners), run the custom geometric script:
```bash
node scripts/generate-brand-assets.js
```
This will compile and output the latest assets into the `public/brand/` directory.
