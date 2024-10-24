import { HTMLAttributes, useState } from 'react'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/custom/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { PasswordInput } from '@/components/custom/password-input'
import {useContext} from 'react'
import AuthContext from '../../../AuthContext'
import { useParams, useNavigate } from 'react-router-dom'
interface ForgotFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
 
    password: z
    .string()
    .min(1, {
      message: 'Please enter your password',
    })
    .min(7, {
      message: 'Password must be at least 7 characters long',
    }),
  confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ['confirmPassword'],
})

export function ForgotForm({ className, ...props }: ForgotFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const authContext = useContext(AuthContext);
  // Get uid and token from the URL parameters
  const navigate = useNavigate();
  const { uid, token } = useParams<{ uid: string; token: string }>()

  if (!authContext) {
    // Handle the case where AuthContext is null (e.g., render a fallback UI or show a loading state)
    return <div> Loading...</div>;
  }

  
  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { 
      password: '',
      confirmPassword: '', },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    console.log(data)
    //resetPassword(data.email)
    console.log('uid',uid)
    console.log('token',token)
    console.log(data.password)
    console.log(data.confirmPassword)

    const resetPassword = async (
      uidb64: string| undefined,
      token: string| undefined,
      password: string| undefined,
      passwordConfirm: string| undefined
  ): Promise<void> => {
      const url = `https://aphrc.site/api/reset/${uidb64}/${token}/`;
  
      const data = {
          password,
          password_confirm: passwordConfirm
      };
  
      try {
          const response = await fetch(url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          });
  
          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.detail || 'Failed to reset password');
          }
  
          const responseData = await response.json();
          console.log('Password reset successful:', responseData);
          alert('Password Reset is successfull')
          navigate('/sign-in');
  
      } catch (error: any) {
          console.error('Error:', error.message);
          alert('Password Reset Failed')
      }
  };
    

  resetPassword(uid,token,data.password,data.confirmPassword);

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
          <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' loading={isLoading}>
              Reset Password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
