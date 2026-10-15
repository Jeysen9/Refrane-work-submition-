# RecruitFlow OS 2.3 — QA and launch checks

## Automated verification performed (15 October 2026)

- `node scripts/check-project.mjs`: **36 of 36 checks passed**.
- All seven page renderers present and all local asset references resolve.
- Starter and Professional default prices render **N$299** and **N$799**, not exchange-rate conversions; annual saving control preserved.
- Case Studies and homepage both render five-star accents for all three source testimonials.
- Intro/replay controller, hero mark, supplied MP4, same-page Calendly embed, navigation and ambient identity remain present.
- New v2.3 stylesheet is loaded by all seven page shells.
- Desktop and mobile scroll-driven logo target is **180 degrees** at the end of the hero sequence.
- `node --check js/components/intro.js`: syntax valid.

## Not verified in this runtime

The local headless Chromium binary stalled on a blank-page smoke test, so this round could not produce reliable live browser screenshots or verify frame-by-frame animation transitions. The previous 2.2 screenshots in `previews/` are preserved as historical references only; they do not depict the 2.3 changes. Do not treat this as a completed cross-browser visual test.

## Manual checks before publishing

1. Serve with `py -m http.server 8000`, load `http://localhost:8000/` in a fresh/private browser session, and watch Version 2.0 turn into the positioned hero mark. Hero text should appear in stages afterward. Use **Replay the reveal** and **Skip intro** to test both paths.
2. Scroll through the homepage: the 3D mark should turn until it ends facing backwards. Confirm the headline and full description remain clear of the logo and floating cards. Check 1440×900, 1366×768, 768-wide tablet, 390 and 320-wide phones.
3. On Pricing confirm monthly **N$299 / N$799** and check annual toggle for **N$239.20 / N$639.20** monthly-equivalent amounts. Return to monthly to confirm exact original values.
4. On Case Studies confirm five golden stars appear in the upper-right corner of each customer story. Check responsive stacking and company logos on narrow screens.
5. Test menu, legal links, all page transitions, full product demo playback, Calendly booking widget on real Android and iOS devices. External scheduling availability cannot be confirmed offline.
6. Set operating-system reduced motion preference and confirm hero content remains readable with no forced intro.
7. Obtain owner approval for pricing, review-star meaning, customer testimonials, legal policy text, billing terms, and live booking destination.
