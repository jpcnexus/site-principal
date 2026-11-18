# Design System — Nexus JPC

> Carta 2 · derivado do kit oficial da marca e das 3 palavras: **tecnológico · sofisticado · confiável**

## Paleta (do kit oficial)
```css
:root {
  --bg: #0B0F14;        /* Preto Profundo: fundo das cenas principais */
  --bg-alt: #0A1626;    /* azul profundo: cenas de "virada" (Conexão, Como funciona); entra por troca suave */
  --surface: #151B23;   /* Grafite: cartas, painéis, formulário */
  --text: #F8FAFC;      /* Branco Gelo: títulos */
  --text-muted: #CBD5E1;/* Cinza Claro: texto corrido */
  --text-dim: #94A3B8;  /* Ardósia clareada: legendas (contraste AA) */
  --primary: #3B82F6;   /* Azul Elétrico */
  --accent: #22D3EE;    /* Ciano Premium: brilho, destaques, foco */
  --cta: linear-gradient(135deg, #3B82F6, #22D3EE); /* só nos botões principais */
}
```
Regra: o gradiente aparece **só** em CTA, no destaque do título e nos pontos do N. Todo o resto é preto, grafite e branco, e é isso que deixa o visual sofisticado.

## Tipografia
- **Títulos:** Space Grotesk 600/700 (grotesca geométrica = tecnologia). Hero com `clamp(2.6rem, 6vw, 5.4rem)` e entrelinha 1.02.
- **Texto:** Inter 400/500, mínimo de 16px no celular.
- **Rótulos:** Space Grotesk 600 em caixa alta, com espaçamento de 0.2em.

## Espaço e grid
- Escala: 4 · 8 · 16 · 24 · 40 · 64 · 104 · 168 px.
- Largura máxima de 1280px; 12 colunas no desktop e 4 no celular; margem lateral de 16px (celular) e 32px (desktop).
- Cenas respiram: no desktop, 104–168px entre elas.

## Formas e superfícies
- Raio de 12–20px (cartas e botões), como pede o PRD.
- Bordas finas `rgba(148,163,184,.16)`, sem sombras pesadas. O brilho ciano fica só em foco e em hover.
- Fundo: malha de pontos (a onda) + grade geométrica discreta, sem "glassmorphism" em todo lugar.

## Imagem
- Somente imagens reais: logo oficial (SVG), capturas reais dos projetos e banner oficial.
- As telas dos projetos aparecem em moldura de navegador ou de celular, com canto superior e sombra profunda.

## Movimento
```css
--ease-out: cubic-bezier(.16, 1, .3, 1);   /* entradas (equivale a power4.out) */
--ease-scene: cubic-bezier(.76, 0, .24, 1); /* transições de cena (expo.inOut) */
--dur-enter: .9s;   /* entradas */
--dur-micro: .3s;   /* hover, foco, toque */
--stagger: .1s;     /* atraso entre itens */
```
- Entradas: o título sobe linha a linha de dentro de uma máscara; o texto vem em fade, subindo 24px.
- Direção alterna por cena (baixo → cima, esquerda → direita) para criar ritmo.
- Rolagem suave (Lenis) em todo o site; todas as animações têm versão estática com `prefers-reduced-motion`.
