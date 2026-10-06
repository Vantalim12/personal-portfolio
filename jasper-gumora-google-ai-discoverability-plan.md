# Jasper Gumora — Google Search & AI Discoverability Plan

Website: https://jaspergumora.is-pinoy.dev/  
GitHub: https://github.com/Vantalim12

## Accepted direction

Accepted during the interview on 2026-10-06:

- Primary outcome: accurate identification for searches containing **Jasper Gumora**. Google AI mentions are a secondary observation.
- Long-term portfolio address: **https://jaspergumora.is-pinoy.dev/**. No domain migration is planned.
- Public positioning: **Jasper Gumora — Full-Stack Developer**. Describe n8n workflows without claiming “AI Automation Specialist.” Revisit that title when a public case study supports it.
- Effort ceiling: **one day of setup**, followed by occasional checks.
- First release: improve existing pages. Defer new About, blog, and individual project pages, recurring publishing, and backlink campaigns.
- Separate implementation acceptance from Google discovery outcomes. Record a baseline before deployment and review outcomes after **30 and 90 days**.

See [CONTEXT.md](./CONTEXT.md) for settled terminology. The user confirmed the final shared understanding on 2026-10-06; the interview is complete. This document records the agreed implementation and local validation; deployment remains pending.

## Implementation status — 2026-10-06

The first-release changes below are implemented locally: full-name homepage copy, author/creator metadata, distinct titles and canonicals for all four pages, matching social metadata, homepage ProfilePage/Person JSON-LD, sitemap, robots.txt, and footer/manifest identity.

LinkedIn verification resolved the former discrepancy: opening the old website link redirected to Jasper's own profile at `https://www.linkedin.com/in/jaspergumora/`, and its public-profile URL field confirmed that address. The site now uses that URL and includes it alongside GitHub in `sameAs`; no external profile was edited.

Run `npm run dev` and, in another terminal, `npm run check:discoverability` to verify rendered output. Lint and TypeScript checks passed; the homepage heading was checked at a 375px viewport. Production build verification is deferred under the repository's credential requirement. Deployment and Search Console setup remain outstanding. The [pre-deployment search observations](./docs/discoverability-observations.md) provide the initial baseline; review dates are relative to the eventual deployment date.

Final review:

- Plan alignment: passed for the local first-release scope; no new content pages were added.
- System integrity: passed; server-rendered pages and native Next.js metadata routes use the existing stack without new dependencies.
- Production readiness: local formatting, lint, TypeScript, and rendered-output checks passed. Production build, deployment, and Search Console checks remain outstanding. The unchanged photo-card component emits existing image-quality/LCP warnings during development.

## Verified repository baseline

- Existing HTML pages: `/`, `/projects`, `/contact`, and `/privacy`.
- The resume is `/Gumora-Resume.pdf`; `/resume.pdf` redirects to it. `/resume` does not exist.
- Homepage heading: `hi jas here. 👋`. Global title: `Jasper's Portfolio`.
- Visible homepage copy already describes full-stack development and self-hosted n8n workflows.
- Root layout is the only current metadata export. There is no metadata base, canonical configuration, person JSON-LD, sitemap, or robots file.
- Homepage and footer already link GitHub and LinkedIn. Project cards already expose their titles and descriptions as text.
- Current projects: Legacy Rides, eSihagBa, iPlan, CCS Attendance Monitoring System, and BetterIliganCity.org. ECOFLOW and Documented Procedures Manual are absent from the site's project data.
- Footer and manifest use `jasperswe` or `Jasper's Portfolio`. `@Peirogi25` is `twitter.creator`, not the top-level metadata creator; the route data also links that X handle.

These are source-code findings, not a production crawl or indexing audit.

## First-release changes

### Visible identity

Update `src/data/home.json` so the homepage heading reads:

> Hi, I'm Jasper Gumora. 👋

Use a factual description such as:

> Full-stack developer building web applications and self-hosting n8n workflow automations.

Keep personality copy where it fits, while making the full name and role visible in the rendered HTML. Use Jasper Gumora as the footer identity and manifest name. Review any conflicting name or occupation claims in existing public copy; do not invent specializations or project results.

### Metadata and canonicals

Use the existing Next.js metadata API:

- Set `metadataBase` to the chosen portfolio origin.
- Homepage title: `Jasper Gumora | Full-Stack Developer`.
- Description: `Jasper Gumora is a full-stack developer who builds web applications and self-hosts n8n workflow automations.`
- Set the author and top-level creator to Jasper Gumora.
- Give `/projects`, `/contact`, and `/privacy` distinct titles using `Page Name | Jasper Gumora`, with descriptions matching each page.
- Give every existing HTML page its own absolute canonical URL. Do not let non-home pages inherit `/` as their canonical.
- Keep Open Graph and Twitter metadata consistent with the page identity and URL. Keep the existing summary card unless a suitable image is actually provided.
- Treat an X handle as a platform handle, not as a replacement for the person's name. Do not add unverified accounts to person markup.

### Person markup

Add homepage JSON-LD describing Jasper Gumora as the main person represented by the page, using `ProfilePage` with a `Person` main entity:

