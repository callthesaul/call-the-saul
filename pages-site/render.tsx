import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { siteLogo, siteTitle } from "../lib/site-metadata";
import { basePath, PublicLandingPage } from "./main";

export function renderPage() {
  const head = renderToStaticMarkup(
    <>
      <title>{siteTitle}</title>
      <meta name="description" content="Lawyer-reviewed commercial contracts within 12 hours. One transparent fee." />
      <link rel="icon" href={`${basePath}${siteLogo.src}`} type="image/webp" />
    </>,
  );

  return { head, content: renderToString(<PublicLandingPage />) };
}
