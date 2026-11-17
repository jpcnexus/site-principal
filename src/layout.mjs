// Layout compartilhado: <head>, header, footer, breadcrumbs e componentes reutilizáveis.
import { site, social, email, waLink } from './config.mjs';
import { shortName } from './data/projects.mjs';

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const LOGO = '/assets/brand/nexus-jpc/nexus-jpc-logo-principal.svg';
const ICON = '/assets/brand/nexus-jpc/nexus-jpc-icone.svg';
const ASSET_V = Date.now().toString(36); // cache-busting dos arquivos CSS/JS a cada build

// ---------- Ícones (traço 1.75, estilo linear) ----------
const P = {
  monitor: '<rect x="2.5" y="3.5" width="19" height="13" rx="2"/><path d="M8 20.5h8M12 16.5v4"/>',
  pointer: '<path d="M9 9l5 12 1.8-5.2L21 14 9 9z"/><path d="M7.2 2.2 8 5.1M5.1 8 2.2 7.2M14 4.1 12 6.2M6.2 12l-2.1 2"/>',
  qr: '<rect x="3" y="3" width="7" height="7" rx="1.2"/><rect x="14" y="3" width="7" height="7" rx="1.2"/><rect x="3" y="14" width="7" height="7" rx="1.2"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3"/>',
  workflow: '<rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  external: '<path d="M7 17 17 7M8 7h9v9"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
  rocket: '<path d="M5 15c-1.5 1.5-2 4.5-2 4.5s3-.5 4.5-2M14 6l4 4M9.5 14.5 6 11c2-5 6-8 13-8 0 7-3 11-8 13l-1.5-1.5z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5z"/><path d="m3 13 9 5 9-5"/>',
  shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
  phone: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.01"/>',
  alert: '<path d="M12 3 2 21h20L12 3z"/><path d="M12 10v5M12 18v.01"/>',
  home: '<path d="m3 11 9-7 9 7"/><path d="M5 10v10h14V10"/>',
};
const WA = '<path fill="currentColor" stroke="none" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.8 14.03c-.25.69-1.45 1.33-2 1.38-.51.05-1 .24-3.36-.7-2.84-1.12-4.65-4.04-4.79-4.23-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.35.26-.28.56-.35.75-.35l.54.01c.17.01.41-.07.64.49.24.57.81 1.97.88 2.11.07.14.12.31.02.5-.09.19-.14.31-.28.47-.14.17-.3.37-.42.5-.14.14-.29.29-.12.57.17.28.73 1.2 1.57 1.95 1.08.96 1.99 1.26 2.27 1.4.28.14.45.12.61-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.64-.14.26.09 1.65.78 1.93.92.28.14.47.21.54.33.07.12.07.69-.18 1.37z"/>';

