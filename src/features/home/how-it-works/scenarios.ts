import type { ChatMessage } from "@/components/mockups/ChatMockup";

export type Scenario = {
  id: string;
  title: string;
  description: string;
  channel: string;
  messages: ChatMessage[];
};

/**
 * Os três caminhos por onde um lead chega. Os `id` casam com os nós do
 * `ChannelOrbit` — trocar um aqui sem trocar lá deixa a órbita sem canal ativo.
 */
export const SCENARIOS: readonly Scenario[] = [
  {
    id: "whatsapp",
    title: "WhatsApp",
    description: "Quem manda mensagem é respondido na hora, a qualquer hora.",
    channel: "WhatsApp",
    messages: [
      {
        from: "lead",
        text: "Oi, vi o anúncio de vocês. Atendem convênio?",
        time: "21:48",
      },
      {
        from: "alita",
        text: "Oi! Atendemos os principais convênios e também particular. Qual é o seu?",
        time: "21:48",
      },
      { from: "lead", text: "Unimed", time: "21:49" },
      {
        from: "alita",
        text: "Perfeito, Unimed é coberto. Tenho quinta às 9h30 ou sexta às 15h. Qual fica melhor?",
        time: "21:49",
      },
    ],
  },
  {
    id: "site",
    title: "Site",
    description: "O widget conversa com quem está navegando, antes de ir embora.",
    channel: "Chat do site",
    messages: [
      {
        from: "lead",
        text: "Preciso de uma avaliação, mas não sei qual especialidade",
        time: "10:12",
      },
      {
        from: "alita",
        text: "Sem problema, eu te ajudo a descobrir. Me conta rapidinho: o desconforto é mais na coluna ou nas articulações?",
        time: "10:12",
      },
      { from: "lead", text: "Coluna, na região lombar", time: "10:13" },
      {
        from: "alita",
        text: "Então o ideal é ortopedia com foco em coluna. Já separei um horário. Qual é o seu nome completo?",
        time: "10:13",
      },
    ],
  },
  {
    id: "campanha",
    title: "Campanha",
    description: "Lead de anúncio recebe o primeiro contato em segundos.",
    channel: "Campanha, primeiro contato",
    messages: [
      {
        from: "alita",
        text: "Olá, Bruno. Você pediu informações sobre o check-up completo pelo nosso anúncio. Posso te explicar como funciona?",
        time: "16:30",
      },
      { from: "lead", text: "Pode sim. É caro?", time: "16:31" },
      {
        from: "alita",
        text: "O check-up sai por R$ 490 e inclui 12 exames no mesmo dia. Costuma levar cerca de 3 horas. Quer que eu já reserve uma data?",
        time: "16:31",
      },
      { from: "lead", text: "Quero, na semana que vem", time: "16:32" },
    ],
  },
];
