// Conteúdo de cada página. Cada função retorna o HTML completo.
import { site, whatsapp, waLink, pricing } from './config.mjs';
import { services, getService } from './data/services.mjs';
import { activeProjects, categories, shortName } from './data/projects.mjs';
import {
  page, esc, icon, breadcrumbs, sectionHead, projectCard, serviceCard, ctaBanner, pageHero, statusBadge, LOGO, ICON,
} from './layout.mjs';

const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': site.url + '/#org',
  name: site.name,
  url: site.url + '/',
  logo: site.url + '/assets/brand/nexus-jpc/nexus-jpc-favicon.png',
  slogan: site.slogan,
  description: 'Estúdio independente de soluções digitais: sites, landing pages e ferramentas web.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    telephone: '+' + whatsapp.number,
    availableLanguage: ['Portuguese'],
  },
};

const steps = [
  { n: '01', icon: 'search', t: 'Entendimento', d: 'Conhecemos seu negócio, suas necessidades e seus objetivos.' },
  { n: '02', icon: 'compass', t: 'Planejamento', d: 'Definimos a estrutura, o visual e as funcionalidades.' },
  { n: '03', icon: 'code', t: 'Desenvolvimento', d: 'Construímos e testamos sua solução digital.' },
  { n: '04', icon: 'rocket', t: 'Entrega', d: 'Realizamos os ajustes combinados e preparamos o projeto para publicação.' },
];

const highlights = [
  { icon: 'user', t: 'Atendimento personalizado', d: 'Conversa direta, do briefing à entrega, sem intermediários.' },
  { icon: 'layers', t: 'Projetos adaptados ao negócio', d: 'Nada de modelo pronto: a estrutura nasce dos seus objetivos.' },
  { icon: 'phone', t: 'Design responsivo', d: 'Pensado primeiro para o celular, refinado para telas grandes.' },
  { icon: 'target', t: 'Soluções práticas', d: 'Recursos que resolvem problemas reais, sem enfeite desnecessário.' },
];

function processSection({ title = 'Como transformamos sua ideia em realidade', eyebrow = 'Nosso processo' } = {}) {
  return `<section class="section" aria-labelledby="processo-title">
  <div class="container">
    ${sectionHead({ eyebrow, title: `<span id="processo-title">${title}</span>` })}
    <ol class="process">
      ${steps
        .map(
          (s, i) => `<li class="process-step" data-reveal style="--d:${i * 90}ms">
        <div class="process-top"><span class="process-icon">${icon(s.icon)}</span><span class="process-num">${s.n}</span></div>
        <h3>${s.t}</h3>
        <p>${s.d}</p>
      </li>`
        )
        .join('')}
    </ol>
  </div>
</section>`;
}

function highlightsGrid() {
  return `<ul class="highlights">
    ${highlights
      .map(
        (h, i) => `<li class="highlight" data-reveal style="--d:${i * 70}ms">
      <span class="highlight-icon">${icon(h.icon)}</span>
      <div><h3>${h.t}</h3><p>${h.d}</p></div>
    </li>`
      )
      .join('')}
  </ul>`;
}

export { home } from './home.mjs';

// =====================================================================
// SERVIÇOS
// =====================================================================
export function servicesIndex() {
  const crumbs = [{ label: 'Serviços', href: '/servicos/' }];
  const body = `
${pageHero({
  eyebrow: 'Serviços',
  title: 'Soluções digitais para <span class="grad">cada etapa</span> do seu negócio',
  text: 'Da presença online ao desenvolvimento de ferramentas personalizadas. Escolha um serviço para ver os detalhes.',
  crumbs,
})}
<section class="section section-tight" aria-label="Lista de serviços">
  <div class="container">
    <div class="services-grid services-grid-lg">${services.map((s, i) => serviceCard(s, i, 2)).join('')}</div>
  </div>
</section>
<section class="section" aria-labelledby="precos-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Investimento', title: '<span id="precos-title">Quanto custa, sem rodeios</span>', text: 'Valores de partida para você se planejar. O valor final depende do que o seu projeto precisa e vem na proposta, sem compromisso.' })}
    <div class="price-table" data-reveal>
      ${[
        ['Página de links / cartão digital', 'R$ 250', '/servicos/solucoes-digitais/'],
        ['Catálogo digital com QR Code', 'R$ 450', '/servicos/solucoes-digitais/'],
        ['Landing page', 'R$ 790', '/servicos/landing-pages/'],
        ['Site institucional (até 5 páginas)', 'R$ 1.490', '/servicos/sites/'],
        ['Sistemas e automações (após avaliação técnica)', 'R$ 2.500', '/servicos/automacoes/'],
      ].map(([n, v, h]) => `<a class="price-row" href="${h}"><span>${esc(n)}</span><span class="price-val">a partir de <b>${v}</b></span></a>`).join('')}
      <div class="price-row price-extra"><span>Manutenção mensal (opcional): atualizações, ajustes e acompanhamento</span><span class="price-val">a partir de <b>${esc(pricing.manutencao)}</b></span></div>
    </div>
    <ul class="price-notes" data-reveal>
      <li>${icon('check')} Pagamento: ${esc(pricing.pagamento)}.</li>
      <li>${icon('check')} ${esc(pricing.observacao)}</li>
      <li>${icon('check')} Proposta sem compromisso: você conhece o valor antes de começar.</li>
    </ul>
  </div>
</section>
${processSection()}
<section class="section" aria-labelledby="duvidas-title">
  <div class="container narrow">
    ${sectionHead({ eyebrow: 'Dúvidas', title: '<span id="duvidas-title">Antes de pedir seu orçamento</span>' })}
    <div class="faq">${[
      ['Quanto custa um site?', 'Os projetos começam em R$ 250 (página de links). Landing pages a partir de R$ 790 e sites institucionais a partir de R$ 1.490. O valor final vem na proposta personalizada, sem compromisso.'],
      ['Como funciona o pagamento?', '50% do valor para começar e os outros 50% na entrega do projeto.'],
      ['E se eu não souber o que preciso?', 'Conte o problema com suas palavras: a gente analisa e indica o formato mais adequado.'],
      ['Como sei que o projeto não vai ficar parado?', 'As etapas e o prazo são combinados na proposta, você aprova a estrutura antes do desenvolvimento e fala direto com quem está fazendo.'],
    ].map(([q, a]) => `<details class="faq-item" data-reveal><summary><span>${esc(q)}</span>${icon('plus')}</summary><div class="faq-body"><p>${esc(a)}</p></div></details>`).join('')}</div>
  </div>
</section>
<section class="section" aria-labelledby="nao-sabe-title">
  <div class="container">
    <div class="note-card" data-reveal>
      <span class="note-icon">${icon('info')}</span>
      <div>
        <h2 id="nao-sabe-title">Não sabe qual serviço escolher?</h2>
        <p>Conte o que você precisa com suas palavras. Analisamos o seu caso e indicamos o formato mais adequado, sem compromisso.</p>
      </div>
      <a class="btn btn-primary" href="/contato/">Descrever meu projeto ${icon('arrow')}</a>
    </div>
  </div>
</section>
${ctaBanner()}
`;
  return page({
    path: '/servicos/',
    title: 'Serviços: Sites, Landing Pages, Soluções Digitais e Automações',
    description:
      'Conheça os serviços da Nexus JPC: sites institucionais, landing pages, soluções digitais e sistemas sob medida.',
    active: 'servicos',
    body,
    crumbs,
  });
}

