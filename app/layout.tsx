import type { Metadata } from "next";
import { Marcellus, Figtree, EB_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/app/lib/auth-context";
import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { ScrollProgress } from "@/app/components/animations";
import { siteConfig } from "@/app/lib/site-config";
import "./globals.css";

/*
 * Evening Glow type: Marcellus (inscriptional Roman, single weight — carved
 * stone in candlelight) for display, Figtree for body, and EB Garamond italic
 * reserved for quoted voices — Scripture, confessions, testimony.
 */
const figtree = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
});

const marcellus = Marcellus({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const ebGaramond = EB_Garamond({
  variable: "--font-quote",
  subsets: ["latin"],
  weight: "500",
  style: "italic",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${figtree.variable} ${marcellus.variable} ${ebGaramond.variable} antialiased`}
      >
        <AuthProvider>
          <ScrollProgress />
          <Header />
          {children}
          <Footer />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
