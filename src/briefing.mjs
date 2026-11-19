// Páginas de briefing (/briefing/ e /briefing/<slug>/). Não aparecem no Google (noindex) nem no menu:
// são links para enviar aos clientes.
import { whatsapp, pricing } from './config.mjs';
import { briefings } from './data/briefings.mjs';
import { page, esc, icon, pageHero } from './layout.mjs';

const precoDe = {
  site: 'Site do seu negócio',
  'landing-page': 'Landing page',
  'pagina-de-links': 'Página de links',
  catalogo: 'Catálogo digital',
  sistema: 'Sistema sob medida',
};
const preco = (slug) => pricing.tabela.find((t) => t.nome === precoDe[slug])?.valor;

function campo(c, slug) {
  const fid = `bf-${slug}-${c.id}`;
  const req = c.req ? ' <span class="req" aria-hidden="true">*</span>' : ' <span class="opt">(opcional)</span>';
  const hint = c.hint ? `<p class="bf-hint" id="${fid}-h">${esc(c.hint)}</p>` : '';
  const err = `<p class="field-error" data-error-for="${c.id}"></p>`;
  if (c.type === 'one' || c.type === 'many') {
    const kind = c.type === 'one' ? 'radio' : 'checkbox';
    const opts = [...c.opcoes, ...(c.outro ? ['Outro'] : [])]
      .map((o, i) => {
        const val = c.outro && i === c.opcoes.length ? '__outro' : o;
        return `<label class="bf-chip"><input type="${kind}" name="${c.id}" value="${esc(val)}"${c.req && kind === 'radio' ? ' required' : ''}><span>${kind === 'checkbox' ? '<i aria-hidden="true"></i>' : ''}${esc(o)}</span></label>`;
      })
      .join('');
    return `<fieldset class="field bf-field field-full" data-field="${c.id}" data-type="${c.type}"${c.req ? ' data-req' : ''}${hint ? ` aria-describedby="${fid}-h"` : ''}>
  <legend>${esc(c.label)}${req}</legend>${hint}
  <div class="bf-chips">${opts}</div>
  ${c.outro ? `<input class="bf-outro" type="text" name="${c.id}_outro" maxlength="120" placeholder="Qual?" aria-label="${esc(c.label)}: outro" hidden>` : ''}
  ${err}
</fieldset>`;
  }
  const common = `id="${fid}" name="${c.id}"${c.req ? ' required' : ''}${c.ph ? ` placeholder="${esc(c.ph)}"` : ''}${hint ? ` aria-describedby="${fid}-h"` : ''}`;
  const control =
    c.type === 'textarea'
      ? `<textarea ${common} rows="${c.rows || 4}" maxlength="${c.max || 600}"></textarea>`
      : `<input ${common} type="${c.type === 'tel' ? 'tel' : 'text'}"${c.type === 'tel' ? ' inputmode="tel"' : ''} maxlength="${c.max || 120}"${c.ac ? ` autocomplete="${c.ac}"` : ''}>`;
  return `<div class="field bf-field${c.type === 'textarea' || !['nome', 'whatsapp', 'empresa', 'cidade'].includes(c.id) ? ' field-full' : ''}" data-field="${c.id}" data-type="${c.type}"${c.req ? ' data-req' : ''}>
  <label for="${fid}">${esc(c.label)}${req}</label>${hint}
  ${control}
  ${err}
</div>`;
}

