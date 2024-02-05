import { api } from '@/lib/axios'

export async function Logout() {
  await api.post('/sign-out')
}
