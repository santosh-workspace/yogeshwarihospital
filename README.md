# Yogeshwari Hospital

Marketing site for **Yogeshwari Hospital — Eye and Pediatric Surgery Centre**,
Chhatrapati Sambhajinagar.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion ·
GSAP + ScrollTrigger · Lenis. Every route is statically prerendered.

---

## ⚠️ Read this before deploying

The Google Business Profile could not be read programmatically, so a handful of
real-world values are **deliberate placeholders**. They are all in one file and
all marked `TODO`:

```bash
src/config/site.ts
```

None of them are plausible-looking fakes — a wrong phone number on a hospital
site is worse than an obviously blank one. Fill these in:

| Value | Why it matters |
| --- | --- |
| `contact.phoneDisplay` / `phoneE164` / `whatsapp` | Every Call and WhatsApp CTA on the site |
| `address.postalCode` | The PIN code — deliberately left blank rather than guessed, and omitted from schema while empty |
| `maps.reviewUrl` | Currently opens the listing. A one-tap "write a review" box needs the ChIJ-form Place ID from the Business Profile dashboard, which the share URL does not expose |
| `social.*` | Header, footer, mobile menu, contact page, and `sameAs` in schema. Empty strings are hidden automatically |
| `calendly.pediatricSurgery` / `calendly.eyeCare` | Booking. Until set, the appointment page falls back to WhatsApp + phone rather than dead-ending |
| `url` | Canonicals, sitemap, Open Graph |
| `verification.google` | Search Console |
| `doctors[].experience` | Currently inferred from the registration years (2002 / 2004), so conservative. Confirm the exact figures. |

### Already confirmed by the client

These are real and no longer placeholders:

- **Dr. Ramdas D. Nagargoje** — Paediatric Surgeon. M.B.B.S., M.S. (General Surgery),
  M.Ch. (Paediatric Surgery). Trained at K.E.M. Hospital and B.J. Wadia Hospital for
  Children, Mumbai. Reg. No. 2002/03/1074.
- **Dr. Manisha Nagargoje (Sanap)** — Ophthalmologist. M.B.B.S., D.O.M.S. (Mumbai).
  Reg. No. 2004/03/1498.
- **Both doctor portraits** are the client's own photographs, cropped to 4:5.
  (The untouched originals were removed from the repo during cleanup — recover
  them from git history if a re-crop is ever needed.)
- **The address**: Gut No. 91, Plot No. 4, Behind Bembde Hospital and Hotel MH 20,
  Sangram Nagar, Beed Bypass, Chhatrapati Sambhajinagar. Rendered from one place
  (`addressLines` in `src/config/site.ts`) so the footer, contact card, booking form,
  location panel and schema can never drift.
- **The hero and exterior photographs** are the real hospital building.
- **The Google Business Profile listing.** Coordinates (19.8488105, 75.3367874) are the
  listing's own pin, taken from the `!3d`/`!4d` pair in its Maps URL — *not* the
  `@lat,lng`, which is only the map viewport and sits ~50m off. The listing's permanent
  `cid` (2881131575759008176) drives the place link, the "Open in Maps" card and the
  `sameAs` entry, so every link resolves to that exact listing rather than to a
  name-and-address search. The embed is keyless — pinned to the coordinates, so there is
  no Maps API bill.
- **The listing name** — "Yogeshwari Hospital - Ramdas Nagargoje (Eye And Pediatric
  Surgery)" — is longer than the site's display name, so it is emitted as an
  `alternateName` in the Hospital schema. That is what lets Google tie the two together.
- The paediatric department is **Paediatric Surgery**, not general paediatrics — its
  twelve services are the client's own list (paediatric urology, laparoscopic abdominal
  surgery, urodynamics, constipation clinic, brain and spine, tracheal, endoscopy and
  thoracoscopy, accident department, scientific ear piercing, and so on).

Also review:

- **`src/config/content.ts` → `testimonials`** — placeholder text, clearly labelled.
  Replace with genuine Google reviews or delete the section. Publishing invented
  reviews of a real medical practice is deceptive and is a documented cause of a
  Google manual action. For the same reason **no `aggregateRating` is emitted
  anywhere in the structured data** — once real reviews exist, add it in
  `src/lib/schema.ts` with the true count and average.
- **`src/config/content.ts` → `stats`** — the counters. Confirm the figures.
- **`public/images/`** — the *scene* photos (reception, ward, corridor, theatre, eye
  exam…) are still royalty-free placeholders. See
  [`public/images/README.md`](public/images/README.md) for the swap table. Both **doctor
  portraits are now the client's own photographs**.

---

## Getting started

```bash
npm install
npm run dev
```

| Script | Does |
| --- | --- |
| `npm run dev` | Dev server on :3000 |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run check` | typecheck + lint + build — run before deploying |

## Deploying to Vercel

Import the repo; the defaults are correct (framework auto-detected, build
`next build`, no env vars required). Then:

1. Set `siteConfig.url` to the production domain — canonicals, `sitemap.xml`,
   `robots.txt` and Open Graph URLs are all derived from it.
2. Add the domain in Google Search Console and submit `/sitemap.xml`.
3. Put the verification token in `siteConfig.verification.google`.

Security headers and long-lived image caching are configured in
[`next.config.ts`](next.config.ts).

---

## Structure

```
src/
├── app/                        one folder per route, all statically prerendered
│   ├── layout.tsx              fonts, metadata, providers, site-wide JSON-LD
│   ├── page.tsx                home
│   ├── about|doctors|services|appointment|contact/
│   ├── departments/
│   │   ├── page.tsx            index
│   │   └── [slug]/page.tsx     pediatric-surgery + eye-care (generateStaticParams)
│   ├── icon.png                favicon — the logo emblem
│   ├── apple-icon.png          180px touch icon
│   ├── opengraph-image.tsx     generated 1200×630 share card
│   ├── sitemap.ts robots.ts manifest.ts not-found.tsx
│   └── globals.css             design tokens (Tailwind v4 @theme)
├── components/
│   ├── brand/                  Logo / LogoLockup / Emblem
│   ├── layout/                 header, footer, page hero, social, mobile action bar
│   ├── providers/              Lenis, cursor, scroll progress, loader, page transition
│   ├── sections/               composable page sections
│   └── ui/                     button, reveal, accordion, tilt, counter, parallax…
├── config/
│   ├── site.ts                 ← all real-world data (the TODO file)
│   ├── content.ts              departments, services, FAQs, testimonials
│   ├── themes.ts               the two brand themes
│   └── images.ts               image manifest (static imports)
└── lib/
    ├── schema.ts               JSON-LD builders
    ├── motion.ts               shared motion language
    └── utils.ts
```

Nothing real-world is hard-coded in a component. Change a phone number in
`site.ts` and it updates the header, footer, hero, contact cards, mobile action
bar, and the `ContactPoint` schema at once.

---

## Brand assets

The client's logo — a sleeping baby inside an iris, cradled by two hands, with
"Eye & Paediatric Surgery Centre" arced around it — arrived as a fully opaque PNG
on a solid white background at 528×433. Two transparent derivatives are checked
in under `public/brand/`:

| File | What it is | Used by |
| --- | --- | --- |
| `logo-full.png` | The complete lockup, including the arc wordmark | Intro loader, and anywhere with ≥140px of room |
| `logo-emblem.png` | Ring + baby + hands, arc wordmark removed | Header, footer, 404, favicon |

(The untouched supplied file, `logo-original-source.png`, was removed during
cleanup — recover it from git history if the logo is ever re-supplied.)

How they were derived, in case the logo is ever re-supplied:

1. **Background → alpha** by flood-filling white *from the border inwards*. A blanket
   "delete all near-white" would have eaten the baby's cream skin and the iris
   highlights, which are nearly as light as the background.
2. **Feathered edge.** The artwork was anti-aliased against white, so the 1–2px rim is a
   white/ink blend. Alpha ramps across that band, which is why the mark sits cleanly on
   both light and dark grounds instead of showing a white fringe.
3. **Wordmark separated by connected-component labelling.** The ring, baby and hands touch
   and form one ~59k-pixel blob; each letter of the arc is its own ~350-pixel island.
   Keeping only the largest component drops the wordmark exactly, with no guesswork about
   where the text sits.

The arc wordmark is solid black, so it is **light-surface only**. On dark grounds the
header and footer use the emblem plus a typeset wordmark, which also keeps the words
crisp at small sizes and lets them recolour with the theme.

A soft grey drop-shadow is baked into the original artwork. Stripping it programmatically
broke the ring and the hands' outlines, so it was left in place — it reads as an
intentional shadow on light grounds and as a soft glow on dark. Removing it properly
needs the original vector.

> The source is only 528px wide, which is enough for every on-screen use here but not for
> print. A vector original would be worth asking for.

## Design system

Tokens live in `src/app/globals.css` under `@theme` — a Tailwind v4 CSS-first
theme, so no `tailwind.config.js`. Every colour is sampled from the logo.

- **Brand** — the logo's cornflower iris blue, deepened into a text-safe ramp
- **Rose** — the logo's pillow pink
- **Ink** — warm charcoal-navy, never pure black
- **Sand** — the warm cream of the baby and hands; the page ground
- **Type** — Plus Jakarta Sans for UI, Instrument Serif for italic display
  accents. Both self-hosted by `next/font`, fluid scale clamped at both ends.

Department accents follow the logo's own colour story, which is why they are
mapped this way round:

| Department | Accent | Why |
| --- | --- | --- |
| Paediatric Surgery | `rose` | The pillow and the baby |
| Eye Care | `brand` | The iris |

### Buttons

One size scale in `components/ui/Button.tsx`, so every button on the site is
trimmed by editing three lines:

| Size | Height | Used for |
| --- | --- | --- |
| `sm` — `h-9` | 36px | Desktop-only inline CTAs (header), secondary helper links. Never a lone mobile tap target. |
| `md` — `h-11` | 44px | Default. |
| `lg` — `h-12` | 48px | Hero/final-CTA/department "book appointment" buttons — still clears the 44px touch-target minimum. |

`lg` was originally `h-14` (56px) — it read oversized against the nav and body
copy around it once there was real content on the page to compare it to.

The accent propagates through cards, icons, buttons and the Calendly widget colour.

## Service cards

Every service renders through `components/sections/ServiceCard.tsx` — the homepage
preview, the two department pages and `/services` all use the same component, so a
service looks identical wherever it appears. (The homepage preview had its own bespoke
markup once and silently drifted out of step the moment the cards gained imagery; that
is why it is shared now.) Its structure: a banner, an
icon medallion straddling it, an accent-coloured title, a hairline rule that fills on
hover, then the description. Entrance is a staggered fade in from the right.

**All 26 services now carry a photo.** Roughly half depict the service directly (newborn
surgery, laparoscopy, brain MRI, eye examination, vision testing, a child in trial frames
for paediatric vision screening); the rest are *department*-relevant rather than
service-specific — paediatric clinic and theatre scenes on the surgery cards, eye-clinic
scenes on the ophthalmology ones. That was a deliberate call: there is no honest stock
photograph of a urodynamics study or a thoracoscopy, so those cards show the department
at work rather than a fabricated procedure shot.

The card still supports being photo-less — omit `image:` and it falls back to an
accent-tinted banner with the service icon watermarked in, at the same height, so the
grid never goes ragged.

To swap a photo, replace the file in `public/images/` keeping the name, or point
`image:` at a different entry in `src/config/images.ts`. Nothing else changes.

> These are stock. Real photographs of the hospital's own theatre, clinic rooms and
> equipment would be a straight upgrade on every one of them — same one-line swap.

## Booking

"Book Appointment" opens a **dialog** rather than navigating — but the button is still a
real link to `/appointment`, so it stays crawlable, middle-clickable and works with
JavaScript off. The click handler intercepts and opens the dialog for everyone else.

The dialog and the `/appointment` page render the *same* `BookingForm` component, so the
two can't drift apart. The form asks for department, patient name, contact number, age,
preferred date, preferred session and the reason for the visit.

**How a submission is delivered.** There is no backend — this is a static site. Submitting
composes the answers into a structured WhatsApp message and hands off to WhatsApp, which
is where this practice already takes bookings. Nothing is stored on the site, which also
keeps health enquiries out of any third-party form service. If you later want submissions
in an inbox or a CRM, that needs a server route (or a form provider) adding — say the word.

If a Calendly URL is set for a department in `siteConfig.calendly`, the date/session
questions are replaced by a "choose a time slot" button for that department.

### Validation

Every field is validated — department, name, phone, age and the reason field's length; the
date is optional but bounds-checked when given. The rules live in
`src/lib/bookingValidation.ts` as plain functions of their input, kept out of the component
on purpose so they can be exercised on their own rather than only by clicking through the
UI (32 cases covering names, Indian mobile numbers, the "4" / "6 months" / "10 days" age
formats, the six-month booking window, and Sunday's emergency-only notice all pass).

In the form itself: errors are derived from the current values on every render, so nothing
goes stale; they surface once a field is blurred, or on submit for anything left untouched,
and a failed submit moves focus to the first problem field. Every input carries
`aria-invalid` and `aria-describedby` pointing at its message, and the messages are
`role="alert"`, so a screen reader hears the problem rather than the form silently doing
nothing.

Phone validation is India-specific (10 digits, starting 6–9, optional `+91`/`0` prefix) —
adjust `validatePhone` in `bookingValidation.ts` first if the hospital ever takes
international bookings.

## The two themes — a real light theme and a real dark theme

Both are built from the logo and both are declared in
[`src/config/themes.ts`](src/config/themes.ts):

| | Theme A — Ivory & Iris (white) | Theme B — Midnight (dark) |
| --- | --- | --- |
| Mood | Light, warm, family-facing | Dark, crisp, clinical-premium |
| Canvas | Warm ivory `#fcfaf6` | Near-black `#060c14` |
| Cards | White `#ffffff` | Elevated dark navy `#0f1a26` |
| Text | Near-black `#0e1723` | Near-white `#eef3f8` |
| Primary accent | Iris blue `#2a6ab2` | Brightened blue `#9dc2ea` |
| Rose accent | Pillow rose `#ee93b2` | Brightened rose `#ef94b4` |
| Corners | Generous — `2rem` | Architectural — `1.25rem` |
| Shadows | Warm and diffuse | Tight, near-black |

