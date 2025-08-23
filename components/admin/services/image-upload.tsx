"use client";

import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // ✅ Ambil session dari client
      const sessionRes = await fetch("/api/auth/session", {
        credentials: "include",
      });
      const session = await sessionRes.json();

      if (!session?.user) {
        toast({ title: "Error", description: "Belum login", variant: "destructive" });
        return;
      }

      // ✅ Kirim dengan header Authorization
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload gagal");
      }

      onChange(data.url);
      toast({ title: "Sukses", description: "Gambar berhasil diupload" });
    } catch (error) {
      toast({ title: "Error", description: "Gagal upload gambar", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative h-32 w-full border rounded overflow-hidden">
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover rounded"
            style={{ maxWidth: '100%', maxHeight: '128px' }}
          />
          <button
            type="button"
            className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600 transition-colors"
            onClick={() => onChange("")}
          >
            Hapus
          </button>
        </div>
      ) : (
        <label className="block">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
          <div className="border-2 border-dashed rounded-md p-4 cursor-pointer hover:bg-gray-50">
            <div className="text-center">
              {uploading ? (
                <p>Mengupload...</p>
              ) : (
                <>
                  <p className="text-sm">Klik untuk upload gambar</p>
                  <p className="text-xs text-gray-500">Max 5MB</p>
                </>
              )}
            </div>
          </div>
        </label>
      )}
    </div>
  );
}