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
      <section className="py-24 bg-[#171C21]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#64FFE3] mx-auto"></div>
          <p className="mt-6 text-[#fafafa]/80">Memuat layanan unggulan...</p>
        </div>
      </section>
    );
  }

  /* ---------- KOSONG ---------- */
  if (services.length === 0) {
    return (
      <section className="py-24 bg-[#171C21] text-[#fafafa] text-center">
        <h2 className="text-3xl font-bold mb-4">Belum ada layanan populer</h2>
        <p className="text-[#fafafa]/70">Silakan kembali lagi nanti.</p>
      </section>
    );
  }

  return (
    <section className="py-24 bg-[#171C21] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center px-6 py-3 rounded-full glass border border-[#64FFE3]/30 text-[#64FFE3] text-sm font-medium mb-8 backdrop-blur-sm shadow-lg">
              <Zap className="w-4 h-4 mr-2 text-[#64FFE3]" />
              Layanan Unggulan
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#fafafa] mb-8">
              Service Digital
              <span className="block bg-gradient-to-r from-[#64FFE3] to-[#3640F0] bg-clip-text text-transparent">
                Terpopuler
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={400}>
            <p className="text-lg text-[#fafafa]/80 max-w-4xl mx-auto leading-relaxed">
              Kami menyediakan layanan digital profesional dengan standar
              kualitas tinggi untuk membantu bisnis Anda berkembang pesat.
            </p>
          </ScrollReveal>
        </div>

        {/* Services Grid - Replace the carousel section */}
        <ScrollReveal direction="up" delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="bg-[#171C21] border border-[#64FFE3]/30 rounded-xl p-6 
                         hover:border-cyan-400/50 transition-colors duration-300 group"
              >
                {/* BADGE POPULER */}
                {service.popular && (
                  <div className="mb-4 inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  <Star className="w-3 h-3 mr-1" />
                  Populer
                </div>
                )}

                {/* IMAGE */}
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden border border-[#64FFE3]/10">
                  <Image
                    src={
                      service.image?.startsWith("/")
                        ? service.image
                        : `${service.image || "placeholder.jpg"}`
                    }
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    className="object-cover transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171C21]/50 to-transparent"></div>
                </div>

                {/* TITLE & DESCRIPTION */}
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-slate-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-[#fafafa]/80 mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* FEATURES */}
                {service.features && service.features.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-[#fafafa] mb-2">
                      Fitur Utama:
                    </h4>
                    <ul className="space-y-1">
                      {service.features.slice(0, 3).map((f, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-[#fafafa]/70"
                        >
                          <div className="w-1.5 h-1.5 bg-[#64b9ff] rounded-full"></div>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* PRICE & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-[#64FFE3]/20">
                  <span className="text-2xl font-bold text-slate-400">
                    {service.price}
                  </span>
                  <Link href="/booking">
                    <button className="bg-[#3640F0] text-white px-4 py-2 rounded
                                                         hover:bg-[#3640F0]/80 transition-all duration-300
                                                         hover:scale-105 shadow-lg hover:shadow-[#3640F0]/50">
                      Pilih Layanan
                      <ArrowRight className="inline ml-2 w-4 h-4 transition-transform" />
                    </button>
                  </Link>
                </div>

                {/* NOTE */}
                {service.note && (
                  <p className="mt-4 text-xs text-[#fafafa]/60 italic">
                    💡 {service.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* CTA Section */}
        <ScrollReveal direction="up" delay={600}>
          <div className="text-center mt-16">
            <div className="glass rounded-2xl p-8 border border-[#64FFE3]/20">
              <h3 className="text-2xl font-bold text-[#fafafa] mb-4">
                Butuh Layanan Kustom?
              </h3>
              <p className="text-[#fafafa]/80 mb-6 max-w-2xl mx-auto">
                Kami juga menyediakan solusi khusus sesuai kebutuhan bisnis
                Anda. Konsultasikan proyek Anda dengan tim ahli kami.
              </p>
              <Link
                href="/contact"
                className="btn-secondary inline-flex items-center "
              >
                 <button className="bg-[#3640F0] text-white px-4 py-2 rounded
                                                         hover:bg-[#3640F0]/80 transition-all duration-300
                                                         hover:scale-105 shadow-lg hover:shadow-[#3640F0]/50">
                Konsultasi Gratis
                <ArrowRight className="inline ml-2 w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
