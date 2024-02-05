import { api } from '@/lib/axios'

interface UpdateProfiles {
  name: string
  description: string | null
}
export async function UpdateProfile({ name, description }: UpdateProfiles) {
  api.put('profile', { name, description })
}
