"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Conversation {
  id: number;
  title: string;
  created_at: string;
  messages: Message[];
}

interface Message {
  role: string;
  content: string;
}

export default function ConversationsPage() {
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/conversations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al cargar las conversaciones");
      }

      const data = await response.json();
      setConversations(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un error al cargar las conversaciones.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Solicitudes</h1>
        <Link href="/dashboard">
          <Button>Nueva Solicitud</Button>
        </Link>
      </div>
      <div className="grid gap-4">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold">{conversation.title}</h2>
                <p className="text-sm text-gray-500">
                  {formatDate(conversation.created_at)}
                </p>
              </div>
              <Link href={`/dashboard/conversations/${conversation.id}`}>
                <Button variant="outline">Ver Detalles</Button>
              </Link>
            </div>
            {conversation.messages.length > 0 && (
              <p className="mt-2 text-gray-600 line-clamp-2">
                {conversation.messages[0].content}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 