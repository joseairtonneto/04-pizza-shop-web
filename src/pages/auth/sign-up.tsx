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
  restaurantName: z.string().min(3),
  managerName: z.string().min(3),
  phone: z.string().min(11),
  email: z.email(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>({ resolver: zodResolver(signUpForm) })

  async function handleSignUp(data: SignUpForm) {
    try {
      console.log(data)

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
      <Helmet title='Cadastro' />
      <Button variant='ghost' asChild className='absolute top-8 right-8'>
        <Link to='/sign-in'>Fazer login</Link>
      </Button>

      <div className='p-8'>
        <div className='flex w-[350px] flex-col justify-center gap-6'>
          <div className='flex flex-col gap-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>Criar conta grátis</h1>
            <p className='text-muted-foreground text-sm'>
              Seja um parceiro e comece suas vendas!
            </p>
          </div>

          <form className='space-y-4' onSubmit={handleSubmit(handleSignUp)}>
            <div className='space-y-2'>
              <Label htmlFor='restaurantName'>Nome do estabelecimento</Label>
              <Input id='restaurantName' type='text' {...register('restaurantName')} />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='managerName'>Seu nome</Label>
              <Input id='managerName' type='text' {...register('managerName')} />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='email'>Seu e-mail</Label>
              <Input id='email' type='email' {...register('email')} />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='phone'>Seu celular</Label>
              <Input id='phone' type='tel' {...register('phone')} />
            </div>

            <Button disabled={isSubmitting} className='w-full' type='submit'>
              Finalizar cadastro
            </Button>

            <p className='text-muted-foreground px-6 text-center text-sm leading-relaxed'>
              Ao continuar, você concorda com nossos{' '}
              <a className='underline underline-offset-4' href=''>
                termos de serviço
              </a>{' '}
              e{' '}
              <a className='underline underline-offset-4' href=''>
                políticas de privacidade
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
