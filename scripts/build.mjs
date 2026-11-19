#!/usr/bin/env node
// Gera as páginas estáticas do site a partir de src/.
// Uso: node scripts/build.mjs
// Saída: index.html, servicos/, projetos/, sobre/, contato/, briefing/, 404.html, sitemap.xml, robots.txt
// (na raiz do repositório, prontos para a Hostinger — sem dependências).
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from '../src/config.mjs';
import { projects } from '../src/data/projects.mjs';
import * as P from '../src/pages.mjs';
import { briefingPage, briefingIndex } from '../src/briefing.mjs';
import { briefings } from '../src/data/briefings.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const routes = [];

function out(route, html, { sitemap = true } = {}) {
  const file = route.endsWith('.html') ? join(root, route) : join(root, route, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  if (!route.endsWith('.html') && sitemap) routes.push(route);
  console.log('  ✓', route);
}

// Remove pastas de projetos desativados que possam ter sido geradas antes.
for (const p of projects.filter((x) => !x.ativo)) {
  const dir = join(root, 'projetos', p.slug);
  if (existsSync(dir)) rmSync(dir, { recursive: true });
}

console.log('Gerando páginas…');
out('/', P.home());
out('/servicos/', P.servicesIndex());
for (const s of P.services) out(`/servicos/${s.slug}/`, P.serviceDetail(s));
out('/projetos/', P.projectsIndex());
for (const p of P.activeProjects) out(`/projetos/${p.slug}/`, P.projectDetail(p));
out('/sobre/', P.about());
out('/contato/', P.contact());
out('/404.html', P.notFound());
// Briefings: links para enviar aos clientes (noindex, fora do sitemap e do menu)
out('/briefing/', briefingIndex(), { sitemap: false });
for (const b of briefings) out(`/briefing/${b.slug}/`, briefingPage(b), { sitemap: false });

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url><loc>${site.url}${r}</loc><lastmod>${today}</lastmod><priority>${r === '/' ? '1.0' : r.split('/').length > 3 ? '0.7' : '0.8'}</priority></url>`
  )
  .join('\n')}
</urlset>
`;
writeFileSync(join(root, 'sitemap.xml'), sitemap);
writeFileSync(join(root, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /src/\nDisallow: /scripts/\nDisallow: /projeto/\n\nSitemap: ${site.url}/sitemap.xml\n`);
console.log(`  ✓ sitemap.xml (${routes.length} URLs)\n  ✓ robots.txt\nPronto.`);
