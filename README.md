# Body First Web — Bootstrap Kit

## What's in this folder

These 4 files are everything you need to spin up the website repo from scratch:

| File | What It Does |
|------|-------------|
| **design-tokens.json** | Single source of truth for all brand values. Extracted from the app's `CLAUDE.md` Section 7. Both repos read from this. |
| **tailwind.config.js** | Tailwind CSS config that consumes design-tokens.json. Drop-in replacement for the default Next.js tailwind config. |
| **CLAUDE.md** | Constitution for the website repo. Equivalent to the app's CLAUDE.md but optimized for Next.js, SEO, and content pipeline work. |
| **BOOTSTRAP-PROMPT.md** | Copy-paste this into a Claude Code instance to scaffold the entire project. |

## How to use

### Step 1: Create the GitHub repo

```bash
# In the Lumina-January-2026 org
gh repo create Lumina-January-2026/body-first-web --public --clone
cd body-first-web
```

### Step 2: Copy these files into the repo root

```bash
cp design-tokens.json CLAUDE.md tailwind.config.js ./
```

### Step 3: Open Claude Code and paste the bootstrap prompt

Open a new Claude Code instance, point it at the repo, and paste the contents of `BOOTSTRAP-PROMPT.md`. It will scaffold the entire Next.js project, create the page structure, build components using the brand tokens, and generate 10 seed resources.

### Step 4: Connect Cloudflare Pages

1. Go to Cloudflare Dashboard → Pages
2. Connect the GitHub repo
3. Build settings: Framework = Next.js, Build command = `npm run build`, Output = `.next`
4. Add environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy

### Step 5: Add Supabase table

Run this migration in your existing Supabase project (zeraesvijiwuihcyrwnr):

```sql
CREATE TABLE website_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  biggest_question TEXT,
  source_url TEXT,
  source_category TEXT,
  concern_tag TEXT,
  medication_tag TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  converted_to_app BOOLEAN DEFAULT FALSE,
  app_user_id UUID REFERENCES users(id)
);

ALTER TABLE website_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (website visitors aren't authenticated)
CREATE POLICY "Allow anonymous inserts" ON website_leads
  FOR INSERT WITH CHECK (true);

-- Only service role can read leads
CREATE POLICY "Service role reads leads" ON website_leads
  FOR SELECT USING (auth.role() = 'service_role');
```

## Architecture

```
Lumina-January-2026/
├── GLP1-Planning/          ← App repo (React Native/Expo) — UNCHANGED
│   ├── src/theme/colors.ts  ← App reads tokens as TypeScript
│   └── CLAUDE.md            ← App constitution
│
├── body-first-web/         ← Website repo (Next.js) — NEW
│   ├── design-tokens.json   ← Shared brand tokens
│   ├── tailwind.config.js   ← Consumes tokens for CSS
│   └── CLAUDE.md            ← Website constitution
│
└── (Both connect to same Supabase: zeraesvijiwuihcyrwnr)
```

## Keeping tokens in sync

For now, design-tokens.json lives in the website repo and the app's `src/theme/` files are the app's own copy. If a brand value changes:

1. Update design-tokens.json in body-first-web
2. Update the corresponding value in GLP1-Planning/src/theme/colors.ts (or typography.ts, etc.)

When this gets annoying (probably after the first brand refresh), extract design-tokens.json into its own npm package or shared GitHub Action that validates both repos stay in sync.
