import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://solara.smartslate.io'),
  title: {
    default: "Smartslate Solara: AI-Powered Learning Engine",
    template: "%s | Solara",
  },
  description: "Transform your learning experience with Solara's AI-powered platform. From intelligent needs analysis with Polaris to comprehensive analytics with Spectrum, revolutionize education technology.",
  keywords: "AI learning engine, educational technology, Polaris learning, needs analysis, learning blueprints, AI education, learning analytics, Solara platform",
  authors: [{ name: "Smartslate Team" }],
  openGraph: {
    title: "Smartslate Solara: AI-Powered Learning Engine",
    description: "Transform your learning experience with Solara's AI-powered platform featuring Polaris, Constellation, Nova, Orbit, and Spectrum.",
    type: "website",
    locale: "en_US",
    url: "https://solara.smartslate.io",
    siteName: "Smartslate Solara",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Smartslate Solara: AI-Powered Learning Engine"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Smartslate Solara: AI-Powered Learning Engine",
    description: "Transform your learning experience with Solara's AI-powered platform.",
    images: ["/og-image.png"]
  },
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png", sizes: "16x16" },
      { url: "/logo.png", type: "image/png", sizes: "32x32" },
    ],
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#091521',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&family=Lato:wght@300;400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider>
          <Header />
          <main className="main-content">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
