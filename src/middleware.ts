import { NextResponse, type NextRequest } from "next/server";

const APEX = "yogeshwarisurgical.com";
const CANONICAL = "www.yogeshwarisurgical.com";

/**
 * Host-level discovery files. Google checks robots.txt (and the sitemap it
 * points to) on the EXACT host registered in Search Console — a property for
 * the apex must get a 200 here, not a redirect hop, otherwise the Search
 * Console crawling report shows "No robots.txt file". Everything else on the
 * apex consolidates to www below.
 */
const DISCOVERY_PATHS = new Set(["/robots.txt", "/sitemap.xml"]);

/**
 * Canonical-host consolidation. Any request arriving on the bare apex
 * (http or https — Vercel upgrades http at the edge before this runs)
 * permanently redirects to https://www, preserving path and query.
 *
 * Implemented here instead of `redirects()` in next.config.ts so the
 * DISCOVERY_PATHS exemption above is possible — config redirects cannot
 * express "everything except these paths". Emits 308 Permanent Redirect,
 * which Google treats exactly like a 301 for canonicalization.
 *
 * No loop risk: the rule only fires when Host is exactly the apex, so
 * www (and *.vercel.app previews, localhost) pass straight through.
 */
export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();

  if (host === APEX && !DISCOVERY_PATHS.has(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = CANONICAL;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}
