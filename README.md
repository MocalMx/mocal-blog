# mocal-blog

Editorial blog of Mocal (`blog.mocal.com.mx`). Gatsby 5 + TypeScript static site that sources articles from Contentful and uses Supabase for the newsletter form.

Agent rules and workflow conventions live in [`AGENTS.md`](./AGENTS.md).

## Local development

```bash
npm install
cp .env.example .env   # fill in the values, see docs/environment-variables.md
npm run develop        # http://localhost:8000
```

| Command | Purpose |
| --- | --- |
| `npm run develop` | Gatsby dev server |
| `npm run build` | Production build (output in `public/`) |
| `npm run serve` | Serve the production build locally |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run clean` | Clear `.cache/` and `public/` |

Environment variables are documented in [`docs/environment-variables.md`](./docs/environment-variables.md).

## Geo-restriction

The blog is restricted to Mexico. `middleware.ts` (Vercel Routing Middleware) runs before the static cache:

- Visitors from `MX`, requests without the `x-vercel-ip-country` header (local development), social preview bots (`SOCIAL_PREVIEW_BOTS`), and Gatsby static assets pass through.
- Every other visitor receives `/no-disponible/` (`src/pages/no-disponible.tsx`) with HTTP 200 and the original URL preserved.

Once the site is hosted on Vercel, verify with `curl` from a non-MX location:

```bash
curl -s -A "WhatsApp/2.23" https://blog.mocal.com.mx/ | grep -i 'og:title'
curl -s -A "facebookexternalhit/1.1" https://blog.mocal.com.mx/ | grep -i 'og:title'
curl -s https://blog.mocal.com.mx/ | grep -i 'no-disponible'
```

## Deployment

Hosting is configured for Vercel through `vercel.json` (Gatsby build, `public/` output) and `middleware.ts`. **No pipeline deploys this repo to Vercel yet:** there are no GitHub Actions workflows or scripts that create Vercel deployments, and none may be added unless explicitly requested.