export function icon(name, cls = '') {
  const body = name === 'whatsapp' ? WA : P[name];
  return `<svg class="ico${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
}

// ---------- Navegação ----------
export const nav = [
  { id: 'inicio', label: 'Início', href: '/' },
  { id: 'servicos', label: 'Serviços', href: '/servicos/' },
  { id: 'projetos', label: 'Projetos', href: '/projetos/' },
  { id: 'sobre', label: 'Sobre', href: '/sobre/' },
  { id: 'contato', label: 'Contato', href: '/contato/' },
];

function header(active) {
  const links = nav
    .map(
      (n) =>
        `<li><a href="${n.href}"${n.id === active ? ' aria-current="page"' : ''}>${n.label}</a></li>`
    )
    .join('');
  return `
<a class="skip" href="#conteudo">Pular para o conteúdo</a>
<header class="site-header" data-header>
  <div class="container header-inner">
    <a class="brand" href="/" aria-label="Nexus JPC — página inicial">
      <img src="${LOGO}" alt="Nexus JPC — Soluções Digitais" width="186" height="43">
    </a>
    <nav class="nav" aria-label="Principal">
      <ul class="nav-list">${links}</ul>
    </nav>
    <a class="btn btn-primary btn-sm header-cta" href="/contato/">Solicitar orçamento</a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="menu-mobile" aria-label="Abrir menu" data-menu-toggle>
      <span class="menu-icon menu-icon-open">${icon('menu')}</span>
      <span class="menu-icon menu-icon-close">${icon('close')}</span>
    </button>
  </div>
  <div class="mobile-menu" id="menu-mobile" data-mobile-menu hidden>
    <nav class="container" aria-label="Menu móvel">
      <ul>${nav
        .map(
          (n, i) =>
            `<li style="--i:${i}"><a href="${n.href}"${n.id === active ? ' aria-current="page"' : ''}>${n.label}${icon('arrow')}</a></li>`
        )
        .join('')}</ul>
      <a class="btn btn-primary btn-block" href="/contato/">Solicitar orçamento</a>
      <a class="btn btn-ghost btn-block" href="${waLink()}" target="_blank" rel="noopener">${icon('whatsapp')} Falar no WhatsApp</a>
    </nav>
  </div>
</header>`;
}

function footer() {
  const year = new Date().getFullYear();
  const socials = social.length
    ? `<div class="footer-col"><h2 class="footer-title">Redes</h2><ul>${social
        .map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a></li>`)
        .join('')}</ul></div>`
    : '';
  return `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/" aria-label="Nexus JPC — página inicial"><img src="${LOGO}" alt="Nexus JPC — Soluções Digitais" width="210" height="49" loading="lazy"></a>
        <p class="footer-slogan">${esc(site.slogan)}</p>
        <a class="btn btn-ghost btn-sm" href="${waLink()}" target="_blank" rel="noopener">${icon('whatsapp')} Falar no WhatsApp</a>
      </div>
      <div class="footer-col">
        <h2 class="footer-title">Navegação</h2>
        <ul>${nav.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}</ul>
      </div>
      <div class="footer-col">
        <h2 class="footer-title">Serviços</h2>
        <ul>
          <li><a href="/servicos/sites/">Sites Institucionais</a></li>
          <li><a href="/servicos/landing-pages/">Landing Pages</a></li>
          <li><a href="/servicos/solucoes-digitais/">Soluções Digitais</a></li>
          <li><a href="/servicos/automacoes/">Sistemas e Automações</a></li>
        </ul>
      </div>
      ${socials}
      ${email ? `<div class="footer-col"><h2 class="footer-title">E-mail</h2><ul><li><a href="mailto:${esc(email)}">${esc(email)}</a></li></ul></div>` : ''}
    </div>
    <div class="footer-bottom">
      <p>© <span data-year>${year}</span> Nexus JPC. Todos os direitos reservados.</p>
      <p class="footer-domain">nexusjpc.com.br</p>
    </div>
  </div>
</footer>`;
}

export function breadcrumbs(items) {
  // items: [{label, href}] — o último é a página atual
  const all = [{ label: 'Início', href: '/' }, ...items];
  return `<nav class="breadcrumbs" aria-label="Você está em"><ol>${all
    .map((it, i) =>
      i === all.length - 1
        ? `<li><span aria-current="page">${esc(it.label)}</span></li>`
        : `<li><a href="${it.href}">${esc(it.label)}</a></li>`
    )
    .join('')}</ol></nav>`;
}

function breadcrumbLd(items) {
  const all = [{ label: 'Início', href: '/' }, ...items];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.label,
      item: site.url + it.href,
    })),
  };
}

