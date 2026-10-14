/* RecruitFlow by Refrane — standalone presentation UI; fictional data, local browser storage. */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const state = {
  role: 'candidate',
  page: 'dashboard',
  candidate: {
    full_name: 'Jeysen N.', headline: 'Junior Product Designer', portfolio: '', languages: ['English'], summary: 'Curious, detail-oriented creator interested in building useful digital experiences and simplifying complex workflows.', phone: '', linkedin: '', city: 'Windhoek', region: 'Khomas', skills: ['Figma', 'Research'], photo: false, photoDataUrl: '', photoName: '', photoUrl: 'assets/people/person-1.jpg', cv: true, cvName: 'Jeysen_CV_2026.pdf', employment: ['Full-time'], years: '1–2 years', notice: '30', relocate: true, email: 'jeys@example.com'
  },
  savedCandidate: null,
  recruiter: { name: 'Mia Shilongo', organisation: 'Buildwise', email: 'mia@buildwise.example', website: 'https://buildwise.example', industry: 'Technology & Design', about: 'We make thoughtful digital products for ambitious teams.' },
  preferences: { roleRecommendations: true, applicationUpdates: true, productNews: false, newApplicantNotifications: true, weeklyHiringSummary: true, candidateProductUpdates: false, darkMode: false },
  savedJobs: new Set([2]),
  applications: [
    { job: 'Product Designer', company: 'Buildwise', status: 'In review', date: 'Oct 08, 2026', initials: 'NS' },
    { job: 'UX Research Assistant', company: 'Empowermine', status: 'Submitted', date: 'Oct 02, 2026', initials: 'KL' }
  ],
  candidates: [
    { name: 'Amara Hamutenya', appliedDaysAgo: 1, role: 'Product Designer', initials: 'AH', photoUrl: 'assets/people/person-2.jpg', skills: ['Figma', 'Research'], readiness: 92, status: 'Shortlisted' },
    { name: 'Tomas Iiyambo', appliedDaysAgo: 2, role: 'Frontend Developer', initials: 'TI', photoUrl: 'assets/people/person-3.jpg', skills: ['React', 'TypeScript'], readiness: 87, status: 'In review' },
    { name: 'Selma Ndeitunga', appliedDaysAgo: 3, role: 'UX Researcher', initials: 'SN', photoUrl: 'assets/people/person-4.jpg', skills: ['Interviews', 'Insights'], readiness: 81, status: 'New' },
    { name: 'Elias Shapwa', appliedDaysAgo: 6, role: 'Product Designer', initials: 'ES', photoUrl: 'assets/people/person-5.jpg', skills: ['UI Design', 'Prototyping'], readiness: 74, status: 'In review' },
    { name: 'Lina Amadhila', appliedDaysAgo: 9, role: 'Software Engineer', initials: 'LA', photoUrl: 'assets/people/person-6.jpg', skills: ['JavaScript', 'APIs'], readiness: 96, status: 'Shortlisted' }
  ],
  campaigns: [
    { id: 'product-designer', title: 'Product Designer', type: 'Full-time', location: 'Windhoek · Hybrid', applicants: 2, status: 'Active', date: 'Oct 18, 2026', healthTrend: [42, 45, 47, 54, 61, 64, 72] },
    { id: 'frontend-engineer', title: 'Frontend Engineer', type: 'Full-time', location: 'Remote · Namibia', applicants: 2, status: 'Active', date: 'Oct 14, 2026', healthTrend: [38, 42, 44, 49, 55, 60, 67] },
    { id: 'ux-research-assistant', title: 'UX Research Assistant', type: 'Internship', location: 'Windhoek · On-site', applicants: 1, status: 'Draft', date: 'Oct 28, 2026', healthTrend: [52, 54, 51, 58, 63, 67, 70] }
  ],
  jobs: [
    { id: 1, title: 'Product Designer', company: 'Buildwise', initials: 'NS', location: 'Windhoek · Hybrid', type: 'Full-time', salary: 'N$ 28k–36k / mo', posted: '2 days ago', match: 96, tags: ['Figma', 'Product thinking', 'Research'] },
    { id: 2, title: 'UX Research Assistant', company: 'Empowermine', initials: 'KL', location: 'Windhoek · On-site', type: 'Internship', salary: 'N$ 8k–12k / mo', posted: '4 days ago', match: 88, tags: ['Interviews', 'Insights', 'Curiosity'] },
    { id: 3, title: 'Frontend Developer', company: 'Tupabloom', initials: 'OD', location: 'Remote · Namibia', type: 'Full-time', salary: 'N$ 30k–42k / mo', posted: '1 week ago', match: 84, tags: ['React', 'TypeScript', 'CSS'] },
    { id: 4, title: 'Visual Designer', company: 'Bella Vida', initials: 'SC', location: 'Windhoek · Hybrid', type: 'Contract', salary: 'N$ 18k–26k / mo', posted: '1 week ago', match: 79, tags: ['Brand', 'UI Design', 'Figma'] }
  ]
};
state.savedCandidate = JSON.parse(JSON.stringify(state.candidate));
state.team = [{email:'mia@buildwise.example',name:'Mia Shilongo',role:'Administrator',status:'Active'}, {email:'recruiting@buildwise.example',name:'Nandi Amutenya',role:'Recruiter',status:'Active'}];
state.evaluationSettings = {enabled:true,template:'Balanced professional screening',instructions:'Focus on job-relevant experience, evidence and skills. Flag missing information clearly.',minScore:70};
state.organisationDetails = {legal_name:'Buildwise (Pty) Ltd',trading_name:'Buildwise',org_type:'Private company',public_email:'careers@buildwise.example',public_phone:'+264 61 555 018',address_line1:'12 Independence Avenue',address_line2:'',suburb:'Central',city:'Windhoek',region:'Khomas',postal_code:'10005',country:'Namibia',bipa:'',vat:'',tax:'',ssc:'',logoDataUrl:'',bannerDataUrl:'',size:'11–50',year:'2019',linkedin:'',facebook:'',x:'',published:false};
state.activeCampaignIndex = 0;
restoreDemoState();
// change- Apply the saved appearance preference before rendering the workspace.
if (state.preferences.darkMode) document.documentElement.dataset.theme = 'dark';

const candidateNav = [
  {label:'Overview',icon:'home',page:'dashboard',section:'WORKSPACE'},
  {label:'Find opportunities',icon:'search',page:'jobs',section:'WORKSPACE'},
  {label:'Applications',icon:'briefcase',page:'applications',section:'WORKSPACE'},
  {label:'Saved jobs',icon:'heart',page:'saved',section:'WORKSPACE'},
  {label:'Profile readiness',icon:'gauge',page:'readiness',section:'ACCOUNT'},
  {label:'Subscription & access',icon:'file',page:'subscription',section:'ACCOUNT'},
  {label:'Account settings',icon:'settings',page:'settings',section:'ACCOUNT'}
];
const recruiterNav = [
  {label:'Overview',icon:'home',page:'dashboard',section:'WORKSPACE'},
  {label:'Campaigns',icon:'briefcase',page:'campaigns',section:'WORKSPACE'},
  {label:'Candidates',icon:'users',page:'candidates',section:'WORKSPACE'},
  {label:'Evaluations',icon:'sparkles',page:'evaluations',section:'WORKSPACE'},
  {label:'Team & access',icon:'users',page:'team',section:'MANAGEMENT'},
  {label:'Business settings',icon:'building',page:'organisation',section:'MANAGEMENT'},
  {label:'Account settings',icon:'settings',page:'settings',section:'MANAGEMENT'}
];
function initials(name = '') { return name.split(/\s+/).filter(Boolean).slice(0, 2).map(p => p[0]).join('').toUpperCase() || 'U'; }
function candidateAvatar(profile, size = '') {
  const image = profile?.photoDataUrl ? `<img class="avatar-photo" src="${escapeHtml(profile.photoDataUrl)}" alt="Candidate profile photo">` : (profile?.photoUrl ? `<img class="avatar-photo" src="${escapeHtml(profile.photoUrl)}" alt="${escapeHtml(profile.full_name || 'Candidate')}" loading="lazy" onerror="this.remove()">` : initials(profile?.full_name || 'Candidate'));
  return `<div class="avatar ${size}">${image}</div>`;
}
function personAvatar(person, size = '') {
  return `<div class="avatar ${size}">${person.photoUrl ? `<img class="avatar-photo" src="${escapeHtml(person.photoUrl)}" alt="${escapeHtml(person.name)}" loading="lazy" onerror="this.remove()">` : escapeHtml(person.initials || initials(person.name))}</div>`;
}
function companyLogo(initialsText, company = '') {
  const map = { 'Buildwise':'assets/companies/logo_buildwise.png', 'Empowermine':'assets/companies/logo_empowermine.png', 'Tupabloom':'assets/companies/logo_tupabloom.png', 'Bella Vida':'assets/companies/logo_bella_vida.png' };
  const src = map[company];
  return src ? `<div class="company-mark company-logo-mark"><img src="${src}" alt="${escapeHtml(company)} logo" loading="lazy" onerror="this.parentElement.textContent='${escapeHtml(initialsText)}'"></div>` : `<div class="company-mark">${escapeHtml(initialsText)}</div>`;
}

