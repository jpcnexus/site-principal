/* NEXUS JPC — ondas digitais de fundo
   Malha de pontos em perspectiva, animada em canvas 2D, que reage ao cursor e ao toque.
   Leve: sem bibliotecas, resolução limitada, menos pontos e 30 fps em aparelhos modestos,
   pausa com a aba oculta e quadro estático com prefers-reduced-motion. */
(function () {
  'use strict';
  var canvas = document.querySelector('[data-waves]');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = window.matchMedia('(pointer: coarse)').matches;
  var lowEnd = coarse || (navigator.hardwareConcurrency || 8) <= 4;
  var isHome = document.body.classList.contains('is-home');
  var intensity = isHome ? 1 : 0.7;
  var frameMs = lowEnd ? 1000 / 30 : 1000 / 60;

  var W = 0, H = 0, dpr = 1, cols = 0, rows = 0;
  var t = Math.random() * 100;
  var last = 0, raf = 0, running = false;
  var cost = 0, frames = 0, degraded = false;
  // cursor suavizado (fora da tela até o primeiro movimento)
  var mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: 0, tActive: 0 };
  var ripples = [];

  // paleta: azul elétrico (#3B82F6) → ciano premium (#22D3EE) → ciano claro
  var STOPS = [[59, 130, 246], [34, 211, 238], [165, 243, 252]];
  var TINTS = [];
  (function () {
    for (var i = 0; i < 10; i++) {
      var k = i / 9, a, b, f;
      if (k < 0.7) { a = STOPS[0]; b = STOPS[1]; f = k / 0.7; } else { a = STOPS[1]; b = STOPS[2]; f = (k - 0.7) / 0.3; }
      TINTS.push('rgb(' + Math.round(a[0] + (b[0] - a[0]) * f) + ',' + Math.round(a[1] + (b[1] - a[1]) * f) + ',' + Math.round(a[2] + (b[2] - a[2]) * f) + ')');
    }
  })();

  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, lowEnd ? 1.25 : 1.5);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var spacing = W < 640 ? 10 : W < 1100 ? 12 : 12;
    cols = Math.min(lowEnd ? 90 : 140, Math.max(32, Math.round(W / spacing)));
    rows = W < 640 ? 22 : lowEnd ? 26 : 34;
    if (reduce) draw();
  }

  // altura da onda (-1.35..1.35) para coluna u (0..1) e profundidade d (0..1)
  function wave(u, d) {
    return Math.sin(u * 6.2 + t * 0.55 + d * 2.4) * 0.6 +
           Math.sin(u * 13.0 - t * 0.85 + d * 4.1) * 0.22 +
           Math.sin(u * 2.3 + t * 0.32 - d * 1.3) * 0.53;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    var mx = mouse.x, my = mouse.y, act = mouse.active;
    var crestRow = Math.round(rows * 0.55), crest2Row = Math.round(rows * 0.86);
    var crest = [], crest2 = [];
    var now = performance.now();

    // brilho suave seguindo o cursor
    if (act > 0.02) {
      var g = ctx.createRadialGradient(mx, my, 0, mx, my, 220);
      g.addColorStop(0, 'rgba(34,211,238,' + (0.07 * act * intensity) + ')');
      g.addColorStop(1, 'rgba(34,211,238,0)');
      ctx.fillStyle = g; ctx.fillRect(mx - 220, my - 220, 440, 440);
    }

    for (var r = 0; r < rows; r++) {
      var d = r / (rows - 1);
      var s = 0.3 + 0.7 * Math.pow(d, 1.25);           // escala de perspectiva
      var base = H * (0.56 + 0.44 * Math.pow(d, 1.3));    // linha base da fileira
      var amp = H * 0.1 * s;
      var spread = W * (1.08 + 0.55 * d);
      var R = 150 + 90 * s;                               // raio de influência do cursor
      var rowAlpha = (0.14 + 0.8 * Math.pow(d, 1.4)) * intensity;
      var size = 0.8 + 1.5 * s;

      for (var c = 0; c < cols; c++) {
        var u = c / (cols - 1);
        var h = wave(u, d);
        var px = W / 2 + (u - 0.5) * spread;
        var py = base - h * amp;
        var lift = 0;

        if (act > 0.01) {
          var dx = px - mx, dy = (py - my) * 1.4;
          var dist2 = dx * dx + dy * dy;
          if (dist2 < R * R) {
            var f = 1 - Math.sqrt(dist2) / R;
            lift += f * f * 42 * s * act;
          }
        }
        for (var i = 0; i < ripples.length; i++) {
          var rp = ripples[i], age = (now - rp.t0) / 1000;
          var rad = age * 520, rdx = px - rp.x, rdy = (py - rp.y) * 1.4;
          var band = Math.abs(Math.sqrt(rdx * rdx + rdy * rdy) - rad);
          if (band < 46) lift += (1 - band / 46) * 26 * s * (1 - age / 1.6);
        }
        py -= lift;

        var cr = (h + 1.35) / 2.7;                         // 0 vale … 1 crista
        var tint = Math.min(9, Math.max(0, Math.round((u * 0.45 + cr * 0.45 + lift / 60) * 9)));
        ctx.globalAlpha = Math.min(1, rowAlpha * (0.45 + 0.75 * cr) + lift / 80);
        ctx.fillStyle = TINTS[tint];
        var sz = size + lift / 22;
        ctx.fillRect(px - sz / 2, py - sz / 2, sz, sz);
        if (r === crestRow) crest.push(px, py); else if (r === crest2Row) crest2.push(px, py);
      }
    }

    // linhas luminosas nas cristas
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'lighter';
    glowLine(crest, 1);
    glowLine(crest2, 0.55);
    ctx.globalCompositeOperation = 'source-over';
  }

  function glowLine(pts, k) {
    if (pts.length < 6) return;
    ctx.beginPath(); ctx.moveTo(pts[0], pts[1]);
    for (var i = 2; i < pts.length - 2; i += 2) {
      ctx.quadraticCurveTo(pts[i], pts[i + 1], (pts[i] + pts[i + 2]) / 2, (pts[i + 1] + pts[i + 3]) / 2);
    }
    ctx.lineTo(pts[pts.length - 2], pts[pts.length - 1]);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    var a = intensity * k;
    ctx.strokeStyle = 'rgba(34,211,238,' + (0.06 * a) + ')'; ctx.lineWidth = 16; ctx.stroke();
    ctx.strokeStyle = 'rgba(34,211,238,' + (0.16 * a) + ')'; ctx.lineWidth = 4; ctx.stroke();
    ctx.strokeStyle = 'rgba(165,243,252,' + (0.75 * a) + ')'; ctx.lineWidth = 1.3; ctx.stroke();
  }

  function tick(ts) {
    raf = requestAnimationFrame(tick);
    if (ts - last < frameMs) return;
    var dt = Math.min(64, ts - (last || ts)) / 1000;
    last = ts;
    t += dt;
    // suavização do cursor
    mouse.x += (mouse.tx - mouse.x) * 0.12;
    mouse.y += (mouse.ty - mouse.y) * 0.12;
    mouse.active += (mouse.tActive - mouse.active) * 0.06;
    var now = performance.now();
    ripples = ripples.filter(function (r) { return now - r.t0 < 1600; });
    var t0 = performance.now();
    draw();
    // qualidade adaptativa: se o desenho ficar caro neste aparelho, reduz fps e densidade
    cost = cost * 0.9 + (performance.now() - t0) * 0.1;
    if (++frames > 40 && !degraded && cost > 8) {
      degraded = true; frameMs = 1000 / 30; lowEnd = true; resize();
    }
  }

  function start() { if (!running && !reduce) { running = true; last = 0; raf = requestAnimationFrame(tick); } }
  function stop() { running = false; cancelAnimationFrame(raf); }

  var rt;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(resize, 150); });
  resize();

  if (reduce) { draw(); canvas.classList.add('is-ready'); return; }

  window.addEventListener('pointermove', function (e) {
    if (mouse.x < -999) { mouse.x = e.clientX; mouse.y = e.clientY; }
    mouse.tx = e.clientX; mouse.ty = e.clientY; mouse.tActive = 1;
  }, { passive: true });
  document.addEventListener('pointerleave', function () { mouse.tActive = 0; });
  window.addEventListener('blur', function () { mouse.tActive = 0; });
  window.addEventListener('pointerup', function (e) { if (e.pointerType !== 'mouse') mouse.tActive = 0; }, { passive: true });
  window.addEventListener('pointerdown', function (e) {
    if (ripples.length > 2) ripples.shift();
    ripples.push({ x: e.clientX, y: e.clientY, t0: performance.now() });
  }, { passive: true });
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });

  start();
  requestAnimationFrame(function () { canvas.classList.add('is-ready'); });
})();
