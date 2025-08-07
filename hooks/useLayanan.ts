import { useState } from 'react';

interface Layanan {
  id: string;
  name: string;
  description: string;
  image?: string;
  createdAt: string;
}

interface LayananFormData {
  name: string;
  description: string;
  image: string;
}

export function useLayanan() {
  const [layanan, setLayanan] = useState<Layanan[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLayanan = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/layanan');
      if (response.ok) {
        const data = await response.json();
        setLayanan(data);
      }
    } catch (error) {
      console.error('Error fetching layanan:', error);
    } finally {
      setLoading(false);
    }
  };

  const createLayanan = async (data: LayananFormData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/layanan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await fetchLayanan();
        return { success: true };
      } else {
        return { success: false, error: 'Gagal menyimpan layanan' };
      }
    } catch (error) {
      console.error('Error creating layanan:', error);
      return { success: false, error: 'Gagal menyimpan layanan' };
    } finally {
      setLoading(false);
    }
  };

  const updateLayanan = async (id: string, data: LayananFormData) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/layanan/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await fetchLayanan();
        return { success: true };
      } else {
        return { success: false, error: 'Gagal mengupdate layanan' };
      }
    } catch (error) {
      console.error('Error updating layanan:', error);
      return { success: false, error: 'Gagal mengupdate layanan' };
    } finally {
      setLoading(false);
    }
  };

  const deleteLayanan = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/layanan/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchLayanan();
        return { success: true };
      } else {
        return { success: false, error: 'Gagal menghapus layanan' };
      }
    } catch (error) {
      console.error('Error deleting layanan:', error);
      return { success: false, error: 'Gagal menghapus layanan' };
    } finally {
      setLoading(false);
    }
  };

  const getLayananById = async (id: string) => {
    try {
      const response = await fetch(`/api/layanan/${id}`);
      if (response.ok) {
        return await response.json();
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching layanan by id:', error);
      return null;
    }
  };

  return {
    layanan,
    loading,
    fetchLayanan,
    createLayanan,
    updateLayanan,
    deleteLayanan,
    getLayananById,
  };
} 