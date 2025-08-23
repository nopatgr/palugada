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
  Book,
} from "lucide-react";

export function Footer() {
  const services = [
    { name: "Operasi Sistem", href: "/layanan#operasi-sistem", icon: Monitor },
    {
      name: "Instalasi Software",
      href: "/layanan#instalasi-software",
      icon: Settings,
    },
    {
      name: "Web Development & Design",
      href: "/layanan#web-design",
      icon: Wrench,
    },
    { name: "Dokumen & Tugas", href: "/layanan#dokumen-tugas", icon: Book },
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

  return (
    <footer className="bg-[#171C21] text-[#fafafa] relative border-t border-[#64FFE3]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6 group">
              
              <div className="flex flex-col">
                <span className="font-bold text-xl text-[#fafafa] group-hover:text-[#64FFE3] transition-colors ">
                  Palugada Digital
                </span>
                <span className="text-sm text-[#fafafa]/70 font-medium tracking-wider">
                  Hardware Solutions
                </span>
              </div>
            </Link>
            <p className="text-[#fafafa]/80 mb-6 max-w-md leading-relaxed tracking-wide">
              Solusi hardware terpadu untuk mengoptimalkan sistem Anda. Dari
              instalasi OS hingga upgrade hardware, kami siap membantu
              mewujudkan kebutuhan teknologi hardware Anda dengan standar
              profesional.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 group">
                <Phone className="h-5 w-5 text-[#64FFE3] group-hover:text-[#52e6d1] transition-colors" />
                <span className="text-[#fafafa]/80 group-hover:text-[#fafafa] transition-colors tracking-wide">
                  +62 857-7710-1676
                </span>
              </div>
              <div className="flex items-center space-x-3 group">
                <Mail className="h-5 w-5 text-[#64FFE3] group-hover:text-[#52e6d1] transition-colors" />
                <span className="text-[#fafafa]/80 group-hover:text-[#fafafa] transition-colors tracking-wide">
                  services@palugada.biz.id
                </span>
              </div>
              <div className="flex items-start space-x-3 group">
                <MapPin className="h-5 w-5 text-[#64FFE3] mt-0.5 group-hover:text-[#52e6d1] transition-colors" />
                <span className="text-[#fafafa]/80 group-hover:text-[#fafafa] transition-colors tracking-wide">
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
                className="text-[#fafafa]/70 hover:text-[#64FFE3] transition-colors p-2 rounded-lg hover:bg-[#242b35]/50 backdrop-blur-sm"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-[#fafafa]/70 hover:text-[#64FFE3] transition-colors p-2 rounded-lg hover:bg-[#242b35]/50 backdrop-blur-sm"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-[#fafafa]/70 hover:text-[#64FFE3] transition-colors p-2 rounded-lg hover:bg-[#242b35]/50 backdrop-blur-sm"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-[#fafafa]/70 hover:text-[#64FFE3] transition-colors p-2 rounded-lg hover:bg-[#242b35]/50 backdrop-blur-sm"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-[#fafafa] tracking-wide">
              Layanan Hardware
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-[#fafafa]/80 hover:text-[#64FFE3] transition-colors tracking-wide hover:underline"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-[#fafafa] tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[#fafafa]/80 hover:text-[#64FFE3] transition-colors tracking-wide hover:underline"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-[#fafafa] tracking-wide">
              Perusahaan
            </h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[#fafafa]/80 hover:text-[#64FFE3] transition-colors tracking-wide hover:underline"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#64FFE3]/20 mt-12 pt-8">
          <div className="text-center">
            <div className="text-center py-4 text-sm text-[#fafafa]/60">
              &copy; {new Date().getFullYear()} Palugada Digital. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
