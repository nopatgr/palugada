"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { InteractiveCarousel } from "../ui/interactive-carousel";
import { ScrollReveal } from "../ui/scroll-reveal";

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  duration: string;
  clientsServed: number;
  featured: boolean;
  image?: string;
}

interface ServiceCardData {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price: string;
  ctaHref: string;
  isActive: boolean;
}

export function ServicesSection() {
  const [services, setServices] = useState<ServiceCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Data fallback yang akan selalu ditampilkan
  const fallbackServices: ServiceCardData[] = [
    {
      id: "1",
      title: "Website Development",
      description:
        "Pengembangan website profesional dengan teknologi modern, responsive design, dan SEO optimized untuk meningkatkan online presence bisnis Anda.",
      icon: "🌐",
      features: [
        "Responsive Design",
        "SEO Optimized",
        "Admin Panel",
        "SSL Certificate",
        "Free Maintenance 3 Bulan",
      ],
      price: "Mulai Rp 2.500.000",
      ctaHref: "/services/website-development",
      isActive: true,
    },
    {
      id: "2",
      title: "Mobile App Development",
      description:
        "Pembuatan aplikasi mobile Android & iOS dengan performa tinggi, user experience optimal, dan fitur-fitur canggih sesuai kebutuhan bisnis.",
      icon: "📱",
      features: [
        "Cross Platform",
        "Push Notifications",
        "Offline Support",
        "App Store Deployment",
        "Free Updates 6 Bulan",
      ],
      price: "Mulai Rp 5.000.000",
      ctaHref: "/services/mobile-app-development",
      isActive: true,
    },
    {
      id: "3",
      title: "E-Commerce Solution",
      description:
        "Solusi toko online lengkap dengan payment gateway, inventory management, dan sistem analytics untuk mengoptimalkan penjualan online.",
      icon: "🛒",
      features: [
        "Payment Gateway",
        "Inventory Management",
        "Order Tracking",
        "Customer Management",
        "Sales Analytics",
      ],
      price: "Mulai Rp 4.000.000",
      ctaHref: "/services/ecommerce-solution",
      isActive: true,
    },
  ];

  // Function to convert API service to ServiceCardData
  const convertApiServiceToCardData = (
    apiService: Service
  ): ServiceCardData => {
    const categoryIcons: { [key: string]: string } = {
      Development: "🌐",
      Design: "🎨",
      Marketing: "📈",
      SEO: "🔍",
      "E-commerce": "🛒",
    };

    const categoryFeatures: { [key: string]: string[] } = {
      Development: [
        "Responsive Design",
        "Modern Technology",
        "SEO Optimized",
        "Performance Optimized",
        "Maintenance Support",
      ],
      Design: [
        "User-Centered Design",
        "Modern UI/UX",
        "Cross-Platform",
        "Brand Guidelines",
        "Revision Support",
      ],
      Marketing: [
        "Strategy Planning",
        "Campaign Management",
        "Analytics & Reporting",
        "Content Creation",
        "ROI Optimization",
      ],
      SEO: [
        "Keyword Research",
        "On-Page SEO",
        "Technical SEO",
        "Link Building",
        "Performance Tracking",
      ],
      "E-commerce": [
        "Payment Gateway",
        "Inventory Management",
        "Order Tracking",
        "Customer Management",
        "Sales Analytics",
      ],
    };

    return {
      id: apiService.id,
      title: apiService.title,
      description: apiService.description,
      icon: categoryIcons[apiService.category] || "⚡",
      features: categoryFeatures[apiService.category] || [
        "Professional Service",
        "Quality Guaranteed",
        "Expert Team",
        "Support Included",
        "Best Practices",
      ],
      price: `Mulai $${apiService.price.toLocaleString()}`,
      ctaHref: `/services/${apiService.title
        .toLowerCase()
        .replace(/\s+/g, "-")}`,
      isActive: true,
    };
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Coba fetch dari API terlebih dahulu
        const response = await fetch("/api/services");
        if (response.ok) {
          const data = await response.json();
          // Pastikan data adalah array dan convert ke format yang dibutuhkan
          if (Array.isArray(data) && data.length > 0) {
            const convertedServices = data.map(convertApiServiceToCardData);
            setServices(convertedServices);
          } else {
            // Jika API mengembalikan data kosong, gunakan fallback
            setServices(fallbackServices);
          }
        } else {
          // Jika API error, gunakan fallback
          console.warn(
            "API services tidak tersedia, menggunakan data fallback"
          );
          setServices(fallbackServices);
        }
      } catch (error) {
        // Jika terjadi error, gunakan fallback
        console.warn(
          "Error fetching services, menggunakan data fallback:",
          error
        );
        setServices(fallbackServices);
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
  const displayServices = services.length > 0 ? services : fallbackServices;

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
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
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
        <ScrollReveal direction="up" delay={600}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {displayServices.slice(0, 3).map((service) => (
              <div key={service.id} className="relative group">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl lg:rounded-3xl blur-xl lg:blur-2xl group-hover:blur-2xl lg:group-hover:blur-3xl transition-all duration-700 opacity-0 group-hover:opacity-100"></div>

                {/* Card */}
                <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-700/90 to-slate-800/90 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-slate-600/30 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2 h-full overflow-hidden">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400 to-pink-400 rounded-full blur-2xl transform -translate-x-12 translate-y-12 group-hover:scale-125 transition-transform duration-700"></div>
                  </div>

                  {/* Subtle grid pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                      backgroundSize: "20px 20px",
                    }}
                  ></div>

                  {/* Header */}
                  <div className="text-center mb-6 relative z-10">
                    <div className="text-3xl lg:text-4xl xl:text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                      {service.icon}
                    </div>
                    <h3 className="text-base lg:text-lg xl:text-xl font-bold text-white mb-3 drop-shadow-sm">
                      {service.title}
                    </h3>
                    <p className="text-slate-300 text-xs lg:text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6 relative z-10">
                    {service.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-6 h-6 lg:w-7 lg:h-7 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-blue-400/20">
                          <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                        </div>
                        <span className="text-slate-200 font-medium text-xs lg:text-sm">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="text-center mb-6 relative z-10">
                    <div className="text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-sm">
                      {service.price}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="text-center mt-auto relative z-10">
                    <Link href={service.ctaHref}>
                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 hover:from-blue-700 hover:via-purple-700 hover:to-purple-800 text-white border-0 transition-all duration-300 transform hover:scale-105 px-6 py-3 lg:px-8 lg:py-4 rounded-xl font-medium group shadow-lg hover:shadow-xl hover:shadow-blue-500/25 text-xs lg:text-sm"
                      >
                        <span className="flex items-center justify-center">
                          Pilih Layanan
                          <ArrowRight className="ml-2 lg:ml-3 h-4 w-4 lg:h-5 lg:w-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
