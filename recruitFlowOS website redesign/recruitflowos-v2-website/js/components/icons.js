/* Small inline SVG icon set. Keeping icons local avoids a runtime dependency. */
const paths = {
  'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  'arrow-up-right': '<path d="M7 17 17 7"/><path d="M7 7h10v10"/>',
  'arrow-down': '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
  'sparkles': '<path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z"/><path d="m19 14 1.1 2.9L23 18l-2.9 1.1L19 22l-1.1-2.9L15 18l2.9-1.1L19 14Z"/>',
  'target': '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
  'layers': '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 16 9 5 9-5"/>',
  'users': '<path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9.5" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.87"/><path d="M16.5 3.2a4 4 0 0 1 0 7.6"/>',
  'briefcase': '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/><path d="M10 12v2h4v-2"/>',
  'mail': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
  'link': '<path d="M10 13a5 5 0 0 0 7.1 0l2-2A5 5 0 0 0 12 3.9l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.1 0l-2 2A5 5 0 0 0 12 20.1l1.1-1.1"/>',
  'check': '<path d="m5 12 4 4L19 6"/>',
  'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>',
  'calendar': '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  'clock': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  'chart': '<path d="M4 19V5M4 19h17"/><path d="m7 15 4-4 3 2 5-6"/>',
  'menu': '<path d="M4 6h16M4 12h16M4 18h16"/>',
  'close': '<path d="m6 6 12 12M18 6 6 18"/>',
  'play': '<path d="m8 5 11 7-11 7V5Z"/>',
  'external': '<path d="M14 3h7v7M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  'shield': '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
  'info': '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
  'sparkle-small': '<path d="m12 3 1.5 6 6 1.5-6 1.5-1.5 6-1.5-6L4.5 10.5 10.5 9 12 3Z"/>',
  'linkedin': '<path d="M5 9v10M5 5v.01M10 19v-10h4v1.5a4 4 0 0 1 7 3V19M10 13a4 4 0 0 1 4-4"/>',
  'instagram': '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/>',
  'facebook': '<path d="M15.5 21v-8h3l.5-4h-3.5V7c0-1.2.4-2 2-2H19V2.5A17 17 0 0 0 16.5 2C13.5 2 12 3.6 12 6.7V9H9v4h3v8"/>',
  'x-social': '<path d="M4 3h4l12 18h-4L4 3Z"/><path d="M20 3 4 21"/>',
  'building': '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 7h2M9 11h2M9 15h2M15 7h1M15 11h1M15 15h1M9 21v-3h6v3"/>'
};

export function icon(name, className = '', options = {}) {
  const content = paths[name] || paths.sparkles;
  const label = options.label ? ` role="img" aria-label="${options.label}"` : ' aria-hidden="true"';
  const size = options.size || 20;
  return `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"${label}>${content}</svg>`;
}
