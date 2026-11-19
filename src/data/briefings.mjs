// Briefings por serviço: cada item vira uma página em /briefing/<slug>/.
// As respostas NÃO são salvas por este site: no fim, o cliente revisa e envia pelo WhatsApp.
//
// Tipos de campo:
//   text / tel / textarea  → resposta escrita
//   one                    → escolha uma opção (botões)
//   many                   → escolha várias opções (botões)
// Opções úteis: req (obrigatório), hint (texto de ajuda), ph (exemplo dentro do campo),
//               outro (mostra um campo "Outro:" junto das opções), max (limite de caracteres).
//
// Nunca peça senhas no briefing.

const sobreVoce = {
  titulo: 'Sobre você',
  intro: 'Para sabermos com quem estamos falando.',
  campos: [
    { id: 'nome', label: 'Seu nome', type: 'text', req: true, ac: 'name' },
    { id: 'whatsapp', label: 'Seu WhatsApp', type: 'tel', req: true, ph: '(00) 00000-0000', ac: 'tel-national' },
    { id: 'empresa', label: 'Nome da empresa ou marca', type: 'text', ac: 'organization' },
    { id: 'cidade', label: 'Cidade onde atende', type: 'text', ph: 'Ex.: Foz do Iguaçu (PR) ou "atendo online"' },
    { id: 'negocio', label: 'O que a sua empresa faz?', type: 'textarea', req: true, ph: 'Ex.: Salão de beleza com corte, coloração e manicure, focado em atendimento rápido.', max: 600 },
    { id: 'redes', label: 'Links das suas redes sociais', type: 'textarea', ph: 'Instagram, Facebook, TikTok…', max: 400, rows: 2 },
  ],
};

const fechamento = {
  titulo: 'Para finalizar',
  intro: 'Quase lá. Essas respostas ajudam a montar a proposta.',
  campos: [
    { id: 'prazo', label: 'Para quando você precisa?', type: 'one', opcoes: ['O quanto antes', 'Em até 30 dias', 'Em até 60 dias', 'Sem pressa'] },
    { id: 'conheceu', label: 'Como conheceu a Nexus JPC?', type: 'one', opcoes: ['Instagram', 'Indicação', 'Google', 'Vi um projeto'], outro: true },
    { id: 'extra', label: 'Quer contar mais alguma coisa?', type: 'textarea', ph: 'Dúvidas, ideias, algo que não foi perguntado…', max: 800 },
  ],
};

const materiais = (extra = []) => ({
  id: 'materiais',
  label: 'Quais materiais você já tem?',
  hint: 'Pode marcar mais de um. Os arquivos você manda depois, pelo WhatsApp.',
  type: 'many',
  opcoes: ['Logotipo', 'Fotos profissionais', 'Fotos do celular', ...extra, 'Ainda não tenho nada'],
});

const dominio = {
  id: 'dominio',
  label: 'Você já tem um domínio (endereço na internet, como seunegocio.com.br)?',
  hint: 'Não envie senhas aqui. Se precisar de acesso, combinamos depois com segurança.',
  type: 'one',
  opcoes: ['Já tenho', 'Ainda não tenho', 'Não sei o que é'],
};

const cores = { id: 'cores', label: 'Sua marca tem cores definidas?', type: 'text', ph: 'Ex.: azul-marinho e dourado. Se não tiver, deixe em branco.' };
const inspiracoes = { id: 'inspiracoes', label: 'Sites ou perfis que você gosta e que combinam com o estilo que deseja', type: 'textarea', ph: 'Cole até 3 links e, se quiser, diga o que gostou em cada um.', max: 600 };

