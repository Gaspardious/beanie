import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

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
  title: "Allbygg Trestad AB",
  description: "Allbygg Trestad AB är ett byggföretag i Trollhättan som utför alla typer av byggnationer.",
  icons: "./hammer.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nunitoSans.variable} ${oswald.variable}  antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
