import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/Section";
import { SITE } from "@/constants";
import type { LegalBlock, LegalDocument } from "./legal-content";

const EMAIL = "contato@taktico.com.br";
const EMAIL_PATTERN = new RegExp(`(${EMAIL.replace(/\./g, "\\.")})`);

const LINK_CLASSES =
  "text-accent underline underline-offset-4 transition-colors duration-200 hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function withEmailLink(value: string) {
  const parts = value.split(EMAIL_PATTERN);

  if (parts.length === 1) return value;

  return parts.map((part, index) =>
    part === EMAIL ? (
      <a key={index} href={`mailto:${part}`} className={LINK_CLASSES}>
        {part}
      </a>
    ) : (
      part
    ),
  );
}

function Blocks({ blocks }: { blocks: readonly LegalBlock[] }) {
  return blocks.map((block, index) => {
    if (block.kind === "list") {
      return (
        <ul key={index} className="flex flex-col gap-2.5">
          {block.items.map((item) => (
            <li
              key={item}
              className="type-body flex gap-3 text-pretty text-text-muted"
            >
              <span
                aria-hidden
                className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
              />
              {item}
            </li>
          ))}
        </ul>
      );
    }

    if (block.kind === "contact") {
      return (
        <div
          key={index}
          className="rounded-card border border-border bg-surface p-5"
        >
          {block.lines.map((line) => (
            <p key={line} className="type-body text-text-muted">
              {withEmailLink(line)}
            </p>
          ))}
        </div>
      );
    }

    return (
      <p key={index} className="type-body text-pretty text-text-muted">
        {withEmailLink(block.value)}
      </p>
    );
  });
}

export function LegalPage({
  document: doc,
  crossLink,
}: {
  document: LegalDocument;
  crossLink: { label: string; href: string };
}) {
  const titleId = "legal-titulo";

  return (
    <Section labelledBy={titleId} className="pt-28 md:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <span
          className="hero-orb"
          style={
            {
              left: "-16%",
              top: "-14%",
              "--orb-size": "clamp(20rem, 38vw, 42rem)",
              "--orb-blur": "90px",
              "--orb-opacity": 0.1,
            } as CSSProperties
          }
        />
        <span
          className="hero-orb"
          style={
            {
              right: "-12%",
              bottom: "-10%",
              "--orb-size": "clamp(16rem, 30vw, 34rem)",
              "--orb-blur": "80px",
              "--orb-opacity": 0.08,
            } as CSSProperties
          }
        />
      </div>

      <article className="mx-auto w-full max-w-3xl">
        <header className="flex flex-col gap-3">
          <h1 id={titleId} className="type-hero text-balance text-text">
            {doc.title}
          </h1>
          <p className="type-support text-text-subtle">
            Última atualização: {doc.updatedAt}
          </p>
        </header>

        {doc.intro.length > 0 ? (
          <div className="mt-8 flex flex-col gap-4">
            <Blocks blocks={doc.intro} />
          </div>
        ) : null}

        <div className="mt-12 flex flex-col gap-12">
          {doc.sections.map((section) => (
            <section key={section.title} className="flex flex-col gap-4">
              <h2 className="type-title text-balance text-text">
                {section.title}
              </h2>
              <Blocks blocks={section.blocks} />
            </section>
          ))}
        </div>

        <footer className="mt-16 border-t border-border pt-8">
          <Link
            to={crossLink.href}
            className="type-label group inline-flex items-center gap-0 text-accent transition-colors duration-200 hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {crossLink.label}
            <span className="ml-0 grid w-0 place-items-center overflow-hidden opacity-0 transition-[width,opacity,margin] duration-300 ease-out-soft group-hover:ml-2 group-hover:w-4 group-hover:opacity-100">
              <ArrowRight aria-hidden className="size-4 shrink-0" />
            </span>
          </Link>
        </footer>
      </article>
    </Section>
  );
}

export const LEGAL_LINKS = {
  privacy: { label: "Ver Política de Privacidade", href: SITE.privacy },
  terms: { label: "Ver Termos de Serviço", href: SITE.terms },
} as const;