export function serviceDetail(s) {
  const crumbs = [
    { label: 'Serviços', href: '/servicos/' },
    { label: s.titulo, href: `/servicos/${s.slug}/` },
  ];
  const related = activeProjects.filter((p) => (p.servicos || []).includes(s.slug));
  const others = services.filter((x) => x.slug !== s.slug);
  const msg = `Olá! Conheci a Nexus JPC pelo site e tenho interesse em ${s.titulo}. Podemos conversar?`;
  const body = `
${pageHero({
  eyebrow: 'Serviço',
  title: esc(s.titulo),
  text: esc(s.descricao),
  crumbs,
  extra: `<p class="price-tag">Investimento a partir de <b>${esc(s.preco.valor)}</b><span>${esc(s.preco.nota)} · ${esc(pricing.pagamento)}</span></p><div class="hero-actions"><a class="btn btn-primary" href="/contato/?tipo=${s.slug}">Quero meu orçamento ${icon('arrow')}</a><a class="btn btn-ghost" href="${waLink(msg)}" target="_blank" rel="noopener">${icon('whatsapp')} Conversar no WhatsApp</a></div>`,
})}

<section class="section section-tight" aria-labelledby="apresentacao-title">
  <div class="container split">
    <div data-reveal>
      <p class="eyebrow">Apresentação</p>
      <h2 id="apresentacao-title" class="section-title">O que é e como ajuda</h2>
      <p class="section-text">${esc(s.intro)}</p>
    </div>
    <div class="panel" data-reveal>
      <h3 class="panel-title">${icon('user')} Para quem é indicado</h3>
      <ul class="check-list">${s.paraQuem.map((x) => `<li>${icon('check')}${esc(x)}</li>`).join('')}</ul>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="problemas-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Problemas que resolve', title: '<span id="problemas-title">O que muda para o seu negócio</span>' })}
    <div class="cards-3">${s.problemas
      .map(
        (p, i) => `<article class="info-card" data-reveal style="--d:${i * 80}ms"><span class="info-num">0${i + 1}</span><h3>${esc(p.t)}</h3><p>${esc(p.d)}</p></article>`
      )
      .join('')}</div>
  </div>
</section>

<section class="section" aria-labelledby="func-title">
  <div class="container split">
    <div data-reveal>
      <p class="eyebrow">Principais funcionalidades</p>
      <h2 id="func-title" class="section-title">O que pode fazer parte do projeto</h2>
      <p class="section-text">Os recursos são definidos no planejamento, de acordo com o seu objetivo.</p>
    </div>
    <ul class="feature-list" data-reveal>${s.funcionalidades.map((f) => `<li>${icon('check')}<span>${esc(f)}</span></li>`).join('')}</ul>
  </div>
</section>

<section class="section" aria-labelledby="exemplos-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Exemplos de aplicação', title: '<span id="exemplos-title">Onde esse serviço se encaixa</span>' })}
    <ul class="example-list">${s.exemplos.map((e, i) => `<li data-reveal style="--d:${i * 70}ms">${icon('spark')}<span>${esc(e)}</span></li>`).join('')}</ul>
  </div>
</section>

${
  related.length
    ? `<section class="section" aria-labelledby="rel-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Projetos relacionados', title: '<span id="rel-title">Veja na prática</span>' })}
    <div class="projects-grid">${related.map((p) => projectCard(p)).join('')}</div>
  </div>
</section>`
    : ''
}

<section class="section" aria-labelledby="faq-title">
  <div class="container narrow">
    ${sectionHead({ eyebrow: 'Perguntas frequentes', title: '<span id="faq-title">Dúvidas comuns</span>' })}
    <div class="faq">${s.faq
      .map(
        (f) => `<details class="faq-item" data-reveal><summary><span>${esc(f.q)}</span>${icon('plus')}</summary><div class="faq-body"><p>${esc(f.a)}</p></div></details>`
      )
      .join('')}</div>
  </div>
</section>

<section class="section" aria-labelledby="outros-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Outros serviços', title: '<span id="outros-title">Talvez você também precise</span>' })}
    <div class="services-grid services-grid-3">${others.map((x, i) => serviceCard(x, i)).join('')}</div>
  </div>
</section>

${ctaBanner({ title: `Quer um projeto de <span class="grad">${esc(s.titulo.toLowerCase())}</span>?`, text: 'Conte sua ideia e receba uma proposta personalizada para o seu negócio.', primary: { label: 'Quero um projeto assim', href: `/contato/?tipo=${s.slug}` } })}
`;
  return page({
    path: `/servicos/${s.slug}/`,
    title: s.seoTitle,
    description: `${s.descricao} Conheça o serviço de ${s.titulo.toLowerCase()} da Nexus JPC.`,
    active: 'servicos',
    body,
    crumbs,
    jsonld: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: s.titulo,
        description: s.descricao,
        provider: { '@type': 'Organization', name: site.name, url: site.url + '/' },
        areaServed: { '@type': 'Country', name: 'Brasil' },
        url: `${site.url}/servicos/${s.slug}/`,
      },
    ],
  });
}

// =====================================================================
// PROJETOS
// =====================================================================
export function projectsIndex() {
  const crumbs = [{ label: 'Projetos', href: '/projetos/' }];
  const counts = Object.fromEntries(
    categories.map((c) => [c.id, c.id === 'todos' ? activeProjects.length : activeProjects.filter((p) => p.tags.includes(c.id)).length])
  );
  const body = `
${pageHero({
  eyebrow: 'Portfólio',
  title: 'Projetos e <span class="grad">experiências digitais</span>',
  text: 'Trabalhos autorais, demonstrações e soluções em desenvolvimento. Cada projeto mostra o status real em que está.',
  crumbs,
})}
<section class="section section-tight" aria-label="Galeria de projetos">
  <div class="container">
    <div class="toolbar" data-reveal>
      <div class="filters" role="group" aria-label="Filtrar por categoria">
        ${categories
          .map(
            (c) =>
              `<button type="button" class="filter${c.id === 'todos' ? ' is-active' : ''}" data-filter="${c.id}" aria-pressed="${c.id === 'todos'}"${counts[c.id] === 0 ? ' disabled' : ''}>${esc(c.label)} <span class="filter-count">${counts[c.id]}</span></button>`
          )
          .join('')}
      </div>
      <label class="search">
        <span class="sr-only">Buscar projeto pelo nome</span>
        ${icon('search')}
        <input type="search" placeholder="Buscar projeto…" autocomplete="off" data-search>
      </label>
    </div>
    <p class="results-info" aria-live="polite" data-results></p>
    <div class="projects-grid projects-grid-lg" data-grid>${activeProjects.map((p, i) => projectCard(p, { headingLevel: 2, eager: i === 0 })).join('')}</div>
    <div class="empty" data-empty hidden>
      ${icon('search')}
      <p>Nenhum projeto encontrado com esses filtros.</p>
      <button type="button" class="btn btn-ghost btn-sm" data-reset>Limpar filtros</button>
    </div>
    <p class="portfolio-note" data-reveal>${icon('info')} Outros projetos autorais estão em desenvolvimento e serão adicionados ao portfólio quando estiverem prontos para apresentação.</p>
  </div>
</section>
${ctaBanner({ title: 'Tem uma ideia parecida? <span class="grad">Vamos conversar.</span>' })}
`;
  return page({
    path: '/projetos/',
    title: 'Portfólio de Projetos',
    description:
      'Portfólio da Nexus JPC: landing pages, sites e soluções digitais reais, com status transparente de cada projeto.',
    active: 'projetos',
    body,
    crumbs,
    preload: [`/assets/projects/${activeProjects[0].slug}/capa-720.webp`],
    jsonld: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Portfólio Nexus JPC',
        url: site.url + '/projetos/',
        hasPart: activeProjects.map((p) => ({ '@type': 'CreativeWork', name: p.nome, url: `${site.url}/projetos/${p.slug}/` })),
      },
    ],
  });
}

