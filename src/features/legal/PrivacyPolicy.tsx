import { LEGAL_LINKS, LegalPage } from "./LegalPage";
import { PRIVACY_POLICY } from "./legal-content";

export function PrivacyPolicy() {
  return <LegalPage document={PRIVACY_POLICY} crossLink={LEGAL_LINKS.terms} />;
}
