# Portfolio discovery tracking

Baseline checked on **2026-10-09**, before the updated homepage and project descriptions were deployed. These are observations, not evidence that the new copy has improved visibility.

## Indexing

Source: signed-in [Search Console](https://search.google.com/search-console?resource_id=https%3A%2F%2Fjaspergumora.is-pinoy.dev%2F), using URL Inspection for each exact URL.

| URL                                          | Index status                      | Last crawl shown in Search Console | Fetch / indexing allowed | Google-selected canonical |
| -------------------------------------------- | --------------------------------- | ---------------------------------- | ------------------------ | ------------------------- |
| `https://jaspergumora.is-pinoy.dev/`         | URL is on Google; page is indexed | Oct 6, 2026, 10:26:54 PM           | Successful / Yes         | Inspected URL             |
| `https://jaspergumora.is-pinoy.dev/projects` | URL is on Google; page is indexed | Oct 6, 2026, 9:03:38 PM            | Successful / Yes         | Inspected URL             |

The homepage has one valid ProfilePage item. The projects inspection shows a temporary processing error in its sitemap-discovery field, while fetch, indexing, and canonical selection all succeed. The aggregate Page indexing report is still processing data. Crawl times above retain the timezone displayed by Search Console; no UTC conversion was inferred.

## Search performance

Use this [28-day Web performance report](https://search.google.com/search-console/performance/search-analytics?resource_id=https%3A%2F%2Fjaspergumora.is-pinoy.dev%2F&num_of_days=28). The baseline report was last updated 23 hours earlier; its chart only contained Oct 5–6, 2026.

| Checked on | Window / scope                      | Impressions | Clicks | CTR | Average position | Query rows       |
| ---------- | ----------------------------------- | ----------- | ------ | --- | ---------------- | ---------------- |
| 2026-10-09 | Last 28 days / whole property / Web | 1           | 0      | 0%  | 29               | No data reported |

In the Pages tab, `/projects` has one impression and zero clicks. The homepage has no reported row; that is not an independently measured zero. Query details are unavailable, so the impression cannot be attributed to a name search or an employment-related query.

## AI citation checks

Checks used fresh conversations without providing the portfolio URL or seeding its facts. Google was signed in to the user's account; results can vary with account, location, and time. A portfolio citation requires a link to this domain in the generated answer or its source panel. A name mention alone does not count.

| Date       | Engine         | Exact question                                                                  | Portfolio citation                                          | Observed answer                                                                                                                                                        |
| ---------- | -------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-10-09 | Google AI Mode | Who is Jasper Gumora?                                                           | Yes: homepage in source panel; `/projects` linked in answer | Identified him as a Filipino developer and described civic tech work. Still called him a student.                                                                      |
| 2026-10-09 | Brave Ask      | Who is Jasper Gumora?                                                           | No                                                          | Could not identify the person; returned unrelated name/surname results.                                                                                                |
| 2026-10-09 | Brave Ask      | What software projects has Jasper Gumora built?                                 | No                                                          | Could not identify his software work.                                                                                                                                  |
| 2026-10-09 | Brave Ask      | Is Jasper Gumora available for internships or remote software development work? | No                                                          | Could not establish his availability; returned unrelated companies named Jasper.                                                                                       |
| 2026-10-09 | Google AI Mode | Is Jasper Gumora available for internships or remote software development work? | Yes: homepage linked in answer and source panel             | Reported that he is seeking full-stack roles and directed prospective employers to his portfolio and profiles. Did not clearly confirm openness to another internship. |

Brave observation URLs: [name](https://search.brave.com/ask?q=Who+is+Jasper+Gumora%3F&source=llmSuggest&conversation=09a9913766fa28bbb16929c2e31f13e5a731), [projects](https://search.brave.com/ask?q=What+software+projects+has+Jasper+Gumora+built%3F&conversation=09a9b239373b9b2cde7d0159eaf40c536076), [availability](https://search.brave.com/ask?q=Is+Jasper+Gumora+available+for+internships+or+remote+software+development+work%3F&conversation=09a974f785028ef5200ccf37f7973b4bfbb8). Google checks can be rerun for [name](https://www.google.com/search?q=Who+is+Jasper+Gumora%3F&udm=50) and [availability](https://www.google.com/search?q=Is+Jasper+Gumora+available+for+internships+or+remote+software+development+work%3F&udm=50). These links are not immutable answer archives.

## Weekly recheck

Next check: **2026-10-16**. This is a manual tracking log; no unattended monitoring job is configured.

1. After deployment, inspect `/` and `/projects` again. Confirm crawl dates advance, both remain indexed, and Google keeps their self-canonicals. Request indexing once after confirming the updated public text is live.
2. Open the same 28-day Web performance report and append a dated row above. Record the displayed data range and last-update time. Use date comparison for the previous 28 days once enough history exists.
3. Check Pages and Queries separately. Record impressions and clicks for both pages, name queries containing `Jasper Gumora`, and any reported queries about skills, projects, internships, or remote work. Keep missing or unreported rows marked as unavailable.
4. Repeat the three questions above in fresh Google AI Mode and Brave Ask conversations. Also test: **What skills and project experience does Jasper Gumora have for a full-stack developer internship?** Record the engine, exact question, linked source URLs, and whether graduate status, projects, and availability are accurate. Preserve a screenshot or answer URL with each new observation.
5. Judge progress by accurate citations, useful search queries, and clicks. Do not interpret one answer or one impression as evidence of employment leads. These manual search checks may themselves contribute impressions.

Google AI Mode and AI Overview traffic is included in Search Console's Web reporting; the report does not isolate a citation count. [Google's guidance](https://developers.google.com/search/docs/appearance/ai-features)

## Content evidence

- Legacy Rides: the user confirmed direct work for a US client. The description links the client site and makes no conversion or revenue claim.
- eSihagBa, iPlan, CCS Attendance, and BetterIligan: roles and outcomes were drawn from the existing [public résumé](../public/Gumora-Resume.pdf). Adoption and pilot counts are explicitly attributed to that résumé; they were not independently audited.
- CCS Attendance: the user confirmed TypeScript and Node.js as the version to showcase.
- Graduate status: the user confirmed graduation; the résumé gives July 2026.
- The [BetterIligan repository](https://github.com/KishonShrill/BetterIligan) supports the civic tech problem and Next.js/Tailwind stack. Its roadmap contains planned work, so the description does not present every roadmap item as delivered.

The existing eSihagBa and CCS GitHub links could not be fetched by the web research tool. They remain the supplied source links, rather than independently verified implementation evidence.

Google's observed LinkedIn and Himalayas snippets still describe Jasper as a student. Those external profiles were not edited in this task; align their education and availability text separately to reduce conflicting sources.
