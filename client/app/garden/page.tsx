"use client";

import { useEffect } from "react";
import { Plus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuthStore } from "@/stores/useAuthStore";

export default function Garden() {
  const { user, isLoading, checkAuth, logout } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b px-6 py-4">
        <span className="text-xl font-semibold text-foreground">Plank</span>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="cursor-pointer gap-2"
          >
            <LogOut className="size-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Hello, {user?.name || "Guest"}!
          </h1>
          <p className="mt-2 text-muted-foreground">
            Welcome to your garden. Start adding your plants.
          </p>
        </div>

        {/* Add Plant Card */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Card className="cursor-pointer border-dashed transition-colors hover:border-primary hover:bg-muted/50">
            <CardContent className="flex flex-col items-center justify-center p-8">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Plus className="size-8 text-primary" />
              </div>
              <span className="font-medium text-foreground">Add new Plant</span>
              <span className="mt-1 text-sm text-muted-foreground">
                Upload a photo to identify
              </span>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
