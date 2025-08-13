// components/admin/services/services-table.tsx
"use client";

import { Service } from "@/types/service";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye, Star } from "lucide-react";
import Image from "next/image";
import { toast } from "@/components/ui/use-toast";

interface ServicesTableProps {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
  onRefresh: () => void;
}

export function ServicesTable({ services, onEdit, onDelete, onRefresh }: ServicesTableProps) {
  const toggleActive = async (service: Service) => {
    try {
      await fetch(`/api/services/${service.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...service, isActive: !service.isActive }),
      });
      onRefresh();
      toast({
        title: "Sukses",
        description: `Layanan ${service.isActive ? 'dinonaktifkan' : 'diaktifkan'}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengubah status layanan",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <Card key={service.id} className="overflow-hidden">
          <div className="relative">
            {service.image && (
              <div className="relative h-48 w-full">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
                {service.popular && (
                  <Badge className="absolute top-2 right-2 bg-yellow-500">
                    <Star className="h-3 w-3 mr-1" />
                    Popular
                  </Badge>
                )}
              </div>
            )}
          </div>
          
          <CardContent className="p-4">
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <Badge variant="secondary" className="mt-1">
                  {service.category}
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600 line-clamp-2">
                {service.description}
              </p>

              <div>
                <p className="text-sm font-medium text-primary">{service.price}</p>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium">Fitur:</p>
                <div className="flex flex-wrap gap-1">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {service.features.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{service.features.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={service.isActive}
                    onCheckedChange={() => toggleActive(service)}
                  />
                  <span className="text-sm">
                    {service.isActive ? "Aktif" : "Nonaktif"}
                  </span>
                </div>

                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(service)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(service.id)}
                    className="text-red-600 hover:text-red-700"
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
  );
}