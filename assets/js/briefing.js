/* Briefing em etapas: validação, rascunho no aparelho, revisão e envio pelo WhatsApp.
   Nada é enviado para servidor: a mensagem é montada no navegador. */
(function () {
  'use strict';
  var form = document.querySelector('[data-briefing]');
  if (!form) return;

  var slug = form.getAttribute('data-briefing');
  var KEY = 'nx-bf-' + slug;
  var steps = [].slice.call(form.querySelectorAll('[data-step]'));
  var last = steps.length - 1; // a última é a revisão
  var cur = 0;
  var $ = function (s) { return form.querySelector(s); };
  var prev = $('[data-prev]'), next = $('[data-next]'), send = $('[data-send]'), copy = $('[data-copy]');
  var bar = $('[data-bar]'), count = $('[data-count]'), saved = $('[data-saved]');
  var dots = [].slice.call(form.querySelectorAll('[data-dot]'));

  function store(fn) { try { return fn(window.localStorage); } catch (e) { return null; } }

  // ---------- Leitura das respostas ----------
  function fieldsOf(step) { return [].slice.call(step.querySelectorAll('[data-field]')); }
  function labelOf(f) {
    var el = f.querySelector('legend, label');
    return el ? el.childNodes[0].textContent.trim() : '';
  }
  function valueOf(f) {
    var name = f.getAttribute('data-field');
    var type = f.getAttribute('data-type');
    if (type === 'one' || type === 'many') {
      var out = [];
      [].forEach.call(f.querySelectorAll('input[name="' + name + '"]:checked'), function (i) {
        if (i.value === '__outro') {
          var o = f.querySelector('.bf-outro');
          out.push(o && o.value.trim() ? 'Outro: ' + o.value.trim() : 'Outro');
        } else out.push(i.value);
      });
      return out.join(', ');
    }
    var c = f.querySelector('input, textarea');
    return c ? c.value.trim() : '';
  }

  // ---------- Validação ----------
  function errorFor(f) {
    var v = valueOf(f);
    if (f.getAttribute('data-field') === 'whatsapp' && v) {
      var d = v.replace(/\D/g, '');
      if (d.length < 10 || d.length > 11) return 'Informe um WhatsApp válido com DDD.';
    }
    if (f.hasAttribute('data-req') && !v) {
      var t = f.getAttribute('data-type');
      return t === 'one' ? 'Escolha uma opção.' : t === 'many' ? 'Escolha pelo menos uma opção.' : 'Este campo é obrigatório.';
    }
    return '';
  }
  function showError(f, msg) {
    f.classList.toggle('has-error', !!msg);
    var e = f.querySelector('[data-error-for]');
    if (e) e.textContent = msg;
  }
  function validate(step) {
    var first = null;
    fieldsOf(step).forEach(function (f) {
      var msg = errorFor(f);
      showError(f, msg);
      if (msg && !first) first = f;
    });
    if (first) {
      var c = first.querySelector('input, textarea');
      first.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (c) setTimeout(function () { c.focus({ preventScroll: true }); }, 250);
      return false;
    }
    return true;
  }

  // ---------- Navegação ----------
  function go(i, focus) {
    steps[cur].hidden = true;
    cur = i;
    steps[cur].hidden = false;
    var review = cur === last;
    prev.hidden = cur === 0;
    next.hidden = review;
    send.hidden = !review;
    copy.hidden = !review;
    bar.style.width = (cur / last) * 100 + '%';
    count.textContent = review ? 'Revisão final' : 'Etapa ' + (cur + 1) + ' de ' + last;
    next.innerHTML = next.innerHTML.replace(/^[^<]*/, cur === last - 1 ? 'Revisar respostas ' : 'Continuar ');
    dots.forEach(function (d, k) { d.classList.toggle('is-done', k < cur); d.classList.toggle('is-cur', k === cur); });
    if (review) buildReview();
    if (focus !== false) {
      var top = form.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: top, behavior: 'smooth' });
      var t = steps[cur].querySelector('.bf-title');
      if (t) setTimeout(function () { t.focus({ preventScroll: true }); }, 300);
    }
    store(function (s) { var d = JSON.parse(s.getItem(KEY) || '{}'); d._step = cur; s.setItem(KEY, JSON.stringify(d)); });
  }
  next.addEventListener('click', function () { if (validate(steps[cur])) go(cur + 1); });
  prev.addEventListener('click', function () { go(cur - 1); });
  form.addEventListener('submit', function (e) { e.preventDefault(); });
  form.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT') { e.preventDefault(); if (!next.hidden) next.click(); }
  });

  // ---------- "Outro" e máscara de telefone ----------
  function syncOutro(f) {
    var o = f.querySelector('.bf-outro');
    if (!o) return;
    var on = !!f.querySelector('input[value="__outro"]:checked');
    o.hidden = !on;
    return on;
  }
  form.addEventListener('change', function (e) {
    var f = e.target.closest('[data-field]');
    if (!f) return;
    if (syncOutro(f) && e.target.value === '__outro') f.querySelector('.bf-outro').focus();
    if (f.classList.contains('has-error')) showError(f, errorFor(f));
  });
  var phone = form.querySelector('input[name="whatsapp"]');
  if (phone) phone.addEventListener('input', function () {
    var d = phone.value.replace(/\D/g, '').slice(0, 11);
    phone.value = d.length > 6 ? '(' + d.slice(0, 2) + ') ' + d.slice(2, d.length - 4) + '-' + d.slice(-4) : d.length > 2 ? '(' + d.slice(0, 2) + ') ' + d.slice(2) : d;
  });

  // ---------- Rascunho salvo no aparelho ----------
  var tSave;
  function save() {
    var data = { _step: cur };
    [].forEach.call(form.elements, function (el) {
      if (!el.name) return;
      if (el.type === 'radio' || el.type === 'checkbox') { if (el.checked) (data[el.name] = data[el.name] || []).push(el.value); }
      else if (el.value) data[el.name] = el.value;
    });
    store(function (s) { s.setItem(KEY, JSON.stringify(data)); });
    saved.textContent = 'Rascunho salvo';
    clearTimeout(tSave); tSave = setTimeout(function () { saved.textContent = ''; }, 1800);
  }
  form.addEventListener('input', function (e) {
    var f = e.target.closest('[data-field]');
    if (f && f.classList.contains('has-error')) showError(f, errorFor(f));
    clearTimeout(form._t); form._t = setTimeout(save, 400);
  });
  form.addEventListener('change', save);
  (function restore() {
    var data = store(function (s) { return JSON.parse(s.getItem(KEY) || 'null'); });
    if (!data) return;
    var any = false;
    [].forEach.call(form.elements, function (el) {
      if (!el.name || !(el.name in data)) return;
      var v = data[el.name];
      if (el.type === 'radio' || el.type === 'checkbox') { if (v.indexOf(el.value) > -1) { el.checked = true; any = true; } }
      else { el.value = v; any = true; }
    });
    fieldsOf(form).forEach(syncOutro);
    if (any) {
      saved.textContent = 'Continuando de onde você parou';
      setTimeout(function () { saved.textContent = ''; }, 3000);
      if (data._step > 0 && data._step <= last) go(Math.min(data._step, last), false);
    }
  })();

  // ---------- Revisão e mensagem ----------
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function answers() {
    return steps.slice(0, last).map(function (st, i) {
      return {
        i: i,
        titulo: st.querySelector('.bf-title').textContent.trim(),
        itens: fieldsOf(st).map(function (f) { return { label: labelOf(f), value: valueOf(f) }; }).filter(function (x) { return x.value; }),
      };
    });
  }
  function message() {
    var lines = ['*Briefing: ' + form.getAttribute('data-nome') + '*', '_Enviado pelo site nexusjpc.com.br_'];
    answers().forEach(function (g) {
      if (!g.itens.length) return;
      lines.push('', '*' + (g.i + 1) + '. ' + g.titulo + '*');
      g.itens.forEach(function (x) { lines.push('- ' + x.label + (/[?:]$/.test(x.label) ? ' ' : ': ') + x.value); });
    });
    return lines.join('\n');
  }
  function buildReview() {
    var html = answers().map(function (g) {
      return '<div class="bf-sum-group"><div class="bf-sum-head"><h3>' + (g.i + 1) + '. ' + esc(g.titulo) + '</h3>' +
        '<button type="button" class="bf-edit" data-goto="' + g.i + '">Editar</button></div>' +
        (g.itens.length ? '<dl>' + g.itens.map(function (x) { return '<div><dt>' + esc(x.label) + '</dt><dd>' + esc(x.value) + '</dd></div>'; }).join('') + '</dl>' : '<p class="bf-empty">Nada preenchido nesta etapa.</p>') +
        '</div>';
    }).join('');
    $('[data-summary]').innerHTML = html;
    var url = 'https://wa.me/' + form.getAttribute('data-wa') + '?text=' + encodeURIComponent(message());
    send.href = url;
    $('[data-send-fallback]').href = url;
  }
  form.addEventListener('click', function (e) {
    var b = e.target.closest('[data-goto]');
    if (b) go(+b.getAttribute('data-goto'));
  });
  send.addEventListener('click', function () { $('[data-done]').hidden = false; });
  copy.addEventListener('click', function () {
    var txt = message();
    function ok() { copy.textContent = 'Copiado!'; setTimeout(function () { copy.textContent = 'Copiar respostas'; }, 2000); }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(txt).then(ok, fallback); else fallback();
    function fallback() {
      var t = document.createElement('textarea'); t.value = txt; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
      document.body.appendChild(t); t.select(); try { document.execCommand('copy'); ok(); } catch (e) {} document.body.removeChild(t);
    }
  });

  go(cur, false);
})();
