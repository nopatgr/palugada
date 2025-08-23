"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  BarChart3, 
  Package, 
  Settings, 
  Home,
  LogOut,
  X,
  Menu,
  User,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: Home },
  // { href: "/admin/services", label: "Kelola Layanan", icon: Package },
  { href: "/admin/stats", label: "Statistik", icon: BarChart3 },
  { href: "/admin/settings", label: "Pengaturan", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Mobile Menu Button - Fixed Position */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-white/90 backdrop-blur-sm shadow-lg border border-white/20 hover:bg-white transition-all"
      >
        <Menu className="h-5 w-5 text-gray-700" />
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        // Base styles
        "bg-white/95 backdrop-blur-lg shadow-xl border-r border-white/30 flex flex-col",
        // Desktop styles
        "hidden lg:flex lg:w-64 lg:relative",
        // Mobile styles  
        "lg:block fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Mobile Close Button */}
        <div className="lg:hidden absolute top-4 right-4">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Header */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin Panel
              </h2>
              <p className="text-xs text-gray-500">Control Center</p>
            </div>
          </div>
          
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                  pathname === item.href
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                    : "text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 hover:transform hover:scale-105"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 transition-transform duration-200",
                  pathname === item.href ? "text-white" : "text-gray-400 group-hover:text-blue-500"
                )} />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* User Info Section */}
        <div className="px-6 py-4 border-t border-gray-200/50">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200/50">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Admin</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-auto p-6 border-t border-gray-200/50">
          <button
            onClick={() => signOut({ callbackUrl: "/admin" })}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group hover:transform hover:scale-105"
          >
            <LogOut className="h-5 w-5 transition-transform duration-200 group-hover:rotate-12" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}