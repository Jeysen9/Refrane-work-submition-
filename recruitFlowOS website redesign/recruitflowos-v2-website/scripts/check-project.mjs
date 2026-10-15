import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderHeader } from '../js/components/header.js';
import { renderFooter } from '../js/components/footer.js';
import { renderPlatform } from '../js/pages/platform.js';
import { renderFeatures } from '../js/pages/features.js';
import { renderPricing } from '../js/pages/pricing.js';
import { renderCaseStudies } from '../js/pages/case-studies.js';
import { renderLegal } from '../js/pages/legal.js';
import { faqs, teamSegments, annualSaving, plans, comparisonFeatures } from '../js/data/pricing.js';
import { caseStudies } from '../js/data/case-studies.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let checks = 0;
function check(condition, message) {
  checks += 1;
  if (!condition) throw new Error(`FAIL: ${message}`);
  console.log(`PASS: ${message}`);
}
function render(fn, ...args) {
  const target = { innerHTML: '' };
  fn(target, ...args);
  return target.innerHTML;
}

const pages = {
  platform: render(renderPlatform),
  features: render(renderFeatures),
  pricing: render(renderPricing),
  'case-studies': render(renderCaseStudies),
  privacy: render(renderLegal, 'privacy'),
  terms: render(renderLegal, 'terms'),
  refunds: render(renderLegal, 'refunds')
};
const header = Object.entries(pages).map(([key]) => renderHeader(key)).join('\n');
const footer = renderFooter();

check(Object.keys(pages).length === 7, 'All seven primary page renderers return markup');
check(pages.platform.includes('Hire Faster. Screen Smarter.') && pages.platform.includes('hero-logo-depth'), 'Platform page includes source headline and logo-centred hero');
check(!/\bglobe\b|world map|planet visual/i.test(pages.platform), 'Platform hero markup does not introduce a globe visual');
check((pages.platform.match(/class="process-step /g) || []).length === 5, 'Platform page includes all five how-it-works steps');
check((pages.platform.match(/class="testimonial-card /g) || []).length === 3, 'Platform page includes all three customer testimonials');
check(pages.features.includes('94%') && pages.features.includes('127') && pages.features.includes('38%'), 'Features page preserves source statistics');
check(pages.pricing.includes('N$299') && pages.pricing.includes('N$799') && pages.pricing.includes('Save 20%') && !pages.pricing.includes('Converted at'), 'Pricing retains original numeric amounts with N$ symbol and annual saving');
check(faqs.every(item => item.answer && pages.pricing.includes(item.answer)), 'All four original FAQ answers are present verbatim');
check((pages.pricing.match(/<tr><th scope="row">/g) || []).length === 5 && pages.pricing.includes('Custom scorecard matrices') && pages.pricing.includes('SAML, SSO, Compliance Logs'), 'Comparison table contains only the five original capability rows');
check(comparisonFeatures.length === 5 && comparisonFeatures.every(row => row.values.length === 3), 'Every screenshot comparison category has exactly three plan values');
check(annualSaving === .20 && Math.round(plans[0].monthlyPrice * (1 - annualSaving)) === 239 && Math.round(plans[1].monthlyPrice * (1 - annualSaving)) === 639, 'Annual monthly equivalents correctly round to N$239 and N$639');
check(fs.readFileSync(path.join(root, 'js/pages/pricing.js'), 'utf8').includes('Math.round(value)') && fs.readFileSync(path.join(root, 'js/pages/pricing.js'), 'utf8').includes('plan.monthlyPrice * (1 - annualSaving) * 12'), 'Displayed N$ values are whole dollars while annual totals retain a full 20% discount');
check(teamSegments.startups.title === 'Agile Sourcing & Fast Offboarding' && pages.pricing.includes('Standardized Loops & Analytical Funnels') && teamSegments.scaleups.title === 'Standardized Loops & Analytical Funnels' && teamSegments.enterprises.title === 'SLA Guarantees, Custom Models & SSO Security', 'Team tabs restore all three source screenshots');
check(pages['case-studies'].includes('why-teams__check') && (pages['case-studies'].match(/case-story__company-lockup/g) || []).length === 3, 'Why teams uses checkmarks and three study logos appear beside company names');
check(caseStudies.length === 3 && caseStudies.every(story => fs.existsSync(path.join(root, story.logo)) && fs.existsSync(path.join(root, story.portrait))), 'All case-study portrait/logo pairs exist locally');
check(footer.includes('LinkedIn') && footer.includes('Instagram') && footer.includes('Facebook'), 'Visual social platform symbols are included without unapproved links');
check((pages['case-studies'].match(/class="case-story /g) || []).length === 3 && (pages['case-studies'].match(/class="case-story__stars"/g) || []).length === 3, 'Case Studies renders all three stories with five stars on every card');
check(pages.privacy.includes('publication placeholder') && pages.terms.includes('publication placeholder') && pages.refunds.includes('publication placeholder'), 'Three legal routes explicitly identify their placeholder state');
check(!/href="#"/.test(header + footer + Object.values(pages).join('\n')), 'Rendered page markup has no dead hash-only links');

const allMarkup = header + footer + Object.values(pages).join('\n');
const assetReferences = [...allMarkup.matchAll(/(?:src|href)="(\.\/assets\/[^"#?]+)"/g)].map(m => m[1]);
const missingAssets = [...new Set(assetReferences)].filter(ref => !fs.existsSync(path.resolve(root, ref)));
check(missingAssets.length === 0, missingAssets.length ? `No missing referenced assets: ${missingAssets.join(', ')}` : 'All local image / asset references resolve');

for (const file of ['index.html','features.html','pricing.html','case-studies.html','privacy.html','terms.html','refunds.html']) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const styleRefs = [...html.matchAll(/href="(\.\/styles\/[^"#?]+\.css)"/g)].map(m => m[1]);
  const scriptRefs = [...html.matchAll(/src="(\.\/js\/[^"#?]+\.js)"/g)].map(m => m[1]);
  const expectedStyles = file === 'index.html' ? 10 : 9;
  check(styleRefs.length === expectedStyles + 1 && styleRefs.every(ref => fs.existsSync(path.resolve(root, ref))), `${file} loads all ${expectedStyles + 1} shared/page CSS stylesheets`);
  check(scriptRefs.length === 1 && scriptRefs.every(ref => fs.existsSync(path.resolve(root, ref))), `${file} loads the shared JavaScript entry point`);
}

check(pages.platform.includes('recruitflow-product-demo.mp4') && fs.existsSync(path.join(root,'assets/media/recruitflow-product-demo.mp4')), 'Uploaded demo video is linked and shipped with the website');
check(pages.platform.includes('booking-calendly') && pages.platform.includes('calendly-embed') && pages.platform.includes('booking-fallback'), 'Same-page Calendly booking card and backup link are present');
check(fs.existsSync(path.join(root,'assets/images/recruitflow-mark.png')) && header.includes('recruitflow-mark.png'), 'Supplied updated branding powers the main navigation');
check(fs.readFileSync(path.join(root,'styles/pages/features.css'),'utf8').includes('position: relative; z-index: 2;'), 'Features navigation no longer sticks over page content');
check(fs.existsSync(path.join(root,'js/components/intro.js')) && pages.platform.includes('data-replay-intro'), 'Cinematic intro includes a replay control and a modular controller');
check(pages.platform.includes('hero-logo-depth__layer') && !pages.platform.includes('chapter-bridge') && pages.platform.includes('hero-primary-cta'), '3D hero retained, redundant marquee removed and CTA repositioned');
check(fs.existsSync(path.join(root,'js/components/atmosphere.js')) && fs.existsSync(path.join(root,'styles/art-direction.css')), 'Shared translucent 3D brand backgrounds included');
check(fs.readFileSync(path.join(root,'js/components/booking.js'),'utf8').includes('Calendly.initInlineWidget'), 'Official Calendly inline booking is used on mobile and desktop');
check(fs.existsSync(path.join(root,'styles/intro.css')) && fs.existsSync(path.join(root,'styles/premium.css')) && fs.existsSync(path.join(root,'styles/finishing-2.3.css')), 'Cinematic, glass and 2.3 finishing design layers exist');
check(fs.readFileSync(path.join(root,'js/components/motion.js'),'utf8').includes('199 * progress'), '3D logo ends exactly back-facing at 180 degrees');
check(fs.readFileSync(path.join(root,'js/main.js'), 'utf8').includes('initPageTransitions(pageKey)') && fs.readFileSync(path.join(root, 'styles/finishing-2.4.css'), 'utf8').includes('@view-transition'), 'Page-transition controller and native cross-document styles are installed');
check(['old-pricing-comparison.png','old-team-startups.png','old-team-scaleups.png','old-team-enterprises.png'].every(name => fs.existsSync(path.join(root, 'docs/reference', name))), 'All four original pricing screenshots are retained as handover references');
check([...Array.from({length:7},(_,i)=>['index.html','features.html','pricing.html','case-studies.html','privacy.html','terms.html','refunds.html'][i])].every(name=>fs.readFileSync(path.join(root,name),'utf8').includes('styles/finishing-2.4.css')), 'Every site route loads the final 2.4 style layer');
console.log(`\n${checks} project checks passed.`);
