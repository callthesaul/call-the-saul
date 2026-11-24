import { hydrateRoot } from "react-dom/client";
import LandingPage from "../app/landing-page";
import "../app/globals.css";

export const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

export function PublicLandingPage() {
  return <LandingPage basePath={basePath} showWaitlist={false} />;
}

if (!import.meta.env.SSR) {
  const root = document.getElementById("app");
  if (root) hydrateRoot(root, <PublicLandingPage />);
}
