export type Plan = {
  id: string;
  name: string;
  /** Prefixo do preço, quando o valor é um piso ("A partir de"). */
  pricePrefix?: string;
  /** Preço mensal já formatado. `null` no plano que não tem tabela. */
  price: string | null;
  /** Substitui o preço quando ele é `null` (plano montado sob medida). */
  priceLabel?: string;
  tagline: string;
  /** Linha que abre a lista, quando ela não é de entregas e sim de escolhas. */
  featuresIntro?: string;
  features: string[];
  ctaLabel: string;
  highlighted?: boolean;
};

/**
 * Tabela comercial. Valores conforme a página de planos em produção.
 *
 * ⚠️ Preço é parâmetro COMERCIAL: mudou a tabela, muda aqui, e só aqui. Nenhum
 * componente carrega valor cravado.
 *
 * ⚠️ TODO(comercial): confirmar o nome do 2º plano. Ele veio cortado no topo da
 * captura de referência; "Pro" é a leitura provável pela posição na escada
 * (Starter → ? → Business → Personalizado), não uma confirmação.
 */
export const PLANS: readonly Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "R$ 647,90",
    tagline: "Para começar a escalar",
    features: [
      "2.900 créditos por mês",
      "Até 966 minutos de ligação",
      "Crédito avulso a R$ 0,27",
      "4 agentes de voz e 4 de mensagem",
      "4 cadências",
      "Até 400 prospecções simultâneas",
      "Ligação e WhatsApp",
      "Importação CSV",
    ],
    ctaLabel: "Entre em contato",
  },
  {
    id: "pro",
    name: "Pro",
    price: "R$ 1.397,00",
    tagline: "Para times em ritmo",
    features: [
      "6.300 créditos por mês",
      "Até 2.100 minutos de ligação",
      "Crédito avulso a R$ 0,19",
      "8 agentes de voz e 6 de mensagem",
      "8 cadências",
      "Até 800 prospecções simultâneas",
      "Ligação, WhatsApp e e-mail",
      "Importação CSV",
      "Acesso à API",
    ],
    ctaLabel: "Entre em contato",
    highlighted: true,
  },
  {
    id: "business",
    name: "Business",
    pricePrefix: "A partir de",
    price: "R$ 3.199,00",
    tagline: "Para grandes operações",
    features: [
      "14.400 créditos por mês",
      "Até 4.800 minutos de ligação",
      "Crédito avulso a R$ 0,16",
      "16 agentes de voz e 8 de mensagem",
      "16 cadências",
      "Até 2.000 prospecções simultâneas",
      "Ligação, WhatsApp e e-mail",
      "Importação CSV",
      "Acesso à API",
    ],
    ctaLabel: "Entre em contato",
  },
  {
    id: "personalizado",
    name: "Personalizado",
    price: null,
    priceLabel: "Monte seu plano",
    tagline: "Para operações fora da régua",
    featuresIntro: "Você escolhe cada item:",
    features: [
      "Volume de créditos e minutos",
      "Quantidade de agentes e cadências",
      "Prospecções simultâneas",
      "Canais: ligação, WhatsApp e e-mail",
      "Importação CSV e acesso à API",
      "Suporte, SLA e onboarding",
    ],
    ctaLabel: "Monte seu plano",
  },
];
