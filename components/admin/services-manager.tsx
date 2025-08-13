// components/admin/services-manager.tsx
"use client";

import { useState } from "react";
import { Service } from "@/types/service";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Star, CheckCircle, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { ServiceModal } from "./services/services-modal";
import Image from "next/image";

interface ServicesManagerProps {
  initialServices?: Service[];
}

export function ServicesManager({ initialServices }) {
   const [services, setServices] = useState<Service[]>(initialServices || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleAdd = () => {
    setSelectedService(null);
    setIsModalOpen(true);
  };

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

// Method POST //

const handleSave = async (serviceData: any) => {
  try {
    // Hindari kirim undefined
    if (!serviceData.title || !serviceData.description || !serviceData.price) {
      toast({ title: "❌ Form belum lengkap" });
      return;
    }

    const payload = {
      title: serviceData.title.trim(),
      description: serviceData.description.trim(),
      price: Number(serviceData.price),
      image: serviceData.image || "",
      features: Array.isArray(serviceData.features) ? serviceData.features : [],
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
    // refresh list di parent
  } catch (err: any) {
    toast({ title: "❌ Gagal", description: err.message, variant: "destructive" });
  }
};

// Method DELETE //
  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus layanan ini?")) return;

     try {
    const res = await fetch(`/api/services/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) throw new Error(await res.text());

    // langsung refresh list tanpa reload halaman
     setServices(prev => prev.filter(s => s.id !== id));

    toast({ title: "✅ Terhapus" });
  } catch (err: any) {
    toast({ title: "❌ Gagal", description: err.message, variant: "destructive" });
  }
   
  };

  // Method PUT //
  const handleToggleActive = async (service: Service) => {
    try {
      await fetch(`/api/services/${service.id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...service, isActive: !service.isActive }),
      });

      setServices(services.map(s =>
        s.id === service.id ? { ...s, isActive: !s.isActive } : s
      ));

      toast({
        title: "✅ Status Diubah",
        description: `Layanan ${service.isActive ? 'dinonaktifkan' : 'diaktifkan'}`,
      });
    } catch (error) {
      toast({
        title: "❌ Gagal",
        description: "Gagal mengubah status",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kelola Layanan</h1>
          <p className="text-gray-600 mt-1">
            Total <span className="font-semibold text-blue-600">{services.length}</span> layanan tersedia
          </p>
        </div>
        <Button 
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
        >
          <Plus className="h-4 w-4" />
          Tambah Layanan Baru
        </Button>
      </div>

      {/* Grid Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                      onClick={() => handleDelete(service.id)}
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

      {/* Modal */}
      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedService(null);
        }}
        onSave={handleSave}
        service={selectedService}
      />
    </div>
  );
}