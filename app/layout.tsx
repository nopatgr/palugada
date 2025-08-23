import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Palugada Digital - Hardware Solutions & IT Services",
    template: "%s | Palugada Digital"
  },
  description: "Solusi hardware terpadu, OS installation, software setup, dan layanan IT profesional untuk mengoptimalkan sistem bisnis dan personal Anda. Dapatkan konsultasi gratis!",
  keywords: [
    "hardware solutions",
    "OS installation",
    "software setup", 
    "IT services",
    "computer repair",
    "system optimization",
    "hardware diagnostic",
    "network setup",
    "tech support",
    "Palugada Digital"
  ],
  authors: [{ name: "Palugada Digital Team" }],
  creator: "Palugada Digital",
  publisher: "Palugada Digital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://palugada-digital.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://palugada-digital.com',
    title: 'Palugada Digital - Hardware Solutions & IT Services',
    description: 'Solusi hardware terpadu, OS installation, software setup, dan layanan IT profesional untuk mengoptimalkan sistem bisnis dan personal Anda.',
    siteName: 'Palugada Digital',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Palugada Digital - Hardware Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Palugada Digital - Hardware Solutions & IT Services',
    description: 'Solusi hardware terpadu, OS installation, software setup, dan layanan IT profesional.',
    images: ['/og-image.jpg'],
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode}) {
  return (
    <html lang="id" className="scroll-smooth h-full">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body className={`${inter.className}`}  suppressHydrationWarning>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
