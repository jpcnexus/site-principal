# site-principal

Site institucional oficial da **Nexus JPC — Soluções Digitais** (`https://nexusjpc.com.br`).

Site **multipáginas estático** (HTML, CSS e JavaScript puros, sem dependências). Cada rota é uma pasta com seu próprio `index.html`, então qualquer URL abre direto no navegador e atualizar a página nunca gera 404.

## Rotas

| URL | Página |
| --- | --- |
| `/` | Início (vitrine) |
| `/servicos/` | Serviços |
| `/servicos/sites/` | Sites Institucionais |
| `/servicos/landing-pages/` | Landing Pages |
| `/servicos/solucoes-digitais/` | Soluções Digitais |
| `/servicos/automacoes/` | Sistemas e Automações |
| `/projetos/` | Portfólio (filtros + busca) |
| `/projetos/calma72/` | Case Calma72 |
| `/projetos/ceia/` | Case Ceia no Seu Orçamento |
| `/projetos/bilhar-dourado/` | Case Bilhar Dourado |
| `/sobre/` | Sobre a Nexus JPC |
| `/contato/` | Contato e orçamento (formulário → WhatsApp) |
| `/404.html` | Página de erro personalizada |

QR Turismo e RABICA estão cadastrados, mas **desativados** (`ativo: false`) até haver imagens reais e status definido.

## Estrutura

```
src/
  config.mjs           ← WhatsApp, URL do site, redes sociais, e-mail
  data/projects.mjs    ← portfólio (textos, status, imagens, tecnologias)
  data/services.mjs    ← serviços (textos, FAQ, funcionalidades)
  layout.mjs           ← <head>, header, footer, breadcrumbs, componentes
  pages.mjs            ← conteúdo de cada página
scripts/build.mjs      ← gera os HTML a partir de src/
assets/
  brand/nexus-jpc/     ← kit oficial da marca (não modificar)
  projects/<slug>/     ← capturas reais dos projetos (WebP)
  og/                  ← imagem de compartilhamento (Open Graph)
  css/site.css         ← estilos (tokens da identidade no :root)
  js/site.js           ← menu, animações, filtros, galeria, formulário
index.html, servicos/, projetos/, sobre/, contato/, 404.html   ← páginas geradas
sitemap.xml, robots.txt, .htaccess
```

## Como editar

1. Altere os arquivos em `src/` (textos, projetos, serviços, número do WhatsApp…).
2. Gere as páginas (precisa só do Node.js 18+, sem `npm install`):
   ```bash
   node scripts/build.mjs
   ```
3. Visualize localmente:
   ```bash
   python3 -m http.server 4173
   ```
   e abra `http://localhost:4173`.

Os HTML gerados ficam versionados no repositório, então a Hostinger serve os arquivos como estão, sem etapa de build no servidor.

### Adicionar um projeto ao portfólio

1. Crie a pasta `assets/projects/<slug>/` com `capa.webp`, `capa-720.webp`, `galeria-1..3.webp` e `mobile.webp` (capturas reais).
2. Adicione (ou ative) o item em `src/data/projects.mjs`.
3. Rode `node scripts/build.mjs`. A página, o card e o sitemap são criados automaticamente.

### WhatsApp

O número fica centralizado em `src/config.mjs` (`whatsapp.number`). Todos os botões e o formulário usam esse valor. O formulário **não envia nem armazena dados**: ele monta a mensagem no navegador, mostra uma revisão e só abre o WhatsApp quando o visitante confirma.

## Publicação na Hostinger

> Nada foi publicado. O site atual continua no ar até você aprovar.

**Opção A: Git (recomendado)**
1. No hPanel: *Sites → nexusjpc.com.br → Avançado → Git*.
2. Repositório `jpcnexus/site-principal`, branch `main` (depois de fazer o merge desta branch), diretório de instalação vazio (`public_html`).
3. Clique em *Implantar*. Ative o *Auto Deploy* se quiser publicar a cada push.

**Opção B: Gerenciador de arquivos / FTP**
Envie para `public_html/` todo o conteúdo do repositório, **exceto** `src/`, `scripts/`, `.git/` e `README.md` (o `.htaccess` bloqueia esses caminhos de qualquer forma).

**Depois de publicar**
- Confirme que o SSL está ativo e descomente o bloco de redirecionamento HTTPS no `.htaccess`.
- Teste algumas URLs diretas (ex.: `/projetos/ceia/`) e uma inexistente (deve abrir a 404 personalizada).
- Envie `https://nexusjpc.com.br/sitemap.xml` no Google Search Console.

## Pendências

- Perfis sociais e e-mail comercial: quando existirem, preencha `social` e `email` em `src/config.mjs`.
- QR Turismo e RABICA: enviar imagens reais (mascote roxa oficial da RABICA) e ativar.
- Tecnologias dos cases foram identificadas pelo código publicado de cada site; confirme se quiser detalhar mais.
