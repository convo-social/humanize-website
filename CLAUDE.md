# Convo website — agent notes

Marketing site for Humanize (Convo's AI-moderated research product). Next.js 16
App Router + TypeScript, deployed to Vercel. Ported from a static HTML site; the
visual design is the source of truth and must not drift.

## Layout

- `app/layout.tsx` — root layout. Loads `next/font` (IBM Plex Sans/Mono/Serif),
  injects the Segment snippet, and sets site-wide metadata (OG, Twitter, robots,
  `metadataBase` from `NEXT_PUBLIC_SITE_URL`).
- `app/(site)/` — marketing route group. `page.tsx` is the homepage (large).
  `layout.tsx` renders the sticky `Header` + `Footer`.
- `app/(legal)/` — privacy / terms / study-privacy. Share `LegalPage` component.
- `app/(contact)/contact-us/` — split-screen contact page with `ContactForm`.
- `app/sitemap.ts` + `app/robots.ts` — App Router file conventions for
  `/sitemap.xml` + `/robots.txt`.

## Design tokens

Single source in `app/globals.css` under `:root` (palette, typography, spacing,
radii). Tailwind is wired via `@theme inline` and reads those same CSS vars, so
utility classes and raw CSS stay in sync. Do not duplicate values in
`tailwind.config.*` — there is no longer one.

Responsive overrides live inline under the same `:root` via media queries.

## Home-page interactivity

`lib/home-interactions.ts` is the ~900-line home-page JS, ported verbatim from
the static site under `@ts-nocheck`. It's mounted by
`components/home/HomeInteractions.tsx` via `useEffect`. The wrapper:

- Monkey-patches `setInterval`/`setTimeout`/`requestAnimationFrame`/
  `IntersectionObserver`/`ResizeObserver` for the component lifetime so async
  continuations (e.g. `dsLoop`'s `await wait()` chain) stay tracked.
- Wraps every callback with a `mounted` flag so post-unmount timers no-op
  instead of crashing on torn-down DOM.
- Patches `addEventListener` and the `DOMContentLoaded` shim only during sync
  init (wider scope would trap React/Next/analytics listeners).
- Returns a cleanup closure that clears tracked resources and restores globals.

Idempotency markers (`data-cloned="true"`) live on `#logosTrack` and `#ctaWall`
to prevent double-cloning on React Strict Mode re-invokes.

**When editing this file:** changes to the legacy JS need to survive SPA
navigation (home → contact → home). The `mounted` guard protects callback
bodies, but anything creating DOM on first run must be idempotent or you'll
accumulate clones over navigation cycles.

## Form / analytics

- `components/forms/ContactForm.tsx` is a client component. On submit it calls
  `analytics.identify` + `analytics.track('Lead Submitted', …)` then opens
  `NEXT_PUBLIC_CALENDLY_URL` in a new tab.
- `lib/analytics.ts` types `window.analytics` (Segment's `analytics.js`).
- `components/analytics/SegmentSnippet.tsx` loads Segment via `next/script`
  using `NEXT_PUBLIC_SEGMENT_WRITE_KEY` (baked-in fallback in code).

## Conventions

- Legal page content renders through `<LegalPage>` with `<LegalUpdated>` and
  `<LegalSummaryBox>` building blocks. Use them instead of hand-rolling the
  chrome.
- All primary CTAs route to `/contact-us` with copy "Book a demo". Don't
  introduce a second CTA pattern.
- `next/image` is used for large content photos (hero thumbnails, persona JPGs).
  Small marquee logos and contact trust-strip logos stay as raw `<img>` —
  optimization overhead doesn't pay off for icon-sized PNGs. Both files are
  exempted from `@next/next/no-img-element` in `eslint.config.mjs`.
- `.html` URLs are permanently redirected to pretty URLs via `next.config.ts`.
  When adding a route, add an entry to `app/sitemap.ts`.

## Env

`.env.example` enumerates everything needed. `NEXT_PUBLIC_SITE_URL` must be
set in production so OG tags / canonical URLs / sitemap entries resolve to the
real origin (the fallback in code is a best-guess default).

## Commands

- `npm run dev` — Turbopack dev on :3000
- `npm run build` — production build
- `npm run lint` — ESLint (passes clean; don't re-introduce pre-existing
  noise by reverting the per-file overrides)

## What not to do

- Don't reintroduce Tailwind config duplication — tokens live in one place
  (`globals.css`).
- Don't "tidy" spacing, colors, or typography during routine changes — the
  design is preserved 1:1 from the static site.
- Don't strip the lifecycle shim in `runHomeInteractions`. It looks heavy but
  exists for specific root causes (see the comments in the file).
- Don't add `@ts-nocheck` to new files — it's only allowed on
  `lib/home-interactions.ts` because the body is pasted legacy JS.
