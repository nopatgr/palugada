// components/admin/services/service-modal.tsx
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Service } from "@/types/service";
import { ImageUpload } from "./image-upload";
import { toast } from "@/components/ui/use-toast";
import { on } from "events";
// import { File } from "buffer";

const formSchema = z.object({
  title: z.string().min(1, "Judul harus diisi"),
  description: z.string().min(1, "Deskripsi harus diisi"),
  image: z.string().optional(),
  gradient: z.string().optional(),
  popular: z.boolean().default(false),
  features: z.string().transform((val) =>
    val
      .split(",")
      .map((f) => f.trim())
      .filter((f) => f)
  ),
  price: z.string().min(1, "Harga harus diisi"),
  note: z.string().optional(),
  category: z.string().min(1, "Kategori harus diisi"),
  orderIndex: z.coerce.number().min(0).default(0),
  isActive: z.boolean().default(true),
});

type FormData = {
  title: string;
  description: string;
  image?: string;
  gradient?: string;
  popular: boolean;
  features: string;
  price: string;
  note?: string;
  category: string;
  orderIndex: number;
  isActive: boolean;
};

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    data: Service & { imageFile?: globalThis.File }
  ) => void | Promise<void>;
  onSuccess?: () => void;
  service?: Service | null;
  uploadUrl?: string;
}

export function ServiceModal({
  isOpen,
  onClose,
  onSuccess,
  service,
  uploadUrl = "/api/upload",
}: ServiceModalProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      gradient: "",
      popular: false,
      features: "",
      price: "",
      note: "",
      category: "",
      orderIndex: 0,
      isActive: true,
    },
  });

  // Reset form when service changes
  useEffect(() => {
    if (isOpen) {
      form.reset({
        title: service?.title || "",
        description: service?.description || "",
        image: service?.image || "",
        gradient: service?.gradient || "",
        popular: service?.popular || false,
        features: service?.features?.join(", ") || "",
        price: service?.price || "",
        note: service?.note || "",
        category: service?.category || "",
        orderIndex: service?.orderIndex || 0,
        isActive: service?.isActive ?? true,
      });
    }
  }, [service, isOpen, form]);

  const onSubmit = async (values: FormData) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        id: service?.id, // ← TAMBAHKAN INI
      };

      const url = service ? `/api/services/${service.id}` : "/api/services";
      const method = service ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error();

      // onSave();
      onSuccess?.();
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // UI
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col text-black">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>
            {service ? "Edit Layanan" : "Tambah Layanan Baru"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-1">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 pr-2"
            >
              <div className="grid grid-cols-2 gap-4 text-black">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Judul Layanan</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama layanan..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategori</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Software, Support, dll"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Deskripsi layanan..."
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fitur (pisahkan dengan koma)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Fitur 1, Fitur 2, Fitur 3"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Harga</FormLabel>
                      <FormControl>
                        <Input placeholder="Mulai Rp 100K" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="orderIndex"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Urutan</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gambar</FormLabel>
                    <ImageUpload
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="gradient"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gradient (opsional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="from-blue-500 to-purple-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Catatan (opsional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Catatan tambahan..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center space-x-4">
                <FormField
                  control={form.control}
                  name="popular"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Popular</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Aktif</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>

        <DialogFooter className="flex-shrink-0 mt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button
            type="submit"
            disabled={loading}
            onClick={form.handleSubmit(onSubmit)}
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
