"use client";

import { useState } from "react";
import { Database, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { seedDatabase } from "@/lib/actions/seed.actions";

export function SeedButton() {
  const [isPending, setIsPending] = useState(false);

  const handleSeed = async () => {
    setIsPending(true);
    try {
      const result = await seedDatabase();
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to trigger seeding process.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button variant="outline" className="w-full" disabled={isPending} onClick={handleSeed}>
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Seeding...
        </>
      ) : (
        <>
          <Database className="mr-2 h-4 w-4" />
          Seed Database
        </>
      )}
    </Button>
  );
}
