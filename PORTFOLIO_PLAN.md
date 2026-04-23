# Plan: Turn This Codebase Into Your Portfolio Site

This repo is already a **Next.js 14 (App Router)** personal site with projects, blog (MDX), contact form, optional AI chat, and data-driven copy. Use this document as a checklist to rebrand and repoint everything to **you** without rewriting the architecture.

---

## Phase 1 — Identity and global chrome

| Task | Where to change |
|------|-----------------|
| Site title and default description | `src/app/layout.tsx` (`metadata.title`, `metadata.description`) |
| Open Graph / social previews (if you add them later) | Extend `metadata` in `layout.tsx` or per-route `generateMetadata` |
| Fonts | `layout.tsx` (`Inter`, `Calistoga` from `next/font/google`) — swap families if you want a different look |
| PWA name / theme | `public/manifest.json` |
| Favicon and touch icons | `public/` (`favicon.ico`, `icon.svg`, `apple-touch-icon.png`) |
| Package name (optional) | `package.json` `"name"` |

---

## Phase 2 — Navigation and IA

| Task | Where to change |
|------|-----------------|
| Nav labels, which routes appear, resume link | `src/data/routes.json` |
| Footer links and copy | `src/components/Footer.tsx` (and any strings pulled from data) |
| Remove or add a top-level section | New folder under `src/app/<route>/`, then add an entry in `routes.json` if it should appear in the header |

Decide early whether you need **blog**, **projects**, **contact**, and **chat**; unused routes can stay (hidden from nav) or be deleted in a later cleanup phase.

---

## Phase 3 — Replace all “portfolio copy” (data files)

These JSON/MD files drive most of the UI. Replace content before tweaking components.

| Content | File(s) |
|---------|---------|
| Hero / intro / chat CTA text | `src/data/home.json` |
| Work history | `src/data/career.json` |
| Education | `src/data/education.json` |
| Project cards and links | `src/data/projects.json` |
| Social links | `src/data/socials.json` |
| Privacy policy body | `src/data/privacy.md` |

After edits, click through **home**, **projects**, **contact**, and **privacy** to catch stale names or URLs.

---

## Phase 4 — Blog (optional)

- Post content and frontmatter live as MDX (see `src/lib/posts.ts` and `src/app/blog/`).
- Images for posts: keep assets under `public/blog/<slug>/` per `AGENTS.md`.
- If you will not run a blog: hide `/blog` in `routes.json` and consider removing or redirecting the route later.

---

## Phase 5 — Contact and email

- Contact UI: `src/components/ContactForm.tsx`, `src/app/contact/page.tsx`.
- Email template branding: `src/components/email/ContactFormEmail.tsx`.
- **Resend** API key: `.env.local` (see `.env.example` for `RESEND_API_KEY`). Do not commit secrets.

---

## Phase 6 — Chat assistant (optional)

The AI chat uses `src/app/api/chat/route.ts`, `src/contexts/ChatContext.tsx`, and components under `src/components/Chat*.tsx`. It also references env vars in `.env.example` (`TACOS_API_*`).

- **Keep:** Update system prompts, UI labels in `home.json` / chat components, and wire your own backend or keys.
- **Remove later:** Delete chat routes, context provider usage in `Providers.tsx`, and chat UI entry points to shrink dependencies (`ai`, `langchain`, etc.) — only after you confirm nothing else imports them.

---

## Phase 7 — Content automation (`extract` / `push`)

`npm run build` runs `extract` and `push` after `next build` (see `package.json`). Those scripts expect `.env.local` with API keys for downstream services.

- For a **simple portfolio**, consider changing `build` to only `next build` until you need indexing or external sync — or ensure env vars exist in CI/production so builds do not fail.

---

## Phase 8 — Analytics and misc

| Feature | Location |
|---------|----------|
| View counts | `src/app/api/views/[slug]/route.ts`, `src/components/ViewCounter.tsx` — confirm storage/backend matches your deployment |
| On-demand revalidation | `src/app/api/revalidate/route.ts` — needs `REVALIDATE_SECRET` if you use it |

---

## Phase 9 — Quality gate before launch

1. `npm run lint` and fix issues.
2. `npm run build` (with env you intend to use in production).
3. Manual pass: all links in `projects.json`, `socials.json`, and `routes.json` open correctly.
4. Replace any remaining third-party or placeholder URLs (e.g. old social handles, “escalation” jokes in `home.json` if that does not fit your voice).
5. Update `README.md` so it describes **your** site, not the template author’s.

---

## Suggested order of work

1. **Metadata + `public` assets** (instant “this is my site” signal).  
2. **`src/data/*.json` + `privacy.md`** (bulk of visible text).  
3. **`routes.json` + blog on/off**.  
4. **Contact + env** (Resend).  
5. **Chat and build scripts** (simplify or configure).  
6. **Polish** (fonts, OG images, README, deploy).

This keeps the existing structure while making the site unmistakably yours.
