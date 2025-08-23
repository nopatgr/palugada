"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const services = [
    { title: "Web Development", href: "/layanan#web-dev" },
    { title: "Mobile App", href: "/layanan#mobile-app" },
    { title: "Digital Marketing", href: "/layanan#digital-marketing" },
    { title: "UI/UX Design", href: "/layanan#uiux" },
  ]

  const pages = [
    { title: "Produk", href: "/produk" },
    { title: "Layanan", href: "/layanan" },
    { title: "Testimonial", href: "/testimonial" },
    { title: "Booking", href: "/booking" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-lg">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-indigo-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">PD</span>
          </div>
          <span className="font-bold text-xl text-slate-700">Palugada Digital</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <div className="relative group">
            <button className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-slate-700 hover:text-indigo-500 transition-colors">
              <span>Services</span>
            </button>
            <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="p-2">
                {services.map((service) => (
                  <Link
                    key={service.title}
                    href={service.href}
                    className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-indigo-500 rounded transition-colors"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/about" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-indigo-500 transition-colors">
            About
          </Link>

          <div className="relative group">
            <button className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-slate-700 hover:text-indigo-500 transition-colors">
              <span>Pages</span>
            </button>
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="p-2">
                {pages.map((page) => (
                  <Link key={page.title} href={page.href} className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-indigo-500 rounded transition-colors">
                    {page.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Button asChild className="bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-500">
            <Link href="/booking">Get Started</Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6 text-slate-700" /> : <Menu className="h-6 w-6 text-slate-700" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="container px-4 py-4 space-y-4">
            <div>
              <h4 className="font-medium mb-2 text-slate-700">Services</h4>
              <div className="space-y-2 pl-4">
                {services.map((service) => (
                  <Link
                    key={service.title}
                    href={service.href}
                    className="block text-sm text-slate-500 hover:text-indigo-500 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/about" className="block font-medium text-slate-700 hover:text-indigo-500 transition-colors" onClick={() => setIsOpen(false)}>
              About
            </Link>

            <div>
              <h4 className="font-medium mb-2 text-slate-700">Pages</h4>
              <div className="space-y-2 pl-4">
                {pages.map((page) => (
                  <Link
                    key={page.title}
                    href={page.href}
                    className="block text-sm text-slate-500 hover:text-indigo-500 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {page.title}
                  </Link>
                ))}
              </div>
            </div>

            <Button asChild className="w-full bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-500">
              <Link href="/booking" onClick={() => setIsOpen(false)}>
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
