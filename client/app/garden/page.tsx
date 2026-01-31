"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Header, PageLoading } from "@/components/layout";
import { WelcomeSection, PlantsGrid, AddPlantDialog } from "@/components/garden";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";

export default function Garden() {
  const { user, isInitialized, checkAuth } = useAuthStore();
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!isInitialized) {
    return <PageLoading />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="px-6 py-8">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <WelcomeSection userName={user?.name} />
          <Button
            onClick={() => setAddDialogOpen(true)}
            className="shrink-0"
          >
            <Plus className="mr-2 size-4" />
            Add plant
          </Button>
        </div>
        <PlantsGrid />
      </main>

      <AddPlantDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} />
    </div>
  );
}
