"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-bold mb-4">Algo salió mal</h2>
      <Button
        onClick={() => reset()}
        className="mb-4"
      >
        Intentar de nuevo
      </Button>
      <Button
        onClick={() => window.location.href = "/"}
        variant="outline"
      >
        Ir al inicio
      </Button>
    </div>
  );
} 