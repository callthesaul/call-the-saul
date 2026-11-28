import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import react from "@vitejs/plugin-react";
import { build } from "vite";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const root = resolve(repoRoot, "pages-site");
const publicDir = resolve(repoRoot, "public");
const target = process.argv[2];

if (target !== "github" && target !== "cloudflare") {
  throw new Error("Choose a Pages build target: github or cloudflare.");
}

const prefix = target === "github" ? (process.env.PAGES_BASE_PATH ?? "/call-the-saul") : "";
if (!/^(?:\/[a-zA-Z0-9._-]+)*\/?$/.test(prefix) || prefix.startsWith("//") || prefix.split("/").some(part => part === "." || part === "..")) {
  throw new Error("PAGES_BASE_PATH must be a site path, such as /call-the-saul.");
}

const base = `${prefix.replace(/\/$/, "")}/`;
const outDir = resolve(repoRoot, "dist", target);
const renderDir = resolve(repoRoot, "dist", "pages-render", target);
const config = () => ({ configFile: false, root, publicDir, base, plugins: [react()] });

await build({
  ...config(),
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: { input: { index: resolve(root, "index.html"), investors: resolve(root, "investors/index.html") } },
  },
});
await build({
  ...config(),
  build: { ssr: resolve(root, "render.tsx"), outDir: renderDir, emptyOutDir: true, copyPublicDir: false },
});

// Fill each page's template with its pre-rendered head and HTML.
const { renderPage, pageNames } = await import(pathToFileURL(resolve(renderDir, "render.js")).href);
for (const name of pageNames) {
  const { head, content } = renderPage(name);
  const pagePath = resolve(outDir, name === "index" ? "index.html" : `${name}/index.html`);
  const template = await readFile(pagePath, "utf8");
  if (!template.includes("<!--site-head-->") || !template.includes("<!--site-content-->")) {
    throw new Error(`Pages HTML template for "${name}" is missing the pre-render placeholders.`);
  }
  await writeFile(pagePath, template
    .replace("<!--site-head-->", () => head)
    .replace("<!--site-content-->", () => content));
}

if (target === "github") await writeFile(resolve(outDir, ".nojekyll"), "");
