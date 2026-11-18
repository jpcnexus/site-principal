# Roteiro de cenas — página inicial

> Carta 2 · o site rola como um vídeo. Protagonista: **os pontos formam o N**.
> Fundo fixo em todas as cenas: a onda de pontos (canvas). A cor de fundo troca suavemente entre `--bg` e `--bg-alt`.

```
CENA 1 — "A conexão nasce" (Hero) · fundo --bg
Entrada: a página abre com a onda de pontos; em ~1,8s, cerca de 700 pontos sobem da onda e se juntam
         formando o símbolo oficial do N (com os dois nós em ciano). Ao mesmo tempo, o título sobe linha a linha.
Durante: o N "respira" de leve; o mouse empurra os pontos do N e eles voltam ao lugar (no celular, o toque faz o mesmo).
Saída: ao rolar, o N se desfaz e os pontos descem de volta para a onda, enquanto o texto sobe e some.
Asset: símbolo oficial do N (nexus-jpc-icone.svg), usado para posicionar os pontos
Copy: "Sua empresa merece uma presença digital que impressiona." + subtítulo + 2 CTAs
Objetivo: impacto e confiança imediatos (tecnológico + sofisticado)

CENA 2 — "Bom no balcão, invisível no celular" · fundo --bg
Entrada: o título revela linha a linha.
Durante: as 3 dores aparecem uma a uma e cada uma é riscada por uma linha ciano; a frase de resposta entra no lugar.
Saída: a última linha ciano se estende e "puxa" a próxima cena.
Copy: copy.md › cena 2
Objetivo: identificação com a dor

CENA 3 — "Uma ideia. Uma solução. Conectadas." · fundo troca para --bg-alt
Entrada: o fundo escurece para azul profundo; as três frases do título entram uma por vez.
Durante: dois nós (como os do N) acendem nas pontas e uma linha os liga conforme a rolagem.
Saída: a linha vira a borda superior das cartas da próxima cena.
Copy: copy.md › cena 3
Objetivo: mecanismo / diferencial

CENA 4 — "Qual é o seu caso?" · fundo --bg-alt → --bg
Entrada: 4 cartas viradas entram em leque, da esquerda para a direita.
Durante: tocar ou clicar vira a carta (giro 3D) e revela o formato indicado + link para o serviço. Teclado: Enter/Espaço.
Saída: cartas descem em sequência.
Copy: copy.md › cena 4
Objetivo: responder "não sei o que preciso"

CENA 5 — "Projetos reais. Status transparente." · fundo --bg
Entrada: as telas reais entram com zoom de 1,15× para 1× e desfoque saindo.
Durante: leve parallax entre as telas e os textos.
Asset: capturas reais em assets/projects/<projeto>/capa-720.webp (já existem)
Copy: copy.md › cena 5
Objetivo: prova ("será que fica bom?")

CENA 6 — "Você acompanha cada etapa." · fundo troca para --bg-alt
Entrada: título linha a linha.
Durante: cena presa; as 4 etapas deslizam para o lado com a rolagem; uma linha liga os números e acende até a etapa atual.
         No celular: as etapas ficam empilhadas na vertical, com a linha acendendo ao rolar (sem prender a tela).
Saída: a tela solta e a linha segue até o fim da cena.
Copy: copy.md › cena 6
Objetivo: "medo de sumirem" (incluindo 50% + 50%)

CENA 7 — "As dúvidas, respondidas" · fundo --bg
Entrada: perguntas entram em sequência (stagger).
Durante: abrir/fechar com animação de altura.
Copy: copy.md › cena 7

CENA 8 — "Vamos tirar seu projeto do papel?" · fundo --bg
Entrada: a onda sobe e ganha brilho atrás do banner final; título linha a linha.
Durante: botão principal em destaque.
Copy: copy.md › cena 8
Objetivo: conversão
```

## Lista de assets

| Arquivo | O que é | Status | Cena |
|---|---|---|---|
| assets/brand/nexus-jpc/nexus-jpc-icone.svg | Símbolo oficial do N | ✅ já existe | 1 |
| assets/brand/nexus-jpc/nexus-jpc-logo-principal.svg | Logo horizontal oficial | ✅ já existe | header/rodapé |
| assets/projects/calma72/capa-720.webp | Captura real Calma72 | ✅ já existe | 5 |
| assets/projects/ceia/capa-720.webp | Captura real Ceia | ✅ já existe | 5 |
| assets/projects/bilhar-dourado/capa-720.webp | Captura real Bilhar Dourado | ✅ já existe | 5 |
| assets/og/nexus-jpc-og.jpg | Banner oficial (compartilhamento) | ✅ já existe | SEO |

Nenhum asset novo é necessário: o protagonista é feito com o próprio logo oficial e com pontos gerados em código.

## Bibliotecas previstas (Carta 3)
- **GSAP + ScrollTrigger:** cenas presas, processo na horizontal, troca de cor e entradas.
- **SplitText (GSAP):** títulos linha a linha.
- **Lenis:** rolagem suave.
- **Canvas 2D (sem biblioteca):** onda de pontos e N de partículas, leve e com qualidade adaptativa.
