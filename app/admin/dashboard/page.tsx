// app/admin/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminSidebar } from "@/components/admin/sidebar";
import { StatsCards } from "@/components/admin/StatsCards";
import { ServicesManager } from "@/components/admin/services-manager";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/admin"); // redirect manual
  }

  // Ambil data untuk stats & services
  const services = await prisma.service.findMany({
    orderBy: [{ orderIndex: "asc" }, { createdAt: "desc" }]
  });

  const stats = {
    total: services.length,
    active: services.filter(s => s.isActive).length,
    popular: services.filter(s => s.popular).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <AdminSidebar />
        
        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Header */}
          <div className="lg:hidden bg-white shadow-sm border-b px-4 py-3">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
              <button
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                id="mobile-menu-button"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 sm:p-6 lg:p-8 space-y-6">
              {/* Header - Hidden on mobile, shown on desktop */}
              <div className="hidden lg:block">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                  <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Dashboard Admin
                  </h1>
                  <p className="text-gray-600 mt-2 text-lg">
                    Selamat datang kembali, <span className="font-semibold text-blue-600">Saudara</span>
                  </p>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="space-y-4">
                <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 lg:hidden">
                  Statistik Layanan
                </h2>
                <StatsCards />
              </div>

              {/* Services Manager */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
                <div className="p-4 sm:p-6 lg:p-8">
                  <ServicesManager />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}