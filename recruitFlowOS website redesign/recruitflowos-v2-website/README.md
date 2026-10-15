# RecruitFlow OS
### Website redesign · Edition 2.4 · 15 October 2026

**A cinematic, seven-page recruitment-platform website with carefully structured content, glass surfaces, real brand assets and responsive interactions.**

This project refines the previous full RecruitFlow OS v2.3 package. It is **not** a new template or a visual-only mockup: the existing platform pages, written content, customer stories, local video, 3D logo, booking area and navigation are retained. The refinements specifically address the original website's pricing comparison, team configurations, FAQ wording, case-study branding and motion.

---

## 01 · See the website

| Page | Purpose | What visitors see |
|---|---|---|
| **Platform** · `index.html` | First impression and product journey | Cinematic *Introducing version 2.0* intro, 3D company logo, animated landing copy, product workflow, customer testimonials, video and in-page booking calendar |
| **Features** · `features.html` | Product capabilities | Feature sections, UI imagery, supporting data, navigation to product areas |
| **Pricing** · `pricing.html` | Plan decision | Three plans, monthly/annual toggle, original five-row comparison table, team-structure tabs, exact four FAQs |
| **Case Studies** · `case-studies.html` | Customer proof | Three source-backed stories, client portraits, company logos, five-star decorative marks, outcome details, checkmarked reasons |
| **Privacy / Terms / Refunds** | Preserve original navigation routes | Designed page shells with visibly labelled *policy-content placeholders* pending approved legal wording |

**Source of truth:** The updated pricing comparison and Startups, Scaleups and Enterprises wording follow the user-supplied original screenshots, included unchanged at `docs/reference/`. The four pricing FAQs are included with the exact wording supplied by the site owner.

## 02 · Launch locally

**Windows / VS Code**

1. Extract the ZIP and open the `recruitflowos-v2-website` folder in VS Code.
2. Open the integrated terminal (**Terminal → New Terminal**).
3. Start a local static server:

   ```powershell
   py -m http.server 8000
   ```

4. Visit **http://localhost:8000/** in Chrome, Edge or another modern browser.
5. Press **Ctrl+C** to stop the server.

**macOS / Linux:** use `python3 -m http.server 8000` instead.

The website uses **HTML + CSS + native JavaScript ES modules**; there is no framework, bundler or production compilation step. Do not open `index.html` directly as a `file://` page: browser module security rules can prevent the imports from loading. `npm install` is **not required**.

To run the included static validation checks:

```bash
npm run check
```

Google Fonts and the Calendly scheduling service require internet access. The product demonstration video and customer images are packaged locally.

## 03 · Design direction

### Visual language

The result uses a premium dark interface instead of a generic SaaS theme: **midnight/navy surfaces, blue spectral lighting, restrained violet/teal accents, softened glass borders and typographic contrast**. The original company logo is the central motif rather than a decorative globe. Subtle translucent instances of that mark appear behind individual sections so the depth remains continuous without obscuring content.

- **Blue** is the primary action and active-navigation colour. **Sky blue** signals product intelligence and emphasis.
- **Violet/lavender** distinguishes selected secondary surfaces. **Teal/green** highlights positive proof points and checkmarks.
- **Warm gold** draws the eye to customer-story five-star graphics; these are a *design treatment*, not an independently confirmed rating.
- **Manrope** supports expressive display headlines; **DM Sans** and **Plus Jakarta Sans** give smaller descriptive text a more editorial voice. System font fallbacks keep the site readable offline.
- **Glass cards** use layered low-opacity fills, fine outlines, inner highlights and ambient shadows. They gain emphasis on hover rather than jumping abruptly.

### Motion and cinematic experience

The homepage preserves the v2.3 **Version 2.0 reveal**, its seamless hand-off to the company mark, the logo's three-dimensional rotation ending back-facing, and the ordered headline/description entrance. The new edition extends the motion language to the remaining pages:

1. **Document navigation:** supported Chromium browsers use same-origin CSS cross-document View Transitions. A JavaScript fade-out/fade-in fallback operates where the browser does not provide that facility.
2. **Scroll arrival:** text and cards fade upward with soft easing and staggered delays as they enter the viewport.
3. **Plan changes:** switching among Startups, Scaleups and Enterprises briefly fades the existing panel out, then brings in the new heading, description and supporting points in sequence.
4. **Expandable content:** plan comparison and FAQ answers appear with controlled easing, not an abrupt content swap.
5. **Accessibility:** the `prefers-reduced-motion` setting suppresses unnecessary movement; all controls retain keyboard semantics and focus states.

