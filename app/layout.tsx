import type { Metadata } from "next";
import { Inter, Lato, Roboto } from "next/font/google";
import Footer from "@/components/Footer";
import { site } from "@/content/site";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
});
const lato = Lato({ subsets: ["latin"], weight: ["700"], variable: "--font-lato" });
const inter = Inter({ subsets: ["latin"], weight: ["500"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  icons: [
    { rel: "icon", url: "/images/favicon-light.png", media: "(prefers-color-scheme: light)" },
    { rel: "icon", url: "/images/favicon-dark.png", media: "(prefers-color-scheme: dark)" },
  ],
  openGraph: {
    type: "website",
    title: site.title,
    description: site.description,
    url: site.url,
    images: "/images/og.png",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: "/images/og.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${roboto.variable} ${lato.variable} ${inter.variable}`}>
      <head>
        <noscript>
          <style>{`.reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