export function projectDetail(p) {
  const crumbs = [
    { label: 'Projetos', href: '/projetos/' },
    { label: shortName(p), href: `/projetos/${p.slug}/` },
  ];
  const base = `/assets/projects/${p.slug}/`;
  const cover = p.imagens.find((im) => im.src === 'capa.webp');
  const gallery = p.imagens.filter((im) => !im.mobile && im !== cover);
  const mobile = p.imagens.find((im) => im.mobile);
  const related = activeProjects.filter((x) => x.slug !== p.slug);
  const tipoContato = (p.servicos && p.servicos[0]) || '';
  const body = `
<section class="page-hero case-hero">
  <div class="page-hero-bg" aria-hidden="true"></div>
  <div class="container">
    ${breadcrumbs(crumbs)}
    <div class="case-head">
      <div class="case-head-copy">
        <div class="project-meta"><span class="chip">${esc(p.categoria)}</span>${statusBadge(p.status)}</div>
        <h1 class="page-title">${esc(p.nome)}</h1>
        <p class="page-lead">${esc(p.resumo)}</p>
        <div class="hero-actions">
          ${p.url ? `<a class="btn btn-primary" href="${p.url}" target="_blank" rel="noopener">Ver site publicado ${icon('external')}</a>` : `<span class="btn btn-disabled" aria-disabled="true">Demonstração em breve</span>`}
          <a class="btn btn-ghost" href="/projetos/">${icon('arrowLeft')} Voltar ao portfólio</a>
        </div>
      </div>
      <dl class="case-facts">
        <div><dt>Tipo</dt><dd>${esc(p.tipo)}</dd></div>
        <div><dt>Categoria</dt><dd>${esc(p.categoria)}</dd></div>
        <div class="is-full"><dt>Status</dt><dd>${esc(p.status.label)}</dd></div>
        ${p.url ? `<div class="is-full"><dt>Endereço</dt><dd><a href="${p.url}" target="_blank" rel="noopener">${esc(p.url.replace('https://', ''))}</a></dd></div>` : ''}
      </dl>
    </div>
    <figure class="case-cover" data-reveal>
      <div class="browser-bar"><span></span><span></span><span></span><em>${esc(p.url ? p.url.replace('https://', '') : p.nome)}</em></div>
      <img src="${base}capa.webp" alt="${esc(cover.alt)}" width="1440" height="900" fetchpriority="high" decoding="async">
    </figure>
  </div>
</section>

<section class="section section-tight" aria-labelledby="sobre-projeto">
  <div class="container case-body">
    <div class="case-text">
      <div data-reveal>
        <p class="eyebrow">Contexto</p>
        <h2 id="sobre-projeto" class="h3">Sobre o projeto</h2>
        <p>${esc(p.contexto)}</p>
      </div>
      <div data-reveal>
        <p class="eyebrow">Objetivo</p>
        <h2 class="h3">O que precisava ser resolvido</h2>
        <p>${esc(p.objetivo)}</p>
      </div>
      <div data-reveal>
        <p class="eyebrow">Solução</p>
        <h2 class="h3">O que foi criado</h2>
        <p>${esc(p.solucao)}</p>
      </div>
    </div>
    <aside class="case-side">
      <div class="panel" data-reveal>
        <h2 class="panel-title">${icon('check')} Funcionalidades implementadas</h2>
        <ul class="check-list">${p.funcionalidades.map((f) => `<li>${icon('check')}${esc(f)}</li>`).join('')}</ul>
      </div>
      ${
        p.planejado
          ? `<div class="panel panel-dev" data-reveal>
        <h2 class="panel-title">${icon('clock')} Em desenvolvimento</h2>
        <p class="panel-note">Recursos planejados, ainda não disponíveis.</p>
        <ul class="check-list is-planned">${p.planejado.map((f) => `<li>${icon('clock')}${esc(f)}</li>`).join('')}</ul>
      </div>`
          : ''
      }
      <div class="panel" data-reveal>
        <h2 class="panel-title">${icon('code')} Tecnologias</h2>
        <ul class="tags">${p.tecnologias.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
      </div>
    </aside>
  </div>
</section>

<section class="section" aria-labelledby="galeria-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Galeria', title: '<span id="galeria-title">Por dentro do projeto</span>', text: 'Capturas reais do site publicado. Toque em uma imagem para ampliar.' })}
    <div class="gallery" data-gallery>
      ${gallery
        .map(
          (im, i) => `<button type="button" class="gallery-item${i === 0 ? ' is-wide' : ''}" data-gallery-item data-src="${base}${im.src}" data-alt="${esc(im.alt)}" aria-label="Ampliar imagem: ${esc(im.alt)}" data-reveal>
        <img src="${base}${im.src}" alt="${esc(im.alt)}" width="1440" height="900" loading="lazy" decoding="async">
        <span class="gallery-zoom">${icon('plus')}</span>
      </button>`
        )
        .join('')}
      ${
        mobile
          ? `<button type="button" class="gallery-item gallery-phone" data-gallery-item data-src="${base}${mobile.src}" data-alt="${esc(mobile.alt)}" aria-label="Ampliar imagem: ${esc(mobile.alt)}" data-reveal>
        <span class="phone-frame"><img src="${base}${mobile.src}" alt="${esc(mobile.alt)}" width="600" height="1299" loading="lazy" decoding="async"></span>
        <span class="gallery-caption">${icon('phone')} Versão para celular</span>
      </button>`
          : ''
      }
    </div>
  </div>
</section>

<dialog class="lightbox" data-lightbox aria-label="Imagem ampliada">
  <form method="dialog" class="lightbox-inner">
    <img src="" alt="" data-lightbox-img>
    <p class="lightbox-caption" data-lightbox-caption></p>
    <button class="lightbox-btn lightbox-prev" type="button" data-lightbox-prev aria-label="Imagem anterior">${icon('arrowLeft')}</button>
    <button class="lightbox-btn lightbox-next" type="button" data-lightbox-next aria-label="Próxima imagem">${icon('arrow')}</button>
    <button class="lightbox-btn lightbox-close" value="close" aria-label="Fechar">${icon('close')}</button>
  </form>
</dialog>

${
  related.length
    ? `<section class="section" aria-labelledby="rel-title">
  <div class="container">
    <div class="section-row">
      ${sectionHead({ eyebrow: 'Projetos relacionados', title: '<span id="rel-title">Continue explorando</span>' })}
      <a class="btn btn-ghost btn-sm section-row-cta" href="/projetos/">${icon('arrowLeft')} Voltar ao portfólio</a>
    </div>
    <div class="projects-grid">${related.map((x) => projectCard(x)).join('')}</div>
  </div>
</section>`
    : ''
}

${ctaBanner({ title: 'Quer um projeto <span class="grad">semelhante</span>?', text: `Gostou do ${esc(shortName(p))}? Conte sua ideia e vamos pensar juntos na melhor solução para o seu negócio.`, primary: { label: 'Solicitar um projeto semelhante', href: `/contato/?tipo=${tipoContato}&ref=${encodeURIComponent(shortName(p))}` } })}
`;
  return page({
    path: `/projetos/${p.slug}/`,
    title: `${p.nome}: ${p.categoria}`,
    description: `${p.resumo}`.slice(0, 158),
    active: 'projetos',
    body,
    crumbs,
    preload: [`${base}capa.webp`],
    jsonld: [
      {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: p.nome,
        description: p.resumo,
        url: `${site.url}/projetos/${p.slug}/`,
        image: `${site.url}${base}capa.webp`,
        creator: { '@type': 'Organization', name: site.name, url: site.url + '/' },
        ...(p.url ? { sameAs: p.url } : {}),
      },
    ],
  });
}

