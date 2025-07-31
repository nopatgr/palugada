import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Palugada Digital - Hardware Solutions",
  description: "Solusi hardware terpadu untuk mengoptimalkan sistem Anda. Dari instalasi OS hingga upgrade hardware, kami siap membantu mewujudkan kebutuhan teknologi hardware Anda dengan standar profesional.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.className} bg-futuristic-primary text-futuristic-text-primary transition-colors duration-300`}>
        <Navbar />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
