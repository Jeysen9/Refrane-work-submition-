# Publication review · RecruitFlow OS 2.4

This is a client-facing visual website built from the prior RecruitFlow OS package, supplied branding/media and the original pricing screenshots. The original copy explicitly supplied for the pricing FAQs has been restored verbatim; it is not independently confirmed as a company policy.

## Updated and ready for design review

- Monthly **Starter N$299** and **Professional N$799** preserve the old numerical values. Annual discounted monthly equivalents show **N$239** and **N$639** as whole-dollar approximations; annual totals derive from the original amount with a 20% discount.
- Plan comparison now lists *only* the five categories and twelve values shown in the owner's original screenshot; `docs/reference/old-pricing-comparison.png` keeps the reference.
- Startups, Scaleups and Enterprises tabs use their source descriptions/claims/highlights; their screenshots are in `docs/reference/`.
- The four questions and answers supplied by the owner are exact and complete, not reconstructed.
- Three source customer logos and three matching portraits are paired with company names on the Case Studies page. The portraits also remain beside named testimonial attributions.
- “Why teams choose RecruitFlow” uses check icons rather than ordinal numbers.
- Social platforms are shown as noninteractive SVG icons; no invented destinations are introduced.

## Owner approvals still required before publication

1. **Billing / cancellation:** Confirm the exact Namibian pricing and the 20% annual discount; also reconcile the *annual billing* option with the supplied FAQ asserting completely month-to-month contracts. Clarify annual cancellation/refund rules, taxes and VAT.
2. **Product capability claims:** Confirm the five table rows; specific security claims (ISO 27001, SAML/SSO), the enterprise SLA and availability of customer-trained AI models and integrations.
3. **Service commitments:** Confirm the screenshot's “under 5 minutes”, “average 12-day time-to-hire” and the FAQ promise of migration in under 48 hours.
4. **Review authenticity / usage rights:** Confirm customer permission to display portraits, company logos, supplied quotes and golden five-star graphics. Stars were added as a requested decorative review style, not as independently certified ratings.
5. **Legal pages:** The Privacy Policy, Terms of Service and Refund Policy pages contain labelled placeholder copy. Supply approved, jurisdiction-appropriate policy content before public launch. The footer “GDPR Compliant” text also requires legal validation.
6. **Conversion links:** No verified self-service trial or dedicated sales-contact URL was provided. The trial and contact buttons currently direct to the demo booking flow.
7. **Calendar:** Confirm the Calendly event owner, scheduling destination and successful in-page operation on real mobile/desktop browsers.
8. **Social platforms:** Provide the company's verified LinkedIn, Instagram, Facebook and X URLs if the decorative icons are to become functional links.

## Engineering / QA constraint

Static project checks pass, but browser sandbox restrictions prevent a trustworthy automatic Chromium end-to-end test in this environment. Manually verify all seven routes, viewport sizes, navigation transitions, pricing toggle, comparison panel, team tabs, FAQ disclosure, case-study images, video and calendar before deployment. Details: `QA_REPORT_2.4.md`.
