"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Zap, Badge, Star } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { InteractiveCarousel } from "../ui/interactive-carousel";
import { ScrollReveal } from "../ui/scroll-reveal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
// import { Service } from "@/types/service";

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  note: string;
  category: string;
  status: "active" | "inactive";
  image?: string;
  gradient?: string;
  features?: string[];
  popular?: boolean;
}

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        // 🔁 filter hanya yang populer
        const popular = Array.isArray(data)
          ? data.filter((s) => s.status === "active" && s?.popular)
          : [];
        setServices(popular);
      } catch {
        setServices([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchServices();
  }, []);

  /* ---------- LOADING ---------- */
  if (isLoading) {
    return (
      <section className="py-24 bg-[#1a365d]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#64FFE3] mx-auto"></div>
          <p className="mt-6 text-gray-300">Memuat layanan unggulan...</p>
        </div>
      </section>
    );
  }

  /* ---------- KOSONG ---------- */
  if (services.length === 0) {
    return (
      <section className="py-24 bg-[#1a365d] text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Belum ada layanan populer</h2>
        <p className="text-gray-300">Silakan kembali lagi nanti.</p>
      </section>
    );
  }

  // Jika tidak ada services, tampilkan fallback
  // const displayServices = services.length > 0 ? services : fallbackServices;

  return (
    <section className="py-24 bg-[#1a365d] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 border border-blue-400/30 text-blue-300 text-sm font-medium mb-8 backdrop-blur-sm shadow-lg">
              <Zap className="w-4 h-4 mr-2 text-blue-400" />
              Layanan Unggulan
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
              Service Digital
              <span className="block bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Terpopuler
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={400}>
            <p className="text-lg text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Kami menyediakan layanan digital profesional dengan standar
              kualitas tinggi untuk membantu bisnis Anda berkembang pesat.
            </p>
          </ScrollReveal>
        </div>

        {/* Services Grid - Replace the carousel section */}
        <ScrollReveal direction="up" delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-[#171C21] border border-[#64FFE3]/30 rounded-xl p-6
                 hover:border-[#64FFE3] hover:shadow-[0_0_20px_#64FFE3]/40
                 transition-all duration-300 group"
              >
                {/* IMAGE */}
                <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
                  <Image
                    src={
                      service.image?.startsWith("/")
                        ? service.image
                        : `/images/${service.image || "placeholder.jpg"}`
                    }
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    className="object-cover"
                  />
                </div>

                {/* BADGE POPULER */}
                {service.popular && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-yellow-700 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    <Star className="w-3 h-3 inline mr-1" />
                    Populer
                  </div>
                )}

                {/* TITLE & DESCRIPTION */}
                <h2 className="text-xl font-semibold text-[#64FFE3] mb-2">
                  {service.title}
                </h2>
                <p className="text-sm text-gray-300 mb-4">
                  {service.description}
                </p>

                {/* FEATURES */}
                {service.features && service.features.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-white mb-2">
                      Fitur Utama:
                    </h4>
                    <ul className="space-y-1">
                      {service.features.map((f, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-gray-400"
                        >
                          <div className="w-1.5 h-1.5 bg-[#64FFE3] rounded-full" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* PRICE & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-[#64FFE3]/20">
                  <span className="text-2xl font-bold text-[#64FFE3]">
                    {service.price}
                  </span>
                  <Link href="/booking">
                    <button className="bg-[#3640F0] text-white px-4 py-2 rounded hover:bg-[#3640F0]/80 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#3640F0]/50">
                      Pilih Layanan
                      <ArrowRight className="inline ml-2 w-4 h-4" />
                    </button>
                  </Link>
                </div>

                {/* NOTE */}
                {service.note && (
                  <p className="mt-4 text-xs text-gray-400 italic">
                    ⚠️ {service.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
