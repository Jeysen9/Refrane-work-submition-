import { legalPages } from '../data/legal.js';
import { icon } from '../components/icons.js';

export function renderLegal(root, key) {
  const page = legalPages[key] || legalPages.privacy;
  root.innerHTML = `
    <section class="legal-page wrap" id="top">
      <div class="legal-page__intro"><span class="eyebrow">${page.eyebrow}</span><h1>${page.title}</h1><p>${page.summary}</p><span class="policy-status">${icon('shield', '', { size: 16 })} Approved policy text required</span></div>
      <article class="policy-placeholder" id="policy-review">
        <div class="policy-placeholder__icon">${icon('info', '', { size: 22 })}</div>
        <div><h2>This page is a publication placeholder.</h2><p>The supplied saved website links to <code>${page.path}</code>, but the approved policy document was not included in the provided files. This page intentionally does not invent legal terms or claim to state the company’s actual privacy, service, or refund practices.</p><p>Replace this notice with the company-approved ${page.title.toLowerCase()} text before the website is published.</p><span class="content-pending">Content needed from the owner / legal reviewer</span></div>
      </article>
      <a class="text-link legal-page__back" href="./index.html">Back to Platform ${icon('arrow-right', '', { size: 16 })}</a>
    </section>`;
}
