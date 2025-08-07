'use client';

import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Eye } from 'lucide-react';

interface Layanan {
  id: string;
  name: string;
  description: string;
  image?: string;
  createdAt: string;
}

interface AdminTableProps {
  data: Layanan[];
  onEdit: (item: Layanan) => void;
  onDelete: (id: string) => void;
}

export function AdminTable({ data, onEdit, onDelete }: AdminTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-futuristic-border">
            <th className="text-left p-4 text-futuristic-text-primary font-medium">Nama Layanan</th>
            <th className="text-left p-4 text-futuristic-text-primary font-medium">Deskripsi</th>
            <th className="text-left p-4 text-futuristic-text-primary font-medium">Gambar</th>
            <th className="text-left p-4 text-futuristic-text-primary font-medium">Tanggal Dibuat</th>
            <th className="text-left p-4 text-futuristic-text-primary font-medium">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b border-futuristic-border hover:bg-futuristic-accent/10">
              <td className="p-4 text-futuristic-text-primary font-medium">
                {item.name}
              </td>
              <td className="p-4 text-futuristic-text-secondary">
                <div className="max-w-xs truncate" title={item.description}>
                  {item.description}
                </div>
              </td>
              <td className="p-4">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <span className="text-futuristic-text-secondary text-sm">Tidak ada gambar</span>
                )}
              </td>
              <td className="p-4 text-futuristic-text-secondary text-sm">
                {new Date(item.createdAt).toLocaleDateString('id-ID')}
              </td>
              <td className="p-4">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(item)}
                    className="bg-futuristic-secondary border-futuristic-border hover:bg-futuristic-accent/50"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(item.id)}
                    className="bg-red-600 hover:bg-red-700 border-red-600 text-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {data.length === 0 && (
        <div className="text-center py-8">
          <p className="text-futuristic-text-secondary">Belum ada layanan yang ditambahkan.</p>
        </div>
      )}
    </div>
  );
} 