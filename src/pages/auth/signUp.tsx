import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpForm = z.object({
  email: z.string().email(),
})

type SignUpForm = z.infer<typeof signUpForm>
export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>()
  async function handleSignUp(data: SignUpForm) {
    // try {
    //   console.log(data)
    //   await new Promise((resolve) => setTimeout(resolve, 2000))
    //   toast.success('Enviamos um link de autenticação no seu e-mail.', {
    //     action: {
    //       label: 'Reenviar',
    //       onClick: () => handleSignUp(data),
    //     },
    //   })
    // } catch {
    //   toast.error('Credenciais invalidas.')
    // }
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
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4 ">
            <div className="space-y-2">
              <Label htmlFor="email">Seu email</Label>
              <Input id="email" type="e-mail" {...register('email')} />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              Finalizar cadastro
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
