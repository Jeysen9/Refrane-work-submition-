/* Shared brand and navigation settings. Keep edits to the site-wide identity here. */
export const brand = {
  name: 'RecruitFlow',
  parent: 'Refrane',
  year: '2026',
  description: 'Automate your entire screening process — from application to shortlist — so you can focus on people, not paperwork.',
  logo: './assets/images/recruitflow-mark.png',
  fullLogo: './assets/images/recruitflow-full-logo-original.png',
  tagline: 'The right talent. Seamlessly.',
  demoUrl: 'https://calendly.com/evenhashikutuva-1/discovery-call?hide_gdpr_banner=1&background_color=080b0f&text_color=f3f4f6&primary_color=1E5FFF'
};

export const navigation = [
  { key: 'platform', label: 'Platform', href: './index.html' },
  { key: 'features', label: 'Features', href: './features.html' },
  { key: 'pricing', label: 'Pricing', href: './pricing.html' },
  { key: 'case-studies', label: 'Case Studies', href: './case-studies.html' }
];

export const footerNavigation = {
  platform: [
    { label: 'Overview', href: './index.html#top' },
    { label: 'Key Features', href: './features.html' },
    { label: 'Customer Stories', href: './case-studies.html' },
    { label: 'Pricing', href: './pricing.html' }
  ],
  company: [
    { label: 'Privacy Policy', href: './privacy.html' },
    { label: 'Terms of Service', href: './terms.html' },
    { label: 'Refund Policy', href: './refunds.html' }
  ]
};

/* Source files contain placeholder social links (#), not approved destination URLs. */
export const missingDestinations = {
  socialProfiles: true,
  aboutRefranePage: true,
  selfServeTrial: true
};