function companyPhoto(company = '') {
  const map = {Buildwise:'assets/workplaces/office-3.jpg', Empowermine:'assets/workplaces/office-2.jpg', Tupabloom:'assets/workplaces/office-4.jpg', 'Bella Vida':'assets/workplaces/office-1.jpg'};
  return map[company] || 'assets/workplaces/office-3.jpg';
}
function escapeHtml(value = '') { return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char])); }
function iconSvg(name, extraClass = '') {
  const shapes = {
    home: '<path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2z"/>',
    gauge: '<path d="M20.5 14.5a9 9 0 1 0-17 0"/><path d="m12 12 4-4"/><circle cx="12" cy="12" r="1"/>',
    search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.3 4.3"/>',
    briefcase: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"/>',
    heart: '<path d="M20.8 8.8c0 5.3-8.8 10.1-8.8 10.1S3.2 14.1 3.2 8.8A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.6Z"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.2 1.9-2 2-1.9-1.2a8 8 0 0 1-1.8.8l-.5 2.2h-2.9l-.5-2.2a8 8 0 0 1-1.8-.8l-1.9 1.2-2-2 1.2-1.9a8 8 0 0 1-.8-1.8L3.6 13v-2.9l2.2-.5a8 8 0 0 1 .8-1.8L5.4 5.9l2-2 1.9 1.2a8 8 0 0 1 1.8-.8l.5-2.2h2.9l.5 2.2a8 8 0 0 1 1.8.8l1.9-1.2 2 2-1.2 1.9a8 8 0 0 1 .8 1.8l2.2.5V13l-2.2.5a8 8 0 0 1-.8 1.5Z"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 8v6M23 11h-6"/>',
    sparkles: '<path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3ZM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"/>',
    building: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 7h2m2 0h2M9 11h2m2 0h2M9 15h2m2 0h2M10 21v-3h4v3"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9a2.5 2.5 0 1 1 4.2 1.8c-1.2 1.1-1.8 1.3-1.8 3M12 17.5h.01"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    logout: '<path d="M10 17l5-5-5-5M15 12H3M12 3h6a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"/>',
    pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    filter: '<path d="M4 6h16M7 12h10m-7 6h4"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    chart: '<path d="M3 3v18h18"/><path d="m7 14 4-4 3 3 6-7"/>',
    eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',
    more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>'
  };
  return `<svg class="ui-icon ${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[name] || shapes.sparkles}</svg>`;
}
function persistDemoState() {
  try {
    localStorage.setItem('recruitflow-owner-preview-v3', JSON.stringify({
      savedCandidate: state.savedCandidate,
      savedJobs: [...state.savedJobs],
      applications: state.applications,
      recruiter: state.recruiter,
      preferences: state.preferences,
      campaigns: state.campaigns, team: state.team, evaluationSettings: state.evaluationSettings, organisationDetails: state.organisationDetails
    }));
  } catch { /* Local storage may be unavailable in private browsing. */ }
}
function restoreDemoState() {
  try {
    const saved = JSON.parse(localStorage.getItem('recruitflow-owner-preview-v3') || 'null');
    if (!saved || typeof saved !== 'object') return;
    if (saved.savedCandidate && typeof saved.savedCandidate === 'object') {
      state.savedCandidate = { ...state.savedCandidate, ...saved.savedCandidate };
      state.candidate = JSON.parse(JSON.stringify(state.savedCandidate));
    }
    if (Array.isArray(saved.savedJobs)) state.savedJobs = new Set(saved.savedJobs.map(Number));
    if (Array.isArray(saved.applications)) state.applications = saved.applications;
    if (saved.recruiter && typeof saved.recruiter === 'object') state.recruiter = { ...state.recruiter, ...saved.recruiter };
    if (saved.preferences && typeof saved.preferences === 'object') state.preferences = { ...state.preferences, ...saved.preferences };
    if (Array.isArray(saved.campaigns)) state.campaigns = saved.campaigns;
    if (Array.isArray(saved.team)) state.team = saved.team;
    if (saved.evaluationSettings) state.evaluationSettings = {...state.evaluationSettings,...saved.evaluationSettings};
    if (saved.organisationDetails) state.organisationDetails = {...state.organisationDetails,...saved.organisationDetails};
  } catch { /* Ignore invalid local preview data and use the built-in sample data. */ }
}
function readyItems(profile) {
  return [
    Boolean(profile.full_name?.trim()), Boolean(profile.headline?.trim()), Boolean(profile.summary?.trim()), Boolean(profile.phone?.trim()), Boolean(profile.linkedin?.trim()), Boolean(profile.city?.trim()), Boolean(profile.region?.trim()), (profile.skills || []).length >= 3, Boolean(profile.photo), Boolean(profile.cv)
  ];
}
function completion(profile) { return readyItems(profile).filter(Boolean).length * 10; }
function toast(message, kind = 'success') {
  const region = $('#toastRegion');
  if (!region) return;
  const el = document.createElement('div');
  el.className = 'toast';
  el.setAttribute('role', kind === 'error' ? 'alert' : 'status');
  el.innerHTML = `<span class="toast-mark ${kind === 'error' ? 'is-error' : ''}">${iconSvg(kind === 'error' ? 'close' : 'check')}</span><span>${escapeHtml(message)}</span>`;
  region.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateY(8px)'; setTimeout(() => el.remove(), 250); }, 3400);
}
function closeDetailDrawer() {
  const overlay = $('#detailOverlay');
  if (!overlay) return;
  const returnFocus = overlay.returnFocus;
  overlay.remove();
  document.body.classList.remove('drawer-open');
  document.removeEventListener('keydown', overlay.escapeHandler);
  if (returnFocus && typeof returnFocus.focus === 'function') returnFocus.focus();
}
function openDetailDrawer(title, subtitle, content, footer = '') {
  closeDetailDrawer();
  const overlay = document.createElement('div');
  overlay.id = 'detailOverlay';
  overlay.className = 'detail-overlay';
  overlay.returnFocus = document.activeElement;
  overlay.innerHTML = `<div class="detail-scrim" data-drawer-close></div><aside class="detail-drawer" role="dialog" aria-modal="true" aria-labelledby="detailDrawerTitle" tabindex="-1"><header class="detail-drawer-head"><div><div class="eyebrow">DETAILS</div><h2 id="detailDrawerTitle">${escapeHtml(title)}</h2><p>${escapeHtml(subtitle || '')}</p></div><button type="button" class="icon-button" data-drawer-close aria-label="Close details">${iconSvg('close')}</button></header><div class="detail-drawer-content">${content}</div>${footer ? `<footer class="detail-drawer-foot">${footer}</footer>` : ''}</aside>`;
  overlay.escapeHandler = event => {
    if (event.key === 'Escape') { closeDetailDrawer(); return; }
    if (event.key === 'Tab') {
      const drawer = $('.detail-drawer', overlay);
      const focusable = drawer ? $$('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]', drawer) : [];
      if (!focusable.length) { event.preventDefault(); return; }
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  };
  overlay.addEventListener('click', event => {
    if (event.target.closest('[data-drawer-close]')) { closeDetailDrawer(); return; }
    const action = event.target.closest('[data-drawer-action]');
    if (!action) return;
    const actionName = action.dataset.drawerAction;
    if (actionName === 'open-campaign-editor' || actionName === 'open-campaign-applicants') {
      state.activeCampaignIndex=Number(action.dataset.index);closeDetailDrawer();state.page=actionName==='open-campaign-editor'?'editor':'applicants';workspaceView();
    } else if (actionName === 'save-question') {
      const form=$('#newQuestionForm',overlay);if(!form||!form.reportValidity())return;
      const textValue=$('#questionText',overlay).value.trim();if(!textValue)return;
      const c=state.campaigns[state.activeCampaignIndex];if(!c)return;
      c.questions=(c.questions||['Full name','Email address','CV / résumé','Why are you interested in this role?']).concat(textValue);
      persistDemoState();closeDetailDrawer();workspaceView();
      $('[data-editor-tab="form"]')?.click();toast('Question added to campaign preview.');
    } else if (actionName === 'add-team-member') {
      const form=$('#inviteTeamForm',overlay);if(!form||!form.reportValidity())return;
      const values=new FormData(form);state.team.push({name:String(values.get('name')),email:String(values.get('email')),role:String(values.get('role')),status:'Invited'});
      persistDemoState();closeDetailDrawer();workspaceView();toast('Invitation added to local preview. No email sent.');
    } else if (actionName === 'save-team-role') {
      const member=state.team[Number(action.dataset.index)];if(!member)return;
      member.role=$('#editTeamRole',overlay)?.value||member.role;persistDemoState();closeDetailDrawer();workspaceView();toast('Team role updated locally.');
    } else if (actionName === 'change-applicant-status') {
      const person=state.candidates[Number(action.dataset.index)];if(!person)return;
      person.status=action.dataset.status;persistDemoState();closeDetailDrawer();workspaceView();toast('Applicant status changed in this browser preview.');
    } else if (actionName === 'view-page') {
      const page = action.dataset.page;
      closeDetailDrawer();
      state.page = page;
      workspaceView();
    } else if (actionName === 'apply-job') {
      const job = state.jobs.find(item => item.id === Number(action.dataset.job));
      if (!job) return;
      if (completion(state.savedCandidate) < 80) {
        closeDetailDrawer();
        state.page = 'readiness';
        workspaceView();
        toast('Complete at least 80% of your saved profile before applying.', 'error');
        return;
      }
      if (state.applications.some(application => application.job === job.title)) {
        toast('You have already applied for this sample role.');
        return;
      }
      state.applications.unshift({ job: job.title, company: job.company, status: 'Submitted', date: 'Oct 13, 2026', initials: job.initials });
      persistDemoState();
      closeDetailDrawer();
      state.page = 'applications';
      workspaceView();
      toast(`Application saved in this browser preview. No live application was submitted.`);
    } else if (actionName === 'toggle-campaign') {
      const campaign = state.campaigns[Number(action.dataset.index)];
      if (!campaign) return;
      campaign.status = campaign.status === 'Active' ? 'Draft' : 'Active';
      persistDemoState();
      closeDetailDrawer();
      workspaceView();
      toast(`${campaign.title} is now ${campaign.status.toLowerCase()}.`);
    } else if (actionName === 'review-candidate') {
      const candidateName = action.dataset.candidate;
      closeDetailDrawer();
      state.page = 'evaluations';
      workspaceView();
      toast(`Review queue opened for ${candidateName}.`);
    } else if (actionName === 'create-campaign') {
      const form = $('#createCampaignForm', overlay);
      if (!form || !form.reportValidity()) return;
      const data = new FormData(form);
      const titleValue = String(data.get('title') || '').trim();
      if (!titleValue) return;
      state.campaigns.unshift({ id: `campaign-${Date.now()}`, title: titleValue, type: String(data.get('type') || 'Full-time'), location: String(data.get('location') || 'Namibia'), applicants: 0, status: 'Draft', date: 'Oct 30, 2026', healthTrend: null });
      persistDemoState();
      closeDetailDrawer();
      state.page = 'campaigns';
      workspaceView();
      toast('Campaign draft created.');
    }
  });
  document.body.appendChild(overlay);
  document.body.classList.add('drawer-open');
  document.addEventListener('keydown', overlay.escapeHandler);
  requestAnimationFrame(() => { overlay.classList.add('is-open'); $('.detail-drawer', overlay)?.focus(); });
  return overlay;
}
function openJobDrawer(job) {
  const saved = state.savedJobs.has(job.id);
  const canApply = completion(state.savedCandidate) >= 80;
  const content = `<div class="detail-brand-row"><div class="company-mark">${escapeHtml(job.initials)}</div><div><strong>${escapeHtml(job.company)}</strong><p>${escapeHtml(job.location)}</p></div></div><div class="detail-highlight"><span class="detail-highlight-label">Estimated salary</span><strong>${escapeHtml(job.salary)}</strong><span class="detail-match">${job.match}% match</span></div><div class="detail-section"><h3>Role overview</h3><p>Explore this ${escapeHtml(job.type.toLowerCase())} opportunity and consider how your skills align with the team's needs.</p></div><div class="detail-section"><h3>Skills and interests</h3><div class="detail-tags">${job.tags.map(tag => `<span class="tag blue">${escapeHtml(tag)}</span>`).join('')}</div></div><div class="detail-facts"><div><span>Work type</span><strong>${escapeHtml(job.type)}</strong></div><div><span>Posted</span><strong>${escapeHtml(job.posted)}</strong></div><div><span>Location</span><strong>${escapeHtml(job.location)}</strong></div></div>${!canApply ? `<div class="detail-callout">${iconSvg('gauge')}<div><strong>Profile readiness: ${completion(state.savedCandidate)}%</strong><span>Reach 80% saved readiness to unlock applications.</span></div></div>` : ''}`;
  const footer = `<button class="btn btn-light save-role-btn ${saved ? 'is-saved' : ''}" type="button" data-action="save-job" data-job="${job.id}" aria-pressed="${saved}">${iconSvg('heart')} ${saved ? 'Remove saved role' : 'Save role'}</button>${canApply ? `<button class="btn btn-primary" data-drawer-action="apply-job" data-job="${job.id}">Apply now ${iconSvg('arrow')}</button>` : `<button class="btn btn-primary" data-drawer-action="view-page" data-page="readiness">Complete profile ${iconSvg('arrow')}</button>`}`;
  const overlay = openDetailDrawer(job.title, 'Role details', content, footer);
  $$('[data-action="save-job"]', overlay).forEach(button => button.addEventListener('click', () => {
    const id = Number(button.dataset.job);
    state.savedJobs.has(id) ? state.savedJobs.delete(id) : state.savedJobs.add(id);
    persistDemoState();
    const nextSaved = state.savedJobs.has(id);
    button.classList.toggle('is-saved', nextSaved);
    button.setAttribute('aria-pressed', String(nextSaved));
    button.setAttribute('aria-label', nextSaved ? 'Remove from favourites' : 'Add to favourites');
    button.innerHTML = `${iconSvg('heart')} ${nextSaved ? 'Remove saved role' : 'Save role'}`;
    toast(nextSaved ? 'Added to favourites.' : 'Removed from favourites.');
  }));
}
function openCandidateDrawer(candidate) {
  const content = `<div class="detail-person">${personAvatar(candidate, 'large')}<div><h3>${escapeHtml(candidate.name)}</h3><p>${escapeHtml(candidate.role)}</p><span class="status-pill ${candidate.status === 'New' ? 'review' : candidate.status === 'In review' ? 'pending' : ''}">${escapeHtml(candidate.status)}</span></div></div><div class="detail-highlight"><span class="detail-highlight-label">Profile readiness</span><strong>${Number(candidate.readiness)}%</strong><div class="progress-line"><span style="width:${Math.min(100, Number(candidate.readiness) || 0)}%"></span></div></div><div class="detail-section"><h3>Skills</h3><div class="detail-tags">${(candidate.skills || []).map(skill => `<span class="tag blue">${escapeHtml(skill)}</span>`).join('') || '<span class="muted">No skills added</span>'}</div></div><div class="detail-section"><h3>Next step</h3><p>Review the candidate profile and compare their experience with the requirements of your open role.</p></div>`;
  openDetailDrawer(candidate.name, 'Candidate profile', content, `<button class="btn btn-light" data-drawer-close>Close</button><button class="btn btn-primary" data-drawer-action="review-candidate" data-candidate="${escapeHtml(candidate.name)}">Start review ${iconSvg('arrow')}</button>`);
}
function openCampaignDrawer(campaign, index) {
  const values = Array.isArray(campaign.healthTrend) ? campaign.healthTrend : null;
  const latest = values?.[values.length - 1];
  const previous = values?.[values.length - 2];
  const delta = latest !== undefined && previous !== undefined ? latest - previous : null;
  const trendNote = values ? 'Seven-day trend shown with illustrative values for this UI concept.' : 'No campaign health history has been supplied yet.';
  const healthDetails = values ? `<div class="detail-highlight"><span class="detail-highlight-label">Latest health index</span><strong>${latest}/100</strong><span class="detail-match">${delta > 0 ? '+' : ''}${delta} from previous day</span></div><div class="detail-section"><h3>Recent health history</h3>${campaignHealthChart(campaign)}</div>` : `<div class="chart-empty"><div class="chart-empty-icon">${iconSvg('chart')}</div><strong>No health history yet</strong><span>Trend details will appear when campaign data is available.</span></div>`;
  const content = `<div class="detail-person"><div class="company-mark">${escapeHtml(campaign.title.split(' ').slice(0,2).map(word => word[0]).join('').toUpperCase())}</div><div><h3>${escapeHtml(campaign.title)}</h3><p>${escapeHtml(campaign.type)} · ${escapeHtml(campaign.location)}</p><span class="status-pill ${campaign.status === 'Draft' ? 'pending' : ''}">${escapeHtml(campaign.status)}</span></div></div><div class="detail-facts"><div><span>Applicants</span><strong>${campaign.applicants}</strong></div><div><span>Close date</span><strong>${escapeHtml(campaign.date)}</strong></div><div><span>Campaign ID</span><strong>RF-${2026 + index}</strong></div></div><div class="detail-section"><h3>Campaign health</h3><p>${trendNote}</p></div>${healthDetails}`;
  openDetailDrawer(campaign.title, 'Campaign details', content, `<button class="btn btn-light" data-drawer-action="open-campaign-editor" data-index="${index}">Edit role</button><button class="btn btn-light" data-drawer-action="open-campaign-applicants" data-index="${index}">Applicants</button><button class="btn btn-primary" data-drawer-action="toggle-campaign" data-index="${index}">${campaign.status === 'Active' ? 'Move to draft' : 'Activate campaign'} ${iconSvg('arrow')}</button>`);
}
function openCreateCampaignDrawer() {
  const content = `<form id="createCampaignForm" class="drawer-form"><div class="field"><label for="newCampaignTitle">Role title</label><input id="newCampaignTitle" name="title" placeholder="e.g. Product Designer" required maxlength="90"></div><div class="field"><label for="newCampaignType">Employment type</label><select id="newCampaignType" name="type"><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option><option>Temporary</option></select></div><div class="field"><label for="newCampaignLocation">Location</label><input id="newCampaignLocation" name="location" value="Windhoek · Hybrid" required maxlength="100"></div><p class="field-hint">A draft is created locally. No live vacancy is published from this preview.</p></form>`;
  openDetailDrawer('Create campaign', 'New opportunity', content, `<button class="btn btn-light" data-drawer-close>Cancel</button><button class="btn btn-primary" data-drawer-action="create-campaign">Create draft ${iconSvg('arrow')}</button>`);
}
function brandLockup(extra = '') { return `<div class="brand-lockup ${extra}"><img class="brand-logo" src="assets/recruitflow-logo.png" alt="RecruitFlow logo"><span class="brand-name">RecruitFlow<small>by Refrane</small></span></div>`; }
function headerText(page, role) {
  const candidateTitles = {
    dashboard:['Overview','Your career, at a glance.'], readiness:['Profile readiness','Complete your profile and unlock applications.'],
    jobs:['Find opportunities','Explore roles matched to your interests.'],applications:['My applications','Follow each application and next step.'],
    saved:['Saved jobs','Opportunities you want to keep close.'], subscription:['Subscription & access','Manage your application access options.'],
    settings:['Account settings','Make RecruitFlow feel like yours.']
  };
  const recruiterTitles = {
    dashboard:['Overview','Your hiring, at a glance.'],candidates:['Candidates','Find and evaluate talent across roles.'],
    campaigns:['Campaigns','Manage open roles and publishing.'], editor:['Campaign editor','Role details, application form and evaluation settings.'],
    applicants:['Campaign applicants','Review, qualify and shortlist applicants.'], evaluations:['AI evaluations','Review criteria, templates and feedback.'],
    team:['Team & access','Invite colleagues and manage permissions.'], organisation:['Business settings','Company identity, contact details and publishing.'],
    access:['Workspace status','Review access and approval information.'], settings:['Account settings','Appearance and personal preferences.']
  };
  return (role === 'candidate' ? candidateTitles : recruiterTitles)[page] || ['Workspace','RecruitFlow by Refrane'];
}
function loginView() {
  return `<main class="login-page">
    <section class="login-visual" aria-label="RecruitFlow">
      <div class="login-brand">${brandLockup()}</div>
      <div class="login-copy">
        <div class="eyebrow">YOUR RECRUITFLOW WORKSPACE</div>
        <h1>People and progress, <span>in one place.</span></h1>
        <p>A clear space for candidates to explore opportunities and teams to make thoughtful hiring decisions.</p>
        <div class="login-artwork login-stock-art" aria-hidden="true"><div class="login-photo-card"><img src="assets/workplaces/office-2.jpg" alt=""></div><div class="login-float-label float-one">${iconSvg('users')} Built around people</div><div class="login-float-label float-two">${iconSvg('check')} Smarter next steps</div></div>
      </div>
      <div class="login-foot"><span>RecruitFlow by Refrane</span><span>People, connected.</span></div>
    </section>
    <section class="login-panel"><div class="login-form-wrap">
      <div class="login-mobile-brand">${brandLockup()}</div>
      <div class="login-heading"><h2>Welcome back</h2><p>Sign in to continue to your workspace.</p></div>
      <div class="role-switch" role="tablist" aria-label="Account type"><button type="button" data-role-choice="candidate" class="${state.role === 'candidate' ? 'active' : ''}" role="tab" aria-selected="${state.role === 'candidate'}">Candidate</button><button type="button" data-role-choice="recruiter" class="${state.role === 'recruiter' ? 'active' : ''}" role="tab" aria-selected="${state.role === 'recruiter'}">Recruiter</button></div>
      <form id="loginForm">
        <div class="field"><label for="login-email">Email address</label><input id="login-email" name="email" type="email" autocomplete="email" placeholder="you@example.com" value="${state.role === 'candidate' ? 'jeys@example.com' : 'mia@northstar.example'}" required></div>
        <div class="field"><label for="login-password">Password</label><div class="input-wrap"><input id="login-password" name="password" type="password" autocomplete="current-password" placeholder="Enter your password" value="" required><button class="password-toggle" type="button" data-toggle-password="login-password" aria-label="Show password">${iconSvg('eye')}</button></div></div>
        <div class="form-row"><label class="check-line"><input type="checkbox" name="remember" checked> Keep me signed in</label><button type="button" class="link-button" data-action="forgot">Forgot password?</button></div>
        <button class="btn btn-primary btn-block" type="submit">Open ${state.role === 'candidate' ? 'candidate' : 'recruiter'} workspace <span>${iconSvg('arrow')}</span></button>
      </form>
      <div class="login-footer"><div class="auth-extra-actions"><button type="button" class="link-button" data-auth="signup">Create account</button><button type="button" class="link-button" data-auth="invite">Accept team invite</button></div><span>Explore with illustrative content. Changes stay in this browser.</span></div>
    </div></section>
  </main>`;
}
function authPreviewView(kind) {
  const headings={signup:['Create an account','Join as a candidate or an organisation.'],forgot:['Reset your password','Request a password-reset link.'],reset:['Choose a new password','Set a secure password for your account.'],invite:['Accept an invitation','Join your recruitment team.']};
  const [title,subtitle]=headings[kind]||headings.signup;
  const roleChoice=kind==='signup'?`<div class="role-switch"><button type="button" class="${state.role==='candidate'?'active':''}" data-role-choice="candidate">Candidate</button><button type="button" class="${state.role==='recruiter'?'active':''}" data-role-choice="recruiter">Recruiter</button></div>`:'';
  const fields=kind==='signup'?`<div class="field"><label for="newAccountName">Full name</label><input id="newAccountName" name="name" required></div><div class="field"><label for="newAccountEmail">Email</label><input id="newAccountEmail" name="email" type="email" required></div><div class="field"><label for="newAccountPassword">Password</label><input id="newAccountPassword" name="password" type="password" minlength="8" required></div>`
    :kind==='invite'?`<div class="field"><label for="inviteToken">Invitation token</label><input id="inviteToken" name="token" placeholder="Paste invitation token" required></div><div class="field"><label for="inviteEmail">Email</label><input id="inviteEmail" name="email" type="email" required></div>`
    :kind==='reset'?`<div class="field"><label for="newPassword">New password</label><input id="newPassword" name="password" type="password" minlength="8" required></div><div class="field"><label for="confirmNewPassword">Confirm password</label><input id="confirmNewPassword" name="confirm_password" type="password" minlength="8" required></div>`
    :`<div class="field"><label for="forgotEmail">Email address</label><input id="forgotEmail" name="email" type="email" required></div>`;
  return `<main class="auth-preview-page"><div class="auth-preview-card">${brandLockup('auth-preview-brand')}<div class="login-heading"><h2>${title}</h2><p>${subtitle}</p></div>${roleChoice}<form id="authPreviewForm" data-kind="${kind}">${fields}<button class="btn btn-primary btn-block" type="submit">${kind==='signup'?'Create account':kind==='invite'?'Accept invitation':kind==='reset'?'Update password':'Request reset link'}</button></form><div class="info-tile">The live authentication and email service is not connected to this UI presentation. This form demonstrates the original flow without creating accounts or sending emails.</div>${kind==='forgot'?'<div class="auth-extra-actions"><button type="button" class="link-button" data-auth="reset">Preview new-password screen</button></div>':''}<button type="button" class="link-button" data-auth="login">${iconSvg('arrow')} Back to sign in</button></div></main>`;
}
function sidebar(role, page) {
  const links = role === 'candidate' ? candidateNav : recruiterNav;
  const name = role === 'candidate' ? state.candidate.full_name : state.recruiter.name;
  const subtitle = role === 'candidate' ? 'Candidate account' : state.recruiter.organisation;
  return `<aside class="sidebar" id="sidebar">
    <div class="sidebar-brand">${brandLockup()}</div>
    <div class="sidebar-role"><div class="role-icon">${iconSvg(role === 'candidate' ? 'sparkles' : 'briefcase')}</div><div><strong>${role === 'candidate' ? 'Candidate space' : 'Recruiter studio'}</strong><small>${role === 'candidate' ? 'Your career, in motion' : 'Hiring workspace'}</small></div></div>
    ${(role === 'candidate' ? ['WORKSPACE','ACCOUNT'] : ['WORKSPACE','MANAGEMENT']).map(section => `<div class="nav-label">${section}</div><nav class="nav-list" aria-label="${section.toLowerCase()}">${links.filter(item => item.section === section).map(item => `<button class="nav-item ${page === item.page ? 'active' : ''}" data-page="${item.page}" ${page === item.page ? 'aria-current="page"' : ''}><span class="nav-icon">${iconSvg(item.icon)}</span><span>${item.label}</span>${item.count ? `<span class="nav-count">${item.count}</span>` : ''}</button>`).join('')}</nav>`).join('')}
    ${role === 'candidate' ? `<div class="sidebar-bottom"><div class="upgrade-card"><strong>Your next step is closer.</strong><p>Finish your profile to unlock more relevant opportunities.</p><button type="button" class="btn" data-page="readiness">Complete profile ↗</button></div>` : `<div class="sidebar-bottom"><div class="upgrade-card"><strong>Make hiring feel human.</strong><p>Bring your team together around better decisions.</p><button type="button" class="btn" data-page="campaigns">Manage campaigns ↗</button></div>`}
      <div class="user-mini">${role === 'candidate' ? candidateAvatar(state.candidate) : `<div class="avatar"><img class="avatar-photo" src="assets/people/person-2.jpg" alt="Recruiter profile"></div>`}<div class="user-mini-text"><strong>${escapeHtml(name)}</strong><small>${escapeHtml(subtitle)}</small></div><button class="icon-button" type="button" data-action="logout" title="Sign out" aria-label="Sign out">${iconSvg('logout')}</button></div>
    </div>
  </aside><div class="mobile-scrim" id="mobileScrim"></div>`;
}
function topbar(page, role) {
  const [title] = headerText(page, role);
  const search = role === 'recruiter' ? `<div class="searchbox">${iconSvg('search')}<input id="globalSearch" type="search" aria-label="Search recruiter workspace" placeholder="Search candidates or campaigns"></div>` : '';
  return `<header class="topbar"><div class="topbar-left"><button type="button" class="icon-button mobile-menu" data-action="menu" aria-label="Open menu">${iconSvg('menu')}</button><div class="breadcrumb">${role === 'candidate' ? 'Candidate workspace' : 'Recruiter workspace'}<strong>${title}</strong></div></div><div class="topbar-tools">${search}<button class="icon-button" type="button" data-action="notifications" aria-label="Notifications">${iconSvg('bell')}</button><button class="icon-button" type="button" data-action="help" aria-label="Help">${iconSvg('help')}</button><button class="icon-button profile-tool" type="button" data-action="profile-menu" aria-label="Open account settings">${role === 'candidate' ? candidateAvatar(state.candidate) : `<img class="avatar-photo" src="assets/people/person-2.jpg" alt="Recruiter account">`}</button></div></header>`;
}
function pageHeading(title, subtitle, actions = '') { return `<div class="page-heading"><div><h1>${title}</h1><p>${subtitle}</p></div><div class="heading-actions">${actions}</div></div>`; }
function donut(percent, small = 'profile ready') {
  const circumference = 2 * Math.PI * 53;
  const offset = circumference * (1 - percent / 100);
  return `<div class="readiness-donut"><svg viewBox="0 0 126 126" aria-hidden="true"><defs><linearGradient id="donutGradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#665cf5"/><stop offset="1" stop-color="#4bc7df"/></linearGradient></defs><circle class="donut-bg" cx="63" cy="63" r="53"/><circle class="donut-progress" cx="63" cy="63" r="53" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"/></svg><div class="donut-center"><strong>${percent}%</strong><span>${small}</span></div></div>`;
}
function candidateDashboard() {
  const percent = completion(state.savedCandidate);
  const jobs = state.jobs.filter(j => j.match >= 80).slice(0,3);
  const applications = state.applications.slice(0,3);
  const missing = ['Full name','Professional headline','Bio / summary','Phone number','LinkedIn URL','City / town','Region','Skills (at least 3)','Profile photo','CV / résumé'].filter((_,i) => !readyItems(state.savedCandidate)[i]);
  return `${pageHeading(`Welcome back, ${escapeHtml((state.candidate.full_name || 'there').split(' ')[0])}`, 'Your next step, all in one place.', `<button class="btn btn-light" data-page="applications">My applications</button><button class="btn btn-primary" data-page="jobs">Explore roles <span>→</span></button>`)}
    <section class="card hero-card"><div class="hero-copy"><div class="eyebrow">YOUR NEXT CHAPTER</div><h2>Make space for work<br>that feels like you.</h2><p>Discover thoughtful teams and roles that match your skills, interests, and ambition.</p><button class="btn" data-page="jobs">Explore opportunities <span>↗</span></button></div><div class="hero-art hero-photo-art" aria-hidden="true"><img src="assets/workplaces/office-1.jpg" alt=""></div></section>
    <div class="grid grid-4 section-gap">
      <div class="card metric-card"><div class="metric-top"><div class="metric-icon">${iconSvg('gauge')}</div><span class="metric-change ${percent < 80 ? 'neutral' : ''}">${percent >= 80 ? 'Ready to apply' : `${80-percent}% to unlock`}</span></div><div class="metric-value">${percent}%</div><div class="metric-label">Profile readiness</div></div>
      <div class="card metric-card"><div class="metric-top"><div class="metric-icon mint">${iconSvg('briefcase')}</div><span class="metric-change neutral">+1 this week</span></div><div class="metric-value">${state.applications.length}</div><div class="metric-label">Applications sent</div></div>
      <div class="card metric-card"><div class="metric-top"><div class="metric-icon peach">${iconSvg('heart')}</div><span class="metric-change neutral">Saved for later</span></div><div class="metric-value">${state.savedJobs.size}</div><div class="metric-label">Saved opportunities</div></div>
      <div class="card metric-card"><div class="metric-top"><div class="metric-icon sky">${iconSvg('sparkles')}</div><span class="metric-change">Strong match</span></div><div class="metric-value">${jobs[0]?.match || 0}%</div><div class="metric-label">Top role match</div></div>
    </div>
    <div class="grid grid-2 section-gap">
      <section class="card"><div class="card-head"><div><h2 class="card-title">Your profile, at a glance</h2><p class="card-subtitle">Keep your story up to date to get better matches.</p></div><button class="inline-link" data-page="readiness">Edit profile ↗</button></div><div class="readiness-layout"><div class="readiness-kpi">${donut(percent)}<div><strong>${percent >= 80 ? 'Looking good!' : 'You’re on your way'}</strong><small>${percent >= 80 ? 'Your profile can unlock applications.' : `Complete ${Math.max(0,80-percent)}% more to unlock applications.`}</small></div></div><div><div style="display:flex;justify-content:space-between;gap:10px;margin-bottom:13px;font-size:11px"><strong>Profile essentials</strong><span style="color:var(--muted)">${readyItems(state.savedCandidate).filter(Boolean).length}/10 complete</span></div><ul class="list-clean">${['Add your full name','Write a professional headline','Add at least 3 skills','Upload your CV'].map((label,i)=>{const ok=[!!state.savedCandidate.full_name,!!state.savedCandidate.headline,(state.savedCandidate.skills||[]).length>=3,!!state.savedCandidate.cv][i]; return `<li><span class="list-check ${ok?'':'pending'}">${ok?'✓':'·'}</span>${label}</li>`;}).join('')}</ul></div></div></section>
      <section class="card"><div class="card-head"><div><h2 class="card-title">Application status</h2><p class="card-subtitle">Application stages from the saved preview records.</p></div><button class="inline-link" data-page="applications">View all ↗</button></div><div class="application-stage-list">${[['Submitted','Sent to employer','briefcase'],['In review','Employer is reviewing','eye'],['Interview','Next conversation','sparkles']].map(([status,desc,ico])=>`<div class="stage-row"><span class="stage-icon">${iconSvg(ico)}</span><div><strong>${status}</strong><small>${desc}</small></div><div class="stage-count">${state.applications.filter(a=>a.status===status).length}</div></div>`).join('')}</div><div class="stage-latest"><strong>Most recent:</strong> ${escapeHtml(applications[0]?.job || 'No applications yet')} <span>${escapeHtml(applications[0]?.status || '—')}</span></div></section>
    </div>
    <section class="section-gap"><div class="card-head"><div><h2 class="card-title">Roles picked for you</h2><p class="card-subtitle">Good-fit opportunities based on your interests and skills.</p></div><button class="inline-link" data-page="jobs">Browse all ↗</button></div><div class="grid grid-3">${jobs.map(jobCard).join('')}</div></section>
    <div class="footer-note">You’re in control of your journey. Take it one step at a time.</div>`;
}
function jobCard(job) {
  const saved = state.savedJobs.has(job.id);
  return `<article class="card hoverable job-card-article"><div class="company-photo-banner"><img src="${companyPhoto(job.company)}" alt="${escapeHtml(job.company)} workplace" loading="lazy" onerror="this.parentElement.classList.add('image-fallback');this.remove()"></div><div class="job-card">${companyLogo(job.initials, job.company)}<div class="job-info"><h3>${escapeHtml(job.title)}</h3><div class="company">${escapeHtml(job.company)}</div></div><button class="favorite-btn ${saved ? 'is-saved' : ''}" type="button" data-action="save-job" data-job="${job.id}" aria-pressed="${saved}" aria-label="${saved ? 'Remove from favourites' : 'Add to favourites'}">${iconSvg('heart')}</button></div><div class="job-meta"><span class="tag job-location">${iconSvg('pin')} ${escapeHtml(job.location)}</span><span class="tag">${escapeHtml(job.type)}</span></div><div class="job-meta">${job.tags.map(tag=>`<span class="tag blue">${escapeHtml(tag)}</span>`).join('')}</div><div class="job-foot"><div><strong>${escapeHtml(job.salary)}</strong><br><small>${job.posted} · ${job.match}% match</small></div><button class="btn btn-soft btn-small" data-action="view-job" data-job="${job.id}">View role ${iconSvg('arrow')}</button></div></article>`;
}
function readinessPage() {
  const saved = state.savedCandidate;
  const live = state.candidate;
  const savedPercent = completion(saved), livePercent = completion(live);
  const savedItems = readyItems(saved), liveItems = readyItems(live);
  const unsaved = JSON.stringify(live) !== JSON.stringify(saved);
  const checklist = [
    ['Full name','How you appear to employers',Boolean(live.full_name?.trim()),'full_name'],
    ['Professional headline','A clear one-line introduction',Boolean(live.headline?.trim()),'headline'],
    ['Bio / summary','At least a short paragraph about you',Boolean(live.summary?.trim()),'summary'],
    ['Phone number','A contact number for employers',Boolean(live.phone?.trim()),'phone'],
    ['LinkedIn URL','A link to your professional profile',Boolean(live.linkedin?.trim()),'linkedin'],
    ['City / town','Where you are based',Boolean(live.city?.trim()),'city'],
    ['Region','Your region in Namibia',Boolean(live.region?.trim()),'region'],
    ['Skills (at least 3)','Show recruiters what you can do',(live.skills||[]).length>=3,'skills'],
    ['Profile photo','Help your profile feel personal',Boolean(live.photo),'photo'],
    ['CV / résumé','A current version of your CV',Boolean(live.cv),'cv']
  ];
  return `${pageHeading('Profile readiness','Build a complete picture of who you are and where you want to go.', `<button class="btn btn-light" data-action="reset-profile">Reset profile</button><button class="btn btn-primary" data-action="save-profile">Save changes ✓</button>`)}
    <div class="grid grid-2">
      <section class="card"><div class="card-head"><div><h2 class="card-title">Your profile score</h2><p class="card-subtitle">Your saved readiness is what the rest of the workspace uses.</p></div><span class="tag blue">SAVED PROFILE</span></div><div class="readiness-kpi" style="justify-content:center;padding:10px 0 22px">${donut(savedPercent,'saved readiness')}<div><strong>${savedPercent >= 80 ? 'Ready to move' : 'A little more to go'}</strong><small>${savedPercent >= 80 ? 'You’ve unlocked applications.' : `${80-savedPercent}% to reach the 80% threshold.`}</small><div style="margin-top:14px"><span class="status-pill ${savedPercent>=80?'':'pending'}">${savedPercent>=80?'Ready to apply':'Not ready yet'}</span></div></div></div><div class="progress-line"><span style="width:${savedPercent}%"></span></div><div style="display:flex;justify-content:space-between;margin-top:9px;font-size:10px;color:var(--muted)"><span>${savedItems.filter(Boolean).length}/10 essentials complete</span><span>Target: 80%</span></div>
        ${unsaved ? `<div class="demo-note" style="margin-top:18px"><strong>Unsaved changes</strong><br>Your edits bring readiness to ${livePercent}%. Press Save to update your saved profile and dashboard.</div>` : `<div class="demo-note" style="margin-top:18px">Your saved progress is in sync with the candidate dashboard.</div>`}
      </section>
      <section class="card"><div class="card-head"><div><h2 class="card-title">Readiness checklist</h2><p class="card-subtitle">Your profile score is based on these ten essentials.</p></div></div><div id="readinessChecklist">${checklist.map((item,i)=>`<div class="checklist-item"><div class="checklist-copy"><span class="check-box">${liveItems[i]?'✓':String(i+1).padStart(2,'0')}</span><div><strong>${item[0]}</strong><small>${item[1]}</small></div></div><span class="status-pill ${liveItems[i]?'':'pending'}">${liveItems[i]?'Complete':'Needed'}</span></div>`).join('')}</div></section>
    </div>
    <section class="card section-gap"><div class="card-head"><div><h2 class="card-title">Make it yours</h2><p class="card-subtitle">Edit your details below. Your dashboard updates after you save.</p></div><span class="tag">PRIVATE UNTIL YOU APPLY</span></div>
      <div class="profile-header">${candidateAvatar(live, 'large')}<div style="flex:1"><h3>${escapeHtml(live.full_name || 'Your name')}</h3><p>${escapeHtml(live.headline || 'Add your headline to introduce yourself.')}</p></div><button class="btn btn-light btn-small" type="button" data-action="upload-photo">${live.photo?'Replace photo':'Add photo'}</button><input id="photoUpload" type="file" accept="image/png,image/jpeg,image/webp" hidden aria-label="Choose profile photo"></div>
      <form id="profileForm"><div class="profile-editor">
        <div class="field"><label for="full_name">Full name *</label><input id="full_name" name="full_name" data-profile="full_name" value="${escapeHtml(live.full_name)}" required></div>
        <div class="field"><label for="headline">Professional headline *</label><input id="headline" name="headline" data-profile="headline" value="${escapeHtml(live.headline)}" placeholder="e.g. Junior accountant" required></div>
        <div class="field span-2"><label for="summary">Bio / summary *</label><textarea id="summary" name="summary" data-profile="summary" required>${escapeHtml(live.summary)}</textarea></div>
        <div class="field"><label for="phone">Phone number *</label><input id="phone" name="phone" data-profile="phone" value="${escapeHtml(live.phone)}" placeholder="+264 81 000 0000"></div>
        <div class="field"><label for="linkedin">LinkedIn URL *</label><input id="linkedin" name="linkedin" data-profile="linkedin" value="${escapeHtml(live.linkedin)}" placeholder="linkedin.com/in/your-name"></div>
        <div class="field"><label for="city">City / town *</label><input id="city" name="city" data-profile="city" value="${escapeHtml(live.city)}"></div>
        <div class="field"><label for="region">Region *</label><select id="region" name="region" data-profile="region"><option value="">Select region…</option>${['Erongo','Hardap','//Karas','Kavango East','Kavango West','Khomas','Kunene','Ohangwena','Omaheke','Omusati','Oshana','Oshikoto','Otjozondjupa','Zambezi'].map(region=>`<option ${live.region===region?'selected':''}>${region}</option>`).join('')}</select></div>
        <div class="field span-2"><label for="skill-input">Skills (add at least 3)</label><div class="skill-list">${live.skills.map((skill,i)=>`<span class="skill-chip">${escapeHtml(skill)} <button type="button" data-action="remove-skill" data-index="${i}" aria-label="Remove ${escapeHtml(skill)}">×</button></span>`).join('')}</div><div style="display:flex;gap:9px"><input id="skill-input" name="skill" placeholder="Type a skill, then press Add" style="flex:1;min-width:0"><button class="btn btn-soft" type="button" data-action="add-skill">Add skill</button></div></div>
        <div class="field"><label for="experience">Years of experience</label><select id="experience" name="years" data-profile="years">${['New to work','Less than 1 year','1–2 years','3–5 years','5+ years'].map(x=>`<option ${live.years===x?'selected':''}>${x}</option>`).join('')}</select></div>
        <div class="field"><label for="notice">Notice period (days)</label><input id="notice" name="notice" type="number" min="0" data-profile="notice" value="${escapeHtml(live.notice)}"></div>
        <div class="field"><label for="relocate">Open to relocating</label><select id="relocate" name="relocate" data-profile="relocate"><option value="true" ${live.relocate?'selected':''}>Yes, within Namibia</option><option value="false" ${!live.relocate?'selected':''}>Not at this time</option></select></div>
        <div class="field"><label for="portfolio">Portfolio / personal website (optional)</label><input id="portfolio" name="portfolio" data-profile="portfolio" value="${escapeHtml(live.portfolio||'')}" placeholder="https://your-work.example"></div>
        <div class="field"><label for="languages">Languages spoken (optional)</label><input id="languages" name="languages" data-profile="languages" value="${escapeHtml((live.languages||[]).join(', '))}" placeholder="English, Oshiwambo"></div>
        <div class="field span-2"><label>Employment types (select all that apply)</label><div class="multi-choice">${['Full-time','Part-time','Contract','Temporary','Internship'].map(type=>`<label class="check-line"><input type="checkbox" data-employment-type="${type}" ${(live.employment||[]).includes(type)?'checked':''}> ${type}</label>`).join('')}</div></div>
        <div class="field span-2"><label for="cvUpload">CV / résumé</label><div style="display:flex;align-items:center;gap:13px;padding:14px;border:1px solid var(--line);border-radius:14px"><div class="company-mark">PDF</div><div style="flex:1;min-width:0"><strong style="font-size:11px;display:block;overflow-wrap:anywhere">${live.cv?escapeHtml(live.cvName || 'CV selected'):'No CV uploaded'}</strong><small style="color:var(--muted);font-size:10px">PDF or Word document · up to 10 MB</small></div><button class="btn btn-light btn-small" type="button" data-action="upload-cv">${live.cv?'Replace file':'Upload CV'}</button><input id="cvUpload" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" hidden></div></div>
      </div><div style="display:flex;justify-content:flex-end;gap:10px;margin-top:20px"><button class="btn btn-light" type="button" data-action="discard-profile">Discard edits</button><button class="btn btn-primary" type="submit">Save profile changes <span>✓</span></button></div></form>
    </section><div class="footer-note">Your saved readiness is shared with the dashboard and opportunity pages.</div>`;
}
function jobsPage(mode = 'all') {
  let jobs = state.jobs;
  if (mode === 'saved') jobs = jobs.filter(j => state.savedJobs.has(j.id));
  return `${pageHeading(mode === 'saved' ? 'Saved jobs' : 'Find your next opportunity', mode === 'saved' ? 'All the roles you’ve kept close.' : 'Explore roles with people-first teams and room to grow.', `<button class="btn btn-light" data-page="readiness">Profile readiness ${completion(state.savedCandidate)}%</button>`)}
    <div class="filters"><input id="jobSearch" type="search" placeholder="Search by role, company, or skill…" aria-label="Search jobs"><select id="jobType" aria-label="Filter by employment type"><option value="">All employment types</option><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option></select><select id="jobLocation" aria-label="Filter by location"><option value="">All locations</option><option>Windhoek</option><option>Remote</option></select><select id="jobService" aria-label="Filter by service"><option value="">All services</option><option>Technology</option><option>Design</option><option>Research</option></select></div>
    <div id="jobsGrid" class="grid grid-2">${jobs.length ? jobs.map(jobCard).join('') : `<div class="card empty-state"><div class="empty-icon">${iconSvg('heart')}</div><h3>No saved roles yet</h3><p>Save a role when something catches your eye. You can come back to it here.</p><button class="btn btn-primary" data-page="jobs">Explore roles</button></div>`}</div>
    <div class="footer-note">Preview workspace · sample opportunities, not live postings</div>`;
}
function applicationsPage() {
  return `${pageHeading('Your applications','See your latest activity and keep each opportunity moving.', `<button class="btn btn-primary" data-page="jobs">Find more roles <span>→</span></button>`)}
    <div class="grid grid-3"><div class="card metric-card"><div class="metric-icon">${iconSvg('briefcase')}</div><div class="metric-value">${state.applications.length}</div><div class="metric-label">Total applications</div></div><div class="card metric-card"><div class="metric-icon mint">${iconSvg('clock')}</div><div class="metric-value">${state.applications.filter(a=>a.status==='In review').length}</div><div class="metric-label">In review</div></div><div class="card metric-card"><div class="metric-icon peach">${iconSvg('sparkles')}</div><div class="metric-value">${state.applications.filter(a=>a.status==='Interview').length}</div><div class="metric-label">Interviews</div></div></div>
    <section class="card section-gap"><div class="card-head"><div><h2 class="card-title">Recent applications</h2><p class="card-subtitle">Status updates will appear here.</p></div><span class="tag">LATEST FIRST</span></div><div class="table-wrap"><table><thead><tr><th>Role</th><th>Date submitted</th><th>Status</th><th>Action</th></tr></thead><tbody>${state.applications.map(app=>`<tr><td><div class="person-cell">${companyLogo(app.initials, app.company)}<div><strong>${escapeHtml(app.job)}</strong><small>${escapeHtml(app.company)}</small></div></div></td><td>${app.date}</td><td><span class="status-pill ${app.status==='Submitted'?'review':app.status==='Interview'?'':'pending'}">${escapeHtml(app.status)}</span></td><td><button class="mini-action" data-action="application-detail" data-job-title="${escapeHtml(app.job)}" aria-label="View application">${iconSvg('external')}</button></td></tr>`).join('')}</tbody></table></div></section>`;
}
function candidateSettings() {
  return `${pageHeading('Account settings','Your account, your preferences.', `<button class="btn btn-primary" data-action="save-settings">Save preferences ✓</button>`)}
    <div class="grid grid-2"><section class="card"><div class="card-head"><div><h2 class="card-title">Personal information</h2><p class="card-subtitle">The basics for your account.</p></div></div><div class="settings-row"><div><strong>Name</strong><small>${escapeHtml(state.candidate.full_name)}</small></div><button class="btn btn-light btn-small" data-page="readiness">Edit</button></div><div class="settings-row"><div><strong>Email address</strong><small>${escapeHtml(state.candidate.email)} · Used to sign in</small></div><span class="tag">VERIFIED</span></div><div class="settings-row"><div><strong>Password</strong><small>Last changed a while ago</small></div><button class="btn btn-light btn-small" data-action="change-password">Update</button></div></section>
    <section class="card"><div class="card-head"><div><h2 class="card-title">Notifications</h2><p class="card-subtitle">Choose what you’d like to hear about.</p></div></div>${[['Role recommendations','A weekly digest of roles selected for you.','roleRecommendations'],['Application updates','Get a note when your status changes.','applicationUpdates'],['Product news','Occasional news and thoughtful tips.','productNews']].map(x=>`<div class="settings-row"><div><strong>${x[0]}</strong><small>${x[1]}</small></div><input type="checkbox" class="toggle preference-toggle" ${state.preferences[x[2]]?'checked':''} aria-label="${x[0]}" data-preference-key="${x[2]}"></div>`).join('')}</section><section class="card appearance-card"><div class="card-head"><div><h2 class="card-title">Appearance</h2><p class="card-subtitle">Choose a comfortable look for RecruitFlow.</p></div></div><div class="settings-row"><div><strong>Dark mode</strong><small>Use a darker workspace in low light.</small></div><input type="checkbox" class="toggle" data-action="dark-mode" aria-label="Enable dark mode" ${state.preferences.darkMode?'checked':''}></div></section></div>`;
}
function campaignHealthChart(campaign) {
  const values = campaign?.healthTrend;
  if (!Array.isArray(values) || values.length < 2) {
    return `<div class="chart-empty"><div class="chart-empty-icon">${iconSvg('chart')}</div><strong>No health history yet</strong><span>This new campaign has no trend data. The chart will appear when data is available.</span></div>`;
  }
  const labels = ['Oct 7', 'Oct 8', 'Oct 9', 'Oct 10', 'Oct 11', 'Oct 12', 'Oct 13'];
  const left = 44, right = 628, top = 20, bottom = 176;
  const points = values.map((value, index) => ({
    value,
    x: left + (right - left) * index / (values.length - 1),
    y: bottom - (Math.max(0, Math.min(100, value)) / 100) * (bottom - top)
  }));
  const line = points.map((point, index) => `${index ? 'L' : 'M'} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(' ');
  const area = `${line} L ${right} ${bottom} L ${left} ${bottom} Z`;
  const grid = [0, 25, 50, 75, 100].map(value => {
    const y = bottom - (value / 100) * (bottom - top);
    return `<line class="health-grid" x1="${left}" y1="${y}" x2="${right}" y2="${y}"/><text class="health-y-label" x="30" y="${y + 4}" text-anchor="end">${value}</text>`;
  }).join('');
  const axisLabels = points.map((point, index) => `<text class="health-x-label" x="${point.x}" y="201" text-anchor="middle">${labels[index] || `Day ${index + 1}`}</text>`).join('');
  const dots = points.map((point, index) => `<circle class="health-point" cx="${point.x}" cy="${point.y}" r="4" tabindex="0" role="img" aria-label="${labels[index] || `Day ${index + 1}`}: ${point.value} out of 100, illustrative data"><title>${labels[index] || `Day ${index + 1}`}: ${point.value}/100 (illustrative)</title></circle>`).join('');
  return `<div class="campaign-health-visual"><div class="health-chart-legend"><span class="health-legend-dot"></span><span>Campaign health index</span><span class="sample-chip">Illustrative data</span></div><div class="simple-chart health-chart"><svg viewBox="0 0 650 218" role="img" aria-label="Illustrative campaign health trend for ${escapeHtml(campaign.title)} from October 7 to October 13, on a scale from 0 to 100" preserveAspectRatio="xMidYMid meet"><defs><linearGradient id="healthAreaGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3678f5" stop-opacity=".24"/><stop offset="1" stop-color="#3678f5" stop-opacity="0.01"/></linearGradient></defs>${grid}<path class="health-area" d="${area}"/><path class="health-line" d="${line}"/>${dots}${axisLabels}</svg></div></div>`;
}
function recruiterActivityChart() {
  const days=Array.from({length:14},(_,i)=>13-i);
  const values=days.map(day=>state.candidates.filter(c=>c.appliedDaysAgo===day).length);
  const max=Math.max(2,...values);
  const points=values.map((v,i)=>[24+i*34,145-(v/max)*112]);
  const poly=points.map(p=>p.map(n=>n.toFixed(1)).join(',')).join(' ');
  return `<div class="sample-chart-label">14-day trend · illustrative candidate records</div><div class="recruiter-activity-graph"><svg viewBox="0 0 500 185" preserveAspectRatio="none" role="img" aria-label="New applicant records over 14 days"><defs><linearGradient id="candidateActivityArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#11bfa3" stop-opacity=".22"/><stop offset="1" stop-color="#11bfa3" stop-opacity="0"/></linearGradient></defs>${[33,89,145].map(y=>`<line x1="24" x2="469" y1="${y}" y2="${y}" stroke="var(--line)" stroke-width="1"/>`).join('')}<polygon points="24,155 ${poly} 466,155" fill="url(#candidateActivityArea)"/><polyline points="${poly}" fill="none" stroke="#16ad9b" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>${points.map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="4.5" fill="#fff" stroke="#139d92" stroke-width="2"><title>${values[i]} applicants · ${days[i]} days ago</title></circle>`).join('')}<text x="24" y="177" fill="var(--muted)" font-size="11">13 days ago</text><text x="410" y="177" fill="var(--muted)" font-size="11">Today</text></svg></div><div class="chart-footnote">${values.reduce((a,b)=>a+b,0)} illustrative applicant records over this period.</div>`;
}
function recruiterPipelineSnapshot() {
 const statuses=['New','In review','Shortlisted'];const counts=statuses.map(status=>state.candidates.filter(c=>c.status===status).length);
 const total=counts.reduce((a,b)=>a+b,0)||1;
 return `<div class="pipeline-snapshot">${statuses.map((status,i)=>`<div class="pipeline-row"><div><strong>${status}</strong><small>${counts[i]} candidates</small></div><span class="pipeline-bar"><span style="width:${counts[i]/total*100}%"></span></span><strong>${counts[i]}</strong></div>`).join('')}</div><div class="chart-footnote">Counts are calculated from the fictional candidate profiles included in this presentation.</div>`;
}
function recruiterActivityPanel() {
 const view=state.recruiterActivityView||'trend';
 return `<div class="card-head"><div><h2 class="card-title">Application activity</h2><p class="card-subtitle">See both a timeline and the current applicant pipeline.</p></div><div class="mini-segment"><button class="${view==='trend'?'selected':''}" data-action="recruiter-activity-view" data-view="trend" aria-pressed="${view==='trend'}">Trend</button><button class="${view==='pipeline'?'selected':''}" data-action="recruiter-activity-view" data-view="pipeline" aria-pressed="${view==='pipeline'}">Pipeline</button></div></div>${view==='trend'?recruiterActivityChart():recruiterPipelineSnapshot()}`;
}
function recruiterDashboard() {
  const activeCampaigns = state.campaigns.filter(c=>c.status==='Active').length;
  const applicantTotal = state.campaigns.reduce((n,c)=>n+c.applicants,0);
  const selectedCampaign = state.campaigns.find(c => c.id === state.healthCampaignId) || state.campaigns.find(c => Array.isArray(c.healthTrend)) || state.campaigns[0];
  const selectedId = selectedCampaign?.id || '';
  return `${pageHeading(`Good morning, ${escapeHtml(state.recruiter.name.split(' ')[0])}`, 'A clear view of your hiring week.', `<button class="btn btn-light" data-page="candidates">Review candidates ${iconSvg('arrow')}</button><button class="btn btn-primary" data-action="new-campaign">${iconSvg('plus')} New campaign</button>`)}
    <section class="card hero-card"><div class="hero-copy"><div class="eyebrow">YOUR HIRING WORKSPACE</div><h2>Great teams start<br>with thoughtful hiring.</h2><p>Bring the right people into view and keep every next step clear.</p><button class="btn" data-page="campaigns">Manage campaigns ${iconSvg('arrow')}</button></div><div class="hero-art hero-photo-art" aria-hidden="true"><img src="assets/workplaces/office-1.jpg" alt=""></div></section>
    <div class="grid grid-4 section-gap recruiter-metrics"><div class="card metric-card"><div class="metric-top"><div class="metric-icon">${iconSvg('users')}</div><span class="metric-change">Hiring activity</span></div><div class="metric-value">${applicantTotal}</div><div class="metric-label">Total applicants</div></div><div class="card metric-card"><div class="metric-top"><div class="metric-icon mint">${iconSvg('briefcase')}</div><span class="metric-change neutral">Across roles</span></div><div class="metric-value">${activeCampaigns}</div><div class="metric-label">Active campaigns</div></div><div class="card metric-card"><div class="metric-top"><div class="metric-icon peach">${iconSvg('clock')}</div><span class="metric-change neutral">Needs review</span></div><div class="metric-value">${state.candidates.filter(c=>['New','In review'].includes(c.status)).length}</div><div class="metric-label">Awaiting review</div></div><div class="card metric-card"><div class="metric-top"><div class="metric-icon sky">${iconSvg('gauge')}</div><span class="metric-change">Current pace</span></div><div class="metric-value">${state.candidates.filter(c=>Number(c.appliedDaysAgo)<=7).length}</div><div class="metric-label">New this week</div></div></div>
    <div class="grid grid-2 section-gap recruiter-insights"><section class="card insight-card" id="applicationActivityPanel">${recruiterActivityPanel()}</section>
    <section class="card insight-card" id="campaignHealthPanel"><div class="card-head"><div><h2 class="card-title">Campaign health</h2><p class="card-subtitle">Track the selected campaign's health trend.</p></div><button class="inline-link" data-action="selected-health-details">View details ${iconSvg('arrow')}</button></div><label class="field-label" for="campaignHealthSelect">Campaign</label><select id="campaignHealthSelect" class="health-select" aria-label="Select campaign for health trend">${state.campaigns.map((campaign,index)=>`<option value="${escapeHtml(campaign.id || String(index))}" ${(campaign.id || String(index))===selectedId?'selected':''}>${escapeHtml(campaign.title)}</option>`).join('')}</select><div id="campaignHealthChart">${campaignHealthChart(selectedCampaign)}</div></section></div>
    <section class="card section-gap"><div class="card-head"><div><h2 class="card-title">Recently discovered talent</h2><p class="card-subtitle">Open a profile for skills, readiness, and next steps.</p></div><button class="inline-link" data-page="candidates">View candidate pool ${iconSvg('arrow')}</button></div><div class="table-wrap"><table><thead><tr><th>Candidate</th><th>Profile fit</th><th>Readiness</th><th>Status</th><th></th></tr></thead><tbody>${state.candidates.slice(0,4).map(candidateRow).join('')}</tbody></table></div></section>
    <section class="section-gap mini-stat-strip"><span>${iconSvg('clock')} <strong>${state.candidates.filter(c=>Number(c.appliedDaysAgo)<=7).length}</strong> new applications this week</span><span>${iconSvg('briefcase')} <strong>${state.campaigns.length}</strong> campaigns total</span><button class="inline-link" data-page="applicants">Review campaign applicants ${iconSvg('arrow')}</button></section><div class="footer-note">Campaign history in this presentation uses clearly labelled illustrative values; no live service is connected.</div>`;
}
function candidateRow(c) { return `<tr><td><div class="person-cell">${personAvatar(c)}<div><strong>${escapeHtml(c.name)}</strong><small>${escapeHtml(c.role)}</small></div></div></td><td>${c.skills.map(s=>`<span class="tag">${escapeHtml(s)}</span>`).join(' ')}</td><td><div style="display:flex;align-items:center;gap:8px;min-width:95px"><div class="progress-line" style="width:55px"><span style="width:${c.readiness}%"></span></div><strong style="color:var(--ink);font-size:10px">${c.readiness}%</strong></div></td><td><span class="status-pill ${c.status==='New'?'review':c.status==='In review'?'pending':''}">${escapeHtml(c.status)}</span></td><td><button class="mini-action" data-action="candidate-detail" data-candidate="${escapeHtml(c.name)}" aria-label="View ${escapeHtml(c.name)}">${iconSvg('external')}</button></td></tr>`; }
function recruiterCandidates() {
  return `${pageHeading('Candidate pool','Thoughtful hiring starts with a closer look.', `<button class="btn btn-light" data-action="export-candidates">Export list ↓</button><button class="btn btn-primary" data-page="campaigns">View campaigns ↗</button>`)}
    <div class="grid grid-4"><div class="card metric-card"><div class="metric-icon">${iconSvg('users')}</div><div class="metric-value">${state.candidates.length}</div><div class="metric-label">Total candidates</div></div><div class="card metric-card"><div class="metric-icon mint">${iconSvg('check')}</div><div class="metric-value">${state.candidates.filter(c=>c.status==='Shortlisted').length}</div><div class="metric-label">Shortlisted</div></div><div class="card metric-card"><div class="metric-icon peach">${iconSvg('clock')}</div><div class="metric-value">${state.candidates.filter(c=>['New','In review'].includes(c.status)).length}</div><div class="metric-label">Awaiting review</div></div><div class="card metric-card"><div class="metric-icon sky">${iconSvg('gauge')}</div><div class="metric-value">${Math.round(state.candidates.reduce((n,c)=>n+c.readiness,0)/Math.max(1,state.candidates.length))}%</div><div class="metric-label">Average readiness</div></div></div>
    <section class="card section-gap"><div class="card-head"><div><h2 class="card-title">Your people shortlist</h2><p class="card-subtitle">Search profiles and open a quick candidate overview.</p></div><span class="sample-chip">Preview data</span></div><div class="filters"><input id="candidateSearch" type="search" placeholder="Search name, skill, or role…" aria-label="Search candidates"><select id="candidateStatus"><option value="">All statuses</option><option>New</option><option>In review</option><option>Shortlisted</option></select></div><div class="table-wrap"><table><thead><tr><th>Candidate</th><th>Skills</th><th>Readiness</th><th>Status</th><th></th></tr></thead><tbody id="candidateRows">${state.candidates.map(candidateRow).join('')}</tbody></table></div></section>`;
}
function recruiterCampaigns() {
  return `${pageHeading('Campaigns','Every role is a chance to create a great first impression.', `<button class="btn btn-primary" data-action="new-campaign">${iconSvg('plus')} Create campaign</button>`)}
    <div class="grid grid-3"><div class="card metric-card"><div class="metric-icon mint">${iconSvg('check')}</div><div class="metric-value">${state.campaigns.filter(c=>c.status==='Active').length}</div><div class="metric-label">Active campaigns</div></div><div class="card metric-card"><div class="metric-icon">${iconSvg('briefcase')}</div><div class="metric-value">${state.campaigns.length}</div><div class="metric-label">All campaigns</div></div><div class="card metric-card"><div class="metric-icon peach">${iconSvg('users')}</div><div class="metric-value">${state.campaigns.reduce((n,c)=>n+c.applicants,0)}</div><div class="metric-label">Applicants in total</div></div></div>
    <section class="card section-gap"><div class="card-head"><div><h2 class="card-title">Your campaigns</h2><p class="card-subtitle">Manage the roles and experiences candidates see.</p></div><select id="campaignFilter" class="tag" style="border:1px solid var(--line);padding:9px"><option value="">All campaigns</option><option>Active</option><option>Draft</option></select></div><div class="table-wrap"><table><thead><tr><th>Role</th><th>Type / location</th><th>Applicants</th><th>Close date</th><th>Status</th><th></th></tr></thead><tbody id="campaignRows">${campaignRows()}</tbody></table></div></section>`;
}
function campaignRows() { return state.campaigns.map((c,i)=>`<tr data-campaign-status="${c.status}"><td><div class="person-cell"><div class="company-mark">${c.title.split(' ').slice(0,2).map(t=>t[0]).join('')}</div><div><strong>${escapeHtml(c.title)}</strong><small>Campaign #RF-${2026+i} · Created by you</small></div></div></td><td>${escapeHtml(c.type)}<br><small style="color:var(--muted)">${escapeHtml(c.location)}</small></td><td><strong style="color:var(--ink)">${c.applicants}</strong></td><td>${c.date}</td><td><span class="status-pill ${c.status==='Draft'?'pending':''}">${c.status}</span></td><td><div class="table-actions"><button class="btn btn-light btn-small" data-action="campaign-applicants" data-index="${i}">Applicants</button><button class="btn btn-soft btn-small" data-action="edit-campaign" data-index="${i}">Edit</button><button class="mini-action" data-action="campaign-detail" data-index="${i}" aria-label="More campaign details">${iconSvg('more')}</button></div></td></tr>`).join(''); }
function recruiterEvaluations() {
  return `${pageHeading('Evaluations','Make space for clear thinking and consistent feedback.', `<button class="btn btn-light" data-action="export-evaluations">Export feedback ↓</button>`)}
    <div class="grid grid-3"><div class="card metric-card"><div class="metric-icon">${iconSvg('sparkles')}</div><div class="metric-value">18</div><div class="metric-label">Reviews to complete</div></div><div class="card metric-card"><div class="metric-icon mint">${iconSvg('check')}</div><div class="metric-value">32</div><div class="metric-label">Reviews completed</div></div><div class="card metric-card"><div class="metric-icon sky">${iconSvg('chart')}</div><div class="metric-value">4.7/5</div><div class="metric-label">Average score</div></div></div>
    <div class="grid grid-2 section-gap"><section class="card"><div class="card-head"><div><h2 class="card-title">Review queue</h2><p class="card-subtitle">Start with the candidates who are ready for a closer look.</p></div></div>${state.candidates.filter(c=>c.status!=='New').slice(0,4).map((c,i)=>`<div class="checklist-item"><div class="checklist-copy">${personAvatar(c)}<div><strong>${c.name}</strong><small>${c.role} · ${i===0?'Product Designer':'Open role'}</small></div></div><button class="btn btn-soft btn-small" data-action="evaluate" data-candidate="${c.name}">Review</button></div>`).join('')}</section><section class="card"><div class="card-head"><div><h2 class="card-title">Evaluation principles</h2><p class="card-subtitle">Keep your process fair and thoughtful.</p></div></div><ul class="list-clean">${[['Focus on evidence','Use examples from candidate responses.'],['Apply the same criteria','Consistency helps reduce bias.'],['Share clear feedback','Make next steps easier for everyone.'],['Keep candidate data private','Only access information you need.']].map(a=>`<li style="align-items:flex-start"><span class="list-check">✓</span><div><strong style="display:block;color:var(--ink);margin-bottom:3px">${a[0]}</strong>${a[1]}</div></li>`).join('')}</ul></section></div>`;
}
function organisationPage() {
  const r=state.recruiter;
  return `${pageHeading('Organisation profile','Show candidates the team and mission behind the role.', `<button class="btn btn-primary" data-action="save-organisation">Save changes ✓</button>`)}
    <section class="card"><div class="profile-header"><img class="organisation-logo-preview" src="assets/companies/logo_buildwise.png" alt="Buildwise sample company logo"><div style="flex:1"><h3>${escapeHtml(r.organisation)}</h3><p>Organisation profile · visible on your campaigns</p></div><span class="status-pill">Published</span></div><form id="orgForm"><div class="profile-editor"><div class="field"><label for="orgName">Organisation name</label><input id="orgName" name="organisation" value="${escapeHtml(r.organisation)}" required></div><div class="field"><label for="orgIndustry">Industry</label><select id="orgIndustry" name="industry">${['Technology & Design','Professional Services','Education','Finance','Healthcare','Hospitality','Other'].map(x=>`<option ${r.industry===x?'selected':''}>${x}</option>`).join('')}</select></div><div class="field span-2"><label for="orgWebsite">Website</label><input id="orgWebsite" name="website" value="${escapeHtml(r.website)}"></div><div class="field span-2"><label for="orgAbout">About your organisation</label><textarea id="orgAbout" name="about">${escapeHtml(r.about)}</textarea><span class="field-hint">Help candidates understand what your team values and what you build together.</span></div></div><p class="brand-assets-note">Product logo: <code>assets/company-logo.svg</code></p><div style="display:flex;justify-content:flex-end;margin-top:18px"><button class="btn btn-primary" type="submit">Save organisation profile ✓</button></div></form></section>`;
}
function recruiterSettings() {
  return `${pageHeading('Account settings','Your personal details and workspace preferences.', `<button class="btn btn-primary" data-action="save-settings">Save preferences ✓</button>`)}
    <div class="grid grid-2"><section class="card"><div class="card-head"><div><h2 class="card-title">Personal details</h2><p class="card-subtitle">How your team sees you.</p></div></div><div class="profile-header"><div class="avatar large">${initials(state.recruiter.name)}</div><div><h3>${escapeHtml(state.recruiter.name)}</h3><p>Organisation administrator</p></div></div><div class="field"><label for="recruiterName">Full name</label><input id="recruiterName" value="${escapeHtml(state.recruiter.name)}"></div><div class="field"><label for="recruiterEmail">Email</label><input id="recruiterEmail" type="email" value="${escapeHtml(state.recruiter.email)}"></div><button class="btn btn-primary" data-action="save-account">Save personal details</button></section><section class="card"><div class="card-head"><div><h2 class="card-title">Workspace preferences</h2><p class="card-subtitle">Make this space work for you.</p></div></div>${[['New applicant notifications','Get notified when someone applies.','newApplicantNotifications'],['Weekly hiring summary','A quick weekly overview of progress.','weeklyHiringSummary'],['Candidate product updates','Occasional product news.','candidateProductUpdates']].map(x=>`<div class="settings-row"><div><strong>${x[0]}</strong><small>${x[1]}</small></div><input class="toggle preference-toggle" type="checkbox" ${state.preferences[x[2]]?'checked':''} aria-label="${x[0]}" data-preference-key="${x[2]}"></div>`).join('')}</section><section class="card appearance-card"><div class="card-head"><div><h2 class="card-title">Appearance</h2><p class="card-subtitle">Choose a comfortable look for RecruitFlow.</p></div></div><div class="settings-row"><div><strong>Dark mode</strong><small>Use a darker workspace in low light.</small></div><input type="checkbox" class="toggle" data-action="dark-mode" aria-label="Enable dark mode" ${state.preferences.darkMode?'checked':''}></div></section></div>`;
}
/* RecruitFlow presentation-only views of existing live-system feature families.
   Records are illustrative and editable only in the browser preview. */
const eField = (key, label, value, options = {}) => `<div class="field ${options.full ? 'span-2' : ''}"><label for="${key}">${label}${options.required ? ' *' : ''}</label>${options.textarea ? `<textarea id="${key}" name="${key}" ${options.required ? 'required' : ''}>${escapeHtml(value || '')}</textarea>` : options.choices ? `<select id="${key}" name="${key}">${options.choices.map(v=>`<option value="${escapeHtml(v)}" ${v===(value||'')?'selected':''}>${escapeHtml(v)}</option>`).join('')}</select>` : `<input id="${key}" name="${key}" type="${options.type||'text'}" value="${escapeHtml(value||'')}" ${options.required ? 'required' : ''} placeholder="${escapeHtml(options.placeholder||'')}">`}</div>`;
function recruiterTeam() {
  return `${pageHeading('Team & access','Invite collaborators and control who can manage hiring.', `<button class="btn btn-primary" data-action="invite-team">${iconSvg('plus')} Invite member</button>`)}
    <div class="grid grid-3"><div class="card metric-card"><span class="metric-icon sky">${iconSvg('users')}</span><div class="metric-value">${state.team.length}</div><div class="metric-label">Team members</div></div><div class="card metric-card"><span class="metric-icon mint">${iconSvg('check')}</span><div class="metric-value">${state.team.filter(m=>m.status==='Active').length}</div><div class="metric-label">Active members</div></div><div class="card metric-card"><span class="metric-icon peach">${iconSvg('clock')}</span><div class="metric-value">${state.team.filter(m=>m.status==='Invited').length}</div><div class="metric-label">Pending invitations</div></div></div>
    <section class="card section-gap"><div class="card-head"><div><h2 class="card-title">People & permissions</h2><p class="card-subtitle">Manage membership, invitations and roles.</p></div></div><div class="table-wrap"><table><thead><tr><th>Team member</th><th>Email</th><th>Role</th><th>Status</th><th></th></tr></thead><tbody>${state.team.map((m,i)=>`<tr><td><div class="person-cell"><span class="avatar">${initials(m.name)}</span><strong>${escapeHtml(m.name)}</strong></div></td><td>${escapeHtml(m.email)}</td><td><span class="tag blue">${escapeHtml(m.role)}</span></td><td><span class="status-pill ${m.status==='Invited'?'pending':''}">${m.status}</span></td><td>${i ? `<button class="btn btn-light btn-small" data-action="team-member" data-index="${i}">Manage</button>`:'<span class="muted">Owner</span>'}</td></tr>`).join('')}</tbody></table></div></section>
    <section class="card section-gap"><div class="card-head"><h2 class="card-title">Access levels</h2><button class="inline-link" data-page="access">Workspace status ${iconSvg('arrow')}</button></div><div class="grid grid-3">${[['Administrator','Company, people, campaigns and access'],['Recruiter','Campaigns, candidates and evaluations'],['Viewer','Read-only hiring information']].map(([name,desc])=>`<div class="feature-tile"><span class="feature-icon">${iconSvg('check')}</span><strong>${name}</strong><p>${desc}</p></div>`).join('')}</div></section>`;
}
function recruiterEditor() {
 const index = Math.min(Math.max(Number(state.activeCampaignIndex || 0),0),state.campaigns.length-1);
 const c = state.campaigns[index] || state.campaigns[0];
 if (!c) return `${pageHeading('Campaign editor','Create a campaign to begin.')}`;
 return `${pageHeading('Edit campaign',`Update ${escapeHtml(c.title)} without losing your place.`,`<button class="btn btn-light" data-page="campaigns">${iconSvg('arrow')} All campaigns</button><button class="btn btn-primary" form="campaignEditForm" type="submit">Save campaign ${iconSvg('check')}</button>`)}
 <div class="section-tabs"><button class="tab-switch active" data-editor-tab="details">Role details</button><button class="tab-switch" data-editor-tab="form">Application form</button><button class="tab-switch" data-editor-tab="rules">Rules & AI</button><button class="tab-switch" data-editor-tab="preview">Candidate preview</button></div>
 <form id="campaignEditForm"><div class="editor-tab-panel" data-editor-panel="details"><div class="grid grid-2"><section class="card"><h2 class="card-title">The opportunity</h2><div class="profile-editor">${eField('campTitle','Job title',c.title,{required:true,full:true})}${eField('campType','Employment type',c.type,{choices:['Full-time','Part-time','Contract','Temporary','Internship']})}${eField('campLocation','Location',c.location,{required:true})}${eField('campService','Service category',c.service||'Technology & Design')}${eField('campArrangement','Work arrangement',c.arrangement||'Hybrid',{choices:['Remote','Hybrid','On-site']})}${eField('campSummary','Job description',c.description||'Create an engaging description of the role and the team.',{textarea:true,full:true})}</div></section>
 <section class="card"><h2 class="card-title">Publishing & timing</h2><div class="details-stack"><div class="settings-row"><div><strong>Campaign status</strong><small>Control whether candidates see this opportunity</small></div><span class="status-pill ${c.status==='Draft'?'pending':''}">${c.status}</span></div>${eField('campClose','Closing date',c.date||'Oct 28, 2026')}<div class="info-tile">Changes to a draft in this presentation are saved in this browser. No live job posting is created.</div><button type="button" class="btn btn-light" data-action="editor-applicants">View campaign applicants ${iconSvg('arrow')}</button></div></section></div></div>
 <div class="editor-tab-panel" data-editor-panel="form" hidden><section class="card"><div class="card-head"><div><h2 class="card-title">Application form builder</h2><p class="card-subtitle">The live system includes configurable questions and fields for each campaign.</p></div><button type="button" class="btn btn-soft" data-action="add-form-field">${iconSvg('plus')} Add question</button></div><div id="formQuestionList">${(c.questions||['Full name','Email address','CV / résumé','Why are you interested in this role?']).map((q,i)=>`<div class="question-row"><span class="drag-grip">⋮⋮</span><div><strong>${escapeHtml(q)}</strong><small>${i<3?'Required':'Optional'} · ${i===2?'File':i===3?'Paragraph':'Short text'}</small></div><button type="button" class="mini-action" data-action="edit-form-field" data-index="${i}" aria-label="Edit field">${iconSvg('more')}</button></div>`).join('')}</div><p class="field-hint">New fields and question labels in this UI preview are illustrative; the live form-builder rules are unchanged.</p></section></div>
 <div class="editor-tab-panel" data-editor-panel="rules" hidden><section class="card"><h2 class="card-title">Qualification & evaluation</h2><div class="settings-row"><div><strong>Apply screening rules first</strong><small>Hard failures need review before AI assessment</small></div><input type="checkbox" class="toggle" id="campRules" checked></div><div class="settings-row"><div><strong>Use AI evaluations</strong><small>Use your organisation's configured evaluation prompt</small></div><input type="checkbox" class="toggle" id="campAI" ${state.evaluationSettings.enabled?'checked':''}></div><button type="button" class="btn btn-light" data-page="evaluations">Open evaluation settings ${iconSvg('arrow')}</button></section></div>
 <div class="editor-tab-panel" data-editor-panel="preview" hidden><section class="card"><div class="card-head"><h2 class="card-title">Candidate-facing preview</h2><span class="tag">Presentation-only preview</span></div><div class="detail-brand-row">${companyLogo('BW','Buildwise')}<div><h3>${escapeHtml(c.title)}</h3><p>${escapeHtml(c.location)} · ${escapeHtml(c.type)}</p></div></div><p>${escapeHtml(c.description||'Build meaningful products with a thoughtful team.')}</p><button type="button" class="btn btn-primary" disabled>Apply (preview)</button></section></div></form>`;
}
function recruiterApplicants() {
 const c=state.campaigns[state.activeCampaignIndex]||state.campaigns[0];
 const offset=state.campaigns.slice(0,state.activeCampaignIndex).reduce((n,item)=>n+item.applicants,0);
 const applicants=state.candidates.slice(offset,offset+Math.min(5,c?.applicants||0));
 return `${pageHeading('Campaign applicants', `${escapeHtml(c?.title||'Campaign')} · Manage applicants by stage.`, `<button class="btn btn-light" data-page="campaigns">All campaigns</button><button class="btn btn-primary" data-action="edit-active-campaign">Edit campaign</button>`)}
 <div class="grid grid-4">${[['Applications',c?.applicants||0,'briefcase'],['Pending review',applicants.filter(a=>a.status==='New'||a.status==='In review').length,'clock'],['Shortlisted',applicants.filter(a=>a.status==='Shortlisted').length,'check'],['Interviews',1,'sparkles']].map(([label,value,ico])=>`<div class="card metric-card"><div class="metric-icon sky">${iconSvg(ico)}</div><div class="metric-value">${value}</div><div class="metric-label">${label}</div></div>`).join('')}</div>
 <section class="card section-gap"><div class="card-head"><div><h2 class="card-title">Applicant pipeline</h2><p class="card-subtitle">Rule-based qualification, AI fit and recruiter disposition.</p></div><button class="btn btn-light btn-small" data-action="bulk-review">Bulk actions</button></div><div class="filters"><input id="applicantSearch" type="search" placeholder="Search candidates…" aria-label="Search applicants"><select id="applicantStatus"><option value="">All statuses</option><option>New</option><option>In review</option><option>Shortlisted</option></select></div><div class="table-wrap"><table><thead><tr><th>Candidate</th><th>Role</th><th>AI fit</th><th>Qualification</th><th>Status</th><th></th></tr></thead><tbody id="applicantRows">${applicants.map((person,i)=>`<tr data-applicant="${escapeHtml(person.name.toLowerCase())}" data-status="${person.status}"><td><div class="person-cell">${personAvatar(person)}<strong>${escapeHtml(person.name)}</strong></div></td><td>${escapeHtml(person.role)}</td><td><span class="tag blue">${person.readiness}% illustrative</span></td><td><span class="status-pill">Passed</span></td><td><span class="status-pill ${person.status==='New'?'review':'pending'}">${person.status}</span></td><td><button class="btn btn-light btn-small" data-action="applicant-detail" data-index="${state.candidates.indexOf(person)}">Review</button></td></tr>`).join('')}</tbody></table></div></section>`;
}
function recruiterAccess() {
 return `${pageHeading('Workspace access','Review organisation access information.', `<button class="btn btn-primary" data-page="team">Open team & access</button>`)}<section class="card"><div class="status-banner"><span>${iconSvg('check')}</span><div><h2>Recruiting workspace available</h2><p>Organisation access, invitations and approval states are represented here as sample UI states. Live approvals require the connected system.</p></div></div><div class="grid grid-3 section-gap"><div class="feature-tile"><strong>Organisation approval</strong><p>Approved (illustrative)</p></div><div class="feature-tile"><strong>Access requests</strong><p>No pending requests</p></div><div class="feature-tile"><strong>Workspace status</strong><p>Active preview</p></div></div></section>`;
}
function candidateSubscription() {
 return `${pageHeading('Subscription & access','See your application access and payment options.', `<button class="btn btn-light" data-page="readiness">Profile readiness</button>`)}
 <section class="card accent-top-card"><div class="card-head"><div><span class="eyebrow">CANDIDATE ACCESS</span><h2 class="card-title">Your career toolkit</h2><p class="card-subtitle">The live system supports subscription and manual/cash access flows.</p></div><span class="status-pill pending">Preview only</span></div><div class="grid grid-3"><div class="feature-tile"><span class="feature-icon">${iconSvg('gauge')}</span><strong>Readiness threshold</strong><p>Reach 80% saved profile completeness to unlock applying.</p></div><div class="feature-tile"><span class="feature-icon">${iconSvg('briefcase')}</span><strong>Application access</strong><p>Access depends on the connected account and payment state.</p></div><div class="feature-tile"><span class="feature-icon">${iconSvg('file')}</span><strong>Payment & access codes</strong><p>Subscription, manual payments, and cash access are managed in the real service.</p></div></div></section>
 <div class="grid grid-2 section-gap"><section class="card"><h2 class="card-title">Payment options</h2><p class="card-subtitle">Explore the interface without initiating a real transaction.</p><div class="settings-row"><div><strong>Subscription checkout</strong><small>Card/payment-provider flow</small></div><button class="btn btn-light btn-small" data-action="payment-info">Details</button></div><div class="settings-row"><div><strong>Manual payment</strong><small>Review and approval workflow</small></div><button class="btn btn-light btn-small" data-action="payment-info">Details</button></div></section><section class="card"><h2 class="card-title">Redeem access code</h2><p class="card-subtitle">Access codes are validated by the live backend.</p><div class="field"><label for="accessCode">Access code</label><input id="accessCode" placeholder="Enter code" autocomplete="off"></div><button class="btn btn-primary" data-action="redeem-preview">Check code</button></section></div>`;
}
function expandedEvaluations() {
 const e=state.evaluationSettings;
 return `${pageHeading('Evaluations','Organisation-wide AI prompts, qualification and candidate review.', `<button class="btn btn-light" data-action="export-evaluations">Export reviews ${iconSvg('arrow')}</button><button class="btn btn-primary" data-action="save-eval-settings">Save evaluation settings</button>`)}
 <div class="card eval-banner"><div class="settings-row"><div><strong>Enable AI evaluations for this organisation</strong><small>Automatic assessment after a new application, following posted form rules</small></div><input type="checkbox" id="enableEvaluations" class="toggle" ${e.enabled?'checked':''} aria-label="Enable AI evaluations"></div><div class="info-tile">Rule outcomes are applied first. Qualified applications can then be evaluated with the organisation prompt. No real AI requests run in this offline preview.</div></div>
 <div class="grid grid-2 section-gap"><section class="card"><div class="card-head"><div><h2 class="card-title">Base analysis prompt</h2><p class="card-subtitle">Read-only baseline used in the real workflow.</p></div><span class="tag">READ ONLY</span></div><div class="prompt-box">You are an expert recruitment analyst for RecruitFlow by Refrane. Assess each application against the role and submitted evidence. Flag missing information and keep feedback concise and fair.</div><h3 class="card-title subheading">Your custom instructions</h3><div class="field"><label for="evalInstructions">Additional analysis guidance</label><textarea id="evalInstructions" rows="5">${escapeHtml(e.instructions)}</textarea></div><div class="field"><label for="minEvalScore">Minimum qualifying fit score</label><input id="minEvalScore" type="number" min="0" max="100" value="${e.minScore}"></div></section>
 <section class="card"><div class="card-head"><div><h2 class="card-title">Prompt template library</h2><p class="card-subtitle">Choose a starter by role or seniority.</p></div><button class="btn btn-light btn-small" data-action="save-eval-template">Save as template</button></div><div class="template-list">${[['Balanced professional screening','General'],['Entry-level & graduate','Entry level'],['Senior & leadership','Leadership'],['Technical & engineering','Technical']].map(([name,category])=>`<button class="template-choice ${e.template===name?'selected':''}" data-action="select-eval-template" data-template="${name}"><small>${category}</small><strong>${name}</strong>${e.template===name?iconSvg('check'):''}</button>`).join('')}</div></section></div>
 <section class="card section-gap"><div class="card-head"><div><h2 class="card-title">Evaluation review queue</h2><p class="card-subtitle">Open a candidate for the assessment view and next steps.</p></div><button class="inline-link" data-page="applicants">Campaign applicants ${iconSvg('arrow')}</button></div><div class="candidate-list-inline">${state.candidates.slice(0,4).map((c,i)=>`<div class="person-inline">${personAvatar(c)}<div><strong>${escapeHtml(c.name)}</strong><small>${escapeHtml(c.role)} · illustrative fit ${c.readiness}%</small></div><button class="btn btn-soft btn-small" data-action="evaluate" data-candidate="${escapeHtml(c.name)}">Review</button></div>`).join('')}</div></section>`;
}
function expandedOrganisation() {
 const r=state.recruiter, d=state.organisationDetails;
 const identity=[['legal_name','Legal name',d.legal_name],['trading_name','Trading name',d.trading_name],['org_type','Organisation type',d.org_type],['company_size','Company size',d.size],['year_established','Year established',d.year]];
 const contact=[['public_email','Public email',d.public_email],['public_phone','Public phone (optional)',d.public_phone],['website','Website',r.website],['address_line1','Address line 1',d.address_line1],['address_line2','Address line 2 (optional)',d.address_line2],['suburb','Suburb',d.suburb],['city','City / town',d.city],['region','Region',d.region],['postal_code','Postal code',d.postal_code],['country','Country',d.country]];
 return `${pageHeading('Business settings','Company identity, public profile, compliance and publishing.', `<button class="btn btn-primary" form="fullOrganisationForm" type="submit">Save business profile ${iconSvg('check')}</button>`)}
 <section class="card brand-profile-card"><div class="organisation-brand-banner"><img src="${d.bannerDataUrl||'assets/workplaces/office-3.jpg'}" alt="Company workplace banner"><div class="brand-profile-logo">${d.logoDataUrl?`<img class="company-logo-uploaded" src="${d.logoDataUrl}" alt="Company logo preview">`:companyLogo('BW','Buildwise')}</div></div><div class="profile-header brand-profile-caption"><div><h2>${escapeHtml(r.organisation)}</h2><p>Business profile · Namibia</p></div><span class="status-pill ${d.published?'':'pending'}">${d.published?'Published':'Not published'}</span></div></section>
 <form id="fullOrganisationForm"><div class="grid grid-2 section-gap"><section class="card"><h2 class="card-title">Company identity</h2><p class="card-subtitle">Help candidates recognise and trust your business.</p><div class="image-selection-row"><div class="sample-company">${d.logoDataUrl?`<img class="company-logo-uploaded" src="${d.logoDataUrl}" alt="Company logo preview">`:companyLogo('BW','Buildwise')}</div><div><strong>Company logo</strong><p class="field-hint">In the real app: PNG/JPG/WebP up to 10 MB.</p><button class="btn btn-light btn-small" type="button" data-action="preview-logo">Choose logo</button><input id="companyLogoUpload" type="file" accept="image/png,image/jpeg,image/webp" hidden></div></div><div class="image-selection-row"><img class="banner-preview" src="${d.bannerDataUrl||'assets/workplaces/office-3.jpg'}" alt="Company banner preview"><div><strong>Banner</strong><p class="field-hint">Optional. Recommended 4:1 landscape crop.</p><button class="btn btn-light btn-small" type="button" data-action="preview-banner">Change banner</button><input id="companyBannerUpload" type="file" accept="image/png,image/jpeg,image/webp" hidden></div></div><div class="profile-editor">${identity.map(([key,label,value])=>eField(key,label,value,{required:key==='legal_name'})).join('')}${eField('industry','Industry',r.industry)}${eField('about','About the company',r.about,{textarea:true,full:true})}</div></section>
 <section class="card"><h2 class="card-title">Contact & location</h2><p class="card-subtitle">How candidates can reach and locate your organisation.</p><div class="profile-editor">${contact.map(([key,label,value])=>eField(key,label,value,{required:['public_email','address_line1','city','region','country'].includes(key),type:key==='public_email'?'email':'text'})).join('')}</div></section>
 <section class="card"><h2 class="card-title">Registration & compliance</h2><div class="profile-editor">${[['bipa','BIPA registration',d.bipa],['vat','VAT number',d.vat],['tax','Tax number',d.tax],['ssc','SSC employer number',d.ssc]].map(([key,label,value])=>eField(key,label,value)).join('')}</div></section>
 <section class="card"><h2 class="card-title">Social presence & visibility</h2><div class="profile-editor">${[['linkedin','LinkedIn',d.linkedin],['facebook','Facebook',d.facebook],['x','X / Twitter',d.x]].map(([key,label,value])=>eField(key,label,value)).join('')}</div><div class="settings-row"><div><strong>Publish public company profile</strong><small>Visible to candidates once required details are complete</small></div><input class="toggle" type="checkbox" id="orgPublished" ${d.published?'checked':''}></div><div class="info-tile">Public visibility here is a browser-only preview and does not publish your organisation.</div></section></div></form>`;
}

function renderPage() {
  if (state.role === 'candidate') {
    switch (state.page) {
      case 'readiness': return readinessPage();
      case 'jobs': return jobsPage('all');
      case 'applications': return applicationsPage();
      case 'saved': return jobsPage('saved');
      case 'subscription': return candidateSubscription();
      case 'settings': return candidateSettings();
      default: return candidateDashboard();
    }
  }
  switch (state.page) {
    case 'candidates': return recruiterCandidates();
    case 'editor': return recruiterEditor();
    case 'applicants': return recruiterApplicants();
    case 'team': return recruiterTeam();
    case 'access': return recruiterAccess();
    case 'campaigns': return recruiterCampaigns();
    case 'evaluations': return expandedEvaluations();
    case 'organisation': return expandedOrganisation();
    case 'settings': return recruiterSettings();
    default: return recruiterDashboard();
  }
}
function workspaceView() {
  $('#app').innerHTML = `<div class="workspace">${sidebar(state.role,state.page)}<div class="workspace-main">${topbar(state.page,state.role)}<main class="page-content" id="pageContent">${renderPage()}</main></div></div>`;
  wirePageEvents();
}
function enterWorkspace(role) {
  state.role = role;
  state.page = 'dashboard';
  workspaceView();
  toast(`${role === 'candidate' ? 'Candidate' : 'Recruiter'} workspace opened.`);
}
function renderLogin() { $('#app').innerHTML = state.authPage && state.authPage !== 'login' ? authPreviewView(state.authPage) : loginView(); wireLoginEvents(); }
function wireLoginEvents() {
  $$('[data-auth]').forEach(button=>button.addEventListener('click',()=>{state.authPage=button.dataset.auth;renderLogin();}));
  $('#authPreviewForm')?.addEventListener('submit',event=>{
    event.preventDefault();if(!event.currentTarget.reportValidity())return;
    const kind=event.currentTarget.dataset.kind;
    if(kind==='reset'&&$('#newPassword')?.value!==$('#confirmNewPassword')?.value){toast('Passwords must match.','error');return;}
    toast('This flow requires the connected RecruitFlow account service. No request was sent.');
  });
  $$('[data-role-choice]').forEach(btn=>btn.addEventListener('click',()=>{state.role=btn.dataset.roleChoice; renderLogin();}));
  $('#loginForm')?.addEventListener('submit',e=>{e.preventDefault();enterWorkspace(state.role);});
  $$('[data-action="demo-login"]').forEach(btn=>btn.addEventListener('click',()=>enterWorkspace(state.role)));
  $$('[data-action="forgot"]').forEach(btn=>btn.addEventListener('click',()=>{state.authPage='forgot';renderLogin();}));
  $$('[data-toggle-password]').forEach(btn=>btn.addEventListener('click',()=>{const input=$(`#${btn.dataset.togglePassword}`); if (!input) return; input.type=input.type==='password'?'text':'password'; btn.setAttribute('aria-label',input.type==='password'?'Show password':'Hide password');}));
}
function wirePageEvents() {
  $$('[data-page]').forEach(btn=>btn.addEventListener('click',()=>{state.page=btn.dataset.page; workspaceView(); window.scrollTo({top:0,behavior:'smooth'});}));
  $$('[data-action="logout"]').forEach(btn=>btn.addEventListener('click',()=>{state.authPage='login';renderLogin();toast('You have signed out of the local preview.');}));
  $$('[data-action="menu"]').forEach(btn=>btn.addEventListener('click',()=>{$('#sidebar')?.classList.toggle('is-open');$('#mobileScrim')?.classList.toggle('is-visible');}));
  $('#mobileScrim')?.addEventListener('click',()=>{$('#sidebar')?.classList.remove('is-open');$('#mobileScrim')?.classList.remove('is-visible');});
  $$('[data-action="notifications"]').forEach(btn=>btn.addEventListener('click',()=>openDetailDrawer('Notifications','You are all caught up', '<div class="notification-detail"><span class="notification-icon">'+iconSvg('check')+'</span><div><strong>No new notifications</strong><p>New application and workspace updates will appear here.</p></div></div>', '<button class="btn btn-primary" data-drawer-close>Done</button>')));
  $$('[data-action="help"]').forEach(btn=>btn.addEventListener('click',()=>openDetailDrawer('Help & support','Quick guidance', '<div class="detail-section"><h3>Navigate your workspace</h3><p>Use the left navigation to move between key areas. Open any record to see its details without losing your place.</p></div><div class="detail-section"><h3>Need more help?</h3><p>This local UI preview has no live support connection.</p></div>', '<button class="btn btn-primary" data-drawer-close>Got it</button>')));
  $$('[data-action="profile-menu"]').forEach(btn=>btn.addEventListener('click',()=>{state.page='settings';workspaceView();}));
  $$('[data-action="save-job"]').forEach(btn=>btn.addEventListener('click',()=>{const id=Number(btn.dataset.job); if(state.savedJobs.has(id)){state.savedJobs.delete(id);toast('Removed from favourites.');}else{state.savedJobs.add(id);toast('Added to favourites.');}persistDemoState();workspaceView();}));
  $$('[data-action="view-job"]').forEach(btn=>btn.addEventListener('click',()=>{const job=state.jobs.find(item=>item.id===Number(btn.dataset.job));if(job)openJobDrawer(job);}));
  $('#profileForm')?.addEventListener('input', e=>{const input=e.target;if(!input.dataset.profile)return;const key=input.dataset.profile;let value=input.value;if(key==='relocate')value=value==='true';if(key==='notice')value=input.value;if(key==='employment')value=[input.value];if(key==='languages')value=input.value.split(',').map(x=>x.trim()).filter(Boolean);state.candidate[key]=value;refreshReadinessDynamic();});
  $$('[data-employment-type]').forEach(input=>input.addEventListener('change',()=>{state.candidate.employment=$$('[data-employment-type]:checked').map(item=>item.dataset.employmentType);refreshReadinessDynamic();}));
  $('#profileForm')?.addEventListener('submit',e=>{e.preventDefault();saveCandidateProfile();});
  $$('[data-action="save-profile"]').forEach(btn=>btn.addEventListener('click',saveCandidateProfile));
  $$('[data-action="discard-profile"]').forEach(btn=>btn.addEventListener('click',()=>{state.candidate=JSON.parse(JSON.stringify(state.savedCandidate));workspaceView();toast('Unsaved edits discarded.');}));
  $$('[data-action="reset-profile"]').forEach(btn=>btn.addEventListener('click',()=>{state.candidate={full_name:'Jeysen N.',headline:'Junior Product Designer',portfolio:'',languages:['English'],summary:'Curious, detail-oriented creator interested in building useful digital experiences and simplifying complex workflows.',phone:'',linkedin:'',city:'Windhoek',region:'Khomas',skills:['Figma','Research'],photo:false,photoDataUrl:'',photoName:'',photoUrl:'assets/people/person-6.jpg',cv:true,cvName:'Jeysen_CV_2026.pdf',employment:['Full-time'],years:'1–2 years',notice:'30',relocate:true,email:state.candidate.email};workspaceView();toast('Profile reset. Save to keep the changes.');}));
  $$('[data-action="add-skill"]').forEach(btn=>btn.addEventListener('click',addSkill));
  $('#skill-input')?.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();addSkill();}});
  $$('[data-action="remove-skill"]').forEach(btn=>btn.addEventListener('click',()=>{state.candidate.skills.splice(Number(btn.dataset.index),1);workspaceView();}));
  $$('[data-action="upload-photo"]').forEach(btn=>btn.addEventListener('click',()=>$('#photoUpload')?.click()));
  $('#photoUpload')?.addEventListener('change', event => { const file = event.target.files?.[0]; if (file) handlePhotoFile(file); });
  $$('[data-action="upload-cv"]').forEach(btn=>btn.addEventListener('click',()=>$('#cvUpload')?.click()));
  $('#cvUpload')?.addEventListener('change', event => {
    const file = event.target.files?.[0]; if (!file) return;
    const allowed = /\.(pdf|doc|docx)$/i.test(file.name);
    if (!allowed) { toast('Choose a PDF or Word document.', 'error'); event.target.value = ''; return; }
    if (file.size > 10 * 1024 * 1024) { toast('Choose a CV smaller than 10 MB.', 'error'); event.target.value = ''; return; }
    state.candidate.cv = true; state.candidate.cvName = file.name;
    refreshReadinessDynamic(); workspaceView(); toast('CV selected. Save your profile to keep this change in the browser.');
  });
  $('#jobSearch')?.addEventListener('input',filterJobs); $('#jobType')?.addEventListener('change',filterJobs); $('#jobLocation')?.addEventListener('change',filterJobs); $('#jobService')?.addEventListener('change',filterJobs);
  $('#candidateSearch')?.addEventListener('input',filterCandidates); $('#candidateStatus')?.addEventListener('change',filterCandidates);
  $('#campaignFilter')?.addEventListener('change',()=>{const val=$('#campaignFilter').value;$$('#campaignRows tr').forEach(row=>row.style.display=(!val||row.dataset.campaignStatus===val)?'':'none');});
  wireActivityToggle($('#applicationActivityPanel'));
  $('#campaignHealthSelect')?.addEventListener('change', event => {
    const value = event.target.value;
    const index = state.campaigns.findIndex((campaign, i) => (campaign.id || String(i)) === value);
    const selected = state.campaigns[index];
    state.healthCampaignId = selected?.id || value;
    const chart = $('#campaignHealthChart');
    if (chart) chart.innerHTML = campaignHealthChart(selected);
  });
  $$('[data-action="selected-health-details"]').forEach(btn=>btn.addEventListener('click',()=>{
    const select = $('#campaignHealthSelect');
    const index = state.campaigns.findIndex((campaign, i) => (campaign.id || String(i)) === select?.value);
    const selected = state.campaigns[index];
    if (selected) openCampaignDrawer(selected, index);
  }));
  $$('[data-action="new-campaign"]').forEach(btn=>btn.addEventListener('click',openCreateCampaignDrawer));
  $$('[data-action="campaign-detail"]').forEach(btn=>btn.addEventListener('click',()=>{const index=Number(btn.dataset.index);const campaign=state.campaigns[index];if(campaign)openCampaignDrawer(campaign,index);}));
  $$('[data-action="candidate-detail"]').forEach(btn=>btn.addEventListener('click',()=>{const candidate=state.candidates.find(item=>item.name===btn.dataset.candidate);if(candidate)openCandidateDrawer(candidate);}));
  $$('[data-action="evaluate"]').forEach(btn=>btn.addEventListener('click',()=>{const candidate=state.candidates.find(item=>item.name===btn.dataset.candidate);if(candidate)openCandidateDrawer(candidate);}));
  $$('[data-action="application-detail"]').forEach(btn=>btn.addEventListener('click',()=>{const application=state.applications.find(item=>item.job===btn.dataset.jobTitle);if(!application)return;const content=`<div class="detail-brand-row">${companyLogo(application.initials, application.company)}<div><strong>${escapeHtml(application.company)}</strong><p>${escapeHtml(application.job)}</p></div></div><div class="detail-section"><h3>Current status</h3><span class="status-pill ${application.status==='Submitted'?'review':application.status==='In review'?'pending':''}">${escapeHtml(application.status)}</span></div><div class="detail-section"><h3>Submitted</h3><p>${escapeHtml(application.date)}</p></div><div class="detail-section"><p>Updates for this application will appear here when they are available.</p></div>`;openDetailDrawer(application.job, 'Application details', content, '<button class="btn btn-primary" data-drawer-close>Done</button>');}));
  $$('[data-action="export-candidates"]').forEach(btn=>btn.addEventListener('click',exportCandidatesCsv));
  $$('[data-action="export-evaluations"]').forEach(btn=>btn.addEventListener('click',exportEvaluationsCsv));
  $('#orgForm')?.addEventListener('submit',e=>{e.preventDefault();saveOrganisation();});
  $$('[data-action="save-organisation"]').forEach(btn=>btn.addEventListener('click',saveOrganisation));
  $$('[data-action="save-account"]').forEach(btn=>btn.addEventListener('click',()=>{state.recruiter.name=$('#recruiterName')?.value||state.recruiter.name;state.recruiter.email=$('#recruiterEmail')?.value||state.recruiter.email;persistDemoState();workspaceView();toast('Personal details saved.');}));
  $$('[data-preference-key]').forEach(input=>input.addEventListener('change',()=>{state.preferences[input.dataset.preferenceKey]=input.checked;}));
  $$('[data-action="dark-mode"]').forEach(input=>input.addEventListener('change',()=>{state.preferences.darkMode=input.checked;document.documentElement.dataset.theme=input.checked?'dark':'light';persistDemoState();toast(input.checked?'Dark mode enabled.':'Light mode enabled.');}));
  $$('[data-action="save-settings"]').forEach(btn=>btn.addEventListener('click',()=>{persistDemoState();toast('Preferences saved.');}));
  $$('[data-action="change-password"]').forEach(btn=>btn.addEventListener('click',()=>openDetailDrawer('Update password','Account security','<div class="detail-section"><h3>Secure password change</h3><p>Password changes require the live account service. This local workspace preview does not change account credentials.</p></div>', '<button class="btn btn-primary" data-drawer-close>Close</button>')));
  // Recruiter workflows restored from the live system's navigation and components.
  $$('[data-action="edit-campaign"]').forEach(btn=>btn.addEventListener('click',()=>{state.activeCampaignIndex=Number(btn.dataset.index);state.page='editor';workspaceView();}));
  $$('[data-action="campaign-applicants"]').forEach(btn=>btn.addEventListener('click',()=>{state.activeCampaignIndex=Number(btn.dataset.index);state.page='applicants';workspaceView();}));
  $$('[data-action="edit-active-campaign"]').forEach(btn=>btn.addEventListener('click',()=>{state.page='editor';workspaceView();}));
  $$('[data-action="editor-applicants"]').forEach(btn=>btn.addEventListener('click',()=>{state.page='applicants';workspaceView();}));
  $$('[data-editor-tab]').forEach(btn=>btn.addEventListener('click',()=>{
    $$('[data-editor-tab]').forEach(x=>x.classList.toggle('active',x===btn));
    $$('[data-editor-panel]').forEach(panel=>panel.hidden=panel.dataset.editorPanel!==btn.dataset.editorTab);
  }));
  $('#campaignEditForm')?.addEventListener('submit',event=>{
    event.preventDefault(); const form=event.currentTarget; if(!form.reportValidity())return;
    const c=state.campaigns[state.activeCampaignIndex];if(!c)return;
    c.title=$('#campTitle').value.trim();c.type=$('#campType').value;c.location=$('#campLocation').value.trim();
    c.service=$('#campService').value.trim();c.arrangement=$('#campArrangement').value;c.description=$('#campSummary').value;c.date=$('#campClose').value;
    persistDemoState();workspaceView();toast('Campaign draft saved in this browser.');
  });
  $$('[data-action="add-form-field"]').forEach(btn=>btn.addEventListener('click',()=>{
    openDetailDrawer('Add application question','Form builder preview',
      `<form id="newQuestionForm" class="drawer-form"><div class="field"><label for="questionText">Question label</label><input id="questionText" name="question" required placeholder="e.g. What relevant experience do you have?"></div></form>`,
      `<button class="btn btn-light" data-drawer-close>Cancel</button><button class="btn btn-primary" type="button" data-drawer-action="save-question">Add question</button>`);
  }));
  $$('[data-action="edit-form-field"]').forEach(btn=>btn.addEventListener('click',()=>{
    const c=state.campaigns[state.activeCampaignIndex],index=Number(btn.dataset.index),questions=c.questions||['Full name','Email address','CV / résumé','Why are you interested in this role?'];
    openDetailDrawer('Application question','Inspect form field',`<div class="detail-section"><strong>${escapeHtml(questions[index]||'Question')}</strong><p>Control type and required status are managed in the live campaign form builder. This preview keeps a simplified question list.</p></div>`,'<button class="btn btn-primary" data-drawer-close>Done</button>');
  }));
  $$('[data-action="invite-team"]').forEach(btn=>btn.addEventListener('click',()=>{
    openDetailDrawer('Invite colleague','Team access',`<form id="inviteTeamForm" class="drawer-form"><div class="field"><label for="invName">Full name</label><input id="invName" name="name" required></div><div class="field"><label for="invEmail">Work email</label><input id="invEmail" name="email" type="email" required></div><div class="field"><label for="invRole">Access role</label><select id="invRole" name="role"><option>Recruiter</option><option>Viewer</option><option>Administrator</option></select></div><div class="info-tile">Preview only: no invitation email will be sent.</div></form>`,
    '<button class="btn btn-light" data-drawer-close>Cancel</button><button class="btn btn-primary" data-drawer-action="add-team-member">Add invitation</button>');
  }));
  $$('[data-action="team-member"]').forEach(btn=>btn.addEventListener('click',()=>{
    const m=state.team[Number(btn.dataset.index)];if(!m)return;
    openDetailDrawer(m.name,'Membership settings',`<div class="detail-section"><p>${escapeHtml(m.email)}</p><span class="tag">${m.status}</span></div><div class="field"><label for="editTeamRole">Role</label><select id="editTeamRole">${['Recruiter','Viewer','Administrator'].map(role=>`<option ${m.role===role?'selected':''}>${role}</option>`).join('')}</select></div>`, `<button class="btn btn-light" data-drawer-close>Cancel</button><button class="btn btn-primary" data-drawer-action="save-team-role" data-index="${btn.dataset.index}">Save role</button>`);
  }));
  $$('[data-action="save-eval-settings"]').forEach(btn=>btn.addEventListener('click',()=>{
    state.evaluationSettings.enabled=$('#enableEvaluations')?.checked ?? state.evaluationSettings.enabled;
    state.evaluationSettings.instructions=$('#evalInstructions')?.value || '';
    state.evaluationSettings.minScore=Math.max(0,Math.min(100,Number($('#minEvalScore')?.value||70)));
    persistDemoState();toast('Evaluation preferences saved in this browser.');
  }));
  $$('[data-action="select-eval-template"]').forEach(btn=>btn.addEventListener('click',()=>{
    state.evaluationSettings.template=btn.dataset.template;
    const notes={'Balanced professional screening':'Focus on job-relevant experience, evidence and skills. Flag missing information clearly.',
      'Entry-level & graduate':'Consider potential, transferable skills and learning attitude rather than years of experience.',
      'Senior & leadership':'Examine leadership scope, outcomes, decision making and evidence of impact.',
      'Technical & engineering':'Review demonstrated technical depth, practical projects, quality and problem solving.'};
    state.evaluationSettings.instructions=notes[btn.dataset.template]||state.evaluationSettings.instructions;
    persistDemoState();workspaceView();toast('Template selected for review.');
  }));
  $$('[data-action="save-eval-template"]').forEach(btn=>btn.addEventListener('click',()=>openDetailDrawer('Save prompt template','Organisation template library', '<p class="detail-section">The connected RecruitFlow system can create and share named evaluation templates. This preview keeps only the selected template and draft guidance in your browser.</p>', '<button class="btn btn-primary" data-drawer-close>Close</button>')));
  $('#fullOrganisationForm')?.addEventListener('submit',event=>{
    event.preventDefault();if(!event.currentTarget.reportValidity())return;
    const data=new FormData(event.currentTarget);const d=state.organisationDetails;
    for(const [key,value] of data.entries()){
      if(key==='website')state.recruiter.website=String(value);
      else if(key==='about')state.recruiter.about=String(value);
      else if(key==='industry')state.recruiter.industry=String(value);
      else d[key]=String(value);
    }
    d.size=d.company_size||d.size;d.year=d.year_established||d.year;
    state.recruiter.organisation=d.trading_name||state.recruiter.organisation;
    d.published=$('#orgPublished')?.checked||false;
    persistDemoState();workspaceView();toast('Business details saved locally. No live organisation was published.');
  });
  $$('[data-action="preview-logo"]').forEach(btn=>btn.addEventListener('click',()=>$('#companyLogoUpload')?.click()));
  $$('[data-action="preview-banner"]').forEach(btn=>btn.addEventListener('click',()=>$('#companyBannerUpload')?.click()));
  $('#companyLogoUpload')?.addEventListener('change',event=>{if(event.target.files?.[0])handleCompanyImage(event.target.files[0],'logoDataUrl');});
  $('#companyBannerUpload')?.addEventListener('change',event=>{if(event.target.files?.[0])handleCompanyImage(event.target.files[0],'bannerDataUrl');});
  $$('[data-action="bulk-review"]').forEach(btn=>btn.addEventListener('click',()=>openDetailDrawer('Bulk applicant decisions','Campaign applicant workflow','<div class="detail-section"><p>The connected system supports bulk application disposition. Open a single applicant here to explore shortlisted, rejected and pending states safely. The preview does not send notices or change production records.</p></div>', '<button class="btn btn-primary" data-drawer-close>Done</button>')));
  $$('[data-action="applicant-detail"]').forEach(btn=>btn.addEventListener('click',()=>{
    const c=state.candidates[Number(btn.dataset.index)];if(!c)return;
    openDetailDrawer(c.name,'Campaign applicant review',`<div class="detail-person">${personAvatar(c,'large')}<div><h3>${escapeHtml(c.name)}</h3><p>${escapeHtml(c.role)}</p></div></div><div class="detail-section"><h3>Rule qualification</h3><span class="status-pill">Passed (illustrative)</span></div><div class="detail-section"><h3>AI assessment & regeneration</h3><p>Illustrative fit ${c.readiness}%. In the live app, recruiters can regenerate an evaluation from an application’s Evaluation tab.</p></div><div class="field"><label for="reviewNote">Recruiter notes</label><textarea id="reviewNote" placeholder="Record relevant assessment evidence"></textarea></div>`,
    `<button class="btn btn-light" data-drawer-action="change-applicant-status" data-index="${btn.dataset.index}" data-status="In review">Under review</button><button class="btn btn-primary" data-drawer-action="change-applicant-status" data-index="${btn.dataset.index}" data-status="Shortlisted">Shortlist</button><button class="btn btn-danger-soft" data-drawer-action="change-applicant-status" data-index="${btn.dataset.index}" data-status="Rejected">Reject</button>`);
  }));
  $('#applicantSearch')?.addEventListener('input',filterApplicants);
  $('#applicantStatus')?.addEventListener('change',filterApplicants);
  $$('[data-action="payment-info"],[data-action="redeem-preview"]').forEach(btn=>btn.addEventListener('click',()=>openDetailDrawer('Payment and access','Candidate subscription preview','<div class="detail-section"><p>Card subscriptions, manual payments and access-code checks require RecruitFlow’s connected backend. This preview does not take money, verify codes or grant access.</p></div>','<button class="btn btn-primary" data-drawer-close>Close</button>')));

  $('#globalSearch')?.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.value.trim()){const value=e.target.value.toLowerCase();if(state.role==='candidate'){if('job role company design'.split(' ').some(w=>value.includes(w)))state.page='jobs';else state.page='readiness';}else{state.page=value.includes('campaign')?'campaigns':'candidates';}workspaceView();}});
}
function refreshReadinessDynamic() {
  // change- Keep the wheel saved-state based while updating the checklist for the fields being edited.
  const live = completion(state.candidate);
  const changed = JSON.stringify(state.candidate) !== JSON.stringify(state.savedCandidate);
  const note = $('.demo-note');
  if (note) {
    note.innerHTML = changed
      ? `<strong>Unsaved changes</strong><br>Your edits bring readiness to ${live}%. Press Save to update your saved profile and dashboard.`
      : 'Your saved progress is in sync with the candidate dashboard.';
  }
  const items = readyItems(state.candidate);
  $$('#readinessChecklist .checklist-item').forEach((row, index) => {
    const complete = Boolean(items[index]);
    const check = $('.check-box', row);
    const status = $('.status-pill', row);
    if (check) check.textContent = complete ? '✓' : String(index + 1).padStart(2, '0');
    if (status) {
      status.textContent = complete ? 'Complete' : 'Needed';
      status.classList.toggle('pending', !complete);
    }
  });
}
function saveCandidateProfile() {
  state.savedCandidate=JSON.parse(JSON.stringify(state.candidate));
  persistDemoState();
  // change- Refresh the current page from the saved candidate profile after Save.
  workspaceView();
  toast(`Profile saved. Your readiness is now ${completion(state.savedCandidate)}% across your dashboard.`);
}
function addSkill() {
  const input=$('#skill-input'); if(!input)return;
  const skill=input.value.trim(); if(!skill){toast('Type a skill first.','error');return;}
  if(state.candidate.skills.some(s=>s.toLowerCase()===skill.toLowerCase())){toast('That skill is already on your list.','error');return;}
  state.candidate.skills.push(skill); workspaceView(); toast('Skill added. Save your profile to sync readiness.');
}
function handlePhotoFile(file) {
  if (!file.type.startsWith('image/')) { toast('Choose a PNG, JPG, or WebP image.', 'error'); return; }
  if (file.size > 10 * 1024 * 1024) { toast('Choose an image smaller than 10 MB.', 'error'); return; }
  const reader = new FileReader();
  reader.onerror = () => toast('That image could not be opened. Try another file.', 'error');
  reader.onload = () => {
    const image = new Image();
    image.onerror = () => toast('That image could not be opened. Try another file.', 'error');
    image.onload = () => {
      const scale = Math.min(1, 360 / Math.max(image.width, image.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext('2d');
      if (!context) { toast('This browser cannot preview that image.', 'error'); return; }
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      state.candidate.photo = true;
      state.candidate.photoName = file.name;
      state.candidate.photoDataUrl = canvas.toDataURL('image/jpeg', 0.82);
      workspaceView();
      toast('Photo selected. Save your profile to keep the change in this browser.');
    };
    image.src = String(reader.result || '');
  };
  reader.readAsDataURL(file);
}
function handleCompanyImage(file,key) {
  if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>10*1024*1024){toast('Choose a PNG, JPG or WebP under 10 MB.','error');return;}
  const reader=new FileReader();
  reader.onerror=()=>toast('Could not read the image.','error');
  reader.onload=()=>{
    const image=new Image();image.onerror=()=>toast('Could not open the image.','error');
    image.onload=()=>{
      const canvas=document.createElement('canvas');const width=key==='logoDataUrl'?320:1000;
      const scale=Math.min(1,width/Math.max(image.width,image.height));
      canvas.width=Math.max(1,Math.round(image.width*scale));canvas.height=Math.max(1,Math.round(image.height*scale));
      const ctx=canvas.getContext('2d');if(!ctx)return;
      ctx.drawImage(image,0,0,canvas.width,canvas.height);
      state.organisationDetails[key]=canvas.toDataURL('image/jpeg',.78);
      persistDemoState();workspaceView();toast('Company image updated in this browser preview.');
    };image.src=String(reader.result||'');
  };reader.readAsDataURL(file);
}
function downloadCsv(filename, rows) {
  const csv = rows.map(row => row.map(value => `"${String(value ?? '').replace(/"/g, '""')}"`).join(',')).join('\r\n');
  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = filename; link.style.display = 'none';
  document.body.appendChild(link); link.click(); link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast(`${filename} downloaded.`);
}
function exportCandidatesCsv() {
  downloadCsv('recruitflow-candidates.csv', [
    ['Name', 'Role', 'Skills', 'Readiness', 'Status'],
    ...state.candidates.map(candidate => [candidate.name, candidate.role, candidate.skills.join('; '), `${candidate.readiness}%`, candidate.status])
  ]);
}
function exportEvaluationsCsv() {
  downloadCsv('recruitflow-evaluations.csv', [
    ['Candidate', 'Role', 'Review status'],
    ...state.candidates.map(candidate => [candidate.name, candidate.role, candidate.status])
  ]);
}

function filterJobs() {
  const search=($('#jobSearch')?.value||'').toLowerCase(), type=$('#jobType')?.value||'', loc=$('#jobLocation')?.value||'', service=$('#jobService')?.value||'';
  let jobs=state.jobs;
  if(state.page==='saved')jobs=jobs.filter(j=>state.savedJobs.has(j.id));
  jobs=jobs.filter(j=>(!search||`${j.title} ${j.company} ${j.tags.join(' ')}`.toLowerCase().includes(search))&&(!type||j.type===type)&&(!loc||j.location.toLowerCase().includes(loc.toLowerCase()))&&(!service||`${j.title} ${j.tags.join(' ')}`.toLowerCase().includes(service.toLowerCase())));
  $('#jobsGrid').innerHTML=jobs.length?jobs.map(jobCard).join(''):`<div class="card empty-state"><div class="empty-icon">${iconSvg('search')}</div><h3>No roles found</h3><p>Try another search or remove a filter.</p></div>`;
  $$('[data-action="save-job"]', $('#jobsGrid')).forEach(btn=>btn.addEventListener('click',()=>{const id=Number(btn.dataset.job);state.savedJobs.has(id)?state.savedJobs.delete(id):state.savedJobs.add(id);persistDemoState();workspaceView();}));
  $$('[data-action="view-job"]', $('#jobsGrid')).forEach(btn=>btn.addEventListener('click',()=>{const job=state.jobs.find(item=>item.id===Number(btn.dataset.job));if(job)openJobDrawer(job);}));
}
function wireActivityToggle(panel) {
  if(!panel)return;
  panel.addEventListener('click',event=>{
    const button=event.target.closest('[data-action="recruiter-activity-view"]');if(!button)return;
    state.recruiterActivityView=button.dataset.view;
    panel.innerHTML=recruiterActivityPanel();
  });
}
function filterApplicants() {
  const term=($('#applicantSearch')?.value||'').trim().toLowerCase(), status=$('#applicantStatus')?.value||'';
  $$('#applicantRows tr').forEach(row=>row.hidden=Boolean((term&&!row.dataset.applicant.includes(term))||(status&&row.dataset.status!==status)));
}
function filterCandidates() {
  const q=($('#candidateSearch')?.value||'').toLowerCase(), status=$('#candidateStatus')?.value||'';
  const data=state.candidates.filter(c=>(!q||`${c.name} ${c.role} ${c.skills.join(' ')}`.toLowerCase().includes(q))&&(!status||c.status===status));
  $('#candidateRows').innerHTML=data.length?data.map(candidateRow).join(''):`<tr><td colspan="5"><div class="empty-state"><h3>No candidates found</h3><p>Try a different search.</p></div></td></tr>`;
  $$('[data-action="candidate-detail"]', $('#candidateRows')).forEach(btn=>btn.addEventListener('click',()=>{const candidate=state.candidates.find(item=>item.name===btn.dataset.candidate);if(candidate)openCandidateDrawer(candidate);}));
}
function saveOrganisation() {
  state.recruiter.organisation=$('#orgName')?.value?.trim()||state.recruiter.organisation;
  state.recruiter.industry=$('#orgIndustry')?.value||state.recruiter.industry;
  state.recruiter.website=$('#orgWebsite')?.value?.trim()||state.recruiter.website;
  state.recruiter.about=$('#orgAbout')?.value?.trim()||state.recruiter.about;
  persistDemoState();
  workspaceView();toast('Organisation profile saved in this browser.');
}

// Initial loading screen uses the same replaceable logo asset as the rest of the app.
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => { $('#bootScreen')?.classList.add('is-hidden'); renderLogin(); }, 1250);
});