These effects are intentionally lightweight: no third-party animation library and no code-generated video backgrounds.

## 04 · Latest changes (v2.4)

| Area | What changed | Editing location |
|---|---|---|
| Featured plan | **Professional** is subtly elevated; “Most popular” badge is at the **top-right of its own card** | `styles/finishing-2.4.css`; `js/pages/pricing.js` |
| Billing | Monthly plans remain **N$299 / N$799**. Discounted monthly equivalents show **N$239 / N$639**, without decimal cents | `js/data/pricing.js`; `js/pages/pricing.js` |
| Exact comparison | Table is reduced to the **five capabilities in the original screenshot**; no additional speculative table rows | `js/data/pricing.js` |
| Team structure | Reinstates original headings, paragraphs and two highlights for **Startups / Scaleups / Enterprises** | `js/data/pricing.js`; `js/pages/pricing.js` |
| FAQs | Four original answers inserted word-for-word | `js/data/pricing.js` |
| Case studies | Three company marks and three client portraits alongside company names, with portraits retained in attributions | `js/pages/case-studies.js`; `styles/finishing-2.4.css` |
| Why teams choose | Replace numbered reasons with prominent, coloured checkmark icons | `js/pages/case-studies.js` |
| Social symbols | LinkedIn, Instagram, Facebook and X icons in footer; visual only until official links are provided | `js/components/footer.js`; `js/components/icons.js` |
| Motion | Page navigation effects, slower/staggered card entrances, animated pricing tab changes | `js/components/page-transitions.js`; `styles/finishing-2.4.css` |

**Annual-price calculation:** The original amounts are not currency-converted. The annual-billing setting applies a 20% discount to the original monthly number, then rounds the *displayed monthly equivalent* to the nearest whole N$. The annual total is derived from the unrounded discounted value and displayed as whole N$. Consequently, the visible rounded monthly equivalent multiplied by 12 can differ from the annual total by a few dollars. This avoids unexpectedly altering the actual 20% discount.

## 05 · Folder architecture

```text
recruitflowos-v2-website/
│
├── index.html                  Main platform page
├── features.html               Feature exploration
├── pricing.html                Plans and comparison
├── case-studies.html           Customer stories
├── privacy.html                Privacy placeholder
├── terms.html                  Terms placeholder
├── refunds.html                Refunds placeholder
├── _redirects                  Netlify extension-free routes
├── netlify.toml                Publish configuration
├── package.json                Lightweight check script
│
├── assets/
│   ├── images/                 Website photography, mark, favicon, product screenshots
│   ├── company-logos/          Original customer/partner logos and reserved source assets
│   └── media/                  Locally hosted RecruitFlow product demonstration MP4
│
├── js/
│   ├── main.js                 Application entry point and page selection
│   ├── data/
│   │   ├── site.js             Brand, global navigation, calendar URL
│   │   ├── pricing.js          Plan amounts, comparison, team copy, exact FAQs
│   │   ├── case-studies.js     Customer stories and why-teams reasons
│   │   ├── platform.js         Homepage content data
│   │   ├── features.js         Features content data
│   │   └── legal.js            Legal route data
│   ├── components/
│   │   ├── header.js           Shared header / nav
│   │   ├── footer.js           Shared footer and social icon slots
│   │   ├── icons.js            Inline SVG icon definitions
│   │   ├── intro.js            Version 2.0 logo reveal choreography
│   │   ├── motion.js           Scroll reveal and 3D rotation behaviour
│   │   ├── page-transitions.js New entrance + fallback navigation animations
│   │   ├── atmosphere.js       Subtle shared background logo sculpture
│   │   ├── booking.js          In-page Calendly booking card
│   │   └── ui.js               Reusable section-heading and UI markup
│   └── pages/
│       ├── platform.js         Platform page markup
│       ├── features.js         Features page markup
│       ├── pricing.js          Interactive plans, team tabs, FAQ markup
│       ├── case-studies.js     Customer story markup
│       └── legal.js            Shared policy page markup
│
├── styles/
│   ├── tokens.css              Colours, fonts, spacing, sizes
│   ├── base.css                Reset and accessible foundations
│   ├── components.css          Common navigation, footer, buttons and layouts
│   ├── motion.css              Foundational animations and motion preferences
│   ├── intro.css               Cinematic opening sequence
│   ├── premium.css             Glass surfaces, shadows, depth
│   ├── refinements.css         Earlier compatibility and layout polish
│   ├── art-direction.css       Ambient 3D logos / section-specific colour
│   ├── finishing-2.3.css       Hero composition and previous typography fixes
│   ├── finishing-2.4.css       Current pricing, brand, case study and motion changes
│   └── pages/                  Per-page design and responsive layouts
│       ├── platform.css
│       ├── features.css
│       ├── pricing.css
│       ├── case-studies.css
│       └── legal.css
│
├── docs/
│   ├── MASTER_DESIGN_BRIEF.md  Earlier design brief
│   ├── reference/              Four supplied screenshots from the old pricing page
│   └── history/                Previous 2.2/2.3 release notes and QA reports
├── scripts/
│   └── check-project.mjs       Dependency-free project validation
│
├── README.md                   This architecture and editing guide
├── CONTENT_REVIEW.md           Owner sign-off list for production
├── QA_REPORT_2.4.md            Latest QA status and manual checklist
└── RELEASE_NOTES_2.4.md        Change log for this handover
```

