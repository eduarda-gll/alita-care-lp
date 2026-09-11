export type TestimonialStat = { value: string; label: string };

export type Testimonial = {
  id: string;
  company: string;
  logo?: string;
  mark?: string;
  quote: string;
  avatar?: string;
  stats?: TestimonialStat[];
};

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: "cliente-1",
    company: "Queiroz Advogados Associados",
    logo: "/clientes/queiroz.png",
    mark: "/clientes/queiroz.png",
    quote:
      "A gente perdia muito lead simplesmente por demorar pra responder. Com a IA cuidando da primeira conversa, isso praticamente acabou.",
    stats: [
      { value: "52", label: "Conversas atendidas" },
      { value: "48", label: "Leads qualificados" },
      { value: "46", label: "Visitas agendadas" },
    ],
  },
  {
    id: "cliente-2",
    company: "Dominyum",
    logo: "/clientes/dominyum.png",
    mark: "/clientes/dominyum-simbolo.png",
    quote:
      "O time chegava na segunda com a caixa cheia de mensagem do fim de semana. Hoje chega com a agenda cheia.",
    stats: [
      { value: "43", label: "Conversas atendidas" },
      { value: "37", label: "Leads qualificados" },
      { value: "35", label: "Visitas agendadas" },
    ],
  },
  {
    id: "cliente-3",
    company: "Vísum Calc Soluções",
    logo: "/clientes/visum.png",
    mark: "/clientes/visum.png",
    quote:
      "O que mudou o jogo foi o lead chegar pro vendedor já com o contexto da conversa inteira, sem ninguém ter que repetir nada.",
    stats: [
      { value: "45", label: "Conversas atendidas" },
      { value: "40", label: "Leads qualificados" },
      { value: "38", label: "Visitas agendadas" },
    ],
  },
];