// ---------- Página completa ----------
export function page({ path, title, description, active, body, crumbs, jsonld = [], ogImage, preload = [], bodyClass = '', noindex = false }) {
  const canonical = site.url + path;
  const fullTitle = path === '/' ? title : `${title} | Nexus JPC`;
  const og = site.url + (ogImage || '/assets/og/nexus-jpc-og.jpg');
  const ld = [...jsonld];
  if (crumbs) ld.push(breadcrumbLd(crumbs));
  return `<!DOCTYPE html>
<html lang="${site.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${canonical}">`}
<meta name="theme-color" content="${site.themeColor}">
<meta name="color-scheme" content="dark">
<meta property="og:type" content="website">
<meta property="og:locale" content="${site.locale}">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(fullTitle)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${og}">
<link rel="icon" type="image/svg+xml" href="/assets/brand/nexus-jpc/nexus-jpc-favicon.svg">
<link rel="icon" type="image/png" href="/assets/brand/nexus-jpc/nexus-jpc-favicon.png">
<link rel="apple-touch-icon" href="/assets/brand/nexus-jpc/nexus-jpc-favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap">
${preload.map((p) => `<link rel="preload" as="image" href="${p}" fetchpriority="high">`).join('\n')}
<link rel="stylesheet" href="/assets/css/site.css?v=${ASSET_V}">
${ld.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n')}
</head>
<body class="${bodyClass}">
${header(active)}
<main id="conteudo" tabindex="-1">
${body}
</main>
${footer()}
<script src="/assets/js/site.js?v=${ASSET_V}" defer></script>
</body>
</html>
`;
}

// ---------- Componentes ----------
export function sectionHead({ eyebrow, title, text, align = 'left', level = 2 }) {
  return `<div class="section-head${align === 'center' ? ' is-center' : ''}" data-reveal>
  ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
  <h${level} class="section-title">${title}</h${level}>
  ${text ? `<p class="section-text">${text}</p>` : ''}
</div>`;
}

export function statusBadge(status) {
  return `<span class="status status-${status.tone}"><span class="status-dot" aria-hidden="true"></span>${esc(status.label)}</span>`;
}

export function projectCard(p, { headingLevel = 3, eager = false } = {}) {
  const img = `/assets/projects/${p.slug}/capa-720.webp`;
  return `<article class="project-card" data-reveal data-project data-tags="${p.tags.join(' ')}" data-name="${esc((p.nome + ' ' + (p.nomeCurto || '') + ' ' + p.categoria).toLowerCase())}">
  <a class="project-media" href="/projetos/${p.slug}/" tabindex="-1" aria-hidden="true">
    <img src="${img}" alt="" width="720" height="450" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">
    <span class="project-media-overlay"><span>Ver case ${icon('arrow')}</span></span>
  </a>
  <div class="project-body">
    <div class="project-meta">
      <span class="chip">${esc(p.categoria)}</span>
      ${statusBadge(p.status)}
    </div>
    <h${headingLevel} class="project-title"><a href="/projetos/${p.slug}/">${esc(p.nome)}</a></h${headingLevel}>
    <p class="project-text">${esc(p.resumo)}</p>
    <div class="project-actions">
      <a class="link-arrow" href="/projetos/${p.slug}/">Ver case ${icon('arrow')}</a>
      ${p.url ? `<a class="link-ext" href="${p.url}" target="_blank" rel="noopener" aria-label="Abrir site publicado de ${esc(shortName(p))} (nova aba)">Ver site ${icon('external')}</a>` : ''}
    </div>
  </div>
</article>`;
}

export function serviceCard(s, i = 0, level = 3) {
  return `<a class="service-card" href="/servicos/${s.slug}/" data-reveal style="--d:${i * 70}ms">
  <span class="service-icon">${icon(s.icon)}</span>
  <h${level} class="service-title">${esc(s.titulo)}</h${level}>
  <p class="service-text">${esc(s.descricao)}</p>
  <span class="link-arrow" aria-hidden="true">Saiba mais ${icon('arrow')}</span>
</a>`;
}

export function ctaBanner({ title = 'Vamos tirar seu projeto do <span class="grad">papel</span>?', text = 'Conte sua ideia e descubra como a Nexus JPC pode ajudar seu negócio no digital.', primary = { label: 'Conversar sobre meu projeto', href: '/contato/' } } = {}) {
  return `<section class="section section-cta" aria-labelledby="cta-title">
  <div class="container">
    <div class="cta-banner" data-reveal>
      <div class="cta-glow" aria-hidden="true"></div>
      <div class="cta-copy">
        <h2 id="cta-title" class="cta-title">${title}</h2>
        <p>${text}</p>
      </div>
      <div class="cta-actions">
        <a class="btn btn-primary" href="${primary.href}">${esc(primary.label)} ${icon('arrow')}</a>
        <a class="btn btn-ghost" href="${waLink()}" target="_blank" rel="noopener">${icon('whatsapp')} WhatsApp</a>
      </div>
    </div>
  </div>
</section>`;
}

export function pageHero({ eyebrow, title, text, crumbs, extra = '' }) {
  return `<section class="page-hero">
  <div class="page-hero-bg" aria-hidden="true"></div>
  <div class="container">
    ${breadcrumbs(crumbs)}
    <div class="page-hero-copy">
      ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
      <h1 class="page-title">${title}</h1>
      ${text ? `<p class="page-lead">${text}</p>` : ''}
      ${extra}
    </div>
  </div>
</section>`;
}

export { ICON, LOGO };
