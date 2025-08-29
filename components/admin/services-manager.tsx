// components/admin/services-manager.tsx
"use client";
import useSWR from "swr";
import { useState } from "react";
import { Service } from "@/types/service";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Star, CheckCircle, Eye, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { fireToast, fireConfirm } from "../ui/swal";
import { ServiceModal } from "./services/services-modal";
import Image from "next/image";
import { ServicesTable } from "./services/services-table";
import { features } from "process";

const fetcher = (url) => fetch(url).then((r) => r.json());

export function ServicesManager() {
  const {
    data: services = [],
    error,
    mutate,
  } = useSWR("/api/services", fetcher, { revalidateOnFocus: false });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleAdd = () => {
    setSelectedService(null);
    setIsModalOpen(true);
  };

  const handleEdit = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  /* ------------------ POST ------------------ */
  const handleSave = async (serviceData) => {
    try {
      if (
        !serviceData.title?.trim() ||
        !serviceData.description?.trim() ||
        !serviceData.price
      ) {
        toast({ title: "❌ Form belum lengkap" });
        return;
      }

      const payload = {
        title: serviceData.title.trim(),
        description: serviceData.description.trim(),
        price: Number(serviceData.price),
        image: serviceData.image || "",
        features: Array.isArray(serviceData.features)
          ? serviceData.features
          : [],
      };

      const res = await fetch("/api/services", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Server error");
      }

      const created = await res.json();

      

      toast({ title: "✅ Berhasil", description: created.title });

      // tambahkan ke list tanpa reload
      mutate([created, ...services], false);
      fireToast("success", "Layanan berhasil ditambahkan");
      setIsModalOpen(false);
    } catch (err) {
      fireToast("error", err.message || "Gagal menambahkan layanan");
    }
  };

  /* ------------------ PUT (update/toggle) ------------------ */
  const handleToggleActive = async (service) => {
    try {
      const updated = { ...service, isActive: !service.isActive };
      await fetch("/api/services", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service),
      });
      mutate(
        services.map((s) => (s.id === service.id ? updated : s)),
        false
      );
      fireToast("success", "Status berhasil diubah");
    } catch {
      fireToast("error", "Gagal mengubah status layanan");
    }
  };

  /* ------------------ DELETE ------------------ */
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/services/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      mutate(
        services.filter((s) => s.id !== id),
        false
      );
      fireToast("success", "Layanan berhasil dihapus");
    } catch {
      fireToast("error", "Gagal menghapus layanan");
    }
  };

  if (error) return <p className="p-4 text-red-600">Gagal memuat layanan</p>;

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
        <div className="space-y-2">
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Kelola Layanan
          </h1>
          <div className="flex items-center gap-2">
            <p className="text-gray-600">
              Total{" "}
              <span className="font-semibold text-blue-600 text-lg">
                {services.length}
              </span>{" "}
              layanan tersedia
            </p>
            <div className="flex items-center gap-1 text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
              <TrendingUp className="h-3 w-3" />
              Active
            </div>
          </div>
        </div>
        <Button
          onClick={handleAdd}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Tambah Layanan Baru</span>
          <span className="sm:hidden">Tambah</span>
        </Button>
      </div>

      {/* Grid Cards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {services.map((service) => (
          <Card
            key={service.id}
            className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative overflow-hidden">
              {service.image ? (
                <Image
                  src={service.image}
                  alt={service.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                  <div className="text-6xl text-gray-300">📦</div>
                </div>
              )}

              {/* Overlay Status */}
              <div className="absolute top-3 right-3 flex gap-2">
                {service.popular && (
                  <Badge className="bg-yellow-500 text-yellow-900">
                    <Star className="h-3 w-3 mr-1" />
                    Populer
                  </Badge>
                )}
                <Badge
                  variant={service.isActive ? "default" : "destructive"}
                  className="text-xs"
                >
                  {service.isActive ? "Aktif" : "Nonaktif"}
                </Badge>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">
                    {service.price}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {service.category}
                  </Badge>
                </div>

                {/* Features Preview */}
                <div className="flex flex-wrap gap-1">
                  {service.features.slice(0, 2).map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {service.features.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{service.features.length - 2}
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t">
                  <Switch
                    checked={service.isActive}
                    onCheckedChange={() => handleToggleActive(service)}
                    className="scale-90"
                  />
                  <div className="flex-1 flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(service)}
                      className="hover:bg-blue-100 hover:text-blue-700"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={async () => {
                        const { isConfirmed } = await fireConfirm(
                          "Yakin ingin menghapus layanan ini?"
                        );
                        if (isConfirmed) await handleDelete(service.id);
                      }}
                      className="hover:bg-red-100 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {services.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Belum ada layanan
          </h3>
          <p className="text-gray-500 mb-4">
            Tambahkan layanan pertama Anda untuk memulai
          </p>
          <Button onClick={handleAdd} className="gap-2">
            <Plus className="h-4 w-4" />
            Tambah Layanan
          </Button>
        </div>
      )}
      

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedService(null);
        }}
        onSave={() => console.log('Save button clicked')}
        onSuccess={mutate} // ← penting
        service={selectedService}
      />
    </div>
  );
}
