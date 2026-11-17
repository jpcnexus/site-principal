# NEXUS JPC — Kit Oficial da Marca

Identidade visual baseada nas duas imagens de referência enviadas em 17/11/2026.

## Arquivos principais
- `nexus-jpc-master-editavel.svg`: SVG vetorial original, com grupos e identificadores para edição.
- `nexus-jpc-logo-principal.svg/png/jpg`: marca horizontal; SVG e PNG com transparência; JPG com fundo #0B0F14.
- `nexus-jpc-logo-transparente.svg/png`: mesma marca principal, exportada com fundo transparente.
- `nexus-jpc-logo-branco.svg/png`: variante totalmente branca para fundos escuros.
- `nexus-jpc-logo-fundo-claro.svg/png/jpg`: variante com textos escuros sobre fundo claro (SVG/PNG transparentes, JPG branco).
- `nexus-jpc-icone.svg/png`: ícone isolado, fundo transparente.
- `nexus-jpc-favicon.svg/png`: ícone em layout quadrado para sites e aplicativos.
- `nexus-jpc-logo-monocromatica.svg` e `nexus-jpc-icone-branco.svg/png`: variantes extras.

## Identidade
- Fundo primário: `#0B0F14`; grafite: `#151B23`.
- Azul elétrico: `#3B82F6`; ciano premium: `#22D3EE`.
- Branco gelo: `#F8FAFC`; cinza claro: `#CBD5E1`; cinza ardósia: `#64748B`.
- Títulos recomendados no site: Space Grotesk Bold; textos: Inter.
- **Observação tipográfica:** como Space Grotesk não estava disponível no ambiente de produção, o wordmark do logo foi desenhado com Inter Display ExtraBold, visualmente próxima da referência. Todas as letras finais foram convertidas em contornos SVG, sem dependência de fontes instaladas. Para reproduzir *exatamente* Space Grotesk será preciso redesenhar a tipografia com a fonte licenciada correta.
- Grafia correta: **NEXUS JPC** e **SOLUÇÕES DIGITAIS**.
- Slogan: **Conectando ideias a soluções digitais.** (não incorporado diretamente ao logo, para preservar legibilidade).

## Notas técnicas
- O SVG usa caminhos vetoriais e gradientes SVG nativos, sem imagens raster embutidas.
- O PNG foi renderizado a partir do SVG, a 3.000px de largura nas variações horizontais.
- O JPG foi renderizado a partir do SVG e possui fundo sólido.
- SVG e PNG não incorporam o mockup de identidade, nem a imagem da foto do site.
- O símbolo é uma reconstrução vetorial fiel ao conceito aprovado, **não uma extração pixel a pixel** da arte de referência. Pequenas diferenças de geometria, degradê e brilho são esperadas.

## Publicação
Copie o conteúdo desta pasta para `public/assets/brand/nexus-jpc/` no seu projeto.

No HTML: `<img src="/assets/brand/nexus-jpc/nexus-jpc-logo-principal.svg" alt="Nexus JPC — Soluções Digitais">`

No favicon do site: `<link rel="icon" type="image/svg+xml" href="/assets/brand/nexus-jpc/nexus-jpc-favicon.svg">`
