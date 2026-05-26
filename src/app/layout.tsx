import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://uogel-russia.ru";

export const metadata: Metadata = {
  title: {
    default: "UOGEL Russia — биоклиматические перголы",
    template: "%s | UOGEL Russia",
  },
  description:
    "Подбор и расчёт биоклиматических пергол UOGEL с поставкой в Россию. Алюминиевые системы с поворотными ламелями, LED, ZIP-экранами и автоматикой.",
  metadataBase: new URL(siteUrl),
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "UOGEL Russia",
    url: siteUrl,
    title: "UOGEL Russia — биоклиматические перголы",
    description:
      "Подбор и расчёт биоклиматических пергол UOGEL. Доступные серии, поставка в Россию.",
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
    title: "UOGEL Russia — биоклиматические перголы",
    description:
      "Подбор и расчёт биоклиматических пергол UOGEL с поставкой в Россию.",
    images: ["/images/og/uogel-og.jpg"],
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
