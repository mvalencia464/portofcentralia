# Port of Centralia homepage concept

A concept demo by Stoke Leads for the Port of Centralia RFP (due Nov 13, 2026). It has a homepage, a meetings page (with remote attendance details), an accessibility statement, a site map, and a
readiness plan for the proposal (`/readiness-plan`, not linked from the menu). Links to pages outside the demo go to
the matching page on portofcentralia.com. It is
built with Astro as a static site for Cloudflare Pages. A banner on every page says this is not the Port's official site,
and every page is `noindex`.

## Run it

Astro 7 needs Node 22.23.4 or newer. `.nvmrc` pins Node 24.

```bash
nvm install 24 && nvm use
npm install
npm run dev
```

`npm run build` writes the static site to `dist/`.

## Deploy to Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: `NODE_VERSION=24`, plus the image variables below
- `public/_headers` sends `X-Robots-Tag: noindex` and caches `/_astro/*` for a year. `public/robots.txt` blocks crawlers.
- "Next meeting" is worked out at build time. Add a Pages deploy hook and call it once a day (for example from a
  Cloudflare Cron Trigger) so it stays current.

## Images

All images live in `public/images/` and ship with the site, so the Port owns them along with everything else (the RFP
requires the Port to keep ownership and control of its content). Each photo has AVIF and WebP copies; the hero uses
WebP only because AVIF wasn't smaller for that image.

| Key         | File                     | Source (license)                                                          |
| ----------- | ------------------------ | ------------------------------------------------------------------------- |
| `hero`      | `hero-centralia-aerial`  | Aerial of Centralia, portofcentralia.com                                  |
| `logo`      | `logo-blue.png`, `logo-white.png` | portofcentralia.com                                              |
| `rail`      | `rail-centralia-depot`   | Freight train at Centralia Union Depot, Joe Mabel (CC BY-SA 3.0)          |
| `community` | `rainier-from-centralia` | Mount Rainier from Centralia, Chris Light (CC BY-SA 4.0)                  |
| `park1`     | `park-1-aerial`          | Stand-in: distribution center, Wikideas1 (CC0)                            |
| `park2`     | `park-2-warehouse`       | Stand-in: warehouse, DimiTalen (CC0)                                      |
| `park3`     | `park-3-warehouse`       | Stand-in: business park street, DimiTalen (CC0)                           |

The park photos are stand-ins: no free-license photos of the Port's parks exist. They carry a "Representative photo"
tag until the Port supplies its own. All photos are credited in the footer, which also meets the CC BY-SA terms.

No text sits on a photo. The hero and community card put their text on solid navy, and the photos are cropped
beside or above it (diagonal and curved edges via `clip-path`), so any photo works without overlays.

## Content

| What | Where | Source |
| ---- | ----- | ------ |
| Meetings (2026 agendas, minutes, videos, hearing notices, upcoming dates) | `src/content/meetings.json` | portofcentralia.com agendas page, notices page and calendar, checked Oct 31, 2026 |
| News | `src/content/news.json` | portofcentralia.com press releases |
| Parks | `src/content/parks.json` | portofcentralia.com homepage |
| Contact, hours, infrastructure, incentives, USDA statement | `src/data/site.ts` | portofcentralia.com homepage and footer |

Meetings and news are Astro content collections loaded from JSON. A future email-to-publish workflow only has to add
an entry to these files.

The documents (agendas, minutes, Master Plan, bond overview, roster forms) still link to the PDFs on
portofcentralia.com. The tagline "Building a stronger, more prosperous Centralia" is our copy, not the Port's.

Links to pages outside the demo (About, Industrial Parks, News, and so on) go to a 404 page that explains the demo's scope.

## Audit evidence

The readiness plan's numbers about the current site come from Lighthouse 12 (mobile) runs on Oct 31, 2026. The HTML
reports and a PDF structure check are published at `/audit/2026-10-31/`; the raw JSON is in `audit/2026-10-31/`.
Accessibility counts reproduce exactly between runs; load times vary by about a tenth of a second.

## Accessibility and performance (Oct 31, 2026)

- axe-core 4.14 (WCAG 2.0/2.1 A and AA plus best practices): 0 violations on `/` and `/meetings`
- Lighthouse 12, mobile: Performance 100, Accessibility 100, Best Practices 100 on both pages. LCP 1.6 s on the
  homepage (target 1.5 s) and 1.1 to 1.2 s on the meetings page, CLS under 0.01. Total homepage weight is about 190 KB.
- SEO scores 69 only because the demo is `noindex`. Removing that brings it to 100.
- Reflows at 320px with no horizontal scrolling. Menus open and close with the keyboard and Escape.
- About 1.5 KB of JavaScript (menu toggles), inlined.

Still to do before the proposal: a manual NVDA and VoiceOver pass, 200% zoom check, and screenshots.
