"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ChevronDown,
  Settings,
  Monitor,
  Wrench,
  Book,
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const services = [
  { title: "Operasi Sistem ", href: "/layanan#operasi-sistem", icon: Monitor },
  {
    title: "Instalasi Software",
    href: "/layanan#inatalasi-software",
    icon: Settings,
  },
  {
    title: "Web Development & Design",
    href: "/layanan#web&design",
    icon: Wrench,
  },
  { title: "Dokumen & Tugas", href: "/layanan#dokumen&tugas", icon: Book },
];

const pages = [
  { title: "Produk", href: "/produk" },
  { title: "Layanan", href: "/layanan" },
  { title: "Testimonial", href: "/testimonial" },
  { title: "Contact", href: "/contact" },
  { title: "Booking", href: "/booking" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, mounted } = useTheme();

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;

        setIsScrolled(currentScrollY > 50);

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(currentScrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-futuristic-primary/95 backdrop-blur-md border-b border-futuristic-border shadow-lg"
          : "bg-futuristic-primary/80 backdrop-blur-sm border-b border-futuristic-border/30"
      }`}
    >
      <div className="container flex h-20 items-center justify-between px-6">
        {/* Logo - Left */}
        <Link href="/" className="flex items-center space-x-3 group">
          {/* <div className="relative">
            <div className="h-12 w-12 rounded-xl bg-futuristic-accent flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="text-futuristic-text-primary font-bold text-lg tracking-wider">
                PD
              </span>
            </div>
            <div className="absolute -inset-1 bg-futuristic-accent rounded-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          </div> */}
          <div className="flex flex-col">
            <span className="font-bold text-xl text-futuristic-text-primary group-hover:text-blue-200 transition-colors tracking-wide">
              Palugada Digital
            </span>
            <span className="text-xs text-futuristic-text-secondary font-medium tracking-wider">
              Hardware Solutions
            </span>
          </div>
        </Link>

        {/* Navigation - Center */}
        <nav className="hidden lg:flex items-center space-x-8">
          <div className="relative group">
            <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-futuristic-text-secondary hover:text-futuristic-text-primary transition-all duration-300 rounded-lg hover:bg-futuristic-secondary/50">
              <span className="tracking-wide">Services</span>
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-80 bg-futuristic-secondary/95 backdrop-blur-md border border-futuristic-border rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="p-4">
                {services.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <Link
                      key={service.title}
                      href={service.href}
                      className="flex items-center px-4 py-3 text-sm text-futuristic-text-secondary hover:bg-futuristic-primary/70 hover:text-futuristic-text-primary rounded-lg transition-all duration-200 group/item"
                    >
                      <IconComponent className="w-4 h-4 mr-3 text-blue-400 to-blue-600 group-hover/item:text-futuristic-accent-hover" />
                      <span className="tracking-wide">{service.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <Link
            href="/about"
            className="px-4 py-2 text-sm font-medium text-futuristic-text-secondary hover:text-futuristic-text-primary transition-all duration-300 rounded-lg hover:bg-futuristic-secondary/50 tracking-wide"
          >
            About
          </Link>

          <div className="relative group">
            <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-futuristic-text-secondary hover:text-futuristic-text-primary transition-all duration-300 rounded-lg hover:bg-futuristic-secondary/50">
              <span className="tracking-wide">Pages</span>
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-56 bg-futuristic-secondary/95 backdrop-blur-md border border-futuristic-border rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="p-4">
                {pages.map((page) => (
                  <Link
                    key={page.title}
                    href={page.href}
                    className="flex items-center px-4 py-3 text-sm text-futuristic-text-secondary hover:bg-futuristic-primary/70 hover:text-futuristic-text-primary rounded-lg transition-all duration-200 group/item"
                  >
                    {/* <div className="w-2 h-2 rounded-full bg-futuristic-accent mr-3 opacity-60 group-hover/item:opacity-100 transition-opacity"></div> */}
                    <span className="tracking-wide">{page.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* CTA Button - Right */}
        <div className="hidden lg:flex items-center space-x-4">
          <Button
            className="bg-blue-600 hover:bg-blue-500 text-futuristic-text-primary border border-blue-600 hover:border-[#d5d5d5]-hover shadow-lg hover:shadow-futuristic-glow transition-all duration-300 transform hover:scale-105 px-6 py-2 rounded-lg font-medium tracking-wide"
            asChild
          >
            <Link href="/booking">Get Started</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center space-x-4">
          <button
            className="p-2 rounded-lg hover:bg-futuristic-secondary/50 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-futuristic-text-secondary" />
            ) : (
              <Menu className="h-6 w-6 text-futuristic-text-secondary" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-futuristic-border bg-futuristic-secondary/95 backdrop-blur-md">
          <div className="container px-6 py-6 space-y-6">
            <div>
              <h4 className="font-medium mb-3 text-futuristic-text-primary tracking-wide">
                Services
              </h4>
              <div className="space-y-2 pl-4">
                {services.map((service) => (
                  <Link
                    key={service.title}
                    href={service.href}
                    className="block text-sm text-futuristic-text-secondary hover:text-futuristic-text-primary transition-colors py-2 tracking-wide"
                    onClick={() => setIsOpen(false)}
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/about"
              className="block font-medium text-futuristic-text-primary hover:text-futuristic-accent transition-colors tracking-wide"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>

            <div>
              <h4 className="font-medium mb-3 text-futuristic-text-primary tracking-wide">
                Pages
              </h4>
              <div className="space-y-2 pl-4">
                {pages.map((page) => (
                  <Link
                    key={page.title}
                    href={page.href}
                    className="block text-sm text-futuristic-text-secondary hover:text-futuristic-text-primary transition-colors py-2 tracking-wide"
                    onClick={() => setIsOpen(false)}
                  >
                    {page.title}
                  </Link>
                ))}
              </div>
            </div>

            <Button
              className="bg-blue-400 hover:bg-blue-600 w-full shadow-lg font-medium tracking-wide"
              asChild
            >
              <Link href="/booking" onClick={() => setIsOpen(false)}>
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
