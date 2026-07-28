import Link from 'next/link'
import React from 'react'
import LoginForm from '../_components/LoginForm'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const LoginPage = () => {
  return (
    <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-sm flex-col justify-center px-4">
  <Card className="shadow-sm">
    <CardHeader>
      <h1 className="text-2xl text-center font-semibold">Welcome back</h1>
      <p className="mt-1 text-sm text-center text-muted-foreground">
        Log in to manage your rentals.
      </p>
    </CardHeader>

    <CardContent>
      <LoginForm />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="font-medium text-primary">
          Sign up
        </Link>
      </p>
    </CardContent>
  </Card>
</div>
  )
}

export default LoginPage