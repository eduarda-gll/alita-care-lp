import { Hero } from "./hero/Hero";
import { HowItWorks } from "./how-it-works/HowItWorks";
import { SocialProof } from "./social-proof/SocialProof";
import { Features } from "./features/Features";
import { GetStarted } from "./get-started/GetStarted";
import { Testimonials } from "./testimonials/Testimonials";
import { Faq } from "./faq/Faq";

export function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <SocialProof />
      <Features />
      <GetStarted />
      <Testimonials />
      <Faq />
    </>
  );
}
