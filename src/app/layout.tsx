import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/Nav";
import { SanityLive } from "@/sanity/lib/live";
import { diaBold, herbikIta, herbikReg } from "./utils/customFonts";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "AKLR Studio — Alex Kimpton & Lachlan Richards",
  description:
    "Studio for creative direction and design, led by Alex Kimpton and Lachlan Richards.",
  metadataBase: new URL("https://www.aklr.xyz"),
  alternates: {
    canonical: "https://www.aklr.xyz",
  },
  keywords: [
    "AKLR",
    "AKLR Studio",
    "Creative Direction",
    "Design Studio",
    "Brand Identity",
    "Graphic Design",
    "Art Direction",
    "Independent Design Studio",
    "Independent Creative Studio",
    "Melbourne Design Studio",
    "Design Studio Melbourne",
    "Creative Studio Melbourne",
    "Contemporary Design",
    "Multidisciplinary Studio",
    "Lachlan Richards",
    "Alex Kimpton",
  ],
  openGraph: {
    title: "AKLR Studio — Alex Kimpton & Lachlan Richards",
    description:
      "Studio for creative direction and design, led by Alex Kimpton and Lachlan Richards.",
    url: "https://www.aklr.xyz",
    siteName: "AKLR Studio",
    type: "website",
    locale: "en_AU",
    images: [
      {
        url: "https://www.aklr.xyz/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AKLR Studio – creative direction and design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AKLR Studio — Alex Kimpton & Lachlan Richards",
    description:
      "Studio for creative direction and design, led by Alex Kimpton and Lachlan Richards.",
    images: ["https://www.aklr.xyz/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
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
        className={`antialiased ${herbikReg.variable} ${herbikIta.variable} ${diaBold.variable}`}
      >
        <Nav />
        {children}
        <Footer />
        <SanityLive />
      </body>
    </html>
  );
}
