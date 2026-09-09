export type Question = { question: string; answer: string };

/**
 * As cinco perguntas do Figma, mais a de privacidade que a spec pede.
 *
 * ⚠️ Sentence case, não CAIXA ALTA: o Figma escreve "VAI SOAR ROBÓTICO ?", e a
 * regra da casa aposentou caixa alta em rótulo de UI. Também não há espaço
 * antes do "?" — aquilo é resquício de diagramação, não pontuação do português.
 */
export const QUESTIONS: readonly Question[] = [
  {
    question: "Vai soar robótico?",
    answer:
      "A IA responde no tom que você define e usa as informações do seu negócio, não respostas genéricas. Ela cumprimenta, entende o pedido e conduz a conversa como um atendente treinado faria. Você lê cada conversa pelo painel e ajusta o que quiser a qualquer momento.",
  },
  {
    question: "E se o lead fizer perguntas complexas?",
    answer:
      "Quando a pergunta sai do que ela sabe responder, a Alita não inventa: ela registra a dúvida, avisa que alguém do time vai retornar e transfere a conversa com todo o histórico. O lead nunca fica sem resposta, e o time recebe o contexto pronto.",
  },
  {
    question: "O meu time vai perder o controle?",
    answer:
      "Ao contrário. Todas as conversas ficam no mesmo painel, com histórico completo, e qualquer pessoa do time pode assumir o atendimento a qualquer momento. Você também define o que a IA pode e o que ela não pode responder.",
  },
  {
    question: "Ela substitui meus vendedores?",
    answer:
      "Não. Ela tira do time o trabalho repetitivo: responder na hora, coletar dados, conferir convênio e marcar horário. O que exige negociação, relacionamento e decisão continua com as pessoas, que passam a receber o lead já qualificado.",
  },
  {
    question: "Funciona com a minha agenda?",
    answer:
      "A Alita se conecta à Google Agenda e consulta a disponibilidade real antes de oferecer qualquer horário. Ela não sugere um horário que já está ocupado, e a reunião confirmada aparece na agenda do responsável.",
  },
  {
    question: "Como ficam os dados dos meus leads?",
    answer:
      "Os dados são da sua empresa e ficam na sua conta, usados apenas para o atendimento que você configurou. O tratamento segue a LGPD, e você pode exportar ou excluir as informações quando quiser.",
  },
];
