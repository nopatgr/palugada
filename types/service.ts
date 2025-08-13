// types/service.ts
export interface Service {
  id: string;
  title: string;
  description: string;
  image?: string;
  gradient?: string;
  popular: boolean;
  features: string[];
  price: string;
  note?: string;
  category: string;
  status: string;
  isActive: boolean;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}