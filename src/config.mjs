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
export const pricing = {
  manutencao: 'R$ 90/mês',
  pagamento: '50% para começar e 50% na entrega',
  observacao: 'Domínio e hospedagem são contratados à parte, no nome do cliente.',
};
