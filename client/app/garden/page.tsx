"use client";

import { useEffect } from "react";
import { Header, PageLoading } from "@/components/layout";
import { WelcomeSection, PlantsGrid } from "@/components/garden";
import { useAuthStore } from "@/stores/useAuthStore";

export default function Garden() {
  const { user, isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="px-6 py-8">
        <WelcomeSection userName={user?.name} />
        <PlantsGrid />
      </main>
    </div>
  );
}
