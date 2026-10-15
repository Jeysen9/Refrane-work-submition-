import { brand, footerNavigation } from '../data/site.js';
import { icon } from './icons.js';

function linkList(items) {
  return items.map(item => `<li><a href="${item.href}">${item.label}</a></li>`).join('');
}

export function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="site-footer__top wrap">
        <div class="footer-brand">
          <a class="brand-lockup" href="./index.html" aria-label="${brand.name} home">
            <img class="brand-lockup__mark" src="${brand.logo}" alt="" width="38" height="38">
            <span class="brand-lockup__text"><strong class="brand-lockup__wordmark"><span>recruit</span><em>flow</em></strong><small>by ${brand.parent}</small></span>
          </a>
          <p>${brand.description}</p>
          <div class="footer-socials" aria-label="Social platforms">
            <span class="social-symbol" role="img" aria-label="LinkedIn">${icon('linkedin', '', { size: 18 })}</span>
            <span class="social-symbol" role="img" aria-label="Instagram">${icon('instagram', '', { size: 18 })}</span>
            <span class="social-symbol" role="img" aria-label="Facebook">${icon('facebook', '', { size: 18 })}</span>
            <span class="social-symbol" role="img" aria-label="X">${icon('x-social', '', { size: 17 })}</span>
          </div>
        </div>
        <div class="footer-column"><h2>Platform</h2><ul>${linkList(footerNavigation.platform)}</ul></div>
        <div class="footer-column"><h2>Company</h2><p class="footer-static">About Refrane</p><ul>${linkList(footerNavigation.company)}</ul></div>
        <div class="footer-cta">
          <span class="eyebrow">Next step</span>
          <h2>Ready to transform your hiring process?</h2>
          <p>Book a 20-minute demo with our team.</p>
          <a class="text-link" href="./index.html#book-demo">Book a demo ${icon('arrow-up-right', '', { size: 16 })}</a>
        </div>
      </div>
      <div class="site-footer__bottom wrap">
        <p>© ${brand.year} ${brand.parent} Inc. All rights reserved.</p>
        <div class="footer-legal-links">
          <a href="./privacy.html">Privacy</a>
          <a href="./terms.html">Terms</a>
          <a href="./privacy.html#policy-review" class="gdpr-reference">GDPR Compliant</a>
        </div>
      </div>
    </footer>`;
}
