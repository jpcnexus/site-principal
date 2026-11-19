#!/usr/bin/env node
// Gera uma cópia do site com caminhos relativos (preview/site/...), para visualização
// fora do domínio (ex.: link de prévia). Não altera os arquivos publicados.
// Uso: node scripts/preview.mjs <pasta-de-saída>
import { readdirSync, statSync, mkdirSync, readFileSync, writeFileSync, copyFileSync, rmSync } from 'node:fs';
import { join, dirname, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = process.argv[2] || join(root, 'preview');
const site = join(out, 'site');
rmSync(out, { recursive: true, force: true });

const pages = ['index.html', '404.html', 'servicos', 'projetos', 'sobre', 'contato', 'briefing'];
const skip = new Set(['nexus-jpc-master-editavel.svg', 'nexus-jpc-logo-principal.jpg', 'nexus-jpc-logo-fundo-claro.jpg', 'nexus-jpc-logo-fundo-claro.png', 'nexus-jpc-logo-transparente.png', 'nexus-jpc-logo-principal.png', 'nexus-jpc-logo-branco.png', 'nexus-jpc-icone.png', 'nexus-jpc-icone-branco.png', 'nexus-jpc-app-512.png', 'nexus-jpc-banner.webp', 'nexus-jpc-perfil.webp', 'LEIA-ME.md']);

function walk(dir, fn) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, fn); else fn(p);
  }
}
function copy(src) {
  const rel = relative(root, src);
  const dst = join(site, rel);
  mkdirSync(dirname(dst), { recursive: true });
  if (extname(src) === '.html') {
    const depth = rel.split('/').length - 1;
    const up = depth ? '../'.repeat(depth) : './';
    let html = readFileSync(src, 'utf8');
    html = html.replace(/(href|src)="\/(?!\/)([^"]*)"/g, (m, attr, path) => {
      let [p, q] = path.split(/(?=[?#])/);
      if (p === '' || p.endsWith('/')) p += 'index.html';
      return `${attr}="${up}${p}${q || ''}"`;
    });
    writeFileSync(dst, html);
  } else if (rel === 'assets/js/home.js') {
    writeFileSync(dst, readFileSync(src, 'utf8').replace(/'\/contato\/\?empresa=/g, "'contato/index.html#").replace(/'\/contato\/'/g, "'contato/index.html'"));
  } else {
    copyFileSync(src, dst);
  }
}
for (const p of pages) {
  const abs = join(root, p);
  statSync(abs).isDirectory() ? walk(abs, copy) : copy(abs);
}
walk(join(root, 'assets'), (p) => { if (!skip.has(p.split('/').pop()) && !p.endsWith('.txt')) copy(p); });
copy(join(root, 'site.webmanifest'));
console.log('prévia gerada em', out);
