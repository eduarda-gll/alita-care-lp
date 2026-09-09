/**
 * Logos de cliente para a faixa de prova social.
 *
 * ⚠️ VAZIO DE PROPÓSITO. Logo de cliente só vai ao ar com autorização escrita,
 * e o Figma traz "CLIENTE 1…5" justamente como placeholder à espera dos reais.
 * Publicar um nome inventado aqui seria afirmar uma parceria que não existe.
 *
 * Enquanto estiver vazio, a `SocialProof` cai na faixa de INTEGRAÇÕES, que diz
 * uma verdade verificável do produto e não depende de autorização de ninguém.
 *
 * Para ligar a faixa de logos: preencha o array. O componente troca sozinho.
 * O `src` deve apontar para um arquivo em `public/clientes/`.
 */
export type Client = { name: string; src: string };

export const CLIENTS: readonly Client[] = [];

/**
 * Métricas da faixa alternativa (seção 3 da spec: "3 contadores de métrica
 * real").
 *
 * ⚠️ TAMBÉM VAZIO DE PROPÓSITO, pela mesma razão: a regra é "não inventar
 * número". Preencher exige o dado real do produto, com a data de apuração.
 */
export type Metric = { value: string; label: string };

export const METRICS: readonly Metric[] = [];
