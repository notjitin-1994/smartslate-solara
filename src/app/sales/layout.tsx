import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solara Polaris - AI-Powered Learning Blueprint Generator",
  description: "Transform weeks of learning design into minutes. Polaris uses advanced AI to convert business goals into comprehensive learning blueprints. Save 70-80% time, ensure stakeholder alignment, and launch training programs faster. Trusted by L&D teams worldwide.",
  keywords: "learning blueprint generator, AI learning design, instructional design tool, L&D software, training program design, learning objectives AI, corporate training design, eLearning blueprint, AI instructional designer",
  openGraph: {
    title: "Polaris by Solara: Transform Learning Design from Weeks to Minutes",
    description: "The AI-powered blueprint generator that L&D teams love. Convert business goals into comprehensive learning blueprints in 2-3 minutes. 70-80% time savings, perfect stakeholder alignment, enterprise-grade security. Start free trial today.",
    type: "website",
    url: "https://solara.smartslate.io/sales",
    siteName: "Smartslate Solara",
    images: [
      {
        url: "/og-sales.png",
        width: 1200,
        height: 630,
        alt: "Solara Polaris - AI-Powered Learning Blueprint Generator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Polaris: AI Learning Blueprint Generator | Save 70-80% Time",
    description: "Transform business goals into comprehensive learning blueprints in minutes. Trusted by L&D professionals. Start your free trial.",
    images: ["/og-sales.png"]
  },
  alternates: {
    canonical: "https://solara.smartslate.io/sales"
  }
};

export default function SalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
