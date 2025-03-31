import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { ProductProvider } from "../app/context/ProductContext";
import { Analytics } from '@vercel/analytics/next';
import Banner from "../../components/Banner/Banner";
import Script from 'next/script'



const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["200", "400", "700"]
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["200", "400", "700"]
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Beanies baby!",
  description: "Beanies!",
  icons: "./position.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProductProvider>
    <html lang="en" className="bg-[#1c1c1c]">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nunitoSans.variable} ${oswald.variable}  antialiased`}
      >
        <head>
        <Script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="c21a8c41-a011-4abf-9868-7c786ec6fb78" data-blockingmode="auto" type="text/javascript" defer></Script>
        </head>

        <Banner />
        <Header />
        {children}
        <Analytics />
        <Banner />
        <Footer />
      </body>
    </html>
    </ProductProvider>
  );
}
