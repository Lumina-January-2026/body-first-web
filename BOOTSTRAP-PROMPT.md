# Body First Web — Claude Code Bootstrap Prompt

> Copy-paste this into a new Claude Code instance to scaffold the entire website project.

---

```
You are setting up a new Next.js website project for Body First — a GLP-1 medication planning resource hub.

## Context

Body First has an existing React Native/Expo app (separate repo: Lumina-January-2026/GLP1-Planning). This is a NEW, SEPARATE repository for the companion website. The website serves as the free content layer that drives traffic to the paid app.

## Step 1: Initialize Project

Create a new Next.js 14+ project with App Router:

```bash
npx create-next-app@latest body-first-web --typescript --tailwind --eslint --app --src-dir --no-import-alias
cd body-first-web
```

## Step 2: Install Dependencies

```bash
npm install @supabase/supabase-js gray-matter remark remark-html reading-time
npm install -D @tailwindcss/typography
```

## Step 3: Copy Foundation Files

I will provide you with three files. Place them in the project root:

1. **design-tokens.json** — Canonical brand colors, typography, spacing shared with the app
2. **tailwind.config.js** — Tailwind config that consumes design-tokens.json (REPLACE the generated one)
3. **CLAUDE.md** — Constitution for this project (read this FIRST before building anything)

## Step 4: Create Project Structure

Follow the exact structure defined in CLAUDE.md Section 2. Create all directories and placeholder files.

## Step 5: Build Root Layout

The root layout (app/layout.tsx) must:
- Import Inter font from next/font/google
- Apply the peach gradient as the page background (min-h-screen bg-gradient-to-b from-[#FFE5D9] to-[#FFF5F0])
- Include a Header component with: Body First logo/wordmark, navigation links (Resources, Guides, Tools, About), and a teal "Get the App" CTA button
- Include a Footer component with: links, copyright, privacy/terms links, Body First branding
- Header uses navy dark (#1E1E2D) background. Footer uses navy dark background.

## Step 6: Build Home Page

The home page (app/page.tsx) must:
- Hero section: "Your GLP-1 Planning Companion" headline, subtext about being the free resource for people still deciding, teal CTA button
- Featured Resources section: 6 cards in a responsive grid (2 cols desktop, 1 col mobile)
- Resource cards: white background, card shadow, 16px radius, category badge (coral), title, description snippet, reading time, teal "Read More" link
- Trust section: "Built for people who are still deciding" with 3 value props in white cards
- CTA section: "Ready to get personal?" with app download buttons

## Step 7: Build Resource Pages

- app/resources/page.tsx: Filterable grid with category pills (11 categories), medication filter, stage filter. White cards with card shadow.
- app/resources/[slug]/page.tsx: Full resource page with rendered markdown, sidebar with related resources, contextual CTA matched to category

## Step 8: Build Get Started Page

- app/get-started/page.tsx: Contact form (name, email, optional phone, "What's your biggest question about GLP-1s?"). Form submits to Supabase website_leads table. App download buttons. Trust signals.

## Step 9: Create 10 Seed Resources

Create 10 markdown files in content/resources/ covering the top content categories:
1. "How to Get Wegovy for $25/Month" (cost-savings)
2. "Wegovy vs Zepbound: 2026 Comparison" (comparisons)
3. "Your First Week on Mounjaro: What to Expect" (side-effects)
4. "The Doctor Appointment Script for GLP-1s" (getting-started)
5. "Is My BMI High Enough for Weight Loss Medication?" (getting-started)
6. "Understanding Food Noise and How GLP-1s Help" (science-how-it-works)
7. "You're Not Cheating by Taking Medication" (mental-emotional)
8. "GLP-1 First Week Checklist" (checklists-toolkits)
9. "New Oral Ozempic Tablets in 2026" (news-updates)
10. "High-Protein Meal Plan for GLP-1 Users" (lifestyle-nutrition)

Each resource must follow the frontmatter format in CLAUDE.md Section 3 and be genuinely helpful, specific, and actionable. NOT generic WebMD rewrites.

## Step 10: SEO Setup

- Generate sitemap.xml at build time
- Add robots.txt
- Add JSON-LD structured data (Article schema) to resource pages
- Add Open Graph meta tags to all pages

## Step 11: Verify

- `npm run build` passes
- All pages render correctly at 375px, 768px, and 1200px
- Peach gradient background visible on all pages
- White cards with correct shadows
- Teal buttons and links throughout
- No broken internal links
- Lighthouse: Performance 90+, SEO 95+

## Brand Compliance Check

Before declaring done, verify EVERY page against these rules:
- [ ] Peach gradient background (not flat white, not dark)
- [ ] White cards with shadow-card
- [ ] Teal (#14B8A6) for all primary buttons and links
- [ ] Coral (#F97316) for badges and highlights only
- [ ] Navy dark (#1E1E2D) for header and footer
- [ ] Inter font throughout
- [ ] No clinical or cold design patterns
- [ ] Warm, friendly, permission-giving tone in all copy

Commit frequently. Push to main. The Cloudflare Pages deployment will be configured separately.
```