- Stable person identifier: `https://jaspergumora.is-pinoy.dev/#jasper-gumora`.
- Name: Jasper Gumora.
- Job title: Full-Stack Developer.
- URL: the portfolio homepage.
- Description: consistent with visible homepage copy.
- `sameAs`: verified public identity profiles only. GitHub and LinkedIn are verified; use `https://github.com/Vantalim12` and `https://www.linkedin.com/in/jaspergumora/`.

Keep the markup on the homepage rather than repeating the profile description on unrelated pages. Escape `<` in serialized JSON-LD before inserting it into an inline script. Validate the rendered markup and ensure it describes visible content. Google's [ProfilePage guidance](https://developers.google.com/search/docs/appearance/structured-data/profile-page) requires the page to focus on the affiliated person or organization.

### Crawl files

Add `src/app/sitemap.ts` and `src/app/robots.ts` through Next.js metadata routes:

- Sitemap: list the existing canonical HTML routes `/`, `/projects`, `/contact`, and `/privacy`.
- Keep the existing resume PDF linked from the homepage. Do not invent a `/resume` sitemap entry.
- Omit `priority`, `changeFrequency`, and `lastModified`. Add modification dates only when accurate significant-update dates are available.
- Robots: allow crawling of the public site and reference the absolute sitemap URL.

Google ignores sitemap priority and change frequency; modification dates must reflect real significant updates. A sitemap is a discovery hint, not an indexing guarantee. [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

## Profile verification and Search Console

- GitHub publicly identifies Jasper Gumora / Vantalim12 and links back to the portfolio. Preserve that existing connection; no blanket profile rewrite is needed.
- LinkedIn is verified through the browser: the former website URL redirected to Jasper's own profile, whose public URL is `https://www.linkedin.com/in/jaspergumora/`. Use that destination in the site link and person markup. Public web-tool fetches alone had been inconclusive; browser verification resolved the discrepancy.
- After deployment, verify ownership of the exact portfolio URL-prefix property in Google Search Console. Use a verification method available to that property's owner; do not assume control of the parent domain's DNS.
- Submit `sitemap.xml`, inspect the homepage and projects page, and request indexing if appropriate. Check crawl access, snippet eligibility, and Google's selected canonical.
- Check the property's effective Search generative AI inclusion setting, including any inherited setting. Use the Generative AI performance report when available; absence of a report can reflect insufficient impressions. [Google inclusion control](https://support.google.com/webmasters/answer/16908024), [AI performance report](https://support.google.com/webmasters/answer/16984139).

Account access and completed ownership verification have not been established in this interview. Search Console setup is a post-deployment task, not a claimed completed action. External profile edits and deployment are outside this documentation session.

## Implementation acceptance

The implementation is ready when:

- Existing HTML pages return successfully and expose accurate identity text and page-specific metadata.
- Each page declares its own preferred canonical URL; the projects page does not canonicalize to the homepage.
- Homepage JSON-LD parses, matches visible content, and contains no placeholders or unverified profiles.
- `/sitemap.xml` and `/robots.txt` return valid responses. Every sitemap URL exists and matches its page's declared canonical.
- GitHub, existing LinkedIn, and resume links retain their intended destinations.
- The homepage heading remains readable at mobile widths and retains accessible heading structure.
- Repository formatting and applicable lint/type checks pass. Inspect rendered HTML for the metadata and markup rather than relying solely on source review.

Do not run content extraction or downstream push scripts for this change. Follow repository guidance on credentials before choosing build checks. No new dependency or test framework is needed.

## Discovery observations

Record a short manual observation log before deployment, then 30 and 90 days afterward:

- Date, deployment date, query, country/language, and whether the search was signed in.
- Results for `Jasper Gumora`, `Jasper Gumora developer`, and `Vantalim12`.
- Whether a result links to this portfolio and accurately associates it with Jasper Gumora. Record the observed position without promising a target rank.
- Search Console indexing status, selected canonicals, and name-query impressions/clicks when available. Missing query data is not proof of zero searches.
- Optional AI observations for `Who is Jasper Gumora?` and `What projects has Jasper Gumora built?`: record citations and inaccurate claims, or that no relevant answer appeared.
- AI impression metrics when available; these do not prove that generated identity statements are accurate.

The primary observed success is a correctly attributed portfolio result for the full-name query. Lack of indexing or an incorrect association triggers investigation; it does not justify automatically adding new pages or stronger claims. Missing AI mentions alone do not make the release unsuccessful.

Google requires no special schema or AI text file for AI Overviews or AI Mode. Indexed, snippet-eligible pages can qualify, but inclusion and indexing are not guaranteed. [Google AI features guidance](https://developers.google.com/search/docs/appearance/ai-features), [Google's newer AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

## Deferred work

Add an About page, project case studies, or articles only when there is accurate, useful material for a chosen audience. Add stronger positioning only when visible evidence supports it. Revisit a domain move only if the long-term address decision changes.

No ADR is warranted yet: the accepted work follows ordinary portfolio practices and does not meet all three criteria of costly reversal, a surprising choice, and a substantial trade-off.
