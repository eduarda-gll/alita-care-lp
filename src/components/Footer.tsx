import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import { BrandMark } from "./BrandMark";
import { Container } from "./Container";
import { FOOTER_GROUPS, SITE, type FooterLink } from "@/constants";


export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-5 py-14 sm:px-6 md:py-16">
      <Container>
        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16">
          <div className="flex max-w-sm flex-col items-start gap-5">
            <Link
              to="/"
              aria-label="Alita, ir para o início"
              className="inline-flex rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <BrandMark className="h-9" />
            </Link>
            <p className="type-support text-pretty text-text-muted">
              {SITE.tagline}
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 sm:gap-14">
            {FOOTER_GROUPS.map((group) => (
              <nav key={group.title} aria-labelledby={`rodape-${group.title}`}>
                <h2
                  id={`rodape-${group.title}`}
                  className="type-eyebrow text-text"
                >
                  {group.title}
                </h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <FooterAnchor link={link} />
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div>
              <h2 className="type-eyebrow text-text">Comunidade</h2>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram do Alita, abre em nova aba"
                className="mt-4 inline-flex size-9 items-center justify-center rounded-lg border border-border text-text-muted transition-colors duration-200 hover:border-border-strong hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Instagram className="size-4.5" aria-hidden />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-caption text-text-subtle">
            © {year} AlitaApp. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href={SITE.privacy} className={LEGAL_LINK}>
              Política de privacidade
            </a>
            <a href={SITE.terms} className={LEGAL_LINK}>
              Termos de serviço
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

const LINK_CLASSES =
  "type-support text-text-muted transition-colors duration-200 hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const LEGAL_LINK =
  "type-caption text-text-muted underline underline-offset-4 transition-colors duration-200 hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function FooterAnchor({ link }: { link: FooterLink }) {
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${link.label}, abre em nova aba`}
        className={LINK_CLASSES}
      >
        {link.label}
      </a>
    );
  }
  return (
    <Link to={link.href} className={LINK_CLASSES}>
      {link.label}
    </Link>
  );
}
