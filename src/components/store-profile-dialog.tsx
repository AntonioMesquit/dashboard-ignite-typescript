import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  GetManagerRestaurant,
  GetManagerRestaurantReponse,
} from '@/api/get-manager-restaurant'
import { UpdateProfile } from '@/api/update-profile'

import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
})
type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {
  const queryClient = useQueryClient()
  const { data: manager } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: GetManagerRestaurant,
    staleTime: Infinity,
  })
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: manager?.name || '',
      description: manager?.description || '',
    },
  })
  function updateManagerCache({ name, description }: StoreProfileSchema) {
    const cached = queryClient.getQueryData<GetManagerRestaurantReponse>([
      'managed-restaurant',
    ])
    if (cached) {
      queryClient.setQueryData<GetManagerRestaurantReponse>(
        ['managed-restaurant'],
        {
          ...cached,
          name,
          description,
        },
      )
    }
    return { cached }
  }
  const { mutateAsync: updateProfile } = useMutation({
    mutationFn: UpdateProfile,
    onMutate({ name, description }) {
      const { cached } = updateManagerCache({ name, description })
      return { previuosProfile: cached }
    },
    onError(_, __, context) {
      if (context?.previuosProfile) {
        updateManagerCache(context.previuosProfile)
      }
    },
  })
  async function handleUpdateProfile(data: StoreProfileSchema) {
    try {
      await updateProfile({
        name: data.name,
        description: data.description,
      })
      toast.success('Perfil atualizado com sucesso!')
    } catch {
      toast.error('Falha ao atualizar o perfil, tente novamente!')
    }
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualiza as informações do seu estabelecimento visíveis do seu cliente
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4 ">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input className="col-span-3" id="name" {...register('name')} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...register('description')}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