### Why the source is split this way

HTML files contain small, readable page shells. `js/main.js` selects the correct page renderer using `data-page`; it then mounts the shared header/footer, adds ambient effects, and initialises only the interactions that exist on that page. Separate **data** modules hold copy and values so ordinary content edits do not require rewriting markup. Shared **components** keep icon, nav, booking and animation logic out of the page descriptions. **Page-specific CSS** manages each section's layout; successive finishing stylesheets record polish without destructive restructuring. All original material assets are in `assets` and referenced with relative paths for portable hosting.

### Common editing tasks

| You want to change… | Edit… |
|---|---|
| Subscription prices or the annual discount | `js/data/pricing.js` (`monthlyPrice`, `annualSaving`) |
| Wording in the five-row comparison | `js/data/pricing.js` (`comparisonFeatures`) |
| Team segment titles, descriptions or highlights | `js/data/pricing.js` (`teamSegments`) |
| FAQ copy | `js/data/pricing.js` (`faqs`) |
| Most popular badge or pricing card appearance | `styles/finishing-2.4.css` (`.plan-card--popular`, `.plan-popular-label`) |
| Customer logo or portrait | `js/data/case-studies.js` (`logo` and `portrait` paths) |
| Why-teams reasons | `js/data/case-studies.js` (`whyTeamsChoose`) |
| Social profile links (once approved) | Convert the static icons in `js/components/footer.js` into links with actual URLs |
| Header and navigation items | `js/data/site.js`; `js/components/header.js` |
| Brand logo image or demo booking link | `js/data/site.js` (`logo`, `demoUrl`) |
| Motion timing/transition intensity | `styles/finishing-2.4.css`; `js/components/page-transitions.js` |
| Entire site's core colours | `styles/tokens.css` |

When adding new global CSS, keep it after existing stylesheets in each HTML page so page styling remains predictable. Keep image filenames and cases consistent with the paths in the data modules.

## 06 · Shipping / hosting

The folder is ready for a static host such as **Netlify**, which is already configured in `netlify.toml`. Publish the *contents* of `recruitflowos-v2-website`; there is no build command. The bundled `_redirects` file lets Netlify serve clean routes such as `/pricing` and `/case-studies` in addition to the `.html` pages. Other static hosts can serve the `.html` routes without extra rewriting rules.

For launch, configure HTTPS, test all navigation and inquiry buttons, verify the video plays on supported devices, and confirm that Calendly loads inside the booking card. The third-party calendar cannot be fully verified offline.

## 07 · Content verification and test status

The project checks were run against this edition: **47 checks passed** covering route rendering, link/asset resolution, pricing copy, the five-row comparison, the four full FAQ answers, customer logos, checkmarks and retained website functionality. JavaScript modules also passed syntax validation. **Live end-to-end browser layout/interaction checks were not possible in the current execution environment** because Chromium denied navigation with `ERR_BLOCKED_BY_ADMINISTRATOR`. Therefore responsive layouts, video playback, native transitions and booking selection still require testing in a real browser. See `QA_REPORT_2.4.md` for a concrete acceptance checklist.

Before public release, the owner should explicitly approve billing and cancellation rules, claimed 48-hour migration, ISO/security assurances, customer ratings/testimonial rights and the unfinished legal policies. The supplied month-to-month FAQ is restored *exactly as requested*, but should be reconciled with the annual billing option. Unverified social destinations are intentionally represented as **icons without links**, not misleading `#` anchors. Trial and sales CTAs currently lead to the existing demo booking rather than an unprovided signup system.

---

**Design philosophy:** Every claim stays reachable, the primary action remains obvious, and small detail is revealed when the visitor needs it. The movement and colouring are there to make RecruitFlow feel more confident and contemporary—not to bury the recruiting product behind effects.
