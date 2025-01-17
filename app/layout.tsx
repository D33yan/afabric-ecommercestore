import type { Metadata } from "next";
import { Geist, Azeret_Mono as Geist_Mono } from 'next/font/google';
import "./globals.css";
import NavBar from "@/components/NavBar";
import { CartProvider } from "@/components/layouts/CartContext";
import Footer from "@/components/layouts/Footer";
import AuthProvider from "./contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Afabric | Sustainable Fashion for Everyone",
    template: "%s | Afabric",
    
  },
  description: "Discover sustainable, ethically-made fashion that brings your style dreams to life. Shop Afabric for eco-friendly clothing and accessories.",
  keywords: ["sustainable fashion", "ethical clothing", "eco-friendly accessories", "Afabric"],
  authors: [{ name: "Afabric Team" }],
  creator: "Afabric",
  publisher: "Afabric Fashion",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://afabric-ecommercestore.vercel.app",
    siteName: "Afabric",
    title: "Afabric | Sustainable Fashion for Everyone",
    description: "Discover sustainable, ethically-made fashion that brings your style dreams to life.",
    images: [
      {
        url: 'logo1.jpg',
        width: 1200,
        height: 630,
        alt: "Afabric - Sustainable Fashion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@afabric",
    creator: "@afabric",
    title: "Afabric | Sustainable Fashion for Everyone",
    description: "Discover sustainable, ethically-made fashion that brings your style dreams to life.",
    images: ["https://afabric-ecommercestore.vercel.app/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/logo1.jpg",
    shortcut: "/logo1.jpg",
    apple: "/logo1.jpg",
  },
  manifest: "/site.webmanifest",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex flex-col min-h-screen antialiased">
        
          <AuthProvider>
          <CartProvider>
            <header>
              <NavBar />
            </header>
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </CartProvider>
          </AuthProvider>
       
      </body>
    </html>
  );
}