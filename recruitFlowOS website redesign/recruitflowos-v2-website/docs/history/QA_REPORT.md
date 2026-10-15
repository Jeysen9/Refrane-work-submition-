# RecruitFlow OS 2.2 — QA update

See `RELEASE_NOTES_2.2.md` for the current release and testing limits.

**Current release results:** 35 `npm run check` structural checks pass. Standalone Chromium visual snapshots of four primary pages at 320, 390, 768 and 1440 px show no horizontal overflow. The 320px booking panel switches to edge-to-edge so Calendly’s minimum width is met.

The updated inline Calendly implementation cannot be booked end-to-end from the restricted test environment; test it on a publicly accessible HTTPS deployment, including iPhone Safari and Android Chrome. If Calendly blocks embedding on a device, use the clearly labeled backup booking link.

**Prior notes for 2.1:**

# RecruitFlow OS 2.1 — QA / Handover

## Source and implementation

The provided earlier cinematic ZIP was modified in place, retaining Platform, Features, Pricing, Case Studies, Privacy, Terms, Refunds, source copy, testimonials, logos and modular vanilla JS structure. Newly supplied files `demo.mp4`, `recruitflow-logo.png` and `refrane-mark.png` were incorporated. The original source assets and full uploaded images remain available.

## Automated checks

- `npm run check` (`scripts/check-project.mjs`) — **33 passing structural/content checks**. Confirms all seven routes, supplied original feature counts, testimonial and case-study counts, no empty hash-only links, all local image/video paths, CSS/JS dependencies, updated brand, the native demo video, non-sticky Features navigation, and the mobile-booking alternative.
- `ffprobe` checked the MP4: 1024×576 H.264 video + AAC audio, ~191 seconds. Poster extracted from the video itself.
- Static Chromium page layout render using current page markup, CSS and local image assets embedded as data URIs: checked **Platform, Features, Pricing and Case Studies at 320, 390, 768 and 1440 CSS pixels**. No document-level horizontal overflow was detected on any checked page.
- At 320/390/768 px, the fixed header remained at Y=0 after scrolling to the bottom in these static layout checks. The Features nav computed `position: relative` and was far above the viewport after navigating to the second section. Pricing displayed **N$ 4,923** for Starter. Case Studies portraits rendered at 75px and company marks at 148px on 390px screens, up from the source 42px / 72px.
- Browser interaction smoke checks using the actual project controllers in isolated current HTML/CSS rendered pages: mobile menu opened and closed via outside-tap on all four pages; the Features anchor links navigated to Talent Analytics while their navigation strip exited the viewport; Starter billing toggle changed **N$ 4,923** monthly to **N$ 3,938** discounted estimated monthly billing (annual commitment); the real Version 2.0 intro controller created the overlay and its skip control initiated dismissal. These are local script smoke checks, not tests against the public site.
- Updated static preview images are stored under `previews/`. These show the actual HTML/CSS layout, not a screenshot of an app deployed to the public internet.

## Checks requiring deployed / real-device verification

- Mobile Safari (iOS) and Chrome (Android) booking link completes a live Calendly appointment; availability cannot be guaranteed by a local static test.
- MP4 playback, seeking, audio and optional caption requirements on actual devices and production hosting; source video does not include separate caption files.
- Real dynamic JS flows (mobile menu keyboard/focus behavior, annual billing switch, intro replay, FAQ toggles, scrolling) should be rechecked with the site served over HTTPS on the target domain. The local script smoke checks do not prove a complete end-to-end live-browser pass.
- The locally rendered layout checks are not performance/bandwidth testing; the video is about 22 MB and should be delivered with caching and byte-range support.
- Legal/privacy documents, final Namibian-dollar price approvals, trademark/customer photo permissions, quote claims, unverified KPI accuracy, and trial-account destinations need owner review.

**Status:** deliverable ready for stakeholder design review and local browser use; final live cross-browser booking and commercial/legal approval remain open.
