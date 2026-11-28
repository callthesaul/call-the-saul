import type { Metadata } from "next";
import InvestorsPage from "../investors-page";

export const metadata: Metadata = {
  title: "Investors | Call the Saul",
  description: "A law firm built to scale: the Call the Saul business model on one canvas.",
};

export default function Investors() {
  return <InvestorsPage />;
}
