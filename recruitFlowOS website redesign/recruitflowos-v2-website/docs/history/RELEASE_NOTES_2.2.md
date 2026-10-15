# RecruitFlow OS 2.2 — Release notes

## Requested changes delivered

1. Full-site RecruitFlow background mark: official blue brand mark repeated as subtle five-layer perspective sculpture behind the content, on Platform, Features, Pricing, Case Studies and legal pages; fades in as sections enter view and remains static under reduced-motion preferences.
2. Reworked colour: cobalt, sky blue, gentle violet and aqua highlights with frosted/glass depth.
3. Removed the redundant moving “From Application / To Shortlist” strip and tiny decorative captions, numbered-card labels and excess page-hero labels. Meaningful product and plan data remain.
4. Moved Get Early Access below the hero object on phone, tablet and desktop, so the logo is no longer covered.
5. Booking now uses Calendly's official inline JavaScript integration inside the existing homepage card, on mobile too. If the script is blocked, an iframe is attempted in the same card; direct fallback link stays available. Requires internet and a working Calendly event.
6. Existing demo video, source content, updated logos, pricing in indicative N$, user navigation and larger case study photos remain.

## Tests and limitations

- `npm run check`: 35 checks passed.
- Static Chromium page renders: Platform / Features / Pricing / Case Studies at widths 320px, 390px, 768px and 1440px. No horizontal page overflow; mobile calendar container measures >=320px even at a 320px viewport.
- Standalone snapshot renders are not a real hosted end-to-end test, because the browser sandbox blocks local site navigation. The external Calendly booking flow cannot be validated in this sandbox. Test scheduling on physical Android/iPhone browsers after deploying the site.
- Prices remain 14 October 2026 converted N$ estimates based on the original USD listing, not owner-approved Namibia tariffs.
- Legal text and missing FAQ copy still require business approval, as documented in CONTENT_REVIEW.md.

## Files changed / added

- **Added** `styles/art-direction.css`, `js/components/atmosphere.js`, `js/components/booking.js`
- **Updated** `js/main.js`, `js/pages/platform.js`, `js/pages/features.js`, `js/pages/pricing.js`, `js/components/ui.js`, `scripts/check-project.mjs`, all seven HTML entry files, `README.md`, `QA_REPORT.md`, `package.json`
- **Preview PNGs** in `previews/`.

No framework dependencies have been introduced. Open with a static development server or deploy to Netlify.
