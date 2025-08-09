"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Zap, Badge, Star } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { InteractiveCarousel } from "../ui/interactive-carousel";
import { ScrollReveal } from "../ui/scroll-reveal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
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
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services");
        const data = await response.json();
        // Tampilkan hanya layanan yang aktif dan populer
        setServices(
          data.services?.filter(
            (service: Service) =>
              service.status === "active" && service.popular === true
          ) || []
        );
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-6 text-slate-600 text-lg">
              Memuat layanan unggulan...
            </p>
          </div>
        </div>
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
            {services.map((service, index) => (
              <Card
                key={service.id}
                className="bg-futuristic-secondary/50 border-futuristic-border backdrop-blur-sm hover:bg-futuristic-secondary/70 transition-all duration-300 group"
              >
                <CardHeader className="relative">
                  {service.popular && (
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-yellow-700 ">
                     <Star className="w-3 h-3 mr-1" />
                      Populer
                     </Badge>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    
                    <CardTitle className="text-xl text-futuristic-text-primary">
                      {service.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-futuristic-text-secondary leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {service.features && service.features.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-[#fafafa] mb-3">
                        Fitur Utama:
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {service.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-futuristic-text-secondary text-sm"
                          >
                            <div className="w-1.5 h-1.5 bg-[#fafafa] rounded-full" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-futuristic-border">
                    <div>
                      <span className="text-2xl font-bold text-[#fafafa]">
                        {service.price}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-futuristic-cyan hover:from-blue-500 hover:to-blue-400 text-futuristic-text-primary border-0 shadow-lg hover:shadow-futuristic-glow transition-all duration-300 transform hover:scale-105"
                      asChild
                    >
                      <Link href="/booking">
                        Pilih Layanan
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>

                  {service.note && (
                    <p className="mt-4 text-xs text-futuristic-text-secondary italic">
                      ⚠️ {service.note}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
