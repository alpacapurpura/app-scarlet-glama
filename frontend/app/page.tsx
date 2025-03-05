"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Bienvenido a la Demo 1 by Christian
        </h1>
        <p className="text-center mb-8">
          Esta página debería ser una landing page que explique el producto y lo que ofrece.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/login">
            <Button>Iniciar Sesión</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline">Registrarse</Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 