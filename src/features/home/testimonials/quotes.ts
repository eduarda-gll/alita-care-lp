export type TestimonialStat = { value: string; label: string };

export type Testimonial = {
  id: string;
  company: string;
  logo?: string;
  quote: string;
  name: string;
  role: string;
  avatar?: string;
  stats?: TestimonialStat[];
};

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: "cliente-1",
    company: "Cliente 1",
    quote:
      "A gente perdia muito lead simplesmente por demorar pra responder. Com a IA cuidando da primeira conversa, isso praticamente acabou.",
    name: "[nome do responsável]",
    role: "[cargo]",
    stats: [
      { value: "[34]", label: "Conversas atendidas" },
      { value: "[32]", label: "Leads qualificados" },
      { value: "[32]", label: "Visitas agendadas" },
    ],
  },
  {
    id: "cliente-2",
    company: "Cliente 2",
    quote:
      "O time chegava na segunda com a caixa cheia de mensagem do fim de semana. Hoje chega com a agenda cheia.",
    name: "[nome do responsável]",
    role: "[cargo]",
    stats: [
      { value: "[00]", label: "Conversas atendidas" },
      { value: "[00]", label: "Leads qualificados" },
      { value: "[00]", label: "Visitas agendadas" },
    ],
  },
  {
    id: "cliente-3",
    company: "Cliente 3",
    quote:
      "O que mudou o jogo foi o lead chegar pro vendedor já com o contexto da conversa inteira, sem ninguém ter que repetir nada.",
    name: "[nome do responsável]",
    role: "[cargo]",
    stats: [
      { value: "[00]", label: "Conversas atendidas" },
      { value: "[00]", label: "Leads qualificados" },
      { value: "[00]", label: "Visitas agendadas" },
    ],
  },
  {
    id: "cliente-4",
    company: "Cliente 4",
    quote:
      "Colocamos pra rodar num sábado e na segunda já tinha agendamento no calendário. Não precisou treinar ninguém.",
    name: "[nome do responsável]",
    role: "[cargo]",
    stats: [
      { value: "[00]", label: "Conversas atendidas" },
      { value: "[00]", label: "Leads qualificados" },
      { value: "[00]", label: "Visitas agendadas" },
    ],
  },
  {
    id: "cliente-5",
    company: "Cliente 5",
    quote:
      "Atendemos por WhatsApp, Instagram e telefone. Ver tudo numa fila só foi o que parou de fazer a gente esquecer gente pra trás.",
    name: "[nome do responsável]",
    role: "[cargo]",
    stats: [
      { value: "[00]", label: "Conversas atendidas" },
      { value: "[00]", label: "Leads qualificados" },
      { value: "[00]", label: "Visitas agendadas" },
    ],
  },
];
