import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Palugada Digital - Hardware Solutions",
  description: "Solusi hardware terpadu untuk mengoptimalkan sistem Anda...",
};

export default function RootLayout({ children }: { children: React.ReactNode}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.className} bg-futuristic-primary text-futuristic-text-primary transition-colors duration-300`}>
        <main className="pt-20">
          <Providers>{children}</Providers>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