// =====================================================================
// SOBRE
// =====================================================================
export function about() {
  const crumbs = [{ label: 'Sobre', href: '/sobre/' }];
  const values = [
    { icon: 'code', t: 'Tecnologia', d: 'Ferramentas modernas, código organizado e boas práticas de desempenho e acessibilidade.' },
    { icon: 'spark', t: 'Sofisticação', d: 'Visual cuidadoso e consistente, que valoriza a marca sem exageros.' },
    { icon: 'layers', t: 'Clareza', d: 'Comunicação simples, do briefing à entrega, e interfaces fáceis de entender.' },
    { icon: 'shield', t: 'Confiança', d: 'Transparência sobre prazos, escopo e status. Sem promessas que não podemos cumprir.' },
    { icon: 'rocket', t: 'Modernidade', d: 'Soluções atuais, preparadas para o celular e para crescer com o negócio.' },
  ];
  const body = `
${pageHero({
  eyebrow: 'Sobre a Nexus JPC',
  title: 'Tecnologia, criatividade e <span class="grad">soluções com propósito.</span>',
  text: 'Um estúdio independente de soluções digitais que conecta ideias a experiências online profissionais.',
  crumbs,
})}

<section class="section section-tight" aria-labelledby="quem-title">
  <div class="container split">
    <div data-reveal>
      <p class="eyebrow">Quem somos</p>
      <h2 id="quem-title" class="section-title">Um estúdio digital independente</h2>
      <p class="section-text">A Nexus JPC é um estúdio independente de soluções digitais que une criatividade, tecnologia e atenção aos detalhes para desenvolver experiências online profissionais.</p>
      <p class="section-text">Nosso objetivo é ajudar negócios a construir uma presença digital moderna e funcional, com projetos pensados para comunicar bem e facilitar o contato com clientes.</p>
    </div>
    <div class="brand-card" data-reveal>
      <img src="${LOGO}" alt="Logotipo Nexus JPC — Soluções Digitais" width="1550" height="360" loading="lazy">
      <p class="brand-card-slogan">${esc(site.slogan)}</p>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="marca-title">
  <div class="container split split-reverse">
    <div class="symbol-card" data-reveal>
      <img src="${ICON}" alt="Símbolo N da Nexus JPC, com dois nós circulares nas extremidades" width="300" height="254" loading="lazy">
    </div>
    <div data-reveal>
      <p class="eyebrow">Significado da marca</p>
      <h2 id="marca-title" class="section-title">Nexus: conexão</h2>
      <p class="section-text"><em>Nexus</em> vem do latim e significa vínculo, conexão. O símbolo traduz essa ideia: um <strong>N</strong> contínuo, em azul elétrico e ciano, que liga dois nós. De um lado, a ideia; do outro, a solução digital pronta para funcionar.</p>
      <p class="section-text">A identidade visual escura, com detalhes luminosos e tipografia geométrica, reflete o que buscamos em cada projeto: tecnologia com sofisticação e clareza.</p>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="proposito-title">
  <div class="container">
    <div class="purpose" data-reveal>
      <p class="eyebrow">Propósito</p>
      <h2 id="proposito-title" class="purpose-title">Tornar a presença digital profissional <span class="grad">acessível e funcional</span> para negócios de todos os tamanhos.</h2>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="valores-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Valores e princípios', title: '<span id="valores-title">O que orienta o nosso trabalho</span>' })}
    <ul class="values">${values
      .map((v, i) => `<li class="value" data-reveal style="--d:${i * 60}ms"><span class="value-icon">${icon(v.icon)}</span><h3>${v.t}</h3><p>${v.d}</p></li>`)
      .join('')}</ul>
  </div>
</section>

${processSection({ title: 'Como os projetos são desenvolvidos', eyebrow: 'Método' })}

<section class="section" aria-labelledby="dif-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Diferenciais do atendimento', title: '<span id="dif-title">Perto de você em cada etapa</span>' })}
    ${highlightsGrid()}
  </div>
</section>

${ctaBanner({ title: 'Conheça nossos <span class="grad">serviços</span>', text: 'Veja em detalhes o que a Nexus JPC pode desenvolver para o seu negócio.', primary: { label: 'Ver serviços', href: '/servicos/' } })}
`;
  return page({
    path: '/sobre/',
    title: 'Sobre a Nexus JPC',
    description:
      'Conheça a Nexus JPC, estúdio independente de soluções digitais que une criatividade, tecnologia e atenção aos detalhes.',
    active: 'sobre',
    body,
    crumbs,
    jsonld: [{ '@context': 'https://schema.org', '@type': 'AboutPage', name: 'Sobre a Nexus JPC', url: site.url + '/sobre/', about: { '@id': site.url + '/#org' } }, orgLd],
  });
}

