import { next, rewrite } from "@vercel/functions/middleware"

// Vercel Routing Middleware: Mexico-only geo-restriction for the blog.
// Port of the former Netlify edge function (netlify/edge-functions/geo-restriction.ts).

const ALLOWED_COUNTRY = "MX"
const NOT_AVAILABLE_PATH = "/no-disponible/"

// Known social / metadata preview bots that should bypass geo restriction.
const SOCIAL_PREVIEW_BOTS = [
  "facebookexternalhit", // Facebook
  "facebot",
  "twitterbot",
  "slackbot-linkexpanding",
  "slack-imgproxy",
  "linkedinbot",
  "whatsapp",
  "discordbot",
  "telegrambot",
  "pinterestbot",
  "google-structured-data-testing-tool",
  "opengraphxyz", // OpenGraph.xyz validator/fetcher (often without dot)
  "opengraph.xyz",
  "opengraph", // broader fallback for OpenGraph tools
  "metainspector", // OpenGraph.xyz stack includes this in some requests
]

// Gatsby static output that must stay reachable from any country so the
// not-available page renders correctly (page-data, CSS, JS, images, fonts).
const STATIC_ASSET_PATTERN =
  /\.(?:js|css|json|xml|txt|png|jpe?g|webp|svg|woff2|ico)$/i

export const config = {
  matcher: [
    "/((?!no-disponible|404|assets/|static/|page-data/|favicon|robots\\.txt|sitemap).*)",
  ],
}

export default function middleware(request: Request): Response {
  const url = new URL(request.url)
  const userAgent = request.headers.get("user-agent")?.toLowerCase() ?? ""

  // Never intercept the not-available page itself or 404, to avoid rewrite loops.
  if (url.pathname.startsWith("/no-disponible") || url.pathname.startsWith("/404")) {
    return next()
  }

  // Never restrict Gatsby static assets.
  if (STATIC_ASSET_PATTERN.test(url.pathname)) {
    return next()
  }

  // Allow social media preview bots to always crawl metadata.
  if (SOCIAL_PREVIEW_BOTS.some((bot) => userAgent.includes(bot))) {
    return next()
  }

  // If we don't have geo information (for example local development), do not restrict access.
  const country = request.headers.get("x-vercel-ip-country")?.toUpperCase() ?? ""
  if (!country || country === ALLOWED_COUNTRY) {
    return next()
  }

  // Same-site rewrite: serve the "not available" page with status 200,
  // keeping the original URL in the browser.
  return rewrite(new URL(NOT_AVAILABLE_PATH, request.url))
}
