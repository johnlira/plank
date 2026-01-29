"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuthStore } from "@/stores/useAuthStore";
import { signInSchema, type SignInInput } from "@/lib/schemas/auth";

export default function SignIn() {
  const { login, isLoading, error, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(signInSchema as any),
  });

  const onSubmit = async (data: SignInInput) => {
    clearError();
    await login(data.email, data.password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/20 via-background to-accent/20 px-4">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardContent className="p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-foreground">
              Welcome Back
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="h-11"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="h-11"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="h-11 w-full cursor-pointer hover:text-white"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Forgot your password?
            </Link>
          </div>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
