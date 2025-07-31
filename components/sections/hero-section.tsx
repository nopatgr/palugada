"use client";

import Link from "next/link";
import {
  ArrowRight,
  Play,
  Pause,
  Monitor,
  Settings,
  Wrench,
  Star,
  Users,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoBackground } from "@/components/ui/video-background";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useState, useRef, useEffect } from "react";

/**
 * @typedef {Object} HeroSectionProps
 * @property {string=} title
 * @property {string=} subtitle
 * @property {string=} description
 * @property {{ text: string, href: string }=} primaryCTA
 * @property {{ text: string, href: string }=} secondaryCTA
 * @property {Array<{ value: string, label: string, gradient: string }>=} stats
 * @property {boolean=} showVideoControls
 */

// Komponen CountUp sederhana
function CountUp({
  end,
  duration = 1200,
}: {
  end: string | number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    let start = 0;
    const endNum =
      typeof end === "string" ? parseInt(end.replace(/\D/g, "")) : end;
    if (isNaN(endNum)) {
      setDone(true);
      return;
    }
    const increment = endNum / (duration / 16);
    let raf: number;
    function update() {
      start += increment;
      if (start < endNum) {
        setCount(Math.floor(start));
        raf = requestAnimationFrame(update);
      } else {
        setCount(endNum);
        setDone(true);
      }
    }
    update();
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);
  if (typeof end === "string" && done) return <span>{end}</span>;
  if (typeof end === "string")
    return (
      <span>
        {count}
        {end.replace(/\d+/g, "")}
      </span>
    );
  return <span>{count}</span>;
}

export function HeroSection({
  title = "Hardware Solutions",
  subtitle = "Expert",
  description = "Palugada Digital menyediakan layanan hardware terbaik untuk kebutuhan teknologi Anda. Dari instalasi OS hingga setup software, kami siap membantu.",
  primaryCTA = {
    text: "Mulai Konsultasi",
    href: "/booking",
  },
  secondaryCTA = {
    text: "Lihat Layanan",
    href: "/layanan",
  },
  stats = [
    {
      value: "100+",
      label: "Project Selesai",
      gradient: "from-cyan-400 to-blue-500",
    },
    {
      value: "50+",
      label: "Client Puas",
      gradient: "from-blue-500 to-purple-500",
    },
    {
      value: "5★",
      label: "Rating",
      gradient: "from-purple-500 to-cyan-400",
    },
  ],
  showVideoControls = false,
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    const video = videoRef.current?.querySelector("video");
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <VideoBackground
      src="/videos/blackhole.webm"
      className="min-h-screen flex items-center"
      overlayOpacity={0.6}
      position="top-shifted"
    >
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Video Controls */}
            {showVideoControls && (
              <ScrollReveal direction="fade" delay={200}>
                <div className="flex mb-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleVideo}
                    className="bg-slate-800/20 border-slate-600/30 text-slate-200 hover:bg-slate-800/40 backdrop-blur-sm"
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4 mr-2" />
                    ) : (
                      <Play className="h-4 w-4 mr-2" />
                    )}
                    {isPlaying ? "Pause" : "Play"}
                  </Button>
                </div>
              </ScrollReveal>
            )}

            {/* Tag */}
            {/* <ScrollReveal direction="up" delay={200}>
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm">
                <Monitor className="w-4 h-4 mr-2 text-cyan-400" />
                <span className="text-cyan-300 text-sm font-semibold tracking-wide">
                  Hardware Solutions Portfolio
                </span>
              </div>
            </ScrollReveal> */}

            {/* Title */}
            <ScrollReveal direction="up" delay={300}>
              <div className="space-y-6 mt-24 ">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white">
                  {title}
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent block mt-2">
                    {subtitle}
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-200 max-w-lg leading-relaxed tracking-wide">
                  {description}
                </p>
              </div>
            </ScrollReveal>

            {/* CTA Buttons */}
            <ScrollReveal direction="up" delay={500}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-500/90 hover:via-blue-600/90 hover:to-purple-600/90 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 font-semibold tracking-wide"
                  asChild
                >
                  <Link href={primaryCTA.href}>
                    {primaryCTA.text}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  // variant="outline"
                  size="lg"
                  className="bg-[#0077b6] border-white/30 text-white hover:bg-[#00b4d8] 
             backdrop-blur-sm transition-all duration-300 transform 
             hover:scale-105 font-semibold tracking-wide px-4 py-2 rounded-lg "
                  asChild
                >
                  <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
                </Button>
              </div>
            </ScrollReveal>

            {/* Animated Stats */}
            <ScrollReveal direction="up" delay={700}>
              <div className="flex gap-8 mt-8">
                {stats.map((stat, i) => (
                  <div key={i} className="flex flex-col items-center group">
                    <span
                      className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}
                    >
                      <CountUp end={stat.value} />
                    </span>
                    <span className="text-slate-200 text-sm mt-1 font-medium">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Testimoni Singkat */}
            {/* <ScrollReveal direction="up" delay={900}>
              <div className="mt-8 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src="/placeholder-user.jpg"
                      alt="Testimoni"
                      className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400"
                    />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full animate-ping" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium leading-relaxed">
                      "Pelayanan cepat, ramah, dan sangat membantu! Tim sangat
                      profesional."
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-cyan-200 font-medium">
                        - Rina, Customer
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal> */}
          </div>

          {/* Right Column - Ilustrasi/Icon */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              {/* Background Glow */}
              <div className="w-96 h-96 rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-500/15 to-purple-500/20 blur-3xl absolute -top-20 -left-20 z-0 animate-pulse" />

              {/* Main Icons */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative mb-8">
                  <Wrench className="w-28 h-28 text-cyan-400 drop-shadow-2xl animate-bounce" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-400 rounded-full animate-ping" />
                </div>

                <div className="relative mb-6">
                  <Settings
                    className="w-20 h-20 text-blue-400 drop-shadow-xl animate-spin"
                    style={{ animationDuration: "3s" }}
                  />
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-blue-400 rounded-full animate-pulse" />
                </div>

                <div className="relative">
                  <Monitor className="w-24 h-24 text-purple-400 drop-shadow-xl animate-pulse" />
                  <div
                    className="absolute -top-1 -right-1 w-5 h-5 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.5s" }}
                  />
                </div>
              </div>

              {/* Floating Elements */}
              <div
                className="absolute top-10 right-10 w-3 h-3 bg-cyan-400 rounded-full animate-bounce"
                style={{ animationDelay: "1s" }}
              />
              <div
                className="absolute bottom-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                style={{ animationDelay: "2s" }}
              />
              <div
                className="absolute top-32 left-5 w-4 h-4 bg-purple-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
          </div>
        </div>
      </div>
    </VideoBackground>
  );
}
