"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuthStore } from "@/stores/useAuthStore";

export function Header() {
  const { logout } = useAuthStore();

  return (
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
  );
}