export function briefingPage(b) {
  const total = b.etapas.length;
  const crumbs = [{ label: 'Briefing', href: '/briefing/' }, { label: b.nome, href: `/briefing/${b.slug}/` }];
  const v = preco(b.slug);
  const body = `
${pageHero({
  eyebrow: `Briefing · ${b.nome}`,
  title: b.titulo,
  text: esc(b.lead),
  crumbs,
  extra: `<ul class="bf-meta"><li>${icon('clock')} Cerca de ${esc(b.tempo)}</li><li>${icon('layers')} ${total} etapas</li><li>${icon('shield')} Salvo só neste aparelho</li>${v ? `<li>${icon('target')} A partir de ${esc(v)}</li>` : ''}</ul>`,
})}
<section class="section section-tight bf-sec" aria-label="Formulário de briefing">
  <div class="container bf-wrap">
    <form class="form-card bf" data-briefing="${b.slug}" data-nome="${esc(b.nome)}" data-wa="${whatsapp.number}" novalidate>
      <div class="bf-top">
        <ol class="bf-steps" aria-hidden="true">
          ${b.etapas.map((e, i) => `<li data-dot="${i}"><span>${i + 1}</span><em>${esc(e.titulo)}</em></li>`).join('')}
          <li data-dot="${total}"><span>${icon('check')}</span><em>Revisão</em></li>
        </ol>
        <div class="bf-bar" aria-hidden="true"><i data-bar></i></div>
        <p class="bf-count" data-count aria-live="polite">Etapa 1 de ${total}</p>
      </div>

      ${b.etapas
        .map(
          (e, i) => `<section class="bf-step" data-step="${i}"${i ? ' hidden' : ''} aria-labelledby="bf-t-${i}">
        <h2 class="bf-title" id="bf-t-${i}" tabindex="-1">${esc(e.titulo)}</h2>
        ${e.intro ? `<p class="bf-intro">${esc(e.intro)}</p>` : ''}
        <div class="form-grid">${e.campos.map((c) => campo(c, b.slug)).join('')}</div>
      </section>`
        )
        .join('')}

      <section class="bf-step bf-review" data-step="${total}" hidden aria-labelledby="bf-t-r">
        <div class="review-head">
          <span class="review-icon">${icon('whatsapp')}</span>
          <div><h2 class="bf-title" id="bf-t-r" tabindex="-1">Confira suas respostas</h2>
          <p>Está tudo certo? Ao enviar, o WhatsApp abre com o briefing pronto. Nada é enviado sem você confirmar lá.</p></div>
        </div>
        <div class="bf-summary" data-summary></div>
        <p class="bf-done" data-done hidden role="status">${icon('check')} Pronto! Se o WhatsApp não abriu, <a href="#" target="_blank" rel="noopener" data-send-fallback>toque aqui</a> ou use “Copiar respostas” e cole na conversa.</p>
      </section>

      <div class="bf-nav">
        <button type="button" class="btn btn-ghost" data-prev hidden>${icon('arrowLeft')} Voltar</button>
        <span class="bf-saved" data-saved aria-live="polite"></span>
        <button type="button" class="btn btn-ghost" data-copy hidden>Copiar respostas</button>
        <button type="button" class="btn btn-primary" data-next>Continuar ${icon('arrow')}</button>
        <a class="btn btn-primary" href="#" target="_blank" rel="noopener" data-send hidden>${icon('whatsapp')} Enviar pelo WhatsApp</a>
      </div>
    </form>
    <p class="bf-privacy">${icon('shield')}<span>Este site não guarda as suas respostas. Elas ficam salvas só no seu aparelho até você enviar, e vão para a Nexus JPC apenas pelo WhatsApp. <b>Nunca envie senhas por aqui.</b></span></p>
  </div>
</section>
`;
  return page({
    path: `/briefing/${b.slug}/`,
    title: `Briefing: ${b.nome}`,
    description: `Responda o briefing de ${b.nome.toLowerCase()} da Nexus JPC e receba uma proposta personalizada.`,
    active: 'briefing',
    body,
    crumbs,
    noindex: true,
    cta: false,
    bodyClass: 'is-briefing',
    styles: ['/assets/css/briefing.css'],
    scripts: ['/assets/js/briefing.js'],
  });
}

export function briefingIndex() {
  const crumbs = [{ label: 'Briefing', href: '/briefing/' }];
  const body = `
${pageHero({
  eyebrow: 'Briefing',
  title: 'Vamos entender o <span class="grad">seu projeto</span>',
  text: 'Escolha o serviço e responda algumas perguntas. No final, você revisa e envia pelo WhatsApp.',
  crumbs,
})}
<section class="section section-tight" aria-label="Escolha o briefing">
  <div class="container">
    <ul class="bf-list">
      ${briefings
        .map(
          (b, i) => `<li><a class="service-card bf-card" href="/briefing/${b.slug}/">
        <span class="bf-card-n">${String(i + 1).padStart(2, '0')}</span>
        <h2 class="h3">${esc(b.nome)}</h2>
        <p>${esc(b.lead)}</p>
        <span class="bf-card-foot"><span>${icon('clock')} ${esc(b.tempo)}</span>${preco(b.slug) ? `<span>a partir de <b>${esc(preco(b.slug))}</b></span>` : ''}</span>
        <span class="link-arrow">Começar ${icon('arrow')}</span>
      </a></li>`
        )
        .join('')}
    </ul>
    <p class="bf-privacy">${icon('info')}<span>Não sabe qual escolher? <a href="/contato/">Conte o que precisa</a> e a gente indica o caminho.</span></p>
  </div>
</section>
`;
  return page({
    path: '/briefing/',
    title: 'Briefing',
    description: 'Escolha o serviço e responda o briefing da Nexus JPC.',
    active: 'briefing',
    body,
    crumbs,
    noindex: true,
    cta: false,
    styles: ['/assets/css/briefing.css'],
  });
}
