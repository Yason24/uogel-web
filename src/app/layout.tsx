import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://uogel-russia.ru";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1c1917",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "UOGEL Russia — биоклиматические перголы с поставкой в Россию",
    template: "%s | UOGEL Russia",
  },
  description:
    "Подбор и поставка биоклиматических пергол UOGEL в Россию. Алюминиевые системы с поворотными ламелями, LED, ZIP-экранами и автоматикой для частных и коммерческих объектов.",
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "UOGEL Russia",
    url: siteUrl,
    title: "UOGEL Russia — биоклиматические перголы с поставкой в Россию",
    description:
      "Подбор и поставка биоклиматических пергол UOGEL в Россию. Серия из каталога 2026 — от компактных ручных до флагманских моторизованных систем.",
    images: [
      {
        url: "/images/og/uogel-og.jpg",
        width: 1200,
        height: 630,
        alt: "Биоклиматическая пергола UOGEL",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UOGEL Russia — биоклиматические перголы с поставкой в Россию",
    description:
      "Подбор и поставка биоклиматических пергол UOGEL в Россию. Серия 2026.",
    images: ["/images/og/uogel-og.jpg"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "UOGEL Russia",
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/images/og/uogel-og.jpg`,
    width: 1200,
    height: 630,
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    availableLanguage: "Russian",
    url: `${siteUrl}/contacts`,
  },
  sameAs: ["https://t.me/uogel_russia"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: "UOGEL Russia",
  url: siteUrl,
  publisher: { "@id": `${siteUrl}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/catalog`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`h-full antialiased ${inter.variable}`}>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema]),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
