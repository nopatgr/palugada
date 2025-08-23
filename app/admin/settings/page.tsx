"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fireToast } from "@/components/ui/swal";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    companyName: "PT Solusi Digital",
    email: "admin@company.com",
    phone: "+62 812-3456-7890",
    allowRegistration: false,
    darkMode: false,
  });

  const handleSave = async () => {
    setLoading(true);
    // contoh update ke API
    await new Promise((r) => setTimeout(r, 1000));
    fireToast("success", "Pengaturan tersimpan");
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Pengaturan Admin</h1>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">Umum</TabsTrigger>
            <TabsTrigger value="appearance">Tampilan</TabsTrigger>
            <TabsTrigger value="security">Keamanan</TabsTrigger>
          </TabsList>

          {/* General */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Perusahaan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Nama Perusahaan</Label>
                  <Input
                    value={data.companyName}
                    onChange={(e) =>
                      setData({ ...data, companyName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Nomor Telepon</Label>
                  <Input
                    value={data.phone}
                    onChange={(e) =>
                      setData({ ...data, phone: e.target.value })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Preferensi Tampilan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Mode Gelap</Label>
                  <Switch
                    checked={data.darkMode}
                    onCheckedChange={(val) =>
                      setData({ ...data, darkMode: val })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Keamanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Izinkan Registrasi Pengguna Baru</Label>
                  <Switch
                    checked={data.allowRegistration}
                    onCheckedChange={(val) =>
                      setData({ ...data, allowRegistration: val })
                    }
                  />
                </div>
                <Button variant="outline">Ubah Password Admin</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={loading} className="min-w-[120px]">
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </div>
    </main>
  );
}