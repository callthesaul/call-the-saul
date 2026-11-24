import type { Metadata } from "next";
import { siteDescription, siteLogo, siteTitle } from "../lib/site-metadata";
import "./globals.css";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: { url: siteLogo.src, type: "image/webp" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" id="top">{children}</body>
    </html>
  );
}
