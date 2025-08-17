// components/admin/stats-cards.tsx
"use client";

import useSWR from "swr";
import { Service } from "@/types/service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, CheckCircle, Star } from "lucide-react";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function StatsCards() {
  const { data: services = [] } = useSWR<Service[]>("/api/services", fetcher, {
    revalidateOnFocus: false,
  });

  const total = services.length;
  const active = services.filter(s => s.isActive).length;
  const popular = services.filter(s => s.popular).length;

  const stats = [
    { title: "Total Layanan", value: total, icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Aktif", value: active, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
    { title: "Populer", value: popular, icon: Star, color: "text-yellow-600", bg: "bg-yellow-50" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg ${stat.bg}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}