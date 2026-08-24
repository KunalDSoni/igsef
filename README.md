# Ujjwal Foundation — school NGO website

A static website for a school NGO, built with [Astro](https://astro.build). The visual
design is a clone of the [Kidora](https://www.framer.com/community/marketplace/templates/kidora/)
Framer template, adapted from a fee-paying preschool to a donor-funded NGO.

## Running it

```bash
npm install
npm run dev      # dev server
npm run build    # static output to dist/
```

## Layout

```
src/
  data/          content — edit these, not the pages
    site.js        org name, nav, contact details, headline stats
    images.js      every image URL in one place
    programs.js    programmes + their detail-page copy
    teachers.js    staff
    posts.js       blog posts + bodies
    testimonials.js
    tiers.js       giving tiers
  layouts/Base.astro    <head>, header, footer, page scripts
  components/           Header, Footer, ProgramCard, GivingTiers, CTA, …
  styles/global.css     design tokens + all styling
  pages/                11 routes → 15 built pages
```

Pages: Home · About · Programs (+ 3 detail pages) · Teachers · Admissions ·
Blog (+ 3 posts) · Ways to give · Contact · 404.

## Design tokens

Measured from the Kidora template rather than approximated.

| | |
|---|---|
| Display | Plus Jakarta Sans — h1 72/700, h2 56/700, h3 44/600 |
| Body | Nunito Sans 16/600 |
| Colours | cream `#FCFAED` · peach `#FEEECD` · mint `#D7FDCF` · lavender `#EBE1FD` · amber `#FCB520` · purple `#520080` · teal `#09D89A` |
| Radii | 20px cards · 100px pills · 40px blocks |

## Before this goes live

Three things are deliberately unfinished:

1. **Images are placeholders.** `src/data/images.js` points at the Kidora template's
   CDN assets so the layout reads correctly. They are not licensed for this site —
   replace every value with real or licensed photography.
2. **The organisation is invented.** "Ujjwal Foundation", its statistics, staff,
   testimonials, and giving amounts are all placeholder content. Real details go in
   `src/data/`.
3. **Forms have no backend.** The contact form and newsletter signup say so on screen
   rather than pretending to submit. Wire them to a form handler.

## Design preview

`design-preview/` holds the original standalone HTML mockup used to approve the
design before the Astro build. Kept for reference; not part of the site.
