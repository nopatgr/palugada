import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Monitor,
  Settings,
  Wrench,
  Shield,
  Clock,
  Users,
  Award,
} from "lucide-react";

export function Footer() {
  const services = [
    { name: "OS Installation", href: "/layanan#os-installation", icon: Monitor },
    { name: "Software Setup", href: "/layanan#software-setup", icon: Settings },
    { name: "Tech Support", href: "/layanan#tech-support", icon: Wrench },
    { name: "Hardware Upgrade", href: "/layanan#hardware-upgrade", icon: Shield },
  ];

  const company = [
    { name: "Tentang Kami", href: "/about" },
    { name: "Layanan", href: "/layanan" },
    { name: "Produk", href: "/produk" },
    { name: "Testimonial", href: "/testimonial" },
    { name: "Contact", href: "/contact" },
    { name: "Booking", href: "/booking" },
  ];

  const quickLinks = [
    { name: "Konsultasi Gratis", href: "/booking" },
    { name: "Support 24/7", href: "/contact" },
    { name: "Garansi Layanan", href: "/layanan" },
    { name: "Portfolio", href: "/produk" },
  ];

  const stats = [
    { value: "100+", label: "Client Puas", icon: Users },
    { value: "250+", label: "Project Selesai", icon: Award },
    { value: "24/7", label: "Support", icon: Clock },
    { value: "98%", label: "Satisfaction", icon: Shield },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white border-t border-slate-700">
      <div className="container mx-auto px-4 py-16">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 pb-8 border-b border-slate-700">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="text-center group">
                <div className="mx-auto w-12 h-12 bg-gradient-to-r from-slate-700 to-slate-600 rounded-xl flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="h-6 w-6 text-cyan-400" />
                </div>
                <div className="text-2xl font-bold text-cyan-400 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400 font-medium tracking-wide">{stat.label}</div>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6 group">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-lg tracking-wider">PD</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white group-hover:text-cyan-300 transition-colors tracking-wide">
                  Palugada Digital
                </span>
                <span className="text-sm text-cyan-400 font-medium tracking-wider">
                  Hardware Solutions
                </span>
              </div>
            </Link>
            <p className="text-slate-300 mb-6 max-w-md leading-relaxed tracking-wide">
              Solusi hardware terpadu untuk mengoptimalkan sistem Anda. Dari
              instalasi OS hingga upgrade hardware, kami siap membantu mewujudkan
              kebutuhan teknologi hardware Anda dengan standar profesional.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 group">
                <Phone className="h-5 w-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                <span className="text-slate-300 group-hover:text-white transition-colors tracking-wide">+62 812-3456-7890</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <Mail className="h-5 w-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                <span className="text-slate-300 group-hover:text-white transition-colors tracking-wide">
                  hello@palugadadigital.com
                </span>
              </div>
              <div className="flex items-start space-x-3 group">
                <MapPin className="h-5 w-5 text-cyan-400 mt-0.5 group-hover:text-cyan-300 transition-colors" />
                <span className="text-slate-300 group-hover:text-white transition-colors tracking-wide">
                  Jalan Pisang Batu Kerta Mukti
                  <br />
                  Cibitung, Kabupaten Bekasi
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              <Link
                href="#"
                className="text-slate-400 hover:text-cyan-400 transition-colors p-2 rounded-lg hover:bg-slate-800/50 backdrop-blur-sm"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-slate-400 hover:text-cyan-400 transition-colors p-2 rounded-lg hover:bg-slate-800/50 backdrop-blur-sm"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-slate-400 hover:text-cyan-400 transition-colors p-2 rounded-lg hover:bg-slate-800/50 backdrop-blur-sm"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-slate-400 hover:text-cyan-400 transition-colors p-2 rounded-lg hover:bg-slate-800/50 backdrop-blur-sm"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-white tracking-wide">
              Layanan Hardware
            </h3>
            <ul className="space-y-3">
              {services.map((service) => {
                const IconComponent = service.icon
                return (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className="flex items-center space-x-2 text-slate-300 hover:text-cyan-300 transition-colors group"
                    >
                      <IconComponent className="h-4 w-4 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                      <span className="tracking-wide">{service.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-white tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-300 hover:text-cyan-300 transition-colors tracking-wide hover:underline"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-white tracking-wide">
              Perusahaan
            </h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-300 hover:text-cyan-300 transition-colors tracking-wide hover:underline"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="text-center">
            <div className="text-slate-400 text-sm tracking-wide">
              © 2025 Palugada Digital. All rights reserved. | Hardware Solutions Expert
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
