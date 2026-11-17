// Dados centrais dos serviços. Cada item gera /servicos/<slug>/.
// Sem preços, prazos ou promessas de resultado: esses dependem de cada projeto.

export const services = [
  {
    slug: 'sites',
    icon: 'monitor',
    titulo: 'Sites Institucionais',
    curto: 'Presença online profissional para sua marca.',
    descricao:
      'Sites modernos e responsivos para apresentar sua empresa, seus serviços e facilitar o contato com clientes.',
    seoTitle: 'Criação de Sites Institucionais',
    intro:
      'Um site institucional é o endereço oficial do seu negócio na internet. É onde o cliente confirma que você existe, entende o que você faz e encontra um caminho fácil para falar com você. Desenvolvemos sites rápidos, bonitos e organizados, com a cara da sua marca.',
    paraQuem: [
      'Empresas e prestadores de serviço que ainda dependem só das redes sociais',
      'Negócios locais que querem ser encontrados e passar mais confiança',
      'Marcas que têm um site antigo, lento ou difícil de atualizar',
      'Profissionais que precisam apresentar portfólio, serviços e contato',
    ],
    problemas: [
      { t: 'Falta de credibilidade', d: 'Sem um site, o cliente tem menos referências para confiar no seu trabalho antes do primeiro contato.' },
      { t: 'Informação espalhada', d: 'Serviços, horários e contatos ficam perdidos entre posts e mensagens. O site reúne tudo em um só lugar.' },
      { t: 'Contato difícil', d: 'Botões claros de WhatsApp e caminhos simples levam o visitante direto para uma conversa.' },
    ],
    funcionalidades: [
      'Layout responsivo para celular, tablet e computador',
      'Páginas de apresentação, serviços, portfólio e contato',
      'Botões de WhatsApp e formulários de contato',
      'Estrutura de SEO: títulos, descrições, sitemap e dados para compartilhamento',
      'Otimização de imagens e carregamento',
      'Identidade visual alinhada à sua marca',
    ],
    exemplos: [
      'Site de empresa de serviços com página para cada serviço',
      'Site de comércio local com fotos, localização e WhatsApp',
      'Site de profissional liberal com portfólio e agendamento por mensagem',
    ],
    faq: [
      { q: 'Quanto custa um site institucional?', a: 'O valor depende da quantidade de páginas, dos recursos e do conteúdo. Conte o que você precisa e enviamos uma proposta personalizada.' },
      { q: 'O site funciona bem no celular?', a: 'Sim. Todos os projetos são desenvolvidos com abordagem mobile-first e testados em diferentes tamanhos de tela.' },
      { q: 'Preciso ter domínio e hospedagem?', a: 'Se você ainda não tiver, orientamos sobre a contratação e preparamos o projeto para publicação.' },
      { q: 'Eu preciso entregar os textos e as fotos?', a: 'O ideal é que o conteúdo venha de você, porque ninguém conhece seu negócio melhor. Ajudamos a organizar e a estruturar as informações.' },
    ],
  },
  {
    slug: 'landing-pages',
    icon: 'pointer',
    titulo: 'Landing Pages',
    curto: 'Páginas estratégicas focadas em conversão.',
    descricao:
      'Páginas desenvolvidas para apresentar ofertas, captar contatos e apoiar campanhas de vendas.',
    seoTitle: 'Criação de Landing Pages',
    intro:
      'Uma landing page tem um único objetivo: levar o visitante a uma ação, seja comprar, se cadastrar ou chamar no WhatsApp. Planejamos a narrativa, a hierarquia visual e as chamadas para ação para que a oferta seja entendida com clareza.',
    paraQuem: [
      'Quem vende produtos digitais, cursos ou serviços específicos',
      'Negócios que vão investir em anúncios e precisam de uma página de destino',
      'Lançamentos, ofertas sazonais e campanhas com prazo',
      'Empresas que querem captar contatos qualificados',
    ],
    problemas: [
      { t: 'Oferta confusa', d: 'Quando a página tenta falar de tudo, o visitante não entende o que está sendo oferecido. Organizamos a mensagem em uma sequência lógica.' },
      { t: 'Anúncio sem destino', d: 'Mandar tráfego pago para um perfil ou para uma página genérica desperdiça a atenção do visitante.' },
      { t: 'Pouca interação', d: 'Demonstrações, calculadoras e prévias ajudam o visitante a entender o valor do produto antes de decidir.' },
    ],
    funcionalidades: [
      'Estrutura de copy e seções pensadas para a decisão',
      'Chamadas para ação claras e repetidas no momento certo',
      'Elementos interativos de demonstração quando fizer sentido',
      'Integração com checkout, WhatsApp ou formulário',
      'Carregamento rápido e layout mobile-first',
      'Preparação para pixels e ferramentas de mensuração',
    ],
    exemplos: [
      'Página de venda de produto digital',
      'Página de captura para lista de espera ou material gratuito',
      'Página de campanha sazonal com prazo definido',
    ],
    faq: [
      { q: 'Qual a diferença entre landing page e site?', a: 'O site apresenta o negócio como um todo, com várias páginas. A landing page é focada em uma única oferta e em uma única ação.' },
      { q: 'Vocês integram com plataformas de pagamento?', a: 'Sim, a página pode direcionar para o checkout da plataforma que você já usa. A viabilidade de cada integração é avaliada no projeto.' },
      { q: 'A landing page garante vendas?', a: 'Nenhuma página garante resultado sozinha. Ela organiza a oferta e facilita a decisão, mas o resultado depende também do produto, do público e da divulgação.' },
    ],
  },
  {
    slug: 'solucoes-digitais',
    icon: 'qr',
    titulo: 'Soluções Digitais',
    curto: 'Links, catálogos, QR Codes e ferramentas sob medida.',
    descricao:
      'Páginas de links, catálogos, QR Codes e ferramentas digitais para facilitar a rotina do negócio.',
    seoTitle: 'Soluções Digitais para Negócios',
    intro:
      'Nem todo negócio precisa de um site completo para começar. Muitas vezes, uma página de links bem-feita, um catálogo digital ou um QR Code que leva ao lugar certo já resolve um problema real do dia a dia.',
    paraQuem: [
      'Negócios que divulgam muitos links nas redes sociais',
      'Comércios que querem um catálogo fácil de compartilhar',
      'Eventos, cardápios e materiais impressos que precisam de QR Code',
      'Quem precisa de uma pequena ferramenta web para uma tarefa específica',
    ],
    problemas: [
      { t: 'Links desorganizados', d: 'Uma página única com a identidade da marca reúne todos os canais em um só endereço.' },
      { t: 'Catálogo que não circula', d: 'PDFs pesados e fotos soltas dificultam a escolha. Um catálogo digital abre rápido no celular e leva direto ao pedido.' },
      { t: 'Impresso sem conexão', d: 'QR Codes conectam folhetos, embalagens e placas a conteúdos sempre atualizados.' },
    ],
    funcionalidades: [
      'Páginas de links com a identidade da marca',
      'Catálogos digitais com pedido por WhatsApp',
      'QR Codes direcionados a páginas específicas',
      'Pequenas ferramentas web (calculadoras, simuladores, checklists)',
      'Aplicações web que funcionam no navegador do celular',
    ],
    exemplos: [
      'Página de links para perfil profissional',
      'Catálogo de produtos com botão de pedido',
      'QR Code em material impresso levando a uma página de oferta',
    ],
    faq: [
      { q: 'Preciso de um site para ter essas soluções?', a: 'Não necessariamente. Elas podem funcionar sozinhas ou fazer parte de um site.' },
      { q: 'Consigo atualizar o conteúdo depois?', a: 'Depende da solução escolhida. A forma de atualização é definida junto com você no planejamento.' },
      { q: 'É possível acompanhar quantas pessoas acessaram?', a: 'Sim, é possível configurar ferramentas de mensuração de acessos. A opção mais adequada é avaliada em cada projeto.' },
    ],
  },
  {
    slug: 'automacoes',
    icon: 'workflow',
    titulo: 'Sistemas e Automações',
    curto: 'Agendamento, gestão e automação sob avaliação técnica.',
    descricao:
      'Projetos personalizados de agendamento, gestão e automação, sujeitos a avaliação técnica.',
    seoTitle: 'Sistemas e Automações sob Medida',
    intro:
      'Quando planilhas e mensagens soltas já não dão conta da rotina, um sistema sob medida pode organizar cadastros, agendamentos e processos. Cada projeto passa por uma avaliação técnica antes da proposta, para garantir que a solução faça sentido para o seu negócio.',
    paraQuem: [
      'Negócios que controlam clientes, pedidos ou horários em planilhas',
      'Empresas com tarefas repetitivas que podem ser automatizadas',
      'Serviços que precisam de agendamento organizado',
      'Quem precisa de um painel simples para acompanhar a operação',
    ],
    problemas: [
      { t: 'Retrabalho manual', d: 'Copiar dados entre planilhas e mensagens consome tempo e gera erros.' },
      { t: 'Informação descentralizada', d: 'Cadastros espalhados dificultam saber o que está disponível, pendente ou concluído.' },
      { t: 'Agenda desorganizada', d: 'Sem um controle claro, aparecem conflitos de horário e esquecimentos.' },
    ],
    funcionalidades: [
      'Cadastro e consulta de clientes',
      'Controle de disponibilidade e agendamentos',
      'Painéis de acompanhamento',
      'Automação de tarefas repetitivas',
      'Acesso pelo navegador, no computador ou no celular',
    ],
    exemplos: [
      'Sistema de gestão para locação de equipamentos',
      'Agenda online para prestadores de serviço',
      'Painel interno para acompanhar pedidos',
    ],
    faq: [
      { q: 'Por que é preciso uma avaliação técnica?', a: 'Sistemas variam muito em complexidade. A avaliação define o escopo, a viabilidade e a melhor tecnologia antes de qualquer proposta.' },
      { q: 'O sistema é feito do zero?', a: 'Depende da necessidade. Em alguns casos, ferramentas existentes resolvem bem; em outros, faz sentido desenvolver algo sob medida.' },
      { q: 'Quanto tempo leva?', a: 'O prazo é definido depois da avaliação técnica, de acordo com o escopo combinado.' },
    ],
  },
];

export const getService = (slug) => services.find((s) => s.slug === slug);
