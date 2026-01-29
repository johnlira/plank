"use client";

import { AuthLayout, AuthHeader, SignUpForm } from "@/components/auth";

export default function SignUp() {
  return (
    <AuthLayout>
      <AuthHeader
        title="Create Account"
        description="Sign up to start caring for your plants"
      />
      <SignUpForm />
    </AuthLayout>
  );
}
