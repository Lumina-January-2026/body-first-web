# CLAUDE.md — Body First Resource Hub (Website)
## Next.js + Tailwind CSS + TypeScript
## Content-First, SEO-Driven, Brand-Consistent

---

## References

- [Design Tokens](design-tokens.json) — Canonical brand values shared with app repo
- [Strategy Doc](docs/STRATEGY.md) — Resource hub strategy, content taxonomy, launch plan
- [Content Guide](docs/CONTENT-GUIDE.md) — Writing style, quality criteria, templates
- [Site Map](docs/SITEMAP.md) — Page inventory and routing

---

## 0) Core Execution Contract

This is the **website** repo for Body First. The **app** repo lives at `Lumina-January-2026/GLP1-Planning`.

These two repos share:
- **design-tokens.json** — canonical colors, typography, spacing, shadows
- **Supabase backend** — project ID: zeraesvijiwuihcyrwnr (website uses `website_leads` table + read-only access to resource feed)
- **Brand identity** — warm peach gradient, teal CTAs, white cards, non-clinical tone

These two repos do NOT share:
- Tech stack (this is Next.js, the app is React Native/Expo)
- Deployment (this deploys to Cloudflare Pages, the app deploys via EAS)
- Navigation patterns (this uses file-based routing, the app uses React Navigation)
- Testing (this uses Lighthouse + broken link checks, the app uses iOS/Android simulators)

---

## 1) Brand Rules (NON-NEGOTIABLE)

These rules come from the app's CLAUDE.md and apply identically to the website:

- Background is ALWAYS warm peach gradient (#FFE5D9 → #FFF5F0), never flat white, never dark mode.
- Cards are ALWAYS white (#FFFFFF) with soft shadow (0 2px 8px rgba(0,0,0,0.06)).
- Primary action color is teal (#14B8A6). Pressed/hover state is teal dark (#0D9488).
- Accent color is coral/orange (#F97316) for badges, highlights, urgency indicators.
- Navigation uses dark navy (#1E1E2D) for header/footer backgrounds.
- Typography is Inter for web (matches SF Pro/Roboto feel from app).
- Corner radius: 8px (buttons), 12px (inputs), 16px (cards), 20px (large cards).
- Tone: warm, premium, approachable. NOT clinical. NOT cold. NOT a pharma site.
- No scary warnings. No shame language. Permission-giving throughout.
- Every CTA should feel like an invitation, not a sales pitch.

### Web-Specific Brand Extensions

- The peach gradient on web should be `min-h-screen` with `bg-peach-gradient`.
- On mobile breakpoints, the site should feel like a natural extension of the app.
- Desktop layouts use max-width containers (1200px) centered on the peach gradient.
- Cards on desktop can sit in 2-3 column grids. On mobile, single column.
- The "Get the App" CTA should be prominent in the header — teal button, always visible.

---

## 2) Project Structure

```
body-first-web/
├── CLAUDE.md                    # This file
├── design-tokens.json           # Shared brand tokens (canonical source)
├── tailwind.config.js           # Consumes design-tokens.json
├── next.config.js               # Next.js configuration
├── app/                         # Next.js App Router
│   ├── layout.tsx               # Root layout (peach gradient, header, footer)
│   ├── page.tsx                 # Home page
│   ├── resources/
│   │   ├── page.tsx             # Resource library (filterable grid)
│   │   └── [slug]/
│   │       └── page.tsx         # Individual resource pages
│   ├── guides/
│   │   ├── page.tsx             # Guides index
│   │   └── [slug]/
│   │       └── page.tsx         # Individual guide pages
│   ├── tools/
│   │   └── page.tsx             # Interactive tools (BMI calc, cost estimator)
│   ├── compare/
│   │   └── [slug]/
│   │       └── page.tsx         # Medication comparison pages
│   ├── get-started/
│   │   └── page.tsx             # Contact + lead capture + app download
│   ├── about/
│   │   └── page.tsx             # Mission, team, trust
│   ├── blog/
│   │   ├── page.tsx             # Blog index
│   │   └── [slug]/
│   │       └── page.tsx         # Blog posts
│   ├── privacy/
│   │   └── page.tsx             # Privacy policy
│   └── terms/
│       └── page.tsx             # Terms of service
├── src/
│   ├── components/
│   │   ├── layout/              # Header, Footer, Navigation
│   │   ├── common/              # Button, Card, Badge, Input (web versions of app components)
│   │   ├── resources/           # ResourceCard, ResourceGrid, ResourceFilters
│   │   ├── cta/                 # AppDownloadCTA, ContactForm, NewsletterSignup
│   │   └── seo/                 # StructuredData, MetaTags
│   ├── lib/
│   │   ├── supabase.ts          # Supabase client (shared backend)
│   │   ├── content.ts           # Markdown content loading + parsing
│   │   └── utils.ts             # Helpers
│   └── types/
│       ├── resource.ts          # Resource frontmatter types
│       └── lead.ts              # Lead capture types
├── content/                     # Markdown content files
│   ├── resources/               # 50-100/day resource files
│   ├── guides/                  # Long-form guides
│   ├── blog/                    # Blog posts
│   └── comparisons/             # Medication comparisons
├── public/
│   ├── images/
│   └── fonts/
├── docs/                        # Planning documents
│   ├── STRATEGY.md
│   ├── CONTENT-GUIDE.md
│   └── SITEMAP.md
└── scripts/
    ├── validate-content.ts      # Frontmatter validation for CI
    └── generate-sitemap.ts      # Sitemap generation
```

---

## 3) Content File Format

Every resource is a Markdown file with required frontmatter:

```markdown
---
title: "How to Get Wegovy for $25/Month with a Savings Card"
slug: "wegovy-savings-card-guide"
description: "Step-by-step guide to activating and using the Wegovy savings card to reduce your monthly cost to $25."
category: "cost-savings"
stage: 2
concerns: ["cost"]
medications: ["wegovy"]
author: "Body First Team"
publishedAt: "2026-03-15"
updatedAt: "2026-03-15"
readingTime: 4
featured: false
seoKeywords: ["wegovy savings card", "wegovy cost", "wegovy $25"]
---

Your content here...
```

### Required Frontmatter Fields

| Field | Type | Description |
|-------|------|-------------|
| title | string | Resource title, under 60 characters for SEO |
| slug | string | URL-safe identifier |
| description | string | Meta description, under 155 characters |
| category | enum | One of 11 categories (see taxonomy) |
| stage | number | Decision stage 1-5 |
| concerns | string[] | Maps to app's 9 concern types |
| medications | string[] | Which medications this covers |
| publishedAt | date | Publication date |
| readingTime | number | Estimated minutes |
| seoKeywords | string[] | Target search terms |

### Category Enum Values

cost-savings, side-effects, getting-started, medication-deep-dive, comparisons, lifestyle-nutrition, real-stories, checklists-toolkits, news-updates, mental-emotional, science-how-it-works

### Concern Enum Values (matches app onboarding)

cost, side-effects, needles, doctor, qualification, effectiveness, judgment, commitment, general

### Medication Enum Values

ozempic, wegovy, mounjaro, zepbound, oral-semaglutide, general

---

## 4) SEO Requirements

Every page must have:
- Unique `<title>` under 60 characters
- Unique `<meta name="description">` under 155 characters
- Open Graph tags (og:title, og:description, og:image)
- JSON-LD structured data (Article schema for resources, FAQPage for guides)
- Canonical URL
- Internal links to at least 2 other resources
- One contextual CTA (mapped to content topic)

### Sitemap

Auto-generated at build time. Must include all resource pages, guide pages, comparison pages, and tool pages. Submitted to Google Search Console.

---

## 5) Supabase Integration

Same Supabase project as the app (zeraesvijiwuihcyrwnr). The website uses:

- **website_leads table** — contact form submissions and email captures
- **Read-only** — does NOT write to users, onboarding_data, or any app tables

Environment variables:
```
NEXT_PUBLIC_SUPABASE_URL=https://zeraesvijiwuihcyrwnr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key — same as app>
```

---

## 6) Deployment

- **Platform:** Cloudflare Pages
- **Build command:** `next build`
- **Output:** Static export (SSG) for maximum performance
- **Custom domain:** TBD (buy via Cloudflare Registrar)
- **Branch deploys:** PRs get preview URLs automatically

---

## 7) Quality Checklist (Before Merging)

- [ ] `npm run build` passes (no build errors)
- [ ] All resource frontmatter validates (run `npm run validate-content`)
- [ ] No broken internal links
- [ ] Lighthouse score: Performance 90+, SEO 95+, Accessibility 90+
- [ ] Mobile responsive (check 375px, 768px, 1200px)
- [ ] Brand compliance: peach gradient background, white cards, teal CTAs
- [ ] Every page has unique meta title + description
- [ ] Every resource has at least one contextual CTA
- [ ] No medical recommendations or outcome promises in content

---

## 8) What This Repo Does NOT Do

- Does NOT contain React Native code (that's the app repo)
- Does NOT manage app subscriptions or RevenueCat
- Does NOT handle user authentication (app handles that)
- Does NOT store user health data (app handles that)
- Does NOT prescribe, dispense, or sell medication
- Content is educational only — always directs to healthcare providers for medical decisions
