/* Prices retain the original numeric amounts; only the displayed currency symbol is N$. */
export const annualSaving = 0.20;
export const plans = [
  {
    key: 'starter',
    name: 'Starter',
    description: 'For startups bootstrapping their first hiring pipelines.',
    monthlyPrice: 299,
    cadence: '/ month',
    features: [
      '1 Active Hiring Pipeline',
      '50 Candidate Screenings / mo',
      'Basic Autopilot Scheduling Links',
      'Standard Email & Slack Alerts'
    ],
    cta: 'Start 14-day free trial'
  },
  {
    key: 'professional',
    name: 'Professional',
    description: 'For rapidly expanding departments standardizing their loops.',
    monthlyPrice: 799,
    cadence: '/ month',
    mostPopular: true,
    features: [
      'Unlimited Active Pipelines',
      '500 Candidate Screenings / mo',
      'Advanced Scorecard Rating Templates',
      'Intake Form Builder & Custom Fields',
      'Slack, Teams, Zoom & Meet Integrations',
      'Priority Customer Support'
    ],
    cta: 'Start 14-day free trial'
  },
  {
    key: 'enterprise',
    name: 'Enterprise',
    description: 'For corporate staffing bureaus demanding absolute control.',
    monthlyPrice: null,
    cadence: '/ contact team',
    features: [
      'Custom-Trained Models',
      'Unlimited Candidate Screenings',
      'Dedicated Customer Success Advocate',
      'SLA Guarantees & SAML/SSO Security',
      'Custom API Access & Webhooks Logs'
    ],
    cta: 'Contact Sales Team'
  }
];

/* The five comparison rows below mirror the original site's supplied screenshot exactly.
   Do not infer additional benefits from the marketing bullets above. */
export const comparisonFeatures = [
  { label: 'Active Pipelines', values: ['1 Pipeline', 'Unlimited', 'Unlimited'] },
  { label: 'Candidate Screening / month', values: ['50 screenings', '500 screenings', 'Unlimited'] },
  { label: 'Scorecard Reviews', values: ['Basic rating only', 'Custom scorecard matrices', 'Summarized panel consensus'] },
  { label: 'Autopilot Calendar Scheduling', values: ['Standard links', 'Panel sequences coordination', 'Custom routing regulations'] },
  { label: 'Security & Integration', values: ['Slack & Email triggers', 'Full webhook & API access', 'SAML, SSO, Compliance Logs'] }
];

/* Restored copy from the three team-structure screenshots. */
export const teamSegments = {
  startups: {
    title: 'Agile Sourcing & Fast Offboarding',
    description: 'When you are a team of under 20 people, speed is your primary advantage. Our lightweight Starter workflow allows early founders to setup intake channels, coordinate basic calendar 1:1s, and run fast feedback scorecards without bureaucratic bloat.',
    points: [
      { icon: 'sparkles', text: 'setup in under 5 minutes' },
      { icon: 'users', text: 'unlimited reviewers' }
    ]
  },
  scaleups: {
    title: 'Standardized Loops & Analytical Funnels',
    description: 'As your team grows to 100+ members, coordination overhead compounds. Our Professional tier establishes standard scorecard templates to block review bias, aligns panel sequence availability automatically on calendars, and traces drop-off bottleneck trends on funnels.',
    points: [
      { icon: 'clock', text: 'average 12-day time-to-hire' },
      { icon: 'mail', text: 'Slack automation loops' }
    ]
  },
  enterprises: {
    title: 'SLA Guarantees, Custom Models & SSO Security',
    description: 'For multinational enterprise recruitment agencies, security, predictability, and volume compliance are critical. Our Enterprise solutions feature isolated customer AI models, detailed SAML access log triggers, custom data compliance, and dedicated client advocates.',
    points: [
      { icon: 'shield', text: 'ISO 27001 & SSO/SAML' },
      { icon: 'chart', text: 'dedicated engineering SLA' }
    ]
  }
};

/* FAQ copy supplied verbatim by the site owner — no wording rewritten or abbreviated. */
export const faqs = [
  {
    question: 'How does the candidate screening work?',
    answer: 'RecruitflowOS parses candidate CVs and summaries semantically. Rather than doing simple keyword search, it cross-references qualifications against your custom role profiles to rank candidates based on actual experience and skill alignment.'
  },
  {
    question: 'Can I cancel, upgrade, or downgrade my plan at any time?',
    answer: 'Yes, absolutely. Our contracts are completely month-to-month. If you decide to cancel, your access will continue until the end of your current billing period, and you will not be charged again. Upgrades take effect immediately.'
  },
  {
    question: 'Do you offer custom onboarding and data migration?',
    answer: 'Yes, we do. For our Professional and Enterprise tiers, our customer success team handles full data migration from Workday, spreadsheets, or legacy ATS to get your team onboarded in under 48 hours.'
  },
  {
    question: 'Is there a limit on the number of team members or reviewers?',
    answer: 'No! Unlike traditional platforms that charge per seat, RecruitflowOS encourages full-team collaboration. Every plan supports unlimited recruiting coordinators, hiring managers, and panel interview reviewers.'
  }
];
