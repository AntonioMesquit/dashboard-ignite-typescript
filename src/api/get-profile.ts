import { api } from '@/lib/axios'
interface GetProfileReponse {
  id: string
  name: string
  email: string
  phone: string | null
  role: 'manager' | 'customer'
  createdAt: Date | null
  updatedAt: Date | null
}
export async function GetProfile() {
  const response = await api.get<GetProfileReponse>('/me')

  return response.data
}
