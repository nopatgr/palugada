"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Star, Zap, Shield, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

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

export default function LayananPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services");
        const data = await response.json();
        // Hanya tampilkan layanan yang aktif
        setServices(
          data.services?.filter(
            (service: Service) => service.status === "active"
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-futuristic-accent/10 to-futuristic-cyan/10 border-futuristic-accent/20 backdrop-blur-sm flex items-center justify-center">
        <div className="text-futuristic-text-primary text-xl">
          Memuat layanan...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-futuristic-accent/10 to-futuristic-cyan/10 border-futuristic-accent/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-futuristic-accent/30 bg-futuristic-accent/10 backdrop-blur-sm mb-6">
              <Zap className="w-4 h-4 text-futuristic-accent" />
              <span className="text-futuristic-text-primary text-sm font-semibold tracking-wide">
                Layanan Profesional
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-futuristic-text-primary tracking-tight">
              Layanan Kami
            </h1>
            <p className="text-xl text-futuristic-text-secondary max-w-2xl mx-auto leading-relaxed tracking-wide">
              Berbagai layanan teknologi profesional untuk mendukung operasional
              bisnis Anda
            </p>
          </div>
        </ScrollReveal>

        {/* Services Grid */}
        <ScrollReveal direction="up" delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <Card
                key={service.id}
                className="bg-futuristic-secondary/50 border-futuristic-border backdrop-blur-sm hover:bg-futuristic-secondary/70 transition-all duration-300 group"
              >
                <CardHeader className="relative">
                  {service.popular && (
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
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

        {/* Additional Info */}
        <ScrollReveal direction="up" delay={400}>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-futuristic-accent/10 to-futuristic-cyan/10 border-futuristic-accent/20 backdrop-blur-sm transition-all duration-300">
              <Clock className="w-8 h-8 text-futuristic-accent mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-futuristic-text-primary mb-2">
                Response Cepat
              </h3>
              <p className="text-futuristic-text-secondary text-sm">
                Dukungan teknis 24/7 dengan response time &lt; 2 jam
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-futuristic-accent/10 to-futuristic-cyan/10 border-futuristic-accent/20 backdrop-blur-sm transition-all duration-300">
              <Shield className="w-8 h-8 text-futuristic-cyan mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-futuristic-text-primary mb-2">
                Garansi Layanan
              </h3>
              <p className="text-futuristic-text-secondary text-sm">
                Garansi 30 hari untuk semua layanan yang kami berikan
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-futuristic-accent/10 to-futuristic-cyan/10 border-futuristic-accent/20 backdrop-blur-sm transition-all duration-300">
              <Zap className="w-8 h-8 text-futuristic-accent-hover mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-futuristic-text-primary mb-2">
                Solusi Terbaik
              </h3>
              <p className="text-futuristic-text-secondary text-sm">
                Tim ahli berpengalaman dengan solusi yang tepat sasaran
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* CTA Section */}
        <ScrollReveal direction="up" delay={600}>
          <div className="text-center">
            <Card className="bg-gradient-to-r from-futuristic-accent/10 to-futuristic-cyan/10 border-futuristic-accent/20 backdrop-blur-sm">
              <CardContent className="p-8">
                <h2 className="text-4xl font-bold text-futuristic-text-primary mb-4">
                  Siap untuk Memulai?
                </h2>
                <p className="text-futuristic-text-secondary mb-6 max-w-md mx-auto">
                  Hubungi kami sekarang untuk konsultasi gratis dan dapatkan
                  solusi terbaik untuk kebutuhan teknologi Anda.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-futuristic-accent to-futuristic-cyan hover:from-futuristic-accent-hover hover:to-futuristic-cyan text-futuristic-text-primary shadow-lg hover:shadow-futuristic-glow transition-all duration-300 transform hover:scale-105"
                    asChild
                  >
                    <Link href="/booking">
                      Mulai Konsultasi
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-futuristic-text-primary/30 text-futuristic-text-primary hover:bg-futuristic-secondary/50 backdrop-blur-sm"
                    asChild
                  >
                    <Link href="/contact">Hubungi Kami</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
