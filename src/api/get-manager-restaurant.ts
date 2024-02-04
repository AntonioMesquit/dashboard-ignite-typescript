import { api } from '@/lib/axios'
interface GetManagerRestaurantReponse {
  id: string
  name: string
  createdAt: Date | null
  updatedAt: Date | null
  description: string | null
  managerId: string | null
}
export async function GetManagerRestaurant() {
  const response = await api.get<GetManagerRestaurantReponse>(
    '/managed-restaurant',
  )

  return response.data
}
