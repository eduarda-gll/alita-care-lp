import { Hero } from "./hero/Hero";
import { HowItWorks } from "./how-it-works/HowItWorks";
import { SocialProof } from "./social-proof/SocialProof";
import { Features } from "./features/Features";
import { GetStarted } from "./get-started/GetStarted";
import { Testimonials } from "./testimonials/Testimonials";
import { Cta } from "./cta/Cta";
import { Faq } from "./faq/Faq";

/**
 * A home é só a ORDEM das seções. Nada de layout aqui: o ritmo vertical mora no
 * `Section`, e cada seção resolve o próprio conteúdo dentro da pasta dela.
 * Mesma divisão do `routes/index.tsx` do typebot.
 *
 * ⚠️ `Testimonials` devolve `null` enquanto não houver depoimento autorizado, e
 * a `SocialProof` troca de modo conforme o que existir de conteúdo aprovado.
 * As duas somem ou mudam sozinhas — não é preciso comentar nada aqui.
 */
export function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <SocialProof />
      <Features />
      <GetStarted />
      <Testimonials />
      <Cta />
      <Faq />
    </>
  );
}
