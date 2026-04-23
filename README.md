# Jasper's Portfolio

A clean, minimal portfolio website built with Next.js 14, Tailwind CSS, and Shadcn UI. Features an AI chat assistant, Resend-powered contact form, and an optional blog.

## Live

🌐 *Coming soon — deploy to Vercel and update this link!*

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Shadcn UI
- **Email**: Resend
- **AI Chat**: Groq API (via `src/app/api/chat/`)
- **Hosting**: Vercel

## Getting Started

```bash
git clone https://github.com/Vantalim12/portfolio-website
cd portfolio-website
npm install
cp .env.example .env.local
# Fill in RESEND_API_KEY and GROQ_API_KEY
npm run dev
```

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Contact form email delivery |
| `GROQ_API_KEY` | AI chat assistant backend |
| `REVALIDATE_SECRET` | On-demand blog cache revalidation (optional) |

See `.env.example` for the full list.

## Project Structure

```
src/
├── app/          # Next.js App Router pages & API routes
├── components/   # Shared UI components (Radix-based)
├── contexts/     # React contexts (ChatContext, etc.)
├── data/         # Content JSON files (projects, career, etc.)
└── lib/          # Utilities, server actions, MDX helpers
public/           # Static assets (images, resume.pdf, icons)
scripts/          # Content automation (extract / push)
```

## Content Files

Update these to personalise the site:

| File | Content |
|------|---------|
| `src/data/home.json` | Hero text and intro |
| `src/data/projects.json` | Project cards |
| `src/data/career.json` | Work history |
| `src/data/education.json` | Education history |
| `src/data/socials.json` | Social links |
| `src/data/routes.json` | Nav links and visibility |
| `public/resume.pdf` | Your resume |

## Deployment

1. Push to GitHub
2. Import repo into [Vercel](https://vercel.com/)
3. Add environment variables in the Vercel dashboard
4. Deploy 🎉

## License

MIT
