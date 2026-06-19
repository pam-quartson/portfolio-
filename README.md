# Pamela Quartson Portfolio

Three narrative paths through the same three projects — built with React, Vite, and Tailwind v4.

## Routes

| Path | Narrative | Resume |
|------|-----------|--------|
| `/` | Approach selector | Data Engineer (default) |
| `/impact` | Impact First | Data Engineer |
| `/systems` | Systems Journey | Generalist (GW) |
| `/problem` | Problem to Solution | DS/ML Engineer |

## Setup

```bash
cd portfolio-/Pamela_Portfolio
cp .env.example .env   # fill in real contact + project URLs
npm install
npm run dev
```

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server |
| `npm run build` | Typecheck + production build |
| `npm run test` | Vitest unit/component tests |
| `npm run test:e2e` | Playwright e2e |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript only |

## Deploy

Vercel-ready via `vercel.json` (SPA rewrites). Set `VITE_*` env vars in the deploy dashboard.

## Content source of truth

- Projects/metrics: `src/data/portfolio.ts` (from `src/imports/pasted_text/pamela-quartson-portfolio.md`)
- Resumes: `public/resumes/*.pdf`