export const briefings = [
  {
    slug: 'site',
    servico: 'sites',
    nome: 'Site do seu negócio',
    titulo: 'Briefing do <span class="grad">seu site</span>',
    lead: 'Responda com calma. Quanto mais detalhes, mais certeira fica a proposta.',
    tempo: '8 minutos',
    etapas: [
      sobreVoce,
      {
        titulo: 'O site',
        intro: 'O que o site precisa fazer por você.',
        campos: [
          { id: 'objetivo', label: 'Principais objetivos do site', type: 'many', req: true, opcoes: ['Apresentar a empresa', 'Receber contatos no WhatsApp', 'Aparecer no Google', 'Mostrar trabalhos e portfólio', 'Passar mais confiança', 'Vender online'], outro: true },
          { id: 'paginas', label: 'Quais páginas ou seções o site deve ter?', type: 'many', opcoes: ['Início', 'Sobre', 'Serviços ou produtos', 'Galeria ou portfólio', 'Depoimentos', 'Perguntas frequentes', 'Blog', 'Contato'], outro: true },
          { id: 'recursos', label: 'Algum recurso específico?', type: 'many', opcoes: ['Botão do WhatsApp', 'Formulário de contato', 'Mapa com localização', 'Agendamento online', 'Área de clientes'], outro: true },
          { id: 'google', label: 'Se alguém fosse procurar sua empresa no Google, o que digitaria?', type: 'text', ph: 'Ex.: salão de beleza em Foz do Iguaçu' },
        ],
      },
      {
        titulo: 'Conteúdo e visual',
        intro: 'Textos, fotos e o estilo que você imagina.',
        campos: [
          { id: 'textos', label: 'Você já tem os textos do site?', type: 'one', opcoes: ['Sim, tenho prontos', 'Tenho uma parte', 'Não, preciso de ajuda'] },
          { id: 'descricao', label: 'Como você descreveria sua empresa para um cliente novo?', type: 'textarea', ph: 'Diferenciais, tempo de mercado, como trabalha…', max: 800 },
          { id: 'slogan', label: 'Tem um slogan ou frase de impacto?', type: 'text', ph: 'Ex.: Muito mais que um salão, seu momento de cuidado.' },
          materiais(),
          cores,
          inspiracoes,
        ],
      },
      {
        titulo: 'Endereço e hospedagem',
        intro: 'Só para sabermos o que já existe.',
        campos: [
          dominio,
          { id: 'hospedagem', label: 'Você já tem hospedagem (o serviço que deixa o site no ar)?', type: 'one', opcoes: ['Já tenho', 'Ainda não tenho', 'Não sei o que é'] },
          { id: 'politicas', label: 'Precisa de páginas de políticas?', type: 'many', opcoes: ['Privacidade', 'Trocas e devoluções', 'Termos de uso', 'Não preciso'] },
        ],
      },
      fechamento,
    ],
  },
  {
    slug: 'landing-page',
    servico: 'landing-pages',
    nome: 'Página de vendas',
    titulo: 'Briefing da <span class="grad">página de vendas</span>',
    lead: 'Uma página de vendas boa nasce de uma oferta bem explicada. Conte o máximo que puder.',
    tempo: '8 minutos',
    etapas: [
      sobreVoce,
      {
        titulo: 'A oferta',
        intro: 'O que a página vai vender e para quem.',
        campos: [
          { id: 'produto', label: 'O que a página vai vender?', type: 'textarea', req: true, ph: 'Produto, serviço, curso, evento… explique como se fosse para um cliente.', max: 800 },
          { id: 'preco', label: 'Qual o preço ou condição da oferta?', type: 'text', ph: 'Ex.: R$ 97 ou 3x de R$ 35' },
          { id: 'publico', label: 'Para quem é essa oferta?', type: 'textarea', ph: 'Quem é o cliente ideal e qual problema ele quer resolver.', max: 600 },
          { id: 'beneficios', label: 'Principais benefícios ou diferenciais', type: 'textarea', ph: 'Por que comprar de você e não de outro?', max: 600 },
          { id: 'duvidas', label: 'Quais dúvidas ou objeções os clientes costumam ter?', type: 'textarea', ph: 'Ex.: "Será que funciona para mim?", "É caro?"', max: 600 },
        ],
      },
      {
        titulo: 'Venda e divulgação',
        intro: 'Como o cliente compra e como ele vai chegar até a página.',
        campos: [
          { id: 'acao', label: 'O que o visitante deve fazer na página?', type: 'one', req: true, opcoes: ['Comprar direto', 'Chamar no WhatsApp', 'Deixar o contato', 'Agendar um horário'], outro: true },
          { id: 'pagamento', label: 'Já usa alguma plataforma de pagamento?', type: 'one', opcoes: ['Hotmart', 'Kiwify', 'Mercado Pago', 'Ainda não uso'], outro: true },
          { id: 'provas', label: 'Você tem provas reais para mostrar?', hint: 'Só usamos o que for real e autorizado.', type: 'many', opcoes: ['Depoimentos de clientes', 'Prints de resultados', 'Fotos de antes e depois', 'Ainda não tenho'] },
          { id: 'anuncios', label: 'Como pretende divulgar a página?', type: 'many', opcoes: ['Anúncios no Instagram e Facebook', 'Anúncios no Google', 'Só nas minhas redes', 'Ainda não sei'] },
        ],
      },
      {
        titulo: 'Visual',
        intro: 'Materiais e estilo.',
        campos: [materiais(['Vídeo de apresentação']), cores, inspiracoes, dominio],
      },
      fechamento,
    ],
  },
  {
    slug: 'pagina-de-links',
    servico: 'solucoes-digitais',
    nome: 'Página de links',
    titulo: 'Briefing da <span class="grad">página de links</span>',
    lead: 'Rapidinho: em poucos minutos a gente entende o que a sua página precisa ter.',
    tempo: '4 minutos',
    etapas: [
      sobreVoce,
      {
        titulo: 'A página',
        intro: 'Onde ela vai ser usada e o que vai ter.',
        campos: [
          { id: 'uso', label: 'Onde você vai usar a página?', type: 'many', req: true, opcoes: ['Bio do Instagram', 'TikTok', 'Mensagens no WhatsApp', 'Cartão de visita com QR Code'], outro: true },
          { id: 'links', label: 'Quais botões e links a página deve ter?', type: 'textarea', req: true, ph: 'Ex.: WhatsApp, Instagram, cardápio, localização, agendamento…', max: 800 },
          { id: 'destaque', label: 'Qual é o botão mais importante?', type: 'text', ph: 'Ex.: Agendar horário' },
          { id: 'qr', label: 'Quer um QR Code para imprimir?', type: 'one', opcoes: ['Sim', 'Não', 'Talvez'] },
          materiais(['Foto de perfil']),
          cores,
        ],
      },
      fechamento,
    ],
  },
  {
    slug: 'catalogo',
    servico: 'solucoes-digitais',
    nome: 'Catálogo digital',
    titulo: 'Briefing do <span class="grad">catálogo digital</span>',
    lead: 'Conte como são os seus produtos e como você recebe os pedidos hoje.',
    tempo: '6 minutos',
    etapas: [
      sobreVoce,
      {
        titulo: 'Os produtos',
        intro: 'O que vai aparecer no catálogo.',
        campos: [
          { id: 'produtos', label: 'Que tipo de produto você vende?', type: 'textarea', req: true, ph: 'Ex.: roupas femininas, doces por encomenda, peças automotivas…', max: 600 },
          { id: 'quantidade', label: 'Quantos produtos, mais ou menos?', type: 'one', opcoes: ['Até 20', 'De 20 a 50', 'De 50 a 100', 'Mais de 100'] },
          { id: 'categorias', label: 'Quais categorias o catálogo deve ter?', type: 'text', ph: 'Ex.: vestidos, blusas, acessórios' },
          { id: 'variacoes', label: 'Os produtos têm variações?', type: 'many', opcoes: ['Tamanho', 'Cor', 'Sabor', 'Não têm'], outro: true },
          { id: 'precos', label: 'Os preços vão aparecer no catálogo?', type: 'one', opcoes: ['Sim', 'Não, só sob consulta', 'Alguns sim, outros não'] },
          { id: 'fotos', label: 'Você tem fotos dos produtos?', type: 'one', opcoes: ['Sim, de todos', 'De alguns', 'Ainda não'] },
        ],
      },
      {
        titulo: 'Pedidos e visual',
        intro: 'Como o cliente compra e como o catálogo deve parecer.',
        campos: [
          { id: 'pedido', label: 'Como o cliente faz o pedido?', type: 'one', req: true, opcoes: ['Pelo WhatsApp', 'Pelo Instagram', 'Na loja física'], outro: true },
          { id: 'entrega', label: 'Como o cliente recebe?', type: 'many', opcoes: ['Entrega', 'Retirada no local', 'Envio pelos Correios'], outro: true },
          { id: 'atualizacao', label: 'Com que frequência os produtos ou preços mudam?', type: 'one', opcoes: ['Toda semana', 'Todo mês', 'Raramente'] },
          { id: 'qr', label: 'Quer um QR Code para imprimir (balcão, sacola, cartão)?', type: 'one', opcoes: ['Sim', 'Não', 'Talvez'] },
          materiais(),
          cores,
        ],
      },
      fechamento,
    ],
  },
  {
    slug: 'sistema',
    servico: 'automacoes',
    nome: 'Sistema sob medida',
    titulo: 'Briefing do <span class="grad">sistema</span>',
    lead: 'Conte como é o seu dia a dia hoje. Antes de qualquer proposta, avaliamos se um sistema realmente vale a pena no seu caso.',
    tempo: '7 minutos',
    etapas: [
      sobreVoce,
      {
        titulo: 'Como é hoje',
        intro: 'O problema que você quer resolver.',
        campos: [
          { id: 'problema', label: 'Qual problema você quer resolver?', type: 'textarea', req: true, ph: 'Ex.: perco horários marcados, não sei quem me deve, demoro para fazer orçamentos…', max: 800 },
          { id: 'hoje', label: 'Como você organiza isso hoje?', type: 'many', opcoes: ['Caderno ou papel', 'Planilha', 'Mensagens no WhatsApp', 'Outro sistema'], outro: true },
          { id: 'usuarios', label: 'Quem vai usar o sistema?', type: 'one', opcoes: ['Só eu', 'Eu e mais 1 a 4 pessoas', 'Mais de 5 pessoas', 'A equipe e os clientes'] },
        ],
      },
      {
        titulo: 'O que o sistema deve fazer',
        intro: 'Marque o que fizer sentido. Não precisa saber termos técnicos.',
        campos: [
          { id: 'funcoes', label: 'O que o sistema precisa fazer?', type: 'many', req: true, opcoes: ['Agenda e horários', 'Cadastro de clientes', 'Pedidos ou orçamentos', 'Estoque', 'Contas a receber e a pagar', 'Relatórios', 'Lembretes automáticos'], outro: true },
          { id: 'onde', label: 'Onde vai ser usado?', type: 'one', opcoes: ['No celular', 'No computador', 'Nos dois'] },
          { id: 'dados', label: 'Já existem dados para trazer para o sistema?', hint: 'Ex.: uma planilha com a lista de clientes.', type: 'one', opcoes: ['Sim', 'Não', 'Não sei'] },
          { id: 'referencia', label: 'Conhece algum sistema ou aplicativo parecido com o que imagina?', type: 'textarea', ph: 'O que gostou ou não gostou nele.', max: 600 },
        ],
      },
      fechamento,
    ],
  },
];

export const getBriefing = (slug) => briefings.find((b) => b.slug === slug);