Midnight is an actual dark theme — every card, form, doctor profile and the
appointment dialog get a dark surface with light text, not just a cooler light
palette. (An earlier iteration of Theme B was a light "cool porcelain" variant;
it kept the `porcelain` id/attr internally when it became a real dark theme, so
the URL parameter and the stored preference didn't need to change.)

### How switching works — two colour systems, deliberately

`ink-*`, `sand-*` and bare `white` are **raw, theme-invariant** tokens. They stay
pixel-identical in both themes because they also drive fixed decor that must
never flip: the footer, the final-CTA band and "Why choose us" are deliberately
dark regardless of theme, via literal `bg-ink-950 text-white`. Inverting that
scale per theme would break those sections in the dark theme.

`fg` / `fg-muted` / `fg-subtle` / `surface` / `surface-2` / `surface-3` / `edge`
/ `edge-strong` are a **semantic layer** on top, defaulting to the exact ink/sand
values above (so the light theme renders byte-identical to before this existed)
and only these get redefined for the dark theme. Every component rendering
ordinary content — cards, body text, borders, form fields — was migrated onto
these; anything still using `bg-white` / `text-ink-950` directly is one of the
fixed-dark sections above, or a decorative white accent on a photo (e.g. the
`.glass` frosted chip over the hero photo, which stays a light panel with dark
text in *both* themes on purpose — it sits on an image, not on the page).

`brand-*` / `rose-*` get a genuinely different ramp per theme rather than a
mechanical invert. Both colours are used as *both* a solid button fill and
inline accent text (`text-brand-700` appears ~30 times sitewide); a value dark
enough to read as text on white becomes invisible as text on a dark card. The
dark ramp brightens the 600–700 tier — which carries almost all of the text
usage — while keeping 50–200 as dark tints (so a badge on a dark card gets a
darker tint of the hue, not a paler one).

Tailwind v4 compiles all of this to `var()` references, so redefining the
variables reskins the entire site — no component knows which theme is active,
and there are zero per-theme conditionals in the JSX.

**To compare them:** use the floating *Theme* control at the bottom-right, or
share a direct link — `?theme=ivory` / `?theme=porcelain`. The parameter is
validated against the ids in `themes.ts` and persisted to `localStorage`.

**Once a theme is chosen:** set `DEFAULT_THEME` in `src/config/themes.ts`, then
delete `<ThemeSwitcher />` from `src/app/layout.tsx`. It is a review tool;
nothing else depends on it. The losing theme's block in `globals.css` can then go
too.

## Motion

One easing curve (`[0.16, 1, 0.3, 1]`) and three durations across the whole
site, defined in `src/lib/motion.ts`.

**Framer Motion** handles component-level work — scroll reveals, staggers,
word-by-word headlines, accordions, the mobile sheet, magnetic buttons, tilt
cards. **GSAP ScrollTrigger** handles scroll-linked work — parallax and the slow
image zoom — because its `scrub` is driven off the same rAF loop as Lenis
(wired in `providers/SmoothScroll.tsx`), which keeps scrubbed motion in step
with the smoothed scroll position instead of a frame behind it.

Everything animates transform and opacity only, so it stays on the compositor.

### Accessibility of motion

`prefers-reduced-motion` is honoured everywhere, not just dimmed:

- Reveals render their resting state immediately rather than animating.
- Lenis does not initialise at all — native scrolling is left alone.
- The custom cursor does not mount, so the system cursor is untouched.
- The intro loader is skipped entirely.
- The testimonial marquee stops.

Touch devices keep native scroll momentum (`smoothWheel` only) — hijacking touch
on a low-end Android costs more in responsiveness than the smoothing is worth.

---

## Performance notes

- Every route is static (`○`/`●` in the build output). No server rendering at
  request time.
- The hero image is the LCP element: static import, `priority`,
  `fetchPriority="high"`, AVIF/WebP, build-time blur placeholder.
- All imagery is local, so there are no third-party image hosts on the critical
  path and no `remotePatterns` needed.
- Static imports give every image intrinsic dimensions → no CLS.
- The Calendly widget script (~90KB) is injected **only after** a department is
  chosen, so it never touches first load.
- The Google Maps iframe is `loading="lazy"` and below the fold.
- `optimizePackageImports` tree-shakes `react-icons` and `framer-motion`.
- The intro loader is capped at ~1.1s, shown once per session, and renders
  *over* content rather than gating it.

## SEO

- Native App Router Metadata API (not `next-seo`, which is a Pages-Router-era
  library and is unnecessary here).
- Per-page canonical, Open Graph and Twitter card metadata.
- JSON-LD emitted server-side as one connected `@graph` per page with stable
  `@id`s, so Google resolves the relationships rather than seeing unrelated
  islands: `Organization` → `Hospital`/`MedicalOrganization`/`LocalBusiness` →
  `MedicalClinic` (per department) → `Physician` (per doctor), plus `WebSite`,
  `FAQPage`, `BreadcrumbList`, `ContactPoint`, `ReserveAction` and `sameAs`
  social profiles.
- `sitemap.xml` and `robots.txt` generated from config; sitemap priorities
  reflect conversion value, not page count.
- Visible breadcrumbs mirror the `BreadcrumbList` markup on every inner page.
- Target keywords (paediatrician / child specialist / eye specialist /
  ophthalmologist / eye hospital / paediatric hospital in Chhatrapati
  Sambhajinagar) are worked into titles, H1s, body copy and `keywords`.

## Accessibility

Semantic landmarks, a skip link, visible focus rings, `aria-expanded` /
`aria-controls` on the accordion and menus, `aria-current` on active nav items,
labelled icon-only controls, and decorative graphics marked `aria-hidden`.
Animated headlines expose the full string via `aria-label` so a screen reader
hears one sentence rather than a stuttered word list. All tap targets on mobile
are ≥44px; the bottom bar's are ≥56px and clear the iOS home indicator via
`env(safe-area-inset-bottom)`.

Framer Motion serialises each element's `initial` state into the SSR HTML, which
means scroll-revealed sections ship as `opacity: 0`. A `<noscript>` stylesheet in
`layout.tsx` forces the resting state so the page is readable with JavaScript
disabled.

---

## Gotchas worth knowing

**Never pass a utility through `className` that fights one already in a component's
base class list.** Tailwind's output order decides which wins, *not* the order the
classes appear in the attribute — so the override silently loses. This bit twice:

- `hidden` passed to `<Button>` / `<ButtonLink>` lost to the base `inline-flex`, so the
  header's desktop-only CTAs stayed visible on mobile.
- `w-10` passed to `<Emblem>` lost to the base `w-full`, so the header logo stretched to
  the full width of its flex parent on mobile.

Both are fixed the same way: the component owns its own layout, and the caller sizes a
**wrapper**. See the header CTAs and `brand/Logo.tsx` for the pattern.

**`<html>` needs `suppressHydrationWarning`.** `ThemeScript` stamps `data-theme` onto
`<html>` before first paint, but React owns that element in the App Router and reconciles
it during hydration — which strips the attribute and reverts the page to the default
palette. The symptom is nasty: the attribute is present if you inspect the DOM, the CSS
is correct and unlayered, and yet the paint shows the default theme.

**Client components can't receive a `Department` object.** `Department.icon` and
`service.icon` are React component *functions*, which cannot cross the
server→client boundary. Pass the slug and look it up with `getDepartment()`
inside the client component — that is why `DepartmentDetail` takes `slug`.

**SVG gradients need `gradientUnits="userSpaceOnUse"` on straight strokes.** A
perfectly vertical or horizontal line has a zero-width/height bounding box,
which makes the default `objectBoundingBox` gradient degenerate and the browser
skips painting the stroke. This silently turned the logo's Y into a V once
already.

**A decorative panel that sits on a photo must use literal colours, not the
theme-following `fg`/`fg-muted` tokens.** The `.glass` frosted chip (the hero's
floating doctor cards, the map label, a doctor's credential badge) is
*deliberately* always a light panel — it sits on an image, not on the page, so
it never darkens with the theme. When the light/dark migration first ran, the
text inside those chips got swept up in the same regex pass as ordinary card
text and became `text-fg` — which is near-white in the dark theme. Near-white
text on a panel that is *still* light-frosted regardless of theme is invisible.
Anything inside a `.glass` panel stays on literal `text-ink-950` /
`text-ink-600`. The same logic applies to a `ring-white` used to separate a
photo/icon from its own card background — it needs to match that card's
`surface-2`, not stay a literal white ring, or it becomes a stray bright halo
once the card goes dark.
