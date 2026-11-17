// Dados centrais do portfólio.
// - `ativo: false` mantém o projeto fora do site (sem página, card ou sitemap).
// - Imagens ficam em /assets/projects/<slug>/.
// - Não inclua resultados, métricas ou depoimentos que não sejam reais e autorizados.

export const categories = [
  { id: 'todos', label: 'Todos' },
  { id: 'landing', label: 'Landing Pages' },
  { id: 'sites', label: 'Sites' },
  { id: 'solucoes', label: 'Soluções Digitais' },
  { id: 'identidade', label: 'Identidade Visual' },
  { id: 'dev', label: 'Em Desenvolvimento' },
];

export const projects = [
  {
    slug: 'calma72',
    ativo: true,
    destaque: true,
    nome: 'Calma72',
    categoria: 'Landing Page',
    tags: ['landing', 'solucoes'],
    tipo: 'Projeto autoral',
    status: { label: 'Publicado', tone: 'live' },
    url: 'https://calma72.nexusjpc.com.br',
    resumo:
      'Página de apresentação e venda de um produto digital, desenvolvida com foco em organização da oferta, experiência visual e conversão.',
    contexto:
      'O Calma72 é um produto digital autoral: um app no celular e um manual hora a hora que ajudam uma família a se preparar para as primeiras 72 horas de um imprevisto, como apagão, enchente ou falta de água. O assunto é sensível e pede uma comunicação calma, informativa e sem alarmismo.',
    objetivo:
      'Apresentar o produto com clareza, explicar por que a preparação para 72 horas é recomendada e conduzir o visitante até a decisão de compra sem exageros.',
    solucao:
      'Uma landing page longa e narrativa, que começa com uma cena reconhecível (“a luz caiu, e agora?”), passa por fontes oficiais, desfaz boatos e mostra o produto por dentro antes da oferta. A experiência é interativa: o visitante testa ferramentas reais do produto direto na página.',
    funcionalidades: [
      'Alternância de tema claro/escuro (“Acender a luz”)',
      'Cartas “Fato × Boato” que viram ao toque',
      'Calculadora de necessidade de água por pessoa, pets e duração',
      'Linha do tempo das 72 horas, hora a hora',
      'Prévia das páginas do manual',
      'Seção de perguntas frequentes e garantia',
      'Layout responsivo, pensado para celular',
    ],
    tecnologias: ['HTML', 'CSS', 'JavaScript'],
    imagens: [
      { src: 'capa.webp', alt: 'Topo da landing page Calma72, com a chamada “Se faltar luz e água por 3 dias, sua família sabe o que fazer?”' },
      { src: 'galeria-1.webp', alt: 'Seção da Calma72 que demonstra o app, com o botão SOS que prepara o aviso para a família' },
      { src: 'galeria-2.webp', alt: 'Seção “As 72 horas, hora a hora” da Calma72, com etapas em cards' },
      { src: 'galeria-3.webp', alt: 'Prévia do Manual do Plano da Casa na landing page Calma72' },
      { src: 'mobile.webp', alt: 'Calma72 aberta em tela de celular', mobile: true },
    ],
    servicos: ['landing-pages', 'solucoes-digitais'],
  },
  {
    slug: 'ceia',
    ativo: true,
    destaque: true,
    nome: 'Ceia no Seu Orçamento',
    nomeCurto: 'Ceia',
    categoria: 'Landing Page',
    tags: ['landing'],
    tipo: 'Projeto autoral',
    status: { label: 'Publicado', tone: 'live' },
    url: 'https://ceia.nexusjpc.com.br',
    resumo:
      'Página comercial criada para apresentar uma oferta digital sazonal, com foco em comunicação, hierarquia visual e chamadas para ação.',
    contexto:
      'Ceia no Seu Orçamento é um planejador digital de Natal, em PDF, com planos para 6, 10 ou 15 pessoas: o que servir, quanto comprar e o que adiantar antes do dia 24. Por ser uma oferta sazonal, a página precisa comunicar valor rapidamente e criar senso de oportunidade sem pressão artificial.',
    objetivo:
      'Mostrar, antes da compra, como o planejador funciona na prática e deixar claro o que a pessoa recebe.',
    solucao:
      'Uma landing page com identidade visual própria de Natal e conteúdo demonstrativo: o visitante escolhe o tamanho da ceia, edita os preços da lista de compras com os valores do seu mercado e acompanha um cronograma interativo do dia 24.',
    funcionalidades: [
      'Seletor de tamanho da ceia (6, 10 ou 15 pessoas)',
      'Lista de compras editável com total recalculado na hora',
      'Botões “Plano B” com trocas de ingredientes',
      'Cronograma interativo dos dias 22, 23 e 24',
      'Contagem regressiva de dias até a ceia',
      'Cartas “Mito × Verdade” e prévia das páginas do planejador',
      'Layout responsivo, pensado para celular',
    ],
    tecnologias: ['HTML', 'CSS', 'JavaScript'],
    imagens: [
      { src: 'capa.webp', alt: 'Topo da landing page Ceia no Seu Orçamento, com a chamada “A ceia que cabe no seu bolso”' },
      { src: 'galeria-1.webp', alt: 'Lista de compras editável da Ceia no Seu Orçamento, com total recalculado' },
      { src: 'galeria-2.webp', alt: 'Prévia das páginas do planejador Ceia no Seu Orçamento' },
      { src: 'galeria-3.webp', alt: 'Seção “Um planejador, três planos completos” com o resumo da oferta' },
      { src: 'mobile.webp', alt: 'Ceia no Seu Orçamento aberta em tela de celular', mobile: true },
    ],
    servicos: ['landing-pages'],
  },
  {
    slug: 'bilhar-dourado',
    ativo: true,
    destaque: true,
    nome: 'Bilhar Dourado',
    categoria: 'Site Comercial e Sistema',
    tags: ['sites', 'solucoes', 'dev'],
    tipo: 'Projeto de negócio',
    status: { label: 'Site publicado · Sistema em desenvolvimento', tone: 'mixed' },
    url: 'https://bilhardourado.nexusjpc.com.br',
    resumo:
      'Presença digital para aluguel de mesas de sinuca em Foz do Iguaçu e região. O site comercial está publicado; o sistema de gestão está em desenvolvimento.',
    contexto:
      'A Bilhar Dourado trabalha com aluguel, venda e reforma de mesas de sinuca em Foz do Iguaçu e região, além de parcerias com bares e estabelecimentos. O atendimento acontece principalmente pelo WhatsApp.',
    objetivo:
      'Apresentar os modelos de mesa, as condições de locação e os serviços de forma clara, levando o visitante direto para uma conversa no WhatsApp.',
    solucao:
      'Um site comercial com modelos desenhados em escala, condições de locação explicadas com transparência, galeria de fotos reais, passo a passo de contratação e perguntas frequentes. Em paralelo, está em desenvolvimento um sistema de gestão para cadastro de clientes, disponibilidade das mesas e organização operacional.',
    funcionalidades: [
      'Modelos de mesa com desenho em escala e medidas',
      'Chamadas para WhatsApp em todas as seções',
      'Seção de parceria para bares e estabelecimentos',
      'Galeria de fotos reais com ampliação',
      'Passo a passo de contratação e perguntas frequentes',
      'Layout responsivo, pensado para celular',
    ],
    planejado: [
      'Sistema de gestão: cadastro de clientes',
      'Controle de disponibilidade das mesas',
      'Organização operacional da locação',
    ],
    tecnologias: ['Vite', 'JavaScript', 'CSS'],
    imagens: [
      { src: 'capa.webp', alt: 'Topo do site Bilhar Dourado, com a chamada “Sua diversão merece uma mesa de qualidade” e foto de uma mesa de sinuca' },
      { src: 'galeria-1.webp', alt: 'Modelos de mesa da Bilhar Dourado desenhados em escala, com medidas' },
      { src: 'galeria-2.webp', alt: 'Passo a passo “Da conversa à primeira tacada” no site Bilhar Dourado' },
      { src: 'galeria-3.webp', alt: 'Galeria de fotos reais de mesas instaladas nos clientes da Bilhar Dourado' },
      { src: 'mobile.webp', alt: 'Site Bilhar Dourado aberto em tela de celular', mobile: true },
    ],
    servicos: ['sites', 'automacoes'],
  },

  // ---- Projetos guardados (ativar quando houver imagens reais e status definido) ----
  {
    slug: 'qr-turismo',
    ativo: false,
    nome: 'QR Turismo',
    categoria: 'Solução Digital',
    tags: ['solucoes', 'dev'],
    tipo: 'Projeto autoral',
    status: { label: 'Em desenvolvimento', tone: 'dev' },
    url: null,
    resumo:
      'Projeto de divulgação de ofertas turísticas por meio de QR Codes e páginas digitais, com possibilidade de acompanhar o desempenho dos links.',
    servicos: ['solucoes-digitais'],
  },
  {
    slug: 'rabica',
    ativo: false,
    nome: 'RABICA',
    categoria: 'Identidade Visual e Produto Digital',
    tags: ['identidade', 'dev'],
    tipo: 'Marca autoral',
    status: { label: 'Em desenvolvimento', tone: 'dev' },
    url: null,
    resumo:
      'Marca infantil autoral de desenhos e atividades criativas, com mascote exclusiva e universo visual próprio.',
    servicos: [],
  },
];

export const activeProjects = projects.filter((p) => p.ativo);
export const getProject = (slug) => activeProjects.find((p) => p.slug === slug);
export const shortName = (p) => p.nomeCurto || p.nome;
