// components/admin/services-manager.tsx
"use client";
import useSWR from "swr";
import { useState } from "react";
import { Service } from "@/types/service";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Star, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { fireToast, fireConfirm } from "../ui/swal";
import Image from "next/image";
import { ServiceModal } from "./services/services-modal";
import { on } from 'events';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function ServicesManager() {
  const {
    data: services = [],
    error,
    mutate,
  } = useSWR<Service[]>("/api/services", fetcher, { revalidateOnFocus: false });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  /* ---------- MODAL ---------- */
  const handleAdd = () => {
    setSelectedService(null);
    setIsModalOpen(true);
  };
  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  /* ---------- CRUD ---------- */
  const handleSave = async (serviceData: Service & { imageFile?: File }) => {
    try {
      let imageUrl = serviceData.image || "";

      /* 1. Jika user pilih file baru → upload dulu */
      if (serviceData.imageFile) {
        const form = new FormData();
        form.append("file", serviceData.imageFile);
        form.append("id", selectedService?.id || "");

        const up = await fetch("/api/upload", { method: "POST", body: form });
        if (!up.ok) throw new Error((await up.json()).error || "Upload gagal");
        imageUrl = (await up.json()).url;
      }

      /* 2. Siapkan payload */
      const payload = {
        id: selectedService?.id,
        title: serviceData.title.trim(),
        description: serviceData.description.trim(),
        price: Number(serviceData.price),
        image: imageUrl,
        features: Array.isArray(serviceData.features) ? serviceData.features : [],
        isActive: serviceData.isActive ?? true,
      };

      /* 3. POST / PUT ke /api/services */
      const res = await fetch("/api/services", {
        method: selectedService ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Server error");
      }

      const saved = await res.json();

      /* 4. Update SWR tanpa reload */
      mutate(
        selectedService
          ? services.map((s) => (s.id === saved.id ? saved : s))
          : [saved, ...services],
        false
      );

      toast({
        title: "✅ Berhasil",
        description: selectedService
          ? "Layanan diperbarui"
          : `Layanan “${saved.title}” ditambahkan`,
      });
      closeModal();
    } catch (err: any) {
      toast({ title: "❌ Gagal", description: err.message });
    }
  };

  const handleToggleActive = async (service: Service) => {
    try {
      const updated = { ...service, isActive: !service.isActive };
      await fetch("/api/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
        credentials: "include",
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

  const handleDelete = async (id: string) => {
    const { isConfirmed } = await fireConfirm("Yakin ingin menghapus layanan ini?");
    if (!isConfirmed) return;

    try {
      await fetch(`/api/services/${id}`, { method: "DELETE", credentials: "include" });
      mutate(services.filter((s) => s.id !== id), false);
      fireToast("success", "Layanan berhasil dihapus");
    } catch {
      fireToast("error", "Gagal menghapus layanan");
    }
  };

  /* ---------- RENDER ---------- */
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
              <span className="font-semibold text-blue-600 text-lg">{services.length}</span> layanan tersedia
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
        {services.map((s) => (
          <Card key={s.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="relative overflow-hidden">
              {s.image ? (
                <Image
                  src={s.image}
                  alt={s.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                  <div className="text-6xl text-gray-300">📦</div>
                </div>
              )}

              <div className="absolute top-3 right-3 flex gap-2">
                {s.popular && (
                  <Badge className="bg-yellow-500 text-yellow-900">
                    <Star className="h-3 w-3 mr-1" />
                    Populer
                  </Badge>
                )}
                <Badge
                  variant={s.isActive ? "default" : "destructive"}
                  className="text-xs"
                >
                  {s.isActive ? "Aktif" : "Nonaktif"}
                </Badge>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{s.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">Rp{s.price.toLocaleString()}</span>
                  <Badge variant="outline" className="text-xs">
                    {s.category}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-1">
                  {s.features.slice(0, 2).map((f, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {f}
                    </Badge>
                  ))}
                  {s.features.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{s.features.length - 2}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2 pt-2 border-t">
                  <Switch
                    checked={s.isActive}
                    onCheckedChange={() => handleToggleActive(s)}
                    className="scale-90"
                  />
                  <div className="flex-1 flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(s)}
                      className="hover:bg-blue-100 hover:text-blue-700"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(s.id)}
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

      {services.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum ada layanan</h3>
          <p className="text-gray-500 mb-4">Tambahkan layanan pertama Anda untuk memulai</p>
          <Button onClick={handleAdd} className="gap-2">
            <Plus className="h-4 w-4" /> Tambah Layanan
          </Button>
        </div>
      )}

      {/* MODAL */}
      <ServiceModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}       // ← handleSave sekarang menerima File
        service={selectedService}
        uploadUrl="/api/upload"   // ← URL upload diserahkan ke modal
      />
    </div>
  );
}