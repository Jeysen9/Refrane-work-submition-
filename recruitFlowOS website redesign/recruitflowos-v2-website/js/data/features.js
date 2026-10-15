/* Features page copy and source statistics. Metrics are not independently verified. */
export const screening = {
  eyebrow: 'Automated screening',
  title: 'Stop reading hundreds of resumes.',
  description: 'Our screening engine matches incoming applications against your custom role requirements. It analyzes experience, skills, and background context to rate candidates in seconds, highlighting exact alignment reasons.',
  points: [
    'Semantic parsing reads between bullet points.',
    'Custom scoring weights for skills vs. pedigree.',
    'Automatic deduplication and history matching.',
    'Direct feedback loop improves scores over time.'
  ],
  url: 'recruitflowos.com/workspace/matching',
  image: './assets/images/feature-recruiter-candidates.png',
  imageAlt: 'Recruiter workspace showing a candidate list and qualification labels',
  stats: [
    { value: '94%', label: 'Avg match accuracy', tone: 'blue' },
    { value: '127', label: 'Candidates screened', tone: 'dark' },
    { value: '100%', label: 'Response rate', tone: 'green' }
  ]
};

export const analytics = {
  eyebrow: 'Funnel analytics',
  title: 'Data that drives decisions.',
  description: 'Audit your recruiting lifecycle. Gain deep insight into stage conversion ratios, discover top-tier referral pipelines, track exact hiring velocities, and identify team bottlenecks immediately.',
  points: [
    'Stage conversion funnels highlight drop-off points.',
    'Referral origin metrics measure channel quality.',
    'Diversity and compliance metrics ready to export.',
    'Individual recruiter activity and response-time logs.'
  ],
  url: 'recruitflowos.com/workspace/analytics',
  image: './assets/images/feature-dashboard.png',
  imageAlt: 'Recruiter dashboard showing application activity, recent applications, and active campaign totals',
  stats: [
    { value: '38%', label: 'Faster time-to-hire', tone: 'blue', prefix: 'Reported' },
    { value: '3', label: 'Active roles', tone: 'dark' },
    { value: '2 lists', label: 'Per role: AI + criteria', tone: 'violet' }
  ]
};

export const additionalFeatures = [
  {
    icon: 'users',
    accent: 'teal',
    title: 'Candidate Tracking Portal',
    description: 'Candidates see where they stand at every stage. Fewer follow-up emails. Better candidate experience across every role you hire for.'
  },
  {
    icon: 'briefcase',
    accent: 'orange',
    title: 'Built-in Job Board',
    description: 'Post roles directly on the RecruitflowOS job board and reach candidates already actively looking. Zero extra cost, zero extra setup.'
  },
  {
    icon: 'mail',
    accent: 'green',
    title: 'Automated Communications',
    description: 'Professional acceptance and rejection emails sent automatically. Every candidate gets a response. Every time. No exceptions, no manual follow-up.'
  },
  {
    icon: 'link',
    accent: 'sky',
    title: 'One Shareable Link',
    description: 'One link per role. Share it to socials, WhatsApp groups, or job boards — wherever your candidates are. Applications flow in automatically.'
  }
];
