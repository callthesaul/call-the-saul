import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CalltheSaul | Commercial contracts, reviewed by lawyers",
  description: "Lawyer-reviewed contracts within 12 hours. One transparent fee. Join the CalltheSaul waitlist.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
