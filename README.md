# Port of Centralia homepage concept

A concept demo by Stoke Leads for the Port of Centralia RFP (due Nov 13, 2026). It is the homepage, a meetings page, and a readiness plan for the proposal (`/readiness-plan`, not linked from the menu),
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

All images live in `public/images/`, each with WebP copies for `srcset`.

- **The Port's own:** the favicon, both logo versions, and the Centralia aerial in the hero, from portofcentralia.com. The hero is
  preloaded. The Port's site only has the aerial at 1200px, so a larger original would sharpen it on big screens.
- **Representative stand-ins:** the park cards, rail panel, and community card use public domain or CC0 photos from
  Wikimedia Commons. Each one shows a small "Representative photo" tag, and the footer credits them. Swap in the
  Port's own photos before launch.

| Key         | File                    | Source (license)                                                                                   |
| ----------- | ----------------------- | -------------------------------------------------------------------------------------------------- |
| `hero`      | `hero-centralia-aerial` | portofcentralia.com                                                                                |
| `logo`      | `logo-blue.png`, `logo-white.png` | portofcentralia.com                                                                      |
| `park1`     | `park-1-aerial`         | Distribution center aerial by Wikideas1 (CC0)                                                      |
| `park2`     | `park-2-warehouse`      | Warehouse by DimiTalen (CC0)                                                                       |
| `park3`     | `park-3-warehouse`      | Business park street by DimiTalen (CC0)                                                            |
| `rail`      | `rail-service`          | BNSF freight train by G Pei (public domain)                                                        |
| `community` | `centralia-rainier`     | Mount Rainier from Inspiration Point, National Park Service (public domain)                        |

Full source links and alt text are in `src/data/images.ts`.

To serve images from Cloudflare R2, upload the same file names and set `PUBLIC_IMAGE_BASE` to the bucket's public URL.
`PUBLIC_IMAGES_READY` lists which keys to load (default: all). A key that's left out falls back to a drawn placeholder.
See `.env.example`.

No text sits on a photo. The hero and community card put their text on solid navy, and the photos are cropped
beside or above it (diagonal and curved edges via `clip-path`), so any photo works without overlays. Gradients, film
grain, and angled light planes are only used on solid-colour areas, never on images.

## Content

| What | Where | Source |
| ---- | ----- | ------ |
| Meetings (2026 agendas, minutes, videos, upcoming dates) | `src/content/meetings.json` | portofcentralia.com agendas page and calendar, checked Oct 31, 2026 |
| News | `src/content/news.json` | portofcentralia.com press releases |
| Parks | `src/content/parks.json` | portofcentralia.com homepage |
| Contact, hours, infrastructure, incentives, USDA statement | `src/data/site.ts` | portofcentralia.com homepage and footer |

Meetings and news are Astro content collections loaded from JSON. A future email-to-publish workflow only has to add
an entry to these files.

The documents (agendas, minutes, Master Plan, bond overview, roster forms) still link to the PDFs on
portofcentralia.com. The tagline "Building a stronger, more prosperous Centralia" is our copy, not the Port's.

Links to pages outside the demo (About, Industrial Parks, News, and so on) go to a 404 page that explains the demo's scope.

## Accessibility and performance (Oct 31, 2026)

- axe-core 4.14 (WCAG 2.0/2.1 A and AA plus best practices): 0 violations on `/` and `/meetings`
- Lighthouse 12, mobile: Performance 100, Accessibility 100, Best Practices 100 on both pages. LCP 1.6 s on the
  homepage (target 1.5 s) and 1.1 to 1.2 s on the meetings page, CLS under 0.01. Total homepage weight is about 190 KB.
- SEO scores 69 only because the demo is `noindex`. Removing that brings it to 100.
- Reflows at 320px with no horizontal scrolling. Menus open and close with the keyboard and Escape.
- About 1.5 KB of JavaScript (menu toggles), inlined.

Still to do before the proposal: a manual NVDA and VoiceOver pass, 200% zoom check, and screenshots.
