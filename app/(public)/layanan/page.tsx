"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Shield, Zap, ArrowRight, Star } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  note?: string;
  category: string;
  status: "active" | "inactive";
  image?: string;
  gradient?: string;
  features?: string[];
  popular?: boolean;
}

export default function LayananPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        setServices(
          Array.isArray(data) ? data.filter((s) => s.status === "active") : []
        );
      } catch {
        setServices([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchServices();
  }, []);

  /* ---------- LOADING ---------- */
  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#171C21] text-[#64FFE3]">
        <div className="text-xl">Memuat layanan...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#171C21] text-white px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* HERO / TITLE */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#64FFE3]/30 bg-[#64FFE3]/10 backdrop-blur-sm mb-6">
            <Zap className="w-4 h-4 text-[#64FFE3]" />
            <span className="text-sm font-semibold tracking-wide">
              Layanan Profesional
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-[#64FFE3]">
            Layanan Kami
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Berbagai layanan teknologi profesional untuk mendukung operasional
            bisnis Anda
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {services.map((s) => (
            <div
              key={s.id}
              className="bg-[#171C21] border border-[#64FFE3]/30 rounded-xl p-6 
                         hover:border-[#64FFE3] hover:shadow-[0_0_20px_#64FFE3]/40
                         transition-all duration-300 group"
            >
              {s.popular && (
                <div className="mb-4 inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  <Star className="w-3 h-3 mr-1" />
                  Populer
                </div>
              )}

              <Image
                src={s.image || "/images/placeholder.jpg"}
                alt={s.title}
                width={400}
                height={200}
                className="rounded-md w-full h-48 object-cover mb-4"
              />

              <h2 className="text-xl font-semibold text-[#64FFE3] mb-2">
                {s.title}
              </h2>
              <p className="text-sm text-gray-300 mb-4">
                {s.description}
              </p>

              {/* FITUR */}
              {s.features?.length && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-white mb-2">
                    Fitur Utama:
                  </h4>
                  <ul className="space-y-1">
                    {s.features.map((f, i) => (
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
                  {s.price}
                </span>
                <Link href="/booking">
                  <button
                    className="bg-[#3640F0] text-white px-4 py-2 rounded
                                     hover:bg-[#3640F0]/80 transition-all duration-300
                                     hover:scale-105 shadow-lg hover:shadow-[#3640F0]/50"
                  >
                    Pilih Layanan
                    <ArrowRight className="inline ml-2 w-4 h-4" />
                  </button>
                </Link>
              </div>

              {s.note && (
                <p className="mt-4 text-xs text-gray-400 italic">
                  ⚠️ {s.note}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* ADDITIONAL INFO */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Clock,
              title: "Response Cepat",
              desc: "Dukungan teknis 24/7 dengan response time < 2 jam",
            },
            {
              icon: Shield,
              title: "Garansi Layanan",
              desc: "Garansi 30 hari untuk semua layanan yang kami berikan",
            },
            {
              icon: Zap,
              title: "Solusi Terbaik",
              desc: "Tim ahli berpengalaman dengan solusi yang tepat sasaran",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="text-center p-6 rounded-2xl bg-gradient-to-r from-[#64FFE3]/10 to-[#3640F0]/10
                         border border-[#64FFE3]/20 backdrop-blur-sm
                         hover:border-[#64FFE3] hover:shadow-[0_0_20px_#64FFE3]/30
                         transition-all duration-300"
            >
              <item.icon className="w-8 h-8 text-[#64FFE3] mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA SECTION */}
        <div className="text-center">
          <div
            className="bg-gradient-to-r from-[#64FFE3]/10 to-[#3640F0]/10
                          border border-[#64FFE3]/20 rounded-2xl p-8
                          hover:border-[#64FFE3] hover:shadow-[0_0_25px_#64FFE3]/40
                          transition-all duration-300"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Siap untuk Memulai?
            </h2>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">
              Hubungi kami sekarang untuk konsultasi gratis dan dapatkan solusi
              terbaik untuk kebutuhan teknologi Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <button
                  className="bg-[#3640F0] text-white px-6 py-3 rounded
                                   hover:bg-[#3640F0]/80 hover:scale-105
                                   shadow-lg hover:shadow-[#3640F0]/40
                                   transition-all duration-300"
                >
                  Mulai Konsultasi
                  <ArrowRight className="inline ml-2 w-4 h-4" />
                </button>
              </Link>
              <Link href="/contact">
                <button
                  className="border border-[#64FFE3]/30 text-[#64FFE3] px-6 py-3 rounded
                                   hover:bg-[#64FFE3]/20 hover:border-[#64FFE3]
                                   transition-all duration-300"
                >
                  Hubungi Kami
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
