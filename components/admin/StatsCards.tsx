// components/admin/stats-cards.tsx
"use client";

import useSWR from "swr";
import { Service } from "@/types/service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, CheckCircle, Star, TrendingUp, Users, Activity } from "lucide-react";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function StatsCards() {
  const { data: services = [] } = useSWR<Service[]>("/api/services", fetcher, {
    revalidateOnFocus: false,
  });

  const total = services.length;
  const active = services.filter(s => s.isActive).length;
  const popular = services.filter(s => s.popular).length;

  const stats = [
    {
      title: "Total Layanan",
      value: total,
      icon: Package,
      color: "text-blue-600",
      bg: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
      change: "+12%",
      trend: "up"
    },
    {
      title: "Layanan Aktif",
      value: active,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-gradient-to-br from-green-50 to-emerald-100",
      iconBg: "bg-gradient-to-br from-green-500 to-emerald-600",
      change: "+8%",
      trend: "up"
    },
    {
      title: "Layanan Populer",
      value: popular,
      icon: Star,
      color: "text-yellow-600",
      bg: "bg-gradient-to-br from-yellow-50 to-amber-100",
      iconBg: "bg-gradient-to-br from-yellow-500 to-amber-600",
      change: "+5%",
      trend: "up"
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {stats.map((stat, index) => (
        <Card
          key={stat.title}
          className="group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2 border-0 bg-white/70 backdrop-blur-sm relative overflow-hidden"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-700 transition-colors">
                {stat.title}
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-2xl lg:text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {stat.value}
                </span>
                <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <TrendingUp className="h-3 w-3" />
                  {stat.change}
                </div>
              </div>
            </div>
            <div className={`p-3 rounded-2xl ${stat.iconBg} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
            </div>
          </CardHeader>
          
          <CardContent className="pb-4 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Activity className="h-3 w-3" />
                <span>Aktif hari ini</span>
              </div>
              <div className="w-full max-w-[60px] h-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min((stat.value / Math.max(total, 1)) * 100, 100)}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}