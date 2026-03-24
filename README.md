# RAYLASE B2B demo site

Next.js front end for a Hygraph-backed product catalog (no cart) and marketing/event pages. Content is read from the Hygraph Content API.

## Local development

```bash
npm install
npm run dev
```

Optional: copy `.env.example` to `.env.local` and set variables below.

### Environment variables

| Variable | Purpose |
| -------- | ------- |
| `PRODUCTION_TOKEN` | Hygraph **Permanent Auth Token** with default stage **PUBLISHED** (used for normal site traffic). |
| `PREVIEW_TOKEN` | Hygraph token with default stage **DRAFT** (used when [Next.js Draft Mode](https://nextjs.org/docs/app/building-your-application/configuring/draft-mode) is on, e.g. Hygraph Live Preview). |
| `PREVIEW_SECRET` | Shared secret for `/api/draft?secret=…` — must match the `secret` value in your Hygraph Preview widget URL template. |
| `NEXT_PUBLIC_HYGRAPH_ENDPOINT` | Optional override for the Content API URL. |
| `HYGRAPH_TOKEN` | Optional legacy alias for `PRODUCTION_TOKEN`. |

If `PRODUCTION_TOKEN` is unset, the app falls back to `HYGRAPH_TOKEN` or unauthenticated requests (when your Hygraph project allows public reads).

## Hygraph Live Preview

This project follows [Hygraph’s Live Preview guide](https://hygraph.com/docs/developer-guides/schema/live-preview): GraphQL queries pass `stage: DRAFT` while Draft Mode is enabled, use `PREVIEW_TOKEN`, and **do not cache** those responses.

1. In Hygraph: **Project settings → Access → Permanent Auth Tokens** — create one token with default stage **DRAFT** (`PREVIEW_TOKEN`) and one with **PUBLISHED** (`PRODUCTION_TOKEN`). Grant read permissions for the models you preview.
2. Generate a random string for `PREVIEW_SECRET` and set it locally and in Vercel.
3. In the **Schema** editor, open **Product** and **MarketingPage** → **Sidebar** → add the **Preview** widget. Set the URL template to hit this app’s draft route, for example:
   - Products: `https://YOUR_DOMAIN/api/draft?secret=YOUR_PREVIEW_SECRET&redirect=/en/products/{slug}`
   - Events / marketing: `https://YOUR_DOMAIN/api/draft?secret=YOUR_PREVIEW_SECRET&redirect=/en/events/{slug}`
4. Use **Open live preview** in the content form after saving a draft entry.

To exit preview in the browser, open `/api/disable-draft` (optional `?redirect=/en`).

**Embedding:** `next.config.ts` sets `Content-Security-Policy: frame-ancestors` so Hygraph Studio can iframe your site. If the preview panel stays blank, check Hygraph’s [troubleshooting](https://hygraph.com/docs/developer-guides/schema/live-preview#csp-or-security-header-issues) (e.g. Vercel Deployment Protection / `X-Frame-Options`).

## Deploy on Vercel

1. Push this repository to GitHub.
2. In [Vercel](https://vercel.com), import the repository as a new project.
3. Framework preset: Next.js. No extra build settings are required.
4. Add environment variables: `PRODUCTION_TOKEN`, `PREVIEW_TOKEN`, `PREVIEW_SECRET`, and optionally `NEXT_PUBLIC_HYGRAPH_ENDPOINT`.

The app defaults to the public Content API endpoint bundled for the Raylase Hygraph project used during development.

## Hygraph schema

- **ProductCategory** — catalog grouping.
- **Product** — detail page fields, `heroImage` (relation to system **Asset**), `specs` (SpecLine component), `relatedProducts` (carousel), SEO component.
- **MarketingPage** — events, webinars, trade shows, news (`MarketingPageType` enum), `heroImage` (Asset).

Hero images are stored as Hygraph assets (CDN URLs on `graphassets.com`). Original files used for import are also kept in `public/cms-assets/` for reference.

## Images

`next/image` allows the Hygraph asset host and `www.raylase.de` (logo / legacy paths). Product and event pages read `heroImage.url` from the Content API.

## Branding

Visual style references [raylase.de](https://www.raylase.de/de/produkte.html) (dark UI, cyan accent). Logo asset is served from `public/raylase-logo.svg` (sourced from the public Raylase website).

This repository is a demonstration and is not affiliated with RAYLASE GmbH.
