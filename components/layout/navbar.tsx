"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Settings, Monitor, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "../ThemeToggle"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  const services = [
    { title: "OS Installation", href: "/layanan#os-installation", icon: Monitor },
    { title: "Software Setup", href: "/layanan#software-setup", icon: Settings },
    { title: "Tech Support", href: "/layanan#tech-support", icon: Wrench },
  ]

  const pages = [
    { title: "Produk", href: "/produk" },
    { title: "Layanan", href: "/layanan" },
    { title: "Testimonial", href: "/testimonial" },
    { title: "Contact", href: "/contact" },
    { title: "Booking", href: "/booking" },
  ]

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY

        setIsScrolled(currentScrollY > 50)

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
        setLastScrollY(currentScrollY)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar)
      return () => {
        window.removeEventListener("scroll", controlNavbar)
      }
    }
  }, [lastScrollY])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 shadow-xl"
          : "bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/30"
      }`}
    >
      <div className="container flex h-20 items-center justify-between px-6">
        {/* Logo - Left */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-lg tracking-wider">PD</span>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl text-white group-hover:text-cyan-300 transition-colors tracking-wide">
              Palugada Digital
            </span>
            <span className="text-xs text-cyan-400 font-medium tracking-wider">Hardware Solutions</span>
          </div>
        </Link>

        {/* Navigation - Center */}
        <nav className="hidden lg:flex items-center space-x-8">
          <div className="relative group">
            <button className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-slate-200 hover:text-cyan-300 transition-all duration-300 rounded-lg hover:bg-slate-800/50">
              <span className="tracking-wide">Services</span>
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-80 bg-slate-900/95 backdrop-blur-md border border-slate-700/50 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="p-4">
                {services.map((service, index) => {
                  const IconComponent = service.icon
                  return (
                    <Link
                      key={service.title}
                      href={service.href}
                      className="flex items-center px-4 py-3 text-sm text-slate-200 hover:bg-slate-800/70 hover:text-cyan-300 rounded-lg transition-all duration-200 group/item"
                    >
                      <IconComponent className="w-4 h-4 mr-3 text-cyan-400 group-hover/item:text-cyan-300" />
                      <span className="tracking-wide">{service.title}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          <Link
            href="/about"
            className="px-4 py-2 text-sm font-semibold text-slate-200 hover:text-cyan-300 transition-all duration-300 rounded-lg hover:bg-slate-800/50 tracking-wide"
          >
            About
          </Link>

          <div className="relative group">
            <button className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-slate-200 hover:text-cyan-300 transition-all duration-300 rounded-lg hover:bg-slate-800/50">
              <span className="tracking-wide">Pages</span>
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-md border border-slate-700/50 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="p-4">
                {pages.map((page) => (
                  <Link
                    key={page.title}
                    href={page.href}
                    className="flex items-center px-4 py-3 text-sm text-slate-200 hover:bg-slate-800/70 hover:text-cyan-300 rounded-lg transition-all duration-200 group/item"
                  >
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mr-3 opacity-60 group-hover/item:opacity-100 transition-opacity"></div>
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
            className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-500/90 hover:via-blue-600/90 hover:to-purple-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-6 py-2 rounded-lg font-semibold tracking-wide"
            asChild
          >
            <Link href="/booking">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6 text-slate-200" /> : <Menu className="h-6 w-6 text-slate-200" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-md">
          <div className="container px-6 py-6 space-y-6">
            <div>
              <h4 className="font-semibold mb-3 text-slate-200 tracking-wide">Services</h4>
              <div className="space-y-2 pl-4">
                {services.map((service) => {
                  const IconComponent = service.icon
                  return (
                    <Link
                      key={service.title}
                      href={service.href}
                      className="flex items-center text-sm text-slate-300 hover:text-cyan-300 transition-colors py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <IconComponent className="w-4 h-4 mr-3 text-cyan-400" />
                      <span className="tracking-wide">{service.title}</span>
                    </Link>
                  )
                })}
              </div>
            </div>

            <Link
              href="/about"
              className="block font-semibold text-slate-200 hover:text-cyan-300 transition-colors tracking-wide"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>

            <div>
              <h4 className="font-semibold mb-3 text-slate-200 tracking-wide">Pages</h4>
              <div className="space-y-2 pl-4">
                {pages.map((page) => (
                  <Link
                    key={page.title}
                    href={page.href}
                    className="block text-sm text-slate-300 hover:text-cyan-300 transition-colors py-2 tracking-wide"
                    onClick={() => setIsOpen(false)}
                  >
                    {page.title}
                  </Link>
                ))}
              </div>
            </div>

            <Button
              className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-500/90 hover:via-blue-600/90 hover:to-purple-600/90 w-full shadow-lg font-semibold tracking-wide"
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
  )
}