// =====================================================================
// CONTATO
// =====================================================================
export function contact() {
  const crumbs = [{ label: 'Contato', href: '/contato/' }];
  const tipos = [
    ['sites', 'Site institucional'],
    ['landing-pages', 'Landing page'],
    ['solucoes-digitais', 'Solução digital (links, catálogo, QR Code)'],
    ['automacoes', 'Sistema ou automação'],
    ['outro', 'Outro / ainda não sei'],
  ];
  const body = `
${pageHero({
  eyebrow: 'Contato e orçamento',
  title: 'Vamos <span class="grad">conversar?</span>',
  text: 'Preencha o briefing rápido abaixo. Montamos a mensagem para você e abrimos o WhatsApp com tudo preenchido. Você revisa antes de enviar.',
  crumbs,
})}
<section class="section section-tight" aria-label="Formulário de orçamento">
  <div class="container contact">
    <div class="form-card" data-reveal>
      <form class="form" data-contact-form data-wa="${whatsapp.number}" novalidate>
        <div class="form-step" data-step="form">
          <div class="form-grid">
            <div class="field">
              <label for="f-nome">Nome <span class="req" aria-hidden="true">*</span></label>
              <input id="f-nome" name="nome" type="text" autocomplete="name" required minlength="2" maxlength="80" aria-describedby="e-nome">
              <p class="field-error" id="e-nome" data-error-for="nome"></p>
            </div>
            <div class="field">
              <label for="f-whats">WhatsApp <span class="req" aria-hidden="true">*</span></label>
              <input id="f-whats" name="whatsapp" type="tel" inputmode="tel" autocomplete="tel-national" placeholder="(00) 00000-0000" required aria-describedby="e-whats">
              <p class="field-error" id="e-whats" data-error-for="whatsapp"></p>
            </div>
            <div class="field">
              <label for="f-empresa">Empresa <span class="opt">(opcional)</span></label>
              <input id="f-empresa" name="empresa" type="text" autocomplete="organization" maxlength="80">
            </div>
            <div class="field">
              <label for="f-tipo">Tipo de projeto <span class="req" aria-hidden="true">*</span></label>
              <div class="select-wrap">
                <select id="f-tipo" name="tipo" required aria-describedby="e-tipo">
                  <option value="">Selecione…</option>
                  ${tipos.map(([v, l]) => `<option value="${v}">${esc(l)}</option>`).join('')}
                </select>
              </div>
              <p class="field-error" id="e-tipo" data-error-for="tipo"></p>
            </div>
            <div class="field field-full">
              <label for="f-desc">Descrição do projeto <span class="req" aria-hidden="true">*</span></label>
              <textarea id="f-desc" name="descricao" rows="5" required minlength="15" maxlength="1200" placeholder="Conte o que você precisa, para quem é e se já tem alguma referência." aria-describedby="e-desc d-desc"></textarea>
              <div class="field-foot"><p class="field-error" id="e-desc" data-error-for="descricao"></p><span class="char-count" id="d-desc" data-count>0/1200</span></div>
            </div>
          </div>
          <p class="form-privacy">${icon('shield')} Seus dados não são enviados nem armazenados por este site. A mensagem é montada no seu navegador e só é enviada se você confirmar no WhatsApp.</p>
          <button class="btn btn-primary btn-lg btn-block-sm" type="submit">Revisar mensagem ${icon('arrow')}</button>
        </div>

        <div class="form-step form-review" data-step="review" hidden tabindex="-1">
          <div class="review-head">
            <span class="review-icon">${icon('whatsapp')}</span>
            <div>
              <h2 class="h3">Confira sua mensagem</h2>
              <p>Ao continuar, o WhatsApp será aberto em uma nova aba com o texto abaixo. Nada é enviado automaticamente.</p>
            </div>
          </div>
          <blockquote class="review-msg" data-preview></blockquote>
          <div class="review-actions">
            <button type="button" class="btn btn-ghost" data-edit>${icon('arrowLeft')} Editar</button>
            <a class="btn btn-primary" href="#" target="_blank" rel="noopener" data-send>${icon('whatsapp')} Abrir WhatsApp</a>
          </div>
          <p class="review-done" data-done hidden role="status">${icon('check')} WhatsApp aberto em outra aba. Se não abriu, <a href="#" target="_blank" rel="noopener" data-send-fallback>toque aqui</a>.</p>
        </div>
      </form>
    </div>

    <aside class="contact-side">
      <div class="panel" data-reveal>
        <h2 class="panel-title">${icon('whatsapp')} Prefere falar direto?</h2>
        <p>Envie uma mensagem e conte rapidamente sobre o seu projeto.</p>
        <a class="btn btn-ghost btn-block" href="${waLink()}" target="_blank" rel="noopener">${icon('whatsapp')} Abrir conversa</a>
      </div>
      <div class="panel" data-reveal>
        <h2 class="panel-title">${icon('compass')} Como funciona</h2>
        <ol class="mini-steps">
          <li><span>1</span>Você envia o briefing pelo WhatsApp.</li>
          <li><span>2</span>Conversamos para entender o projeto.</li>
          <li><span>3</span>Você recebe uma proposta personalizada.</li>
        </ol>
      </div>
    </aside>
  </div>
</section>
`;
  return page({
    path: '/contato/',
    title: 'Contato e Orçamento',
    description:
      'Solicite um orçamento para seu site, landing page ou solução digital. Preencha o briefing e fale com a Nexus JPC pelo WhatsApp.',
    active: 'contato',
    body,
    crumbs,
    jsonld: [{ '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contato Nexus JPC', url: site.url + '/contato/', about: { '@id': site.url + '/#org' } }],
  });
}

