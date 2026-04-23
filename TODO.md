# Portfolio Rebrand — TODO

## Phase 1 — Identity & Global Chrome ✅
- [x] Site title → `"Jasper's Portfolio"`
- [x] Meta description updated
- [x] OpenGraph metadata added
- [x] Twitter card metadata added (`@Peirogi25`)
- [x] PWA manifest updated (name, theme color `#6366f1`)
- [x] `package.json` name → `"jasperswe"`
- [x] SVG favicon created (J on indigo)
- [x] PNG icons replaced
- [ ] **Generate proper `favicon.ico`** — run `icon.svg` through https://favicon.io/favicon-converter/ once you have a domain/deploy setup
- [ ] **Add `metadataBase`** to `layout.tsx` once you have a domain: `metadataBase: new URL("https://yourdomain.com")`

---

## Phase 2 — Navigation & IA ✅
- [x] All routes visible in nav: home, projects, blog, contact, resume
- [x] Resume link shown in nav (placeholder — **replace `public/resume.pdf` with your own**)
- [x] External link → `https://x.com/Peirogi25`
- [x] Footer copyright → `jasperswe`

---

## Phase 3 — Portfolio Copy (Data Files) ✅
- [x] Hero / intro text → `src/data/home.json`
- [x] Work history → `src/data/career.json` (internship placeholder — update when you land one!)
- [x] Education → `src/data/education.json`
- [x] Project cards → `src/data/projects.json`
- [x] Social links → `src/data/socials.json` (email `mailto:` fixed)
- [x] Privacy policy → `src/data/privacy.md` (email link fixed)
- [ ] **Add project/school images** to `public/img/` — files expected: `iplan.png`, `ccs-attendance.png`, `esihagba.png`, `maxyield.png`, `largo.png`, `msu-iit.png`, `icnhs.png`
- [ ] **Update `career.json`** once you land an internship

---

## Phase 4 — Blog (deferred ⏸️)
- [x] Blog hidden from nav (`showInNav: false` in `routes.json`)
- [ ] **When ready:** clear out Ted's MDX posts from `src/app/blog/` and write your own
- [ ] **When ready:** set `showInNav: true` in `routes.json` to re-enable

---

## Phase 5 — Contact & Email ✅
- [x] Email template branding updated → `jasperswe`
- [x] **Create `.env.local`** and add your Resend API key ✅
- [x] Contact form working — emails delivered to `jaspergumoraa@gmail.com`
- [ ] **Get a domain** → verify it at https://resend.com/domains
  - Then update `from` in `src/lib/actions.ts` → `contact@yourdomain.com`
  - Then update `to` → `jasper.gumora@g.msuiit.edu.ph` (or any inbox you want)

---

## Phase 6 — Chat Assistant
- [ ] Decide: keep or remove chat?
- [ ] If keeping: update system prompts and wire API keys

---

## Phase 7 — Build Scripts ✅
- [x] Simplified `build` script to just `next build` — `extract` and `push` steps removed until content indexing is needed

---

## Phase 8 — Analytics ✅
- [x] View counter route stubbed — returns `{ views: 0 }` cleanly; wire to real storage (e.g. Upstash Redis) when ready
- [x] `REVALIDATE_SECRET` documented in `.env.local` — uncomment and fill in when using on-demand revalidation

---

## Phase 9 — Quality Gate (Pre-launch) ✅
- [x] `npm run lint` — ✅ No ESLint warnings or errors
- [x] `npm run build` — ✅ Clean build, exit code 0 (8 static pages generated)
- [x] Checked all links in `projects.json`, `socials.json`, `routes.json` — all good
- [x] `README.md` rewritten to describe Jasper's site (removed template author content)
- [x] Removed remaining template author references:
  - `src/components/ChatMessages.tsx` — replaced TACOS link with "Powered by AI"
  - `src/app/head.tsx` — removed `tacos.tedawf.com` DNS prefetch/preconnect hints
