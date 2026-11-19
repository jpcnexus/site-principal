// Página inicial — cenas aprovadas na Carta 2 (ver projeto/roteiro.md).
import { site, whatsapp, waLink, pricing } from './config.mjs';
import { services } from './data/services.mjs';
import { activeProjects, shortName } from './data/projects.mjs';
import { page, esc, icon } from './layout.mjs';

// Frases do "Qual é o seu caso?" ligadas a cada serviço
const caseLines = {
  sites: {
    q: 'Meu cliente não me encontra na internet, ou só tenho Instagram.',
    label: 'Site do seu negócio',
    d: 'Um endereço na internet só seu (ex.: seunegocio.com.br) com serviços, fotos, horários e botão do WhatsApp. Passa confiança e aparece no Google.',
  },
  'landing-pages': {
    q: 'Quero vender um produto ou serviço específico.',
    label: 'Página de vendas',
    d: 'Uma página só para essa oferta: explica o que você vende, tira as dúvidas e leva o cliente direto a comprar ou a falar com você.',
  },
  'solucoes-digitais': {
    q: 'Meus links, produtos e preços estão espalhados.',
    label: 'Página de links ou catálogo',
    d: 'Tudo organizado numa página bonita com a sua marca, fácil de mandar no WhatsApp ou pôr na bio. Pode vir com QR Code.',
  },
  automacoes: {
    q: 'Anoto clientes e horários em papel, planilha ou mensagens soltas.',
    label: 'Sistema sob medida',
    d: 'Um programa simples, no celular ou no computador, para organizar agenda, clientes e tarefas. Antes, avaliamos se vale a pena no seu caso.',
  },
};

// Cor de fundo de cada projeto na galeria (tom escuro da identidade real de cada site)

const faq = [
  ['Quanto custa um site?', 'Os projetos começam em R$ 150 (página de links). Landing pages a partir de R$ 500 e sites institucionais a partir de R$ 1.000. O valor final vem na proposta personalizada, sem compromisso.'],
  ['Como funciona o pagamento?', '50% do valor para começar e os outros 50% na entrega do projeto. Domínio e hospedagem são contratados à parte, no seu nome.'],
  ['Depois que o site fica pronto, vocês continuam ajudando?', 'Sim. Existe a manutenção mensal opcional, a partir de R$ 50/mês, para atualizar textos e fotos, fazer ajustes e acompanhar o site.'],
  ['E se eu não souber o que preciso?', 'Normal. Conte o problema com suas palavras: a gente analisa e indica o formato mais adequado, que às vezes é mais simples do que você imagina.'],
  ['Como sei que o projeto não vai ficar parado?', 'As etapas e o prazo são combinados na proposta, você aprova a estrutura antes do desenvolvimento e fala direto com quem está fazendo.'],
  ['Vai ficar com cara de template?', 'Cada projeto parte do seu negócio e do seu público. Veja o portfólio e note que nenhum projeto se parece com o outro.'],
  ['Funciona no celular?', 'Sim. Tudo é pensado primeiro para o celular, de onde vem a maior parte dos visitantes.'],
];

