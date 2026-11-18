/* NEXUS JPC — interações do site (sem dependências) */
(function () {
  'use strict';
  var doc = document.documentElement;
  doc.classList.add('js');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Ano automático no rodapé ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Header: fundo ao rolar ---------- */
  var header = document.querySelector('[data-header]');
  function onScroll() { if (header) header.classList.toggle('is-scrolled', window.scrollY > 8); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector('[data-menu-toggle]');
  var menu = document.querySelector('[data-mobile-menu]');
  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    header.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    menu.hidden = !open;
    if (open) { var first = menu.querySelector('a'); if (first) first.focus(); }
  }
  if (toggle) {
    toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setMenu(false); toggle.focus(); }
    });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', function (m) { if (m.matches) setMenu(false); });
  }

  /* ---------- Revelar ao entrar na tela ---------- */
  var reveals = document.querySelectorAll('[data-reveal]');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Brilho que segue o cursor nos cards de serviço ---------- */
  if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.service-card').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* ---------- Portfólio: filtros + busca ---------- */
  var grid = document.querySelector('[data-grid]');
  if (grid) {
    var cards = Array.prototype.slice.call(grid.querySelectorAll('[data-project]'));
    var filters = document.querySelectorAll('[data-filter]');
    var search = document.querySelector('[data-search]');
    var empty = document.querySelector('[data-empty]');
    var info = document.querySelector('[data-results]');
    var state = { filter: 'todos', q: '' };
    var labels = {};
    filters.forEach(function (b) { labels[b.dataset.filter] = b.childNodes[0].textContent.trim(); });

    var norm = function (s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim(); };

    function apply(animate) {
      var q = norm(state.q), shown = 0;
      cards.forEach(function (c) {
        var okF = state.filter === 'todos' || c.dataset.tags.split(' ').indexOf(state.filter) > -1;
        var okQ = !q || norm(c.dataset.name).indexOf(q) > -1;
        var show = okF && okQ;
        var wasHidden = c.classList.contains('is-hidden');
        c.classList.toggle('is-hidden', !show);
        if (show) {
          shown++;
          c.classList.add('is-in');
          if (animate && !reduceMotion && wasHidden) {
            c.classList.remove('is-entering'); void c.offsetWidth; c.classList.add('is-entering');
          }
        }
      });
      empty.hidden = shown !== 0;
      var parts = [];
      if (state.filter !== 'todos') parts.push('em “' + labels[state.filter] + '”');
      if (state.q) parts.push('para “' + state.q + '”');
      info.textContent = shown + (shown === 1 ? ' projeto' : ' projetos') + (parts.length ? ' ' + parts.join(' ') : '');
      // mantém a URL compartilhável sem recarregar
      var params = new URLSearchParams();
      if (state.filter !== 'todos') params.set('categoria', state.filter);
      if (state.q) params.set('busca', state.q);
      var qs = params.toString();
      history.replaceState(null, '', location.pathname + (qs ? '?' + qs : ''));
    }

    function setFilter(id) {
      state.filter = id;
      filters.forEach(function (b) {
        var on = b.dataset.filter === id;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', String(on));
      });
    }

    filters.forEach(function (b) {
      b.addEventListener('click', function () { setFilter(b.dataset.filter); apply(true); });
    });
    var t;
    search.addEventListener('input', function () {
      clearTimeout(t);
      t = setTimeout(function () { state.q = search.value; apply(true); }, 120);
    });
    var reset = document.querySelector('[data-reset]');
    if (reset) reset.addEventListener('click', function () { search.value = ''; state.q = ''; setFilter('todos'); apply(true); search.focus(); });

    // estado inicial via URL (?categoria=landing&busca=ceia)
    var p = new URLSearchParams(location.search);
    var cat = p.get('categoria');
    if (cat && document.querySelector('[data-filter="' + cat + '"]:not(:disabled)')) setFilter(cat);
    if (p.get('busca')) { search.value = p.get('busca'); state.q = search.value; }
    apply(false);
  }

  /* ---------- Galeria + lightbox ---------- */
  var lb = document.querySelector('[data-lightbox]');
  if (lb && typeof lb.showModal === 'function') {
    var items = Array.prototype.slice.call(document.querySelectorAll('[data-gallery-item]'));
    var img = lb.querySelector('[data-lightbox-img]');
    var cap = lb.querySelector('[data-lightbox-caption]');
    var idx = 0, opener = null;
    function show(i) {
      idx = (i + items.length) % items.length;
      var it = items[idx];
      img.src = it.dataset.src; img.alt = it.dataset.alt;
      cap.textContent = (idx + 1) + ' / ' + items.length + ' · ' + it.dataset.alt;
    }
    items.forEach(function (it, i) {
      it.addEventListener('click', function () { opener = it; show(i); lb.showModal(); });
    });
    lb.querySelector('[data-lightbox-prev]').addEventListener('click', function () { show(idx - 1); });
    lb.querySelector('[data-lightbox-next]').addEventListener('click', function () { show(idx + 1); });
    lb.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
    lb.addEventListener('close', function () { if (opener) opener.focus(); });
  } else if (lb) {
    // navegadores sem <dialog>: abre a imagem diretamente
    document.querySelectorAll('[data-gallery-item]').forEach(function (it) {
      it.addEventListener('click', function () { window.open(it.dataset.src, '_blank', 'noopener'); });
    });
  }

  /* ---------- Formulário de contato → WhatsApp ---------- */
  var form = document.querySelector('[data-contact-form]');
  if (form) {
    var number = form.dataset.wa;
    var stepForm = form.querySelector('[data-step="form"]');
    var stepReview = form.querySelector('[data-step="review"]');
    var preview = form.querySelector('[data-preview]');
    var send = form.querySelector('[data-send]');
    var sendFb = form.querySelector('[data-send-fallback]');
    var done = form.querySelector('[data-done]');
    var desc = form.elements.descricao;
    var count = form.querySelector('[data-count]');
    var phone = form.elements.whatsapp;
    var tipoLabels = {};
    Array.prototype.forEach.call(form.elements.tipo.options, function (o) { tipoLabels[o.value] = o.textContent; });

    // pré-seleção vinda de páginas de serviço/case: /contato/?tipo=landing-pages&ref=ceia
    var qp = new URLSearchParams(location.search);
    if (qp.get('tipo') && tipoLabels[qp.get('tipo')]) form.elements.tipo.value = qp.get('tipo');
    var ref = qp.get('ref');
    if (qp.get('empresa')) form.elements.empresa.value = qp.get('empresa').slice(0, 80);

    // máscara simples de telefone brasileiro
    phone.addEventListener('input', function () {
      var d = phone.value.replace(/\D/g, '').slice(0, 11);
      var out = d;
      if (d.length > 2) out = '(' + d.slice(0, 2) + ') ' + d.slice(2);
      if (d.length > 7) out = '(' + d.slice(0, 2) + ') ' + d.slice(2, d.length - 4) + '-' + d.slice(-4);
      phone.value = out;
    });
    desc.addEventListener('input', function () { count.textContent = desc.value.length + '/1200'; });

    var rules = {
      nome: function (v) { return v.trim().length >= 2 ? '' : 'Informe seu nome.'; },
      whatsapp: function (v) { var d = v.replace(/\D/g, ''); return d.length >= 10 && d.length <= 11 ? '' : 'Informe um WhatsApp válido com DDD.'; },
      tipo: function (v) { return v ? '' : 'Selecione o tipo de projeto.'; },
      descricao: function (v) { return v.trim().length >= 15 ? '' : 'Descreva seu projeto em pelo menos 15 caracteres.'; }
    };
    function check(name) {
      var el = form.elements[name];
      var msg = rules[name](el.value);
      var field = el.closest('.field');
      field.classList.toggle('has-error', !!msg);
      field.classList.toggle('is-valid', !msg);
      el.setAttribute('aria-invalid', msg ? 'true' : 'false');
      form.querySelector('[data-error-for="' + name + '"]').textContent = msg;
      return !msg;
    }
    Object.keys(rules).forEach(function (name) {
      var el = form.elements[name];
      el.addEventListener('blur', function () { if (el.value) check(name); });
      el.addEventListener('input', function () { if (el.closest('.field').classList.contains('has-error')) check(name); });
      el.addEventListener('change', function () { if (name === 'tipo') check(name); });
    });

    function buildMessage() {
      var f = form.elements;
      var nome = f.nome.value.trim();
      var empresa = f.empresa.value.trim();
      var tipo = tipoLabels[f.tipo.value] || '';
      var msg = 'Olá! Meu nome é ' + nome + (empresa ? ', da empresa ' + empresa : '') + '.';
      msg += '\nTenho interesse em: ' + tipo + '.';
      if (ref) msg += '\nVi o projeto ' + ref + ' no portfólio.';
      msg += '\nDetalhes: ' + f.descricao.value.trim();
      msg += '\nMeu WhatsApp: ' + f.whatsapp.value.trim();
      return msg;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true, firstBad = null;
      Object.keys(rules).forEach(function (n) { if (!check(n)) { ok = false; if (!firstBad) firstBad = form.elements[n]; } });
      if (!ok) { firstBad.focus(); return; }
      var msg = buildMessage();
      var url = 'https://wa.me/' + number + '?text=' + encodeURIComponent(msg);
      preview.textContent = msg;
      send.href = url; sendFb.href = url;
      done.hidden = true;
      stepForm.hidden = true; stepReview.hidden = false; stepReview.focus();
      form.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
    form.querySelector('[data-edit]').addEventListener('click', function () {
      stepReview.hidden = true; stepForm.hidden = false; form.elements.nome.focus();
    });
    send.addEventListener('click', function () { done.hidden = false; });
  }
})();

/* ---------- Rolagem suave, cursor vivo, luz e botões magnéticos (todas as páginas) ---------- */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Rolagem suave (Lenis). Se a página inicial usar GSAP, home.js conecta o ScrollTrigger a ela.
  if (!reduce && fine && window.Lenis) {
    var lenis = new window.Lenis({ lerp: 0.1 });
    window.__lenis = lenis;
    if (!window.gsap) {
      (function loop(time) { lenis.raf(time); requestAnimationFrame(loop); })(performance.now());
    }
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href'); if (id.length < 2) return;
        var el = document.querySelector(id); if (!el) return;
        e.preventDefault(); lenis.scrollTo(el, { offset: -80 });
      });
    });
  }

  if (!fine || reduce) return;
  var cur = document.querySelector('[data-cursor]'), dot = document.querySelector('[data-cursor-dot]');
  var label = document.querySelector('[data-cursor-label]'), spot = document.querySelector('[data-spot]');
  if (!cur || !dot) return;
  document.documentElement.classList.add('has-cursor');
  var m = { x: -100, y: -100 }, c = { x: -100, y: -100 }, s = { x: -400, y: -400 };
  window.addEventListener('pointermove', function (e) {
    if (e.pointerType !== 'mouse') return;
    m.x = e.clientX; m.y = e.clientY;
    dot.style.transform = 'translate(' + m.x + 'px,' + m.y + 'px)';
    if (spot) spot.classList.add('is-on');
    var tgt = e.target.closest && e.target.closest('[data-cursor-text], a, button, summary, label, select');
    var txt = tgt && tgt.getAttribute('data-cursor-text');
    cur.classList.toggle('is-big', !!txt);
    cur.classList.toggle('is-link', !!tgt && !txt);
    if (txt) label.textContent = txt;
  }, { passive: true });
  document.addEventListener('pointerleave', function () { cur.classList.add('is-hidden'); });
  document.addEventListener('pointerenter', function () { cur.classList.remove('is-hidden'); });
  (function follow() {
    c.x += (m.x - c.x) * 0.18; c.y += (m.y - c.y) * 0.18;
    s.x += (m.x - s.x) * 0.06; s.y += (m.y - s.y) * 0.06;
    cur.style.transform = 'translate(' + c.x + 'px,' + c.y + 'px)';
    if (spot) spot.style.transform = 'translate(' + s.x + 'px,' + s.y + 'px)';
    requestAnimationFrame(follow);
  })();
  // botões magnéticos
  document.querySelectorAll('.btn-primary, .btn-ghost, .menu-toggle').forEach(function (b) {
    b.addEventListener('pointermove', function (e) {
      var r = b.getBoundingClientRect();
      b.style.translate = ((e.clientX - r.left - r.width / 2) * 0.25) + 'px ' + ((e.clientY - r.top - r.height / 2) * 0.35) + 'px';
    });
    b.addEventListener('pointerleave', function () { b.style.translate = ''; });
  });
})();

/* ---------- Botão de orçamento fixo no celular: aparece depois do topo, some perto do fim ---------- */
(function () {
  var b = document.querySelector('[data-m-cta]'); if (!b) return;
  var blockers = 0;
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { blockers += e.isIntersecting ? 1 : (e.target.__seen ? -1 : 0); e.target.__seen = e.isIntersecting; });
      blockers = Math.max(0, blockers); upd();
    });
    document.querySelectorAll('.h-final, .cta-banner, .site-footer, .h-hero .hero-actions').forEach(function (el) { io.observe(el); });
  }
  function upd() {
    var y = window.scrollY;
    b.classList.toggle('is-on', y > window.innerHeight * 0.6 && blockers === 0);
  }
  window.addEventListener('scroll', upd, { passive: true }); upd();
})();
