# RAYLASE B2B demo site

Next.js front end for a Hygraph-backed product catalog (no cart) and marketing/event pages. Content is read from the Hygraph Content API.

## Local development

```bash
npm install
npm run dev
```

Optional: copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_HYGRAPH_ENDPOINT` if you use a different Hygraph project.

## Deploy on Vercel

1. Push this repository to GitHub.
2. In [Vercel](https://vercel.com), import the repository as a new project.
3. Framework preset: Next.js. No extra build settings are required.
4. Environment variables (optional): `NEXT_PUBLIC_HYGRAPH_ENDPOINT` and `HYGRAPH_TOKEN` if your Hygraph project requires an authenticated Content API.

The app defaults to the public Content API endpoint bundled for the Raylase Hygraph project used during development.

## Hygraph schema

- **ProductCategory** — catalog grouping.
- **Product** — detail page fields, `specs` (SpecLine component), `relatedProducts` (carousel), SEO component.
- **MarketingPage** — events, webinars, trade shows, news (`MarketingPageType` enum).

## Branding

Visual style references [raylase.de](https://www.raylase.de/de/produkte.html) (dark UI, cyan accent). Logo asset is served from `public/raylase-logo.svg` (sourced from the public Raylase website).

This repository is a demonstration and is not affiliated with RAYLASE GmbH.
