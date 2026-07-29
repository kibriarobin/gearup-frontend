import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'
import { RegisterForm } from '../_components/RegisterForm'

const RegisterPage = () => {
  return (
    <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-sm flex-col justify-center px-4">
  <Card className="shadow-sm">
    <CardHeader>
      <h1 className="text-2xl text-center font-semibold">Create your account</h1>
      <p className="mt-1 text-sm text-center text-muted-foreground">
        Join GearUp to rent or list sports gear
      </p>
    </CardHeader>

    <CardContent>
      <RegisterForm></RegisterForm>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary">
          Login
        </Link>
      </p>
    </CardContent>
  </Card>
</div>
  )
}

export default RegisterPage