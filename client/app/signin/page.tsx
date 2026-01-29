"use client";

import { AuthLayout, AuthHeader, SignInForm } from "@/components/auth";

export default function SignIn() {
  return (
    <AuthLayout>
      <AuthHeader
        title="Welcome Back"
        description="Sign in to your account to continue"
      />
      <SignInForm />
    </AuthLayout>
  );
}
