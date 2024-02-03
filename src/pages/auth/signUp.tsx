import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
})

type SignUpForm = z.infer<typeof signUpForm>
export function SignUp() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
  })
  async function handleSignUp(data: SignUpForm) {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast.success('Restaurante cadastrado com sucesso!', {
        action: {
          label: 'Login',
          onClick: () => navigate('/sign-in'),
        },
      })
    } catch {
      toast.error('Erro ao cadastrar restaurante.')
    }
  }
  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8 ">
        <Button asChild variant="ghost" className="absolute right-8 top-8">
          <Link to="/sign-in">Fazer login</Link>
        </Button>
        <div className="flex-call flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4 ">
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register('restaurantName')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                id="managerName"
                type="text"
                {...register('managerName')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Seu email</Label>
              <Input id="email" type="e-mail" {...register('email')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Seu celular</Label>
              <Input id="phone" type="tel" {...register('phone')} />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              Finalizar cadastro
            </Button>
            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você irá concordar com nossos {'  '}
              <a href="" className="underline underline-offset-4">
                termos de serviço
              </a>{' '}
              e{' '}
              <a href="" className="underline underline-offset-4">
                politica de privacidade
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
