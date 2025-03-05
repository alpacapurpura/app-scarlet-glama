"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      toast({
        title: "Error",
        description: "Debes iniciar sesión para acceder a las conversaciones.",
        variant: "destructive",
      });
    }
  }, [router, toast]);

  return children;
} 