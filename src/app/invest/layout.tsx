import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investor Deck - Smartslate Solara",
  description: "Series A Investment Opportunity: Join us in building the future of corporate learning. $200B+ market, AI-native platform, exceptional unit economics (12-20x LTV:CAC). Transform fragmented L&D technology into unified, intelligent infrastructure.",
  keywords: "EdTech investment, SaaS investment opportunity, corporate learning technology, AI education platform, Series A funding, LMS market, learning technology investment, venture capital EdTech",
  openGraph: {
    title: "Invest in Solara: The Future of Corporate Learning | $15-20M Series A",
    description: "Exceptional opportunity to invest in the AI-native learning platform replacing fragmented tools. $200B TAM, 12-20x LTV:CAC, path to $150M ARR by 2028. Conservative projections, massive market tailwinds.",
    type: "website",
    url: "https://solara.smartslate.io/invest",
    siteName: "Smartslate Solara",
    images: [
      {
        url: "/og-invest.png",
        width: 1200,
        height: 630,
        alt: "Smartslate Solara Investor Pitch Deck - Series A $15-20M Opportunity"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Invest in Solara: AI-Native Learning Platform | Series A",
    description: "$200B market opportunity. Unified platform replacing 10-15 fragmented tools. 12-20x LTV:CAC. Path to $150M ARR.",
    images: ["/og-invest.png"]
  },
  robots: {
    index: false, // Investor deck should not be indexed
    follow: false,
  }
};

export default function InvestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
