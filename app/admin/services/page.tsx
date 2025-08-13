import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  Package, 
  BarChart3,
  ExternalLink 
} from "lucide-react";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  // Debug log untuk melihat session
  console.log("Dashboard Session:", session);

  // Check yang lebih aman
  if (!session || !session.user) {
    redirect("/admin");
  }

  const menuItems = [
    {
      title: "Kelola Layanan",
      description: "Tambah, edit, dan hapus layanan",
      href: "/admin/services",
      icon: Package,
      color: "bg-blue-500"
    },
    {
      title: "Statistik",
      description: "Lihat performa website",
      href: "/admin/stats",
      icon: BarChart3,
      color: "bg-green-500"
    },
    {
      title: "Pengaturan",
      description: "Atur website",
      href: "/admin/settings",
      icon: Settings,
      color: "bg-purple-500"
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Selamat datang, {session.user?.email || "Admin"}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
                <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mb-4`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                <Button variant="outline" className="w-full">
                  Buka
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}