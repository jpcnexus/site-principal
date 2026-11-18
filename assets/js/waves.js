/* NEXUS JPC — fundo de pontos em canvas
   - Todas as páginas: onda de pontos em perspectiva que reage ao cursor (e a toques, com ondulação).
   - Página inicial ([data-fx-n]): parte dos pontos sobe e forma o símbolo oficial do N em 3D,
     que gira com o mouse; volta a se formar atrás da chamada final ([data-fx-final]).
   Leve: sem bibliotecas, qualidade adaptativa, 30 fps em aparelhos modestos, pausa com a aba oculta,
   quadro estático com prefers-reduced-motion. A animação da página inicial é conduzida por home.js
   através de window.NexusFX.st (intro, keep, fin, pre). */
(function () {
  'use strict';
  var canvas = document.querySelector('[data-waves]');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = window.matchMedia('(pointer: coarse)').matches;
  var lowEnd = coarse || (navigator.hardwareConcurrency || 8) <= 4;
  var heroEl = document.querySelector('[data-fx-n]');
  var finalEl = document.querySelector('[data-fx-final]');
  var afterEl = document.querySelector('[data-fx-n-after]');
  var nMode = !!heroEl;
  var intensity = nMode ? 1 : 0.7;
  var frameMs = lowEnd ? 1000 / 30 : 1000 / 60;

  var W = 0, H = 0, dpr = 1, cols = 0, rows = 0, wave = [], trav = [], nPts = null;
  var t = Math.random() * 50, last = 0, raf = 0, running = false, cost = 0, frames = 0, degraded = false;
  var mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, a: 0, ta: 0, nx: 0.5, ny: 0.5 };
  var rot = { x: 0, y: 0 }, ripples = [];
  var preOn = document.documentElement.classList.contains('pre-on');
  var st = { intro: nMode ? 0 : 1, keep: 1, fin: 0, pre: preOn ? 1 : 0 };
  window.NexusFX = { st: st, driven: false };

  var TINTS = ['#3B82F6', '#3197F2', '#2AACEE', '#26BFEC', '#22D3EE', '#5EE0F2', '#A5F3FC'];
  // Símbolo oficial do N (caminhos de assets/brand/nexus-jpc/nexus-jpc-icone.svg, viewBox 55 18 564 478)
  var N_PATHS = [
    'M 80,114 L 145,159 L 145,385 L 80,422 Z',
    'M 80,114 L 182,53 Q 193,46 205,53 L 525,252 L 525,132 L 588,132 L 588,348 Q 588,361 575,369 L 529,396 Q 513,406 500,397 L 145,179 Z'
  ];
  var N_NODES = [[115, 421], [557, 132]];

  function sampleN() {
    var oc = document.createElement('canvas'); oc.width = 564; oc.height = 478;
    var o = oc.getContext('2d'); o.translate(-55, -18); o.fillStyle = '#fff';
    N_PATHS.forEach(function (d) { o.fill(new Path2D(d)); });
    var img = o.getImageData(0, 0, 564, 478).data, pts = [], step = (lowEnd || window.innerWidth < 700) ? 12 : 9;
    for (var y = 0; y < 478; y += step) for (var x = 0; x < 564; x += step) {
      if (img[(y * 564 + x) * 4 + 3] > 128) pts.push({ x: x + 55 - 337, y: y + 18 - 257, z: (Math.random() - 0.5) * 26, node: false });
    }
    N_NODES.forEach(function (n) {
      for (var r = 0; r <= 46; r += step * 0.8) {
        var k = Math.max(1, Math.round(2 * Math.PI * r / (step * 0.9)));
        for (var i = 0; i < k; i++) { var a = i / k * Math.PI * 2; pts.push({ x: n[0] + Math.cos(a) * r - 337, y: n[1] + Math.sin(a) * r - 257, z: 40 + (Math.random() - 0.5) * 20, node: true }); }
      }
    });
    return pts;
  }

  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, lowEnd ? 1.25 : 1.5);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var sp = W < 640 ? 11 : 13;
    cols = Math.min(lowEnd ? 90 : 130, Math.max(30, Math.round(W / sp)));
    rows = W < 640 ? 20 : lowEnd ? 24 : 30;
    wave = [];
    for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) wave.push({ r: r, c: c, trav: false });
    if (nMode) {
      if (!nPts) nPts = sampleN();
      var pool = wave.filter(function (p) { return p.r > rows * 0.35; });
      trav = nPts.map(function (p, i) { return { w: pool[(i * 7919) % pool.length], p: p, ox: 0, oy: 0, delay: Math.random() * 0.35 }; });
      trav.forEach(function (a) { a.w.trav = true; });
    }
    if (reduce) draw();
  }

  function heroTarget() {
    var size, cx, cy;
    if (W < 960) {
      size = Math.min(W * 0.56, H * 0.24); cx = W * 0.5;
      var top = afterEl ? afterEl.getBoundingClientRect().bottom : H * 0.7;
      cy = Math.min(top + 40 + size / 2, H - size / 2 - 16);
    } else { size = Math.min(H * 0.6, W * 0.34); cx = W * 0.74; cy = H * 0.52; }
    return { cx: cx, cy: cy, s: size / 478 };
  }
  function finalTarget() {
    var r = finalEl.getBoundingClientRect(), size = Math.min(W * 0.7, H * 0.62);
    return { cx: W / 2, cy: r.top + r.height / 2, s: size / 478 };
  }
  function wpos(p) {
    var d = p.r / (rows - 1), u = p.c / (cols - 1), s = 0.3 + 0.7 * Math.pow(d, 1.25);
    var h = Math.sin(u * 6.2 + t * 0.55 + d * 2.4) * 0.6 + Math.sin(u * 13 - t * 0.85 + d * 4.1) * 0.22 + Math.sin(u * 2.3 + t * 0.32 - d * 1.3) * 0.53;
    return { x: W / 2 + (u - 0.5) * W * (1.08 + 0.55 * d), y: H * (0.58 + 0.42 * Math.pow(d, 1.3)) - h * H * 0.09 * s, s: s, d: d, u: u, h: h };
  }
  function ease(x) { x = Math.max(0, Math.min(1, x)); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    var mx = mouse.x, my = mouse.y, ma = mouse.a, now = performance.now();
    var useFinal = nMode && finalEl && st.fin > 0.001;
    var prog = !nMode ? 0 : useFinal ? st.fin : st.intro * st.keep;

    for (var i = 0; i < wave.length; i++) {
      var p = wave[i]; if (p.trav && prog > 0.02) continue;
      var q = wpos(p), lift = 0;
      if (ma > 0.01) {
        var dx = q.x - mx, dy = (q.y - my) * 1.4, dd = Math.sqrt(dx * dx + dy * dy), R = 140 + 90 * q.s;
        if (dd < R) { var f = 1 - dd / R; lift = f * f * 42 * q.s * ma; }
      }
      for (var k = 0; k < ripples.length; k++) {
        var rp = ripples[k], age = (now - rp.t0) / 1000, rad = age * 520, rdx = q.x - rp.x, rdy = (q.y - rp.y) * 1.4;
        var band = Math.abs(Math.sqrt(rdx * rdx + rdy * rdy) - rad);
        if (band < 46) lift += (1 - band / 46) * 26 * q.s * (1 - age / 1.6);
      }
      var cr = (q.h + 1.35) / 2.7;
      ctx.globalAlpha = Math.min(1, (0.12 + 0.78 * Math.pow(q.d, 1.4)) * (0.45 + 0.75 * cr) * intensity + lift / 80);
      ctx.fillStyle = TINTS[Math.min(6, Math.round((q.u * 0.45 + cr * 0.45 + lift / 60) * 6))];
      var sz = 0.8 + 1.5 * q.s + lift / 22;
      ctx.fillRect(q.x - sz / 2, q.y - lift - sz / 2, sz, sz);
    }

    if (prog > 0.02) {
      var T = useFinal ? finalTarget() : heroTarget(), alphaN = useFinal ? 0.3 : 1;
      if (!useFinal && st.pre > 0) {
        var ps = Math.min(W * 0.62, H * 0.62) / 478, kk = st.pre * st.pre * (3 - 2 * st.pre);
        T = { cx: T.cx + (W / 2 - T.cx) * kk, cy: T.cy + (H * 0.46 - T.cy) * kk, s: T.s + (ps - T.s) * kk };
      }
      var cy = Math.cos(rot.y), sy = Math.sin(rot.y), cx2 = Math.cos(rot.x), sx = Math.sin(rot.x);
      for (var j = 0; j < trav.length; j++) {
        var a = trav[j], w = wpos(a.w), P = a.p, e = ease(prog * 1.35 - a.delay);
        var X = P.x, Y = P.y + Math.sin(t * 1.2 + j * 0.37) * 1.5, Z = P.z;
        var x1 = X * cy - Z * sy, z1 = X * sy + Z * cy, y1 = Y * cx2 - z1 * sx, z2 = Y * sx + z1 * cx2;
        var f3 = 700 / (700 + z2 * T.s * 2.2);
        var bx = T.cx + x1 * T.s * f3, by = T.cy + y1 * T.s * f3;
        if (ma > 0.01 && e > 0.6) {
          var dx2 = bx - mx, dy2 = by - my, d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (d2 < 100) { var f2 = (1 - d2 / 100) * 30 * ma; a.ox += (dx2 / (d2 || 1) * f2 - a.ox) * 0.2; a.oy += (dy2 / (d2 || 1) * f2 - a.oy) * 0.2; }
          else { a.ox *= 0.9; a.oy *= 0.9; }
        } else { a.ox *= 0.9; a.oy *= 0.9; }
        var x = w.x + (bx + a.ox - w.x) * e, y = w.y + (by + a.oy - w.y) * e - Math.sin(e * Math.PI) * 70;
        var tint = P.node ? 6 : Math.max(0, Math.min(5, Math.round((P.x / 250 + 0.5) * 5)));
        ctx.globalAlpha = (0.35 + 0.65 * e) * (0.7 + 0.3 * f3) * (e > 0.5 ? alphaN : 1);
        ctx.fillStyle = TINTS[tint];
        var s2 = (0.9 + 1.4 * w.s) * (1 - e) + (P.node ? 2.8 : 2.3) * f3 * e * (useFinal ? 1.2 : 1);
        ctx.fillRect(x - s2 / 2, y - s2 / 2, s2, s2);
      }
    }
    ctx.globalAlpha = 1;
  }

  function tick(ts) {
    raf = requestAnimationFrame(tick);
    if (ts - last < frameMs) return;
    var dt = Math.min(64, ts - (last || ts)) / 1000; last = ts; t += dt;
    mouse.x += (mouse.tx - mouse.x) * 0.12; mouse.y += (mouse.ty - mouse.y) * 0.12; mouse.a += (mouse.ta - mouse.a) * 0.06;
    rot.y += ((mouse.nx - 0.5) * 0.6 + Math.sin(t * 0.4) * 0.14 - rot.y) * 0.06;
    rot.x += (-(mouse.ny - 0.5) * 0.5 - rot.x) * 0.06;
    var now = performance.now();
    ripples = ripples.filter(function (r) { return now - r.t0 < 1600; });
    var t0 = performance.now();
    draw();
    cost = cost * 0.9 + (performance.now() - t0) * 0.1;
    if (++frames > 40 && !degraded && cost > 9) { degraded = true; frameMs = 1000 / 30; lowEnd = true; nPts = null; resize(); }
  }
  function start() { if (!running && !reduce) { running = true; last = 0; raf = requestAnimationFrame(tick); } }
  function stop() { running = false; cancelAnimationFrame(raf); }

  var rt;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(resize, 150); });
  resize();

  if (reduce) { st.intro = 1; st.pre = 0; draw(); canvas.classList.add('is-ready'); return; }

  window.addEventListener('pointermove', function (e) {
    if (mouse.x < -999) { mouse.x = e.clientX; mouse.y = e.clientY; }
    mouse.tx = e.clientX; mouse.ty = e.clientY; mouse.ta = 1; mouse.nx = e.clientX / W; mouse.ny = e.clientY / H;
  }, { passive: true });
  document.addEventListener('pointerleave', function () { mouse.ta = 0; mouse.nx = 0.5; mouse.ny = 0.5; });
  window.addEventListener('blur', function () { mouse.ta = 0; });
  window.addEventListener('pointerup', function (e) { if (e.pointerType !== 'mouse') mouse.ta = 0; }, { passive: true });
  window.addEventListener('pointerdown', function (e) {
    if (ripples.length > 2) ripples.shift();
    ripples.push({ x: e.clientX, y: e.clientY, t0: performance.now() });
  }, { passive: true });
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });

  // Se home.js não assumir (ex.: falha ao carregar as bibliotecas), o N se forma sozinho.
  if (nMode) setTimeout(function () {
    if (window.NexusFX.driven) return;
    document.documentElement.classList.remove('pre-on');
    var t0 = performance.now();
    (function grow() { var k = Math.min(1, (performance.now() - t0) / 1800); st.intro = k; st.pre = 0; if (k < 1) requestAnimationFrame(grow); })();
  }, 1200);

  start();
  requestAnimationFrame(function () { canvas.classList.add('is-ready'); });
})();