export function home() {
  const projects = activeProjects;
  const marquee1 = [['SITES', '/servicos/sites/'], ['LANDING PAGES', '/servicos/landing-pages/', true], ['SOLUÇÕES DIGITAIS', '/servicos/solucoes-digitais/'], ['SITES', '/servicos/sites/']];
  const marquee2 = [['SISTEMAS', '/servicos/automacoes/'], ['AUTOMAÇÕES', '/servicos/automacoes/', true], ['QR CODES', '/servicos/solucoes-digitais/'], ['CATÁLOGOS', '/servicos/solucoes-digitais/']];
  const row = (items) => items.map(([t, h, fill]) => `<a href="${h}"${fill ? ' class="is-fill"' : ''} tabindex="-1">${t}</a><span class="dot">●</span>`).join('');

  const body = `
<div class="h-pre" aria-hidden="true"><span class="h-pre-count" data-pre-count>000</span><span class="h-pre-label"><b>NEXUS JPC</b>conectando ideias<br>a soluções digitais</span></div>

<section class="h-hero" data-fx-n data-bg="#0B0F14" aria-labelledby="h-title">
  <div class="h-wide h-hero-grid">
    <div class="h-hero-copy">
      <p class="eyebrow" data-scramble>Estúdio de soluções digitais</p>
      <h1 id="h-title" aria-label="Sua empresa merece uma presença digital que impressiona."><span class="ln" aria-hidden="true"><span>Sua empresa merece uma</span></span><span class="ln" aria-hidden="true"><span class="grad h-rot" data-rot>presença digital</span></span><span class="ln" aria-hidden="true"><span>que impressiona.</span></span></h1>
      <p class="hero-lead h-in">Sites, landing pages e soluções digitais sob medida, com design premium, texto que explica e caminho direto até o seu WhatsApp.</p>
      <div class="hero-actions h-in"><a class="btn btn-primary btn-lg" href="/contato/">Quero meu orçamento ${icon('arrow')}</a><a class="btn btn-ghost btn-lg" href="/projetos/">Ver projetos reais</a></div>
      <ul class="h-micro h-in" data-fx-n-after><li>Projetos publicados</li><li>Atendimento direto</li><li>Proposta sem compromisso</li></ul>
    </div>
    <div class="h-hero-space" aria-hidden="true"></div>
  </div>
  <span class="h-n-hint" aria-hidden="true">mova o mouse: o N acompanha você</span>
  <span class="h-hint" aria-hidden="true">role ↓</span>
</section>

<section class="h-marquee" data-bg="#0B0F14" aria-label="O que fazemos">
  <div class="h-row" data-row="1">${row(marquee1)}</div>
  <div class="h-row" data-row="2">${row(marquee2)}</div>
</section>

<section class="h-pain" data-bg="#0B0F14" aria-labelledby="h-pain-title">
  <div class="h-pain-stage">
    <div class="h-pain-title"><h2 id="h-pain-title">Bom no balcão, <span class="grad">invisível no celular.</span></h2></div>
    <div class="h-notif h-n1" aria-hidden="true"><i>IG</i><div><b>Comentário no post</b><span>"Qual é o preço?" … sem resposta há 3 dias</span></div><s></s></div>
    <div class="h-notif h-n2" aria-hidden="true"><i>?</i><div><b>Visitante</b><span>"Não entendi o que vocês fazem."</span></div><s></s></div>
    <div class="h-notif h-n3" aria-hidden="true"><i>WA</i><div><b>Link da bio</b><span>"Cadê o WhatsApp de vocês?"</span></div><s></s></div>
    <p class="h-answer">O cliente procura, não entende e vai para o concorrente. Com a Nexus JPC, o visitante <em class="grad">entende, confia e chama você.</em></p>
  </div>
</section>

<section class="h-build" data-bg="#091526" aria-labelledby="h-build-title">
  <div class="h-wide h-build-grid">
    <div>
      <p class="eyebrow" data-scramble>Como funciona</p>
      <h2 id="h-build-title" class="section-title h-split">Assista um site <span class="grad">nascer.</span></h2>
      <ol class="h-steps">
        <li class="h-st is-on"><span class="k">01</span><b>Entendimento</b><span>Conversa direta sobre o seu negócio e objetivo.</span></li>
        <li class="h-st"><span class="k">02</span><b>Planejamento</b><span>Você aprova a estrutura antes de qualquer código.</span></li>
        <li class="h-st"><span class="k">03</span><b>Desenvolvimento</b><span>Tipografia, cores, interações e testes no celular.</span></li>
        <li class="h-st"><span class="k">04</span><b>Entrega</b><span>No ar, pronto para receber clientes.</span></li>
      </ol>
      <p class="h-pay"><b>50%</b> para começar · <b>50%</b> na entrega</p>
      <div class="h-try">
        <label for="h-biz">Experimente: digite o nome do seu negócio</label>
        <div class="h-try-row">
          <input id="h-biz" maxlength="26" placeholder="Ex.: Padaria Sol" autocomplete="organization" data-biz>
          <div class="h-sw" role="group" aria-label="Cor da marca">
            <button type="button" aria-pressed="true" style="--c:#22D3EE" data-color="#22D3EE" aria-label="Ciano"></button>
            <button type="button" aria-pressed="false" style="--c:#10B981" data-color="#10B981" aria-label="Verde"></button>
            <button type="button" aria-pressed="false" style="--c:#F97316" data-color="#F97316" aria-label="Laranja"></button>
            <button type="button" aria-pressed="false" style="--c:#EAB308" data-color="#EAB308" aria-label="Dourado"></button>
          </div>
        </div>
      </div>
    </div>
    <div class="h-browser-wrap">
      <div class="h-browser" aria-label="Prévia ilustrativa de um site sendo construído">
        <div class="h-bbar" aria-hidden="true"><span></span><span></span><span></span><em data-pv-url>seunegocio.com.br</em></div>
        <div class="h-screen" data-screen>
          <div class="h-lay h-wf" aria-hidden="true"><i style="left:7%;top:8%;width:14%;height:5%"></i><i style="right:7%;top:8%;width:18%;height:5%;border-radius:999px"></i><i style="left:7%;top:24%;width:50%;height:8%"></i><i style="left:7%;top:35%;width:44%;height:8%"></i><i style="left:7%;top:46%;width:36%;height:8%"></i><i style="left:7%;top:62%;width:46%;height:3%"></i><i style="left:7%;top:67%;width:40%;height:3%"></i><i style="left:7%;top:78%;width:24%;height:8%;border-radius:999px"></i><i style="right:7%;top:20%;width:30%;height:62%;border-radius:12px"></i></div>
          <div class="h-lay h-ty"><span class="nav" data-pv-nav>Seu Negócio</span><span class="links" aria-hidden="true"><i></i><i></i><i></i></span><h3><span class="nm" data-pv-name>Seu Negócio</span><span class="sub">Atendimento que impressiona.</span></h3><p>Seu cliente encontra, entende e chama você no WhatsApp.</p><span class="b">Falar no WhatsApp →</span><span class="img" aria-hidden="true"></span><span class="cards3" aria-hidden="true"><i></i><i></i><i></i></span></div>
          <span class="h-cursor" aria-hidden="true"></span>
          <span class="h-label" data-stage-label>01 · Briefing</span>
          <span class="h-badge">● no ar</span>
        </div>
      </div>
      <p class="h-demo-note">Prévia ilustrativa. O endereço mostrado não é registrado.</p>
    </div>
  </div>
</section>

<section class="h-case" data-bg="#0B0F14" aria-labelledby="h-case-title">
  <div class="h-wide">
    <div class="section-head is-center"><p class="eyebrow" data-scramble>Qual é o seu caso?</p>
      <h2 id="h-case-title" class="section-title h-split">Qual destes problemas <span class="grad">é o seu?</span></h2><p class="section-text h-case-lead">Você não precisa saber nome técnico de nada. Toque no problema que parece com o seu e veja a solução e quanto custa.</p><p class="h-swipe" aria-hidden="true">Deslize para ver os 4 problemas →</p></div>
    <ul class="h-cards">
      ${services
        .map((s, i) => {
          const c = caseLines[s.slug];
          return `<li class="h-card" data-card>
        <div class="h-tilt"><div class="h-card-in">
          <button type="button" class="h-face h-front" aria-expanded="false" aria-controls="h-card-${s.slug}" data-cursor-text="ver"><small>Problema ${i + 1}</small><q>${esc(c.q)}</q><small>toque para ver a solução ↻</small><span class="h-big-n" aria-hidden="true">${i + 1}</span></button>
          <div class="h-face h-back" id="h-card-${s.slug}"><small>A solução</small><b>${esc(c.label)}</b><p>${esc(c.d)}</p><p class="h-price">a partir de <strong>${esc(s.preco.valor)}</strong></p><div class="actions"><a class="link-arrow" href="/servicos/${s.slug}/">Ver como funciona ${icon('arrow')}</a><button type="button" data-unflip>Voltar</button></div></div>
        </div></div>
      </li>`;
        })
        .join('')}
    </ul>
    <p class="h-cfoot">Nenhum parece com o seu? Tudo bem. <a href="/contato/">Conte o problema com suas palavras</a> e a gente indica o caminho mais simples e barato.</p>
  </div>
</section>

<section class="h-prices" id="precos" data-bg="#0B0F14" aria-labelledby="h-prices-title">
  <div class="container">
    <div class="section-head is-center"><p class="eyebrow" data-scramble>Preços</p>
      <h2 id="h-prices-title" class="section-title h-split">Quanto custa? <span class="grad">Está aqui.</span></h2>
      <p class="section-text">Estes são os <strong>valores mínimos</strong> de cada serviço. Você já sabe por onde começa o investimento, sem precisar chamar ninguém.</p></div>
    <div class="h-ptab" data-reveal>
      <table>
        <caption class="sr-only">Valores mínimos dos serviços da Nexus JPC</caption>
        <thead><tr><th scope="col">Serviço</th><th scope="col">Valor mínimo</th></tr></thead>
        <tbody>
        ${pricing.tabela
          .map(
            (t) => `<tr><th scope="row"><a href="${t.href}"><b>${esc(t.nome)}</b><span>${esc(t.desc)}</span></a></th><td><small>a partir de</small><strong>${esc(t.valor)}</strong></td></tr>`
          )
          .join('')}
        </tbody>
        <tfoot><tr><th scope="row"><b>Manutenção mensal</b><span>Opcional. Atualizar textos e fotos, fazer ajustes e acompanhar o site.</span></th><td><small>a partir de</small><strong>${esc(pricing.manutencao.replace('/mês', ''))}<em>/mês</em></strong></td></tr></tfoot>
      </table>
    </div>
    <ul class="h-pnotes" data-reveal>
      <li>${icon('check')}<span><b>Valor mínimo</b> é o ponto de partida. O valor exato depende do tamanho do projeto e vem por escrito antes de começar.</span></li>
      <li>${icon('check')}<span><b>Pagamento:</b> ${esc(pricing.pagamento)}.</span></li>
      <li>${icon('check')}<span><b>Domínio e hospedagem</b> à parte, no seu nome: o site é seu.</span></li>
    </ul>
    <p class="h-pfoot"><a class="link-arrow" href="/servicos/">Ver o que cada serviço inclui ${icon('arrow')}</a></p>
  </div>
</section>
<section class="h-work" data-bg="#0B0F14" aria-labelledby="h-work-title">
  <div class="h-wide">
    <div class="h-work-head">
      <div><p class="eyebrow" data-scramble>Portfólio</p><h2 id="h-work-title" class="section-title h-split">Projetos reais, <span class="grad">do topo ao rodapé.</span></h2></div>
      <div class="h-work-ctrl"><button type="button" class="h-arrow" data-work-prev aria-label="Projeto anterior">${icon('arrowLeft')}</button><button type="button" class="h-arrow" data-work-next aria-label="Próximo projeto">${icon('arrow')}</button></div>
    </div>
    <p class="h-swipe" aria-hidden="true">Deslize para ver os projetos →</p>
  </div>
  <div class="h-work-track" data-work-track tabindex="0" aria-label="Projetos">
    ${projects
      .map(
        (p) => `<article class="h-work-card">
      <a class="h-work-shot" href="/projetos/${p.slug}/" data-cursor-text="ver" aria-label="Ver o case ${esc(p.nome)}">
        <span class="h-work-bar" aria-hidden="true"><i></i><i></i><i></i><em>${esc(p.url ? p.url.replace('https://', '') : p.nome)}</em></span>
        <span class="h-work-view"><img src="/assets/projects/${p.slug}/inteiro.webp" alt="Página inteira do projeto ${esc(p.nome)}, do topo ao rodapé" width="300" height="1200" loading="lazy" decoding="async"></span>
      </a>
      <div class="h-work-meta">
        <h3><a href="/projetos/${p.slug}/">${esc(p.nome)}</a></h3>
        <p class="h-work-tags"><span>${esc(p.categoria)}</span> · <span class="h-work-st h-work-st-${p.status.tone}">${esc(p.status.label)}</span></p>
        ${p.referencia ? `<p class="h-work-ref">Projeto semelhante: ${esc(p.referencia)}</p>` : ''}
        <p class="h-work-links"><a class="link-arrow" href="/projetos/${p.slug}/">Ver case ${icon('arrow')}</a>${p.url ? `<a class="link-ext" href="${p.url}" target="_blank" rel="noopener">Ver site ${icon('external')}</a>` : ''}</p>
      </div>
    </article>`
      )
      .join('')}
    <a class="h-work-card h-work-all" href="/projetos/"><span>Ver todos os projetos</span>${icon('arrow')}</a>
  </div>
</section>

<section class="h-faq" data-bg="#0B0F14" aria-labelledby="h-faq-title">
  <div class="h-wide h-faq-grid">
    <div class="h-faq-side"><p class="eyebrow" data-scramble>Dúvidas</p><h2 id="h-faq-title" class="section-title h-split">As dúvidas, respondidas.</h2><p class="section-text">Não achou a sua? Pergunte direto no WhatsApp.</p><a class="btn btn-ghost" href="${waLink()}" target="_blank" rel="noopener">${icon('whatsapp')} Falar no WhatsApp</a></div>
    <div class="faq">${faq.map(([q, a]) => `<details class="faq-item"><summary><span>${esc(q)}</span>${icon('plus')}</summary><div class="faq-body"><p>${esc(a)}</p></div></details>`).join('')}</div>
  </div>
</section>

<section class="h-final" data-fx-final data-bg="#060A10" aria-labelledby="h-final-title">
  <div class="h-wide">
    <p class="eyebrow" data-scramble>Orçamento</p>
    <h2 id="h-final-title" class="h-split">Vamos tirar seu projeto do <span class="grad">papel?</span></h2>
    <p class="page-lead">Conte sua ideia em 2 minutos. Você recebe uma proposta personalizada, sem compromisso.</p>
    <div class="hero-actions"><a class="btn btn-primary btn-lg" href="/contato/" data-final-cta>Quero meu orçamento ${icon('arrow')}</a><a class="btn btn-ghost btn-lg" href="${waLink()}" target="_blank" rel="noopener" data-final-wa>${icon('whatsapp')} Falar no WhatsApp</a></div>
    <p class="h-safe">Resposta pelo WhatsApp · 50% para começar, 50% na entrega</p>
  </div>
</section>
`;
  return page({
    path: '/',
    title: 'Nexus JPC | Sites, Landing Pages e Soluções Digitais',
    description:
      'Criação de sites profissionais, landing pages e soluções digitais para empresas e negócios. Conheça os projetos da Nexus JPC.',
    active: 'inicio',
    body,
    bodyClass: 'is-home',
    intro: true,
    styles: ['/assets/css/home.css'],
    scripts: ['/assets/vendor/gsap.min.js', '/assets/vendor/ScrollTrigger.min.js', '/assets/vendor/SplitText.min.js', '/assets/js/home.js'],
    jsonld: [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': site.url + '/#org',
        name: site.name,
        url: site.url + '/',
        logo: site.url + '/assets/brand/nexus-jpc/nexus-jpc-favicon.png',
        slogan: site.slogan,
        description: 'Estúdio independente de soluções digitais: sites, landing pages e ferramentas web.',
        contactPoint: { '@type': 'ContactPoint', contactType: 'sales', telephone: '+' + whatsapp.number, availableLanguage: ['Portuguese'] },
      },
      { '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: site.url + '/', inLanguage: 'pt-BR', publisher: { '@id': site.url + '/#org' } },
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    ],
  });
}
