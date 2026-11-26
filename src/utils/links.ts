const UTM_SOURCE_KEY = "utm_source";
const UTM_MEDIUM_KEY = "utm_medium";
const UTM_CAMPAIGN_KEY = "utm_campaign";
const UTM_CONTENT_KEY = "utm_content";

const UTM_DEFAULT_SOURCE = "blog";
const UTM_DEFAULT_MEDIUM = "referral";
const UTM_DEFAULT_CAMPAIGN = "blog_mocal";
const UTM_DEFAULT_CONTENT = "generic_link";


function isMocalDomain(hostname: string) {
  const h = hostname.toLowerCase();
  return h === "mocal.com.mx" || h.endsWith(".mocal.com.mx");
}

/**
 * Appends UTM parameters to:
 * - Any URL pointing to mocal.com.mx (or subdomains)
 * - Any internal blog article URL (e.g. /articles/slug)
 *
 * It preserves existing query params and hash, and does not overwrite any UTM
 * param that is already present in the URL.
 */
export function withMocalOriginUtm(inputUrl: string): string {
  if (!inputUrl) return inputUrl;

  // Ignore non-http(s) schemes (mailto:, tel:, etc.)
  if (
    /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(inputUrl) &&
    !/^https?:/i.test(inputUrl)
  ) {
    return inputUrl;
  }

  // Internal article links (relative)
  const isInternalArticle =
    inputUrl.startsWith("/articles/") ||
    inputUrl === "/articles" ||
    inputUrl === "/articles/";

  const base = "https://blog.mocal.com.mx";
  const url = new URL(inputUrl, base);

  if (!isInternalArticle && !isMocalDomain(url.hostname)) {
    return inputUrl;
  }

  if (!url.searchParams.has(UTM_SOURCE_KEY)) {
    url.searchParams.set(UTM_SOURCE_KEY, UTM_DEFAULT_SOURCE);
  }
  if (!url.searchParams.has(UTM_MEDIUM_KEY)) {
    url.searchParams.set(UTM_MEDIUM_KEY, UTM_DEFAULT_MEDIUM);
  }
  if (!url.searchParams.has(UTM_CAMPAIGN_KEY)) {
    url.searchParams.set(UTM_CAMPAIGN_KEY, UTM_DEFAULT_CAMPAIGN);
  }
  if (!url.searchParams.has(UTM_CONTENT_KEY)) {
    url.searchParams.set(UTM_CONTENT_KEY, UTM_DEFAULT_CONTENT);
  }

  // Return relative URL if input was relative
  const isRelative = inputUrl.startsWith("/") && !inputUrl.startsWith("//");
  if (isRelative) {
    return `${url.pathname}${url.search}${url.hash}`;
  }

  return url.toString();
}
