/**
 * Configuração do site. Tudo que é URL externa, texto de marca ou destino de
 * CTA mora aqui — trocar o destino de conversão é uma linha, não uma varredura.
 */

/** Destino de TODOS os CTAs primários da LP. */
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

/**
 * Colunas do rodapé.
 *
 * ⚠️ Toda âncora aqui precisa existir como `id` de uma `<Section>` da home.
 * Hoje: `#como-funciona`, `#integracoes`, `#recursos`, `#comecar`, `#faq`.
 * Link para âncora inexistente não dá erro — ele simplesmente não rola, o que é
 * pior, porque parece que a página travou.
 *
 * As colunas repetem alvos que já estão na nav do topo, de propósito: quem
 * chegou ao fim da página não deveria ter que subir de volta para navegar.
 */
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
