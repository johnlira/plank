import { Card, CardContent } from "@/components/ui/card";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/20 via-background to-accent/20 px-4">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardContent className="p-8">{children}</CardContent>
      </Card>
    </div>
  );
}
