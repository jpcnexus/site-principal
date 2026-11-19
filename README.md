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
| `/briefing/` | Briefings por serviço (links para enviar aos clientes; fora do Google e do menu) |
| `/briefing/site/`, `/landing-page/`, `/pagina-de-links/`, `/catalogo/`, `/sistema/` | Briefing de cada serviço |
| `/404.html` | Página de erro personalizada |

QR Turismo e RABICA estão cadastrados, mas **desativados** (`ativo: false`) até haver imagens reais e status definido.

## Estrutura

```
src/
  config.mjs           ← WhatsApp, URL do site, redes sociais, e-mail
  data/projects.mjs    ← portfólio (textos, status, imagens, tecnologias)
  data/services.mjs    ← serviços (textos, FAQ, funcionalidades)
  data/briefings.mjs   ← perguntas de cada briefing (respostas vão pelo WhatsApp)
  layout.mjs           ← <head>, header, footer, breadcrumbs, componentes
  pages.mjs            ← conteúdo de cada página
scripts/build.mjs      ← gera os HTML a partir de src/
assets/
  brand/nexus-jpc/     ← kit oficial da marca (não modificar)
  projects/<slug>/     ← capturas reais dos projetos (WebP)
  og/                  ← imagem de compartilhamento (Open Graph)
  css/site.css         ← estilos (tokens da identidade no :root)
  js/site.js           ← menu, animações, filtros, galeria, formulário
  js/waves.js          ← onda de pontos no fundo + N de partículas da página inicial (canvas)
  js/home.js           ← coreografia da página inicial (abertura, cenas, personalização)
  css/home.css         ← estilos exclusivos da página inicial
  vendor/              ← GSAP 3.13 (ScrollTrigger, SplitText) e Lenis 1.1, hospedados no próprio site
projeto/               ← método Carta Secreta: briefing, copy, design system, roteiro, simulação (não vai ao ar)
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

1. Crie a pasta `assets/projects/<slug>/` com `capa.webp`, `capa-720.webp`, `galeria-1..3.webp`, `mobile.webp` e `inteiro.webp` (captura da página inteira no celular, 300px de largura) — todas capturas reais.
2. Adicione (ou ative) o item em `src/data/projects.mjs`.
3. Rode `node scripts/build.mjs`. A página, o card e o sitemap são criados automaticamente.

### WhatsApp

O número fica centralizado em `src/config.mjs` (`whatsapp.number`). Todos os botões e o formulário usam esse valor. O formulário **não envia nem armazena dados**: ele monta a mensagem no navegador, mostra uma revisão e só abre o WhatsApp quando o visitante confirma.

## Publicação na Hostinger

> **Atenção:** os subdomínios (calma72, ceia, bilhardourado, rota360) ficam **dentro** de `public_html`.
> **Não use** "Implantar via Git" nem "Auto Deploy" do hPanel neste domínio: eles substituem a pasta inteira e apagam os subdomínios.
> Publique sempre **enviando os arquivos**, sem apagar nada que já está lá.

**O que enviar para `public_html/`** (substituindo os arquivos com o mesmo nome):

- `index.html`, `404.html`, `.htaccess`, `robots.txt`, `sitemap.xml`, `site.webmanifest`
- as pastas `assets/`, `servicos/`, `projetos/`, `sobre/`, `contato/`, `briefing/`

**Não enviar:** `src/`, `scripts/`, `projeto/`, `.git/`, `README.md`, `.gitignore`.
**Nunca apagar:** as pastas `calma72/`, `ceia/`, `bilhardourado/`, `rota360/`.

**Passo a passo pelo Gerenciador de Arquivos**
1. Gere as páginas com `node scripts/build.mjs`.
2. No computador, selecione só os itens da lista acima e compacte em um `.zip`.
   O `.htaccess` começa com ponto e pode estar oculto: ative "mostrar arquivos ocultos".
3. No hPanel, abra *Arquivos → Gerenciador de Arquivos* e entre em `public_html`.
4. Antes de tudo, baixe uma cópia do `index.html` atual (backup).
5. Envie o `.zip` para `public_html`, extraia ali mesmo (aceite substituir) e apague o `.zip`.
6. Teste no celular: a página inicial, uma página interna, um endereço inexistente (deve abrir a 404) e os subdomínios.

**Depois da primeira publicação** (feita em 19/11/2026)
- O HTTPS já funciona e o `http://` já redireciona para `https://`.
- Envie `https://nexusjpc.com.br/sitemap.xml` no Google Search Console.

## Pendências

- Perfis sociais e e-mail comercial: quando existirem, preencha `social` e `email` em `src/config.mjs`.
- QR Turismo e RABICA: enviar imagens reais (mascote roxa oficial da RABICA) e ativar.
- Tecnologias dos cases foram identificadas pelo código publicado de cada site; confirme se quiser detalhar mais.
