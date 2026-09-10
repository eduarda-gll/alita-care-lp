export type Plan = {
  id: string;
  name: string;
  pricePrefix?: string;
  price: string | null;
  priceLabel?: string;
  tagline: string;
  featuresIntro?: string;
  features: string[];
  ctaLabel: string;
  highlighted?: boolean;
};

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