// =====================================================================
// 404
// =====================================================================
export function notFound() {
  const body = `
<section class="nf">
  <div class="page-hero-bg" aria-hidden="true"></div>
  <div class="container nf-inner">
    <svg class="nf-art" viewBox="0 0 320 160" aria-hidden="true">
      <defs><linearGradient id="nfg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#3B82F6"/><stop offset="1" stop-color="#22D3EE"/></linearGradient></defs>
      <path d="M30 130 L30 30 L140 110" fill="none" stroke="url(#nfg)" stroke-width="10" stroke-linecap="round"/>
      <path d="M180 50 L290 130 L290 30" fill="none" stroke="url(#nfg)" stroke-width="10" stroke-linecap="round" opacity=".35" stroke-dasharray="6 14"/>
      <circle cx="30" cy="130" r="12" fill="#22D3EE"/><circle cx="290" cy="30" r="12" fill="none" stroke="#22D3EE" stroke-width="3" opacity=".5"/>
    </svg>
    <p class="eyebrow">Erro 404</p>
    <h1 class="page-title">Essa conexão <span class="grad">não foi encontrada.</span></h1>
    <p class="page-lead">A página que você procura pode ter mudado de endereço ou não existe mais.</p>
    <div class="hero-actions">
      <a class="btn btn-primary" href="/">${icon('home')} Ir para o início</a>
      <a class="btn btn-ghost" href="/projetos/">Ver projetos</a>
      <a class="btn btn-ghost" href="/contato/">Falar conosco</a>
    </div>
  </div>
</section>`;
  return page({
    path: '/404.html',
    title: 'Página não encontrada',
    description: 'A página que você procura não foi encontrada.',
    active: '',
    body,
    noindex: true,
  });
}

export { services, getService, activeProjects };
