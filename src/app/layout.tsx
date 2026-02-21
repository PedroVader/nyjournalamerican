import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-headline",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "New York Journal American",
  description:
    "An American Paper for the American People — Breaking news, analysis, and in-depth coverage of US and world events since 1882.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_URL || "https://newyorkjournalamerican.com"
  ),
  openGraph: {
    title: "New York Journal American",
    description:
      "An American Paper for the American People — Breaking news, analysis, and in-depth coverage of US and world events since 1882.",
    siteName: "New York Journal American",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
