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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Selamat datang, {session.user?.email}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="mb-6">
            <StatsCards services={stats} />
          </div>

          {/* Services Manager */}
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6">
              <ServicesManager initialServices={services} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}