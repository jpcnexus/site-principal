# Roteiro de cenas — página inicial (versão aprovada, v3)

> Carta 2 · aprovado em 18/11. Implementado em `src/home.mjs`, `assets/css/home.css`, `assets/js/home.js` e `assets/js/waves.js`.
> Simulação: `projeto/wireframe.html` (gerada por `projeto/montar-simulacao.py`).

| # | Cena | O que acontece | Efeitos |
|---|---|---|---|
| 0 | Abertura (1ª visita da sessão) | Contador 000→100 enquanto os pontos da onda montam o N oficial no centro; o N voa para o topo e o título entra | canvas + GSAP |
| 1 | Hero | Título linha a linha; palavra viva troca sozinha (presença digital / landing page / solução digital / automação / marca online) com letras embaralhando; N 3D gira com o mouse, e os pontos se afastam do cursor; ao rolar, o N volta a ser onda | canvas, GSAP |
| 2 | Faixa tipográfica | SITES · LANDING PAGES · … em letras gigantes, duas linhas em sentidos opostos com a rolagem; cada palavra leva ao serviço | ScrollTrigger |
| 3 | Bom no balcão, invisível no celular | Cena presa: 3 notificações de cliente perdido chegam, são riscadas, voam; a resposta entra | ScrollTrigger (pin + scrub) |
| 4 | Assista um site nascer | Cena presa: rascunho → tipografia → cores → "no ar", com as 4 etapas acendendo e 50%/50%; o visitante digita o nome do negócio e escolhe a cor, e o site vira dele; o CTA final usa o nome | ScrollTrigger, JS |
| 5 | Qual é o seu caso? | 4 cartas em leque, inclinam em 3D com o mouse e viram ao toque, revelando o serviço indicado | CSS 3D, JS |
| 6 | Projetos reais | Galeria horizontal presa; telas reais em perspectiva endireitam no centro; o fundo assume a cor de cada projeto | ScrollTrigger (containerAnimation) |
| 7 | Perguntas | Duas colunas, título fixo, respostas em sanfona | GSAP |
| 8 | Chamada final | O N volta a se formar atrás do título; CTA personalizado | canvas |

Em todas as páginas: onda de pontos no fundo, luz que segue o mouse, grão de filme, cursor vivo e botões magnéticos (computador), rolagem suave e botão de orçamento fixo no celular.
Movimento reduzido: sem abertura, sem cenas presas, tudo visível e estático.
