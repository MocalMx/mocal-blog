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
| `GATSBY_GOOGLE_TAG_MANAGER_ID` | No | Optional | Google Tag Manager (`gatsby-config.ts`) |
| `GATSBY_SUPABASE_URL` | No | Yes | Supabase client (`src/lib/supabase.ts`) |
| `GATSBY_SUPABASE_PUBLISHABLE_KEY` | Public (publishable key) | Yes | Supabase client (`src/lib/supabase.ts`) |

`GATSBY_SUPABASE_ANON_KEY` is accepted as a legacy fallback for `GATSBY_SUPABASE_PUBLISHABLE_KEY`. Prefer the publishable key name.

## Geo-restriction

`middleware.ts` reads the visitor country from the `x-vercel-ip-country` header that Vercel sets on every request. It needs no environment variable.
