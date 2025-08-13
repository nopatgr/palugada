// components/admin/services/services-manager.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ServicesTable } from "./services-table";

import { Service } from "@/types/service";
import { toast } from "@/components/ui/use-toast";
import { ServiceModal } from "./services-modal";

export function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services");
      const data = await response.json();
      setServices(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengambil data layanan",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setSelectedService(null);
    setIsModalOpen(true);
  };

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleSave = () => {
    fetchServices();
    handleCloseModal();
    toast({
      title: "Sukses",
      description: "Data layanan berhasil disimpan",
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus layanan ini?")) return;

    try {
      await fetch(`/api/services/${id}`, {
        method: "DELETE",
      });
      fetchServices();
      toast({
        title: "Sukses",
        description: "Layanan berhasil dihapus",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus layanan",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6 text-black">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Daftar Layanan</h2>
          <Button onClick={handleAddNew} className="gap-2">
            <Plus className="h-4 w-4" />
            Tambah Layanan
          </Button>
        </div>

        <ServicesTable
          services={services}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onRefresh={fetchServices}
        />
      </div>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        service={selectedService}
      />
    </>
  );
}