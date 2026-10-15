import { brand, navigation } from '../data/site.js';
import { icon } from './icons.js';

export function renderHeader(activePage) {
  const links = navigation.map(item => {
    const active = item.key === activePage;
    return `<a class="nav-link${active ? ' is-active' : ''}" href="${item.href}"${active ? ' aria-current="page"' : ''}>${item.label}</a>`;
  }).join('');

  return `
    <header class="site-header">
      <div class="site-header__inner wrap">
        <a class="brand-lockup" href="./index.html" aria-label="RecruitFlow by Refrane — Platform home">
          <img class="brand-lockup__mark" src="${brand.logo}" alt="" width="40" height="40">
          <span class="brand-lockup__text"><strong class="brand-lockup__wordmark"><span>recruit</span><em>flow</em></strong></span>
        </a>
        <nav class="desktop-nav" aria-label="Main navigation">${links}</nav>
        <a class="button button--small button--primary header-cta" href="./index.html#book-demo">Book a demo ${icon('arrow-up-right', 'button__icon', { size: 15 })}</a>
        <button class="mobile-menu-button" type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-nav" aria-label="Open navigation menu">${icon('menu', 'mobile-menu-button__open', { size: 23 })}${icon('close', 'mobile-menu-button__close', { size: 23 })}</button>
      </div>
      <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation" hidden>${links}<a class="mobile-nav__cta" href="./index.html#book-demo">Book a demo ${icon('arrow-up-right', '', { size: 16 })}</a></nav>
    </header>`;
}
