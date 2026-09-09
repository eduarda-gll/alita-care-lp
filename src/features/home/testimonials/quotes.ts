/**
 * Depoimentos de cliente.
 *
 * ⚠️ VAZIO DE PROPÓSITO, e a `Testimonials` não renderiza nada enquanto
 * estiver assim. É regra da própria spec desta LP: "sem depoimento aprovado, a
 * seção não vai ao ar com texto placeholder".
 *
 * O Figma traz uma citação e três números ("[34] conversas atendidas") como
 * PLACEHOLDER de layout, não como conteúdo aprovado — subir aquilo seria
 * publicar um depoimento que ninguém deu e uma métrica que ninguém apurou.
 *
 * Para ligar a seção: preencha o array com depoimento autorizado por escrito.
 * `stats` é opcional e, quando existir, deve trazer o número real DAQUELE
 * cliente, com apuração conhecida.
 */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** Arquivo em `public/depoimentos/`. Sem foto, sai a inicial do nome. */
  avatar?: string;
  stats?: { value: string; label: string }[];
};

export const TESTIMONIALS: readonly Testimonial[] = [];
