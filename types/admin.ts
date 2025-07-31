export interface AdminUser {
  id: string
  email: string
  password: string
  name: string
  role: string
}

export interface CompanyProfile {
  name: string
  description: string
  address: string
  phone: string
  email: string
  website: string
}