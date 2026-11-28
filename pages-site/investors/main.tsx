import { hydrateRoot } from "react-dom/client";
import InvestorsPage from "../../app/investors-page";
import "../../app/globals.css";

export const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

export function PublicInvestorsPage() {
  return <InvestorsPage basePath={basePath} />;
}

if (!import.meta.env.SSR) {
  const root = document.getElementById("app");
  if (root) hydrateRoot(root, <PublicInvestorsPage />);
}
