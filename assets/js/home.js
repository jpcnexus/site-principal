/* NEXUS JPC — coreografia da página inicial (GSAP + ScrollTrigger + SplitText + Lenis)
   Cenas: abertura → hero com N → faixa tipográfica → notificações → site nascendo (personalizável)
          → cartas → galeria horizontal → perguntas → chamada final com o N de volta. */
(function () {
  'use strict';
  var html = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FX = window.NexusFX || { st: { intro: 1, keep: 1, fin: 0, pre: 0 } };
  var st = FX.st;

  /* ---------- Personalização: o site em construção vira do visitante ---------- */
  var biz = document.querySelector('[data-biz]'), screen = document.querySelector('[data-screen]');
  var finalCta = document.querySelector('[data-final-cta]'), finalWa = document.querySelector('[data-final-wa]');
  var waNumber = finalWa ? (finalWa.getAttribute('href').match(/wa\.me\/(\d+)/) || [])[1] : null;
  function slug(v) { return (v.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '') || 'seunegocio') + '.com.br'; }
  function updateBiz() {
    var v = biz.value.trim(), name = v || 'Seu Negócio';
    document.querySelector('[data-pv-name]').textContent = name;
    document.querySelector('[data-pv-nav]').textContent = name;
    document.querySelector('[data-pv-url]').textContent = slug(v);
    if (finalCta) {
      finalCta.firstChild.textContent = v ? 'Quero um site assim para ' + v + ' ' : 'Quero meu orçamento ';
      finalCta.setAttribute('href', v ? '/contato/?empresa=' + encodeURIComponent(v) : '/contato/');
    }
    if (finalWa && waNumber) {
      var msg = v ? 'Olá! Vi o site da Nexus JPC e quero um site assim para ' + v + '. Podemos conversar?' : 'Olá! Conheci a Nexus JPC pelo portfólio e gostaria de conversar sobre um projeto.';
      finalWa.setAttribute('href', 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(msg));
    }
  }
  if (biz) {
    biz.addEventListener('input', updateBiz);
    document.querySelectorAll('[data-color]').forEach(function (b) {
      b.addEventListener('click', function () {
        document.querySelectorAll('[data-color]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        screen.style.setProperty('--brand', b.getAttribute('data-color'));
      });
    });
  }

  /* ---------- Cartas: virar, inclinar com o mouse ---------- */
  document.querySelectorAll('[data-card]').forEach(function (card) {
    var front = card.querySelector('.h-front'), back = card.querySelector('.h-back'), tilt = card.querySelector('.h-tilt');
    function flip(on) {
      card.classList.toggle('is-flipped', on);
      front.setAttribute('aria-expanded', String(on));
      setTimeout(function () { (on ? back.querySelector('a') : front).focus({ preventScroll: true }); }, 450);
    }
    front.addEventListener('click', function () { flip(true); });
    back.querySelector('[data-unflip]').addEventListener('click', function () { flip(false); });
    if (reduce) return;
    card.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      var r = card.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      tilt.style.transform = 'rotateY(' + ((px - 0.5) * 16) + 'deg) rotateX(' + ((0.5 - py) * 14) + 'deg)';
      front.style.setProperty('--mx', px * 100 + '%'); front.style.setProperty('--my', py * 100 + '%');
    });
    card.addEventListener('pointerleave', function () { tilt.style.transform = ''; });
  });

  /* ---------- Portfólio: carrossel com setas, arraste e telas que rolam sozinhas ---------- */
  var work = document.querySelector('[data-work-track]'), workTouched = false;
  if (work) {
    var prev = document.querySelector('[data-work-prev]'), next = document.querySelector('[data-work-next]');
    var step = function () { var c = work.querySelector('.h-work-card'); return c ? c.getBoundingClientRect().width + 20 : 320; };
    var arrows = function () { var max = work.scrollWidth - work.clientWidth - 4; if (prev) prev.disabled = work.scrollLeft <= 4; if (next) next.disabled = work.scrollLeft >= max; };
    var touch = function () { workTouched = true; work.classList.remove('is-drift'); };
    if (prev) prev.addEventListener('click', function () { touch(); work.scrollBy({ left: -step(), behavior: reduce ? 'auto' : 'smooth' }); });
    if (next) next.addEventListener('click', function () { touch(); work.scrollBy({ left: step(), behavior: reduce ? 'auto' : 'smooth' }); });
    work.addEventListener('scroll', arrows, { passive: true }); arrows();
    ['touchstart', 'wheel', 'keydown'].forEach(function (ev) { work.addEventListener(ev, touch, { passive: true }); });
    // arrastar com o mouse
    var drag = null, moved = false;
    work.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') return; touch(); drag = { x: e.clientX, left: work.scrollLeft }; moved = false; });
    window.addEventListener('pointermove', function (e) { if (!drag) return; var dx = e.clientX - drag.x; if (Math.abs(dx) > 5) { moved = true; work.classList.add('is-drag'); } work.scrollLeft = drag.left - dx; });
    window.addEventListener('pointerup', function () { if (!drag) return; drag = null; setTimeout(function () { work.classList.remove('is-drag'); }, 0); });
    work.addEventListener('click', function (e) { if (moved) { e.preventDefault(); moved = false; } }, true);
    work.addEventListener('dragstart', function (e) { e.preventDefault(); });
    // as capturas descem devagar mostrando o site inteiro (só enquanto aparecem na tela)
    if (!reduce) {
      work.querySelectorAll('.h-work-view img').forEach(function (img) {
        var setup = function () {
          var view = img.parentElement, dist = img.getBoundingClientRect().height - view.getBoundingClientRect().height;
          if (dist <= 0) return;
          img.style.setProperty('--dist', dist + 'px');
          img.style.setProperty('--dur', Math.max(8, dist / 70) + 's');
          img.classList.add('is-pan');
        };
        img.complete ? setup() : img.addEventListener('load', setup);
      });
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { e.target.classList.toggle('is-visible', e.isIntersecting); }); }, { threshold: 0.4 });
      work.querySelectorAll('.h-work-view').forEach(function (v) { io.observe(v); });
    }
  }

  /* ---------- Texto vivo ---------- */
  var GLY = '01<>/_-+=#*';
  function scramble(el, txt, dur) {
    var start = performance.now(), len = txt.length;
    (function step() {
      var p = Math.min(1, (performance.now() - start) / (dur * 1000)), out = '';
      for (var i = 0; i < len; i++) { var c = txt[i]; out += (c === ' ' || i < p * len) ? c : GLY[(Math.random() * GLY.length) | 0]; }
      el.textContent = out; if (p < 1) requestAnimationFrame(step);
    })();
  }
  var WORDS = ['presença digital', 'landing page', 'solução digital', 'automação', 'marca online'];
  function startRot() {
    var el = document.querySelector('[data-rot]'), i = 0;
    if (!el || reduce) return;
    setInterval(function () { if (document.hidden) return; i = (i + 1) % WORDS.length; scramble(el, WORDS[i], 0.55); }, 2800);
  }

  /* ---------- Sem GSAP ou com movimento reduzido: versão estática ---------- */
  if (reduce || !window.gsap || !window.ScrollTrigger) {
    html.classList.remove('pre-on');
    st.intro = 1; st.pre = 0;
    document.querySelectorAll('.h-ty, .h-answer').forEach(function (el) { el.style.opacity = 1; });
    if (screen) screen.classList.add('is-colored', 'is-live');
    document.querySelectorAll('.h-st').forEach(function (s) { s.classList.add('is-on'); });
    return;
  }
  FX.driven = true;
  var gsap = window.gsap, ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);
  if (window.SplitText) gsap.registerPlugin(window.SplitText);
  var lenis = window.__lenis || null;
  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  /* ---------- Abertura (uma vez por sessão) e entrada do hero ---------- */
  var heroIn = gsap.timeline({ paused: true })
    .from('.h-hero h1 .ln > span', { yPercent: 115, duration: 1.1, ease: 'power4.out', stagger: 0.1 })
    .from('.h-hero .h-in', { y: 24, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08 }, '<.3')
    .add(startRot);
  if (html.classList.contains('pre-on')) {
    if (lenis) lenis.stop();
    var cnt = { v: 0 }, pc = document.querySelector('[data-pre-count]');
    gsap.timeline()
      .to(st, { intro: 1, duration: 1.7, ease: 'power3.inOut' }, 0)
      .to(cnt, { v: 100, duration: 1.7, ease: 'power2.inOut', onUpdate: function () { pc.textContent = String(Math.round(cnt.v)).padStart(3, '0'); } }, 0)
      .to('.h-pre', { opacity: 0, duration: 0.45, ease: 'power2.out' }, '+=.15')
      .to(st, { pre: 0, duration: 1.2, ease: 'power3.inOut' }, '<')
      .add(function () {
        html.classList.remove('pre-on');
        try { sessionStorage.setItem('nx-intro', '1'); } catch (e) {}
        if (lenis) lenis.start();
        ScrollTrigger.refresh();
        heroIn.play();
      }, '<.2');
  } else {
    st.pre = 0;
    gsap.to(st, { intro: 1, duration: 2, ease: 'power3.inOut', delay: 0.1 });
    heroIn.play();
  }

  /* ---------- Fundo muda de cor por cena ---------- */
  function setBg(c) { document.body.style.backgroundColor = c; }
  gsap.utils.toArray('[data-bg]').forEach(function (sec) {
    ScrollTrigger.create({ trigger: sec, start: 'top 55%', end: 'bottom 55%', onToggle: function (s) { if (s.isActive) setBg(sec.getAttribute('data-bg')); } });
  });

  /* ---------- Cena 1: N se desfaz ao rolar ---------- */
  ScrollTrigger.create({ trigger: '.h-hero', start: 'top top', end: 'bottom top', onUpdate: function (s) { st.keep = Math.max(0, 1 - s.progress * 1.6); } });
  gsap.to('.h-hero-copy', { yPercent: -16, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.h-hero', start: 'top top', end: 'bottom top', scrub: true } });

  /* ---------- Títulos linha a linha e rótulos que embaralham ---------- */
  document.fonts.ready.then(function () {
    if (window.SplitText) {
      document.querySelectorAll('.h-split').forEach(function (el) {
        var sp = new window.SplitText(el, { type: 'lines', mask: 'lines' });
        gsap.from(sp.lines, { yPercent: 115, duration: 1.1, ease: 'power4.out', stagger: 0.1, scrollTrigger: { trigger: el, start: 'top 85%' } });
      });
    }
    ScrollTrigger.refresh();
  });
  document.querySelectorAll('[data-scramble]').forEach(function (el) {
    var txt = el.textContent;
    ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: function () { scramble(el, txt, 0.7); } });
  });

  /* ---------- Cena 2: faixa gigante ---------- */
  gsap.fromTo('[data-row="1"]', { xPercent: 0 }, { xPercent: -35, ease: 'none', scrollTrigger: { trigger: '.h-marquee', start: 'top bottom', end: 'bottom top', scrub: 0.5 } });
  gsap.fromTo('[data-row="2"]', { xPercent: -35 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: '.h-marquee', start: 'top bottom', end: 'bottom top', scrub: 0.5 } });

  /* ---------- Cena 3: notificações (presa) ---------- */
  var mm = gsap.matchMedia();
  mm.add('(min-width: 768px)', function () {
  gsap.timeline({ scrollTrigger: { trigger: '.h-pain', start: 'top top', end: '+=150%', pin: true, scrub: 0.7 } })
    .from('.h-n1', { y: 80, opacity: 0, scale: 0.8, duration: 0.4 })
    .from('.h-n2', { y: 80, opacity: 0, scale: 0.8, duration: 0.4 }, '+=.1')
    .from('.h-n3', { y: 80, opacity: 0, scale: 0.8, duration: 0.4 }, '+=.1')
    .to('.h-notif s', { scaleX: 1, duration: 0.3, stagger: 0.15 }, '+=.2')
    .to('.h-n1', { x: -260, y: -120, rotate: -20, opacity: 0, duration: 0.5 }, '+=.15')
    .to('.h-n2', { x: 260, y: -80, rotate: 20, opacity: 0, duration: 0.5 }, '<.05')
    .to('.h-n3', { y: 200, rotate: 10, opacity: 0, duration: 0.5 }, '<.05')
    .to('.h-pain-title h2', { y: -40, duration: 0.5 }, '<')
    .to('.h-answer', { opacity: 1, y: -10, duration: 0.5 });
  });
  mm.add('(max-width: 767px)', function () {
    gsap.timeline({ scrollTrigger: { trigger: '.h-pain', start: 'top 70%' } })
      .from('.h-notif', { x: -30, opacity: 0, duration: 0.45, stagger: 0.12, ease: 'power3.out' })
      .to('.h-notif s', { scaleX: 1, duration: 0.3, stagger: 0.12 }, '+=.1')
      .to('.h-answer', { opacity: 1, duration: 0.6 });
  });

  /* ---------- Cena 4: o site nascendo (presa) ---------- */
  var steps = gsap.utils.toArray('.h-st'), label = document.querySelector('[data-stage-label]');
  var labels = ['01 · Briefing', '02 · Wireframe aprovado', '03 · Design e interações', '04 · No ar'];
  function stage(n) {
    steps.forEach(function (s, i) { s.classList.toggle('is-on', i <= n); });
    label.textContent = labels[n];
    screen.classList.toggle('is-colored', n >= 2);
    screen.classList.toggle('is-live', n >= 3);
  }
  function buildTl(tl) {
    return tl.from('.h-wf i', { scaleX: 0, transformOrigin: 'left', opacity: 0, stagger: 0.05, duration: 0.4 })
    .to('.h-cursor', { left: '60%', top: '28%', duration: 0.5 }, '<')
    .to('.h-wf', { opacity: 0, duration: 0.4 }, '+=.3')
    .to('.h-ty', { opacity: 1, duration: 0.4 }, '<')
    .to('.h-cursor', { left: '18%', top: '82%', duration: 0.5 }, '<')
    .to(screen, { backgroundColor: '#0d1520', duration: 0.4 }, '+=.2')
    .to('.h-cursor', { left: '80%', top: '50%', duration: 0.5 }, '<')
    .to('.h-cursor', { left: '50%', top: '92%', duration: 0.5 }, '+=.3')
    .to('.h-cursor', { opacity: 0, duration: 0.2 })
    .to({}, { duration: 0.3 });
  }
  mm.add('(min-width: 768px)', function () {
    buildTl(gsap.timeline({ scrollTrigger: { trigger: '.h-build', start: 'top top', end: '+=260%', pin: true, scrub: 0.8, onUpdate: function (s) { stage(Math.min(3, Math.floor(s.progress * 4))); } } }));
  });
  mm.add('(max-width: 767px)', function () {
    var tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' }, onUpdate: function () { stage(Math.min(3, Math.floor(this.progress() * 4))); } });
    buildTl(tl); tl.duration(4.5);
    ScrollTrigger.create({ trigger: '.h-browser', start: 'top 75%', once: true, onEnter: function () { tl.play(); } });
  });

  /* ---------- Cena 5: cartas entram ---------- */
  mm.add('(min-width: 768px)', function () { gsap.from('.h-card', { y: 90, opacity: 0, stagger: 0.1, duration: 1.1, ease: 'power4.out', scrollTrigger: { trigger: '.h-cards', start: 'top 82%' } }); });

  /* ---------- Cena 6: o carrossel anda para o lado conforme a rolagem ---------- */
  if (work) {
    work.classList.add('is-drift');
    ScrollTrigger.create({ trigger: '.h-work', start: 'top 80%', end: 'bottom 20%', onUpdate: function (s) {
      if (workTouched) return;
      var max = work.scrollWidth - work.clientWidth; if (max <= 0) return;
      work.scrollLeft = s.progress * max;
    } });
    // Quando todos os projetos cabem na tela (computador), a fileira ainda desliza de leve para o lado.
    mm.add('(min-width: 768px)', function () {
      if (work.scrollWidth - work.clientWidth > 0) return;
      gsap.fromTo(work, { x: 90 }, { x: -90, ease: 'none', scrollTrigger: { trigger: '.h-work', start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
    });
  }

  /* ---------- Cena 7: perguntas ---------- */
  gsap.from('.h-faq .faq-item', { x: 40, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.h-faq .faq', start: 'top 85%' } });

  /* ---------- Cena 8: o N volta atrás da chamada final ---------- */
  ScrollTrigger.create({ trigger: '.h-final', start: 'top 85%', end: 'bottom bottom', onUpdate: function (s) { st.fin = s.progress; }, onLeaveBack: function () { st.fin = 0; } });
})();
