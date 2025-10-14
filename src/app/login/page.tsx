'use client'

import { Input,Button, Form, FormItem, FormControl, FormLabel, FormField} from '@/components/ui'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormSchemaType, LoginFormSchema } from '@/schemas/login.schema';
import React from 'react'
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui';

function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  }); 

  const onSubmit = async (data: LoginFormSchemaType) => {
    setLoading(true);
    setError(null);
    console.log(data);
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.message || 'Login failed');
      } else {
        router.push('/admin/categories');
      }
    } catch {
      setError('Network error, please try again');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-2 text-center">Login</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-center text-sm">Please enter the admin account password</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField control={form.control} name="username" render={({field}) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Username" autoComplete="username" {...field} />
                </FormControl>
              </FormItem>
            )} />
            <FormField control={form.control} name="password" render={({field}) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" autoComplete="current-password" {...field} /> 
                </FormControl>
              </FormItem>
            )} />
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            <Button type="submit" disabled={loading} className="w-full mt-2 hover:bg-blue-300 hover:text-white bg-blue-400">{loading ? 'Loading...' : 'Login'}</Button>
          </form>
        </Form>
      </Card>
    </div>
  )
}

export default LoginPage
