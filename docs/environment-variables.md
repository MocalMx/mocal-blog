# Environment variables — mocal-blog

Source of truth: **Infisical Cloud**, project `Mocal App`, folder `/mocal-blog`, environments `dev`, `staging`, and `prod`. Infisical syncs this folder to the Vercel project `mocal-blog`. See [MAN-5](https://linear.app/manifold-group-ws/issue/MAN-5) / [MAN-6](https://linear.app/manifold-group-ws/issue/MAN-6).

| Infisical environment | Vercel environment |
| --- | --- |
| `dev` / `staging` | Preview (`develop.blog.mocal.com.mx`) |
| `prod` | Production (`blog.mocal.com.mx`) |

Variables reach Vercel only through the Infisical integration; no CI pipeline sets them. See [Deployment](../README.md#deployment).

All variables are read at **build time** by Gatsby. Every `GATSBY_*` value is inlined into the client bundle, so it is public by definition. Do not store server secrets under a `GATSBY_` name.

## Keys owned by this project

| Key | Secret? | Required | Used for |
| --- | --- | --- | --- |
| `GATSBY_CONTENTFUL_SPACE_ID` | No | Yes | Contentful space (`gatsby-config.ts`) |
| `GATSBY_CONTENTFUL_ACCESS_TOKEN` | Public (delivery token) | Yes | Contentful Delivery API (`gatsby-config.ts`) |
| `GATSBY_GOOGLE_TAG_MANAGER_ID` | No | Optional | Google Tag Manager (`gatsby-config.ts`). Format `GTM-[A-Z0-9]+`; empty or invalid disables GTM |
| `GATSBY_SUPABASE_URL` | No | Yes | Supabase client (`src/lib/supabase.ts`) |
| `GATSBY_SUPABASE_PUBLISHABLE_KEY` | Public (publishable key) | Yes | Supabase client (`src/lib/supabase.ts`) |

`GATSBY_SUPABASE_ANON_KEY` is accepted as a legacy fallback for `GATSBY_SUPABASE_PUBLISHABLE_KEY`. Prefer the publishable key name.

### Google Tag Manager

The blog uses its **own dedicated container** for Contentful blog tracking, not the shared `Mocal - Web (Develop)` / `Mocal - Web (Prod)` containers used by the app, onboarding, auth and landing page (see `mocal-app-fe/docs/gtm/README.md`). The key is named `GATSBY_GOOGLE_TAG_MANAGER_ID` here, unlike `GATSBY_GOOGLE_TAGMANAGER_ID` in `mocal-landing-page`; keep each repo's name so existing Infisical entries keep working.

The blog has no cookie banner, so it does not set Google Consent Mode defaults. Adding `denied` defaults without a banner that sends `consent_update` would silence every consent-aware tag in the blog container.

## Geo-restriction

`middleware.ts` reads the visitor country from the `x-vercel-ip-country` header that Vercel sets on every request. It needs no environment variable.
