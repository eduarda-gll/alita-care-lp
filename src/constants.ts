
export const CTA_URL = "https://app.alitaapp.com.br/login";

export const SITE = {
  name: "Alita Care",
  /** Usado no <title>, no OG e no rodapé. */
  tagline:
    "Da primeira ligação ao fechamento: centralize sua operação e tenha mais previsibilidade nos resultados.",
  description:
    "A Alita atende quem procura você, entende o que a pessoa precisa e devolve o lead qualificado, com os dados preenchidos e a reunião marcada.",
  url: "https://alitaapp.com.br",
  instagram: "https://www.instagram.com/alitaapp",
  contactEmail: "eduarda@taktico.com.br",
  privacy: "/politica-de-privacidade",
  terms: "/termos-de-servico",
} as const;

export const NAV_LINKS = [
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Recursos", href: "/#recursos" },
  { label: "Planos", href: "/planos" },
  { label: "FAQ", href: "/#faq" },
] as const;

export type FooterLink = { label: string; href: string; external?: boolean };


export const FOOTER_GROUPS: readonly {
  title: string;
  links: readonly FooterLink[];
}[] = [
  {
    title: "Produto",
    links: [
      { label: "Como funciona", href: "/#como-funciona" },
      { label: "Funcionalidades", href: "/#recursos" },
      { label: "Integrações", href: "/#integracoes" },
      { label: "Como começar", href: "/#comecar" },
      { label: "Dúvidas frequentes", href: "/#faq" },
    ],
  },
  {
    title: "Navegação",
    links: [
      { label: "Início", href: "/" },
      { label: "Planos", href: "/planos" },
      { label: "Acessar o sistema", href: CTA_URL, external: true },
    ],
  },
];
