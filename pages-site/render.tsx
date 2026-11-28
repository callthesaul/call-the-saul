import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { siteLogo, siteTitle } from "../lib/site-metadata";
import { PublicInvestorsPage } from "./investors/main";
import { basePath, PublicLandingPage } from "./main";

/* Pre-renders each static page: its <head> tags and its HTML, hydrated later by its own entry. */
const pages = {
  index: {
    title: siteTitle,
    description: "Lawyer-reviewed commercial contracts within 24 hours. One transparent fee.",
    Page: PublicLandingPage,
  },
  investors: {
    title: "Investors | Call the Saul",
    description: "A law firm built to scale: the Call the Saul business model on one canvas.",
    Page: PublicInvestorsPage,
  },
} as const;

export type PageName = keyof typeof pages;
export const pageNames = Object.keys(pages) as PageName[];

export function renderPage(name: PageName = "index") {
  const { title, description, Page } = pages[name];
  const head = renderToStaticMarkup(
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href={`${basePath}${siteLogo.src}`} type="image/webp" />
    </>,
  );

  return { head, content: renderToString(<Page />) };
}
