import { LEGAL_LINKS, LegalPage } from "./LegalPage";
import { TERMS_OF_SERVICE } from "./legal-content";

export function TermsOfService() {
  return (
    <LegalPage document={TERMS_OF_SERVICE} crossLink={LEGAL_LINKS.privacy} />
  );
}
