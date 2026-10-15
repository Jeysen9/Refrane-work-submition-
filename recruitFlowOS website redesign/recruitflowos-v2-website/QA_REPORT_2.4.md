# RecruitFlow OS 2.4 · QA report

**Date:** 15 October 2026  
**Build:** Static HTML + CSS + JavaScript ES modules  
**Starting package:** `RecruitFlowOS_2.3_Cinematic_Polished_Website.zip`

## Completed checks

- `npm run check`: **47/47 passed** at the most recent check run.
- `node --check` over every JS module: **passed**.
- All seven source page renderers return HTML; local links to images and expected stylesheet/script files resolve.
- Default subscription prices: **N$299**, **N$799**; no dollar-to-Namibian-dollar conversion.
- The annual discount code computes the full 20% then rounds only the display to whole Namibian dollars (monthly equivalents **N$239**, **N$639**).
- Comparison table has exactly five rows, with only screenshot-derived labels/values.
- `teamSegments` holds all three screenshot-derived copy sets.
- Four owner-supplied FAQ answers render verbatim in the page component.
- Three case-study cards include company-logo/portrait pairs and five-star graphics; four reasons show check icons.
- Header, footer, original source image assets, product MP4, same-page Calendly card and hero reveal/scroll logo controller remain present.
- New visual overrides and page-transition modules are included without removing older source components.

## Browser-test limitation

Headless Chromium was attempted against a local HTTP server and the `file://` page URL. Both navigation attempts were refused with **`net::ERR_BLOCKED_BY_ADMINISTRATOR`** before any page interaction could execute. For this reason, **no live browser screenshot or interactive/mobile E2E success is claimed for 2.4**. The older render previews were omitted to avoid mistaking them for updated v2.4 screenshots.

## Recommended manual acceptance steps

1. Serve the extracted folder on `http://localhost:8000`. Visit all pages through desktop navigation and the mobile menu; confirm that headings and cards ease in rather than popping or overlapping.
2. **Pricing, monthly:** Confirm Starter is N$299, Professional N$799 and Professional's modest blue/lavender highlight plus top-right “Most popular” chip stays inside its card.
3. **Pricing, annual:** Toggle annual billing. Confirm rounded N$239 and N$639, whole-N$ annual totals and correct restoration when switching back.
4. Expand **Compare all plan features**. Compare all five rows side-by-side against `docs/reference/old-pricing-comparison.png`.
5. Click Startups / Scaleups / Enterprises quickly and slowly. Confirm the right text, the appropriate two highlights and a smooth exit/entrance each time. Compare against the matching screenshots in `docs/reference/`.
6. Open each FAQ. Confirm the answer is the complete exact owner-provided text and the accordion continues to work by mouse, keyboard and touch.
7. Visit Case Studies. Confirm each logo and portrait pair sits by its correct company name, each card has five visible gold stars in its upper right, the full source stories and customer quotes are intact, and Why Teams now uses four checkmarks.
8. In the footer, confirm icons appear without going to fabricated destinations.
9. Check viewport widths **320, 390, 768, 1024, 1440 px** and a shorter-height desktop; watch for overflow in plan cards, team panels, table, case-story company names and footer.
10. Turn on OS/browser **Reduce Motion** and confirm content is readable and interactions work without forced animation.
11. Verify the homepage intro/replay/skip, final reversed 3D mark orientation, MP4 playback, Calendly in-card booking and all fallback booking links.
12. On Netlify, check extensionless redirects (`/pricing`, `/case-studies`, etc.), HTTPS and asset loading.

**Launch blocker:** Approved legal policy content and confirmation of contract/security/performance claims are still required; see `CONTENT_REVIEW.md`.
