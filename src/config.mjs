// Configuração central do site Nexus JPC.
// Altere aqui e rode `node scripts/build.mjs` para atualizar todas as páginas.

export const site = {
  name: 'Nexus JPC',
  tagline: 'Soluções Digitais',
  slogan: 'Conectando ideias a soluções digitais.',
  url: 'https://nexusjpc.com.br',
  locale: 'pt_BR',
  lang: 'pt-BR',
  themeColor: '#0B0F14',
};

// WhatsApp comercial (formato internacional, só números: 55 + DDD + número).
// Todos os botões e o formulário de contato usam este valor.
export const whatsapp = {
  number: '5545991556361',
  defaultMessage:
    'Olá! Conheci a Nexus JPC pelo portfólio e gostaria de conversar sobre um projeto.',
};

// Perfis sociais reais. Deixe vazio para não exibir.
// Exemplo: { label: 'Instagram', url: 'https://instagram.com/seu.perfil' }
export const social = [];

// E-mail comercial real. Deixe null para não exibir.
export const email = null;

export function waLink(message = whatsapp.defaultMessage) {
  return `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(message)}`;
}

// Preços de referência ("a partir de"). O valor final sempre vem na proposta.
// Para mudar um valor, altere só aqui: a home e a página /servicos/ usam esta lista.
export const pricing = {
  tabela: [
    { nome: 'Página de links', desc: 'Uma página com a sua marca e todos os seus links e botões, para a bio do Instagram e o WhatsApp.', valor: 'R$ 150', href: '/servicos/solucoes-digitais/' },
    { nome: 'Catálogo digital', desc: 'Seus produtos e preços organizados, com pedido pelo WhatsApp e QR Code.', valor: 'R$ 300', href: '/servicos/solucoes-digitais/' },
    { nome: 'Landing page', desc: 'Uma página de vendas focada em um produto ou serviço.', valor: 'R$ 500', href: '/servicos/landing-pages/' },
    { nome: 'Site do seu negócio', desc: 'Site completo com até 5 páginas: serviços, fotos, contato e botão do WhatsApp.', valor: 'R$ 1.000', href: '/servicos/sites/' },
    { nome: 'Sistema sob medida', desc: 'Programa para organizar agenda, clientes e tarefas. Valor confirmado após avaliação.', valor: 'R$ 1.500', href: '/servicos/automacoes/' },
  ],
  manutencao: 'R$ 50/mês',
  pagamento: '50% para começar e 50% na entrega',
  observacao: 'Domínio e hospedagem são contratados à parte, no nome do cliente.',
};
