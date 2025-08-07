export interface Service {
  id: string
  title: string
  description: string
  category: string
  price: number
  rating: number
  reviews: number
  duration: string
  clientsServed: number
  image?: string
  featured: boolean
}
