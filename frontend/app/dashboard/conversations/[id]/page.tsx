"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  role: string;
  content: string;
}

interface Conversation {
  id: number;
  title: string;
  created_at: string;
  messages: Message[];
}

export default function ConversationDetailsPage() {
  const { id } = useParams();
  const { toast } = useToast();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchConversation();
  }, [id]);

  const fetchConversation = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/conversations/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al cargar la conversación");
      }

      const data = await response.json();
      setConversation(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un error al cargar la conversación.",
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

  if (!conversation) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold mb-4">Conversación no encontrada</h2>
        <Link href="/dashboard/conversations">
          <Button>Volver a la lista</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{conversation.title}</h1>
          <p className="text-sm text-gray-500">
            {formatDate(conversation.created_at)}
          </p>
        </div>
        <Link href="/dashboard/conversations">
          <Button variant="outline">Volver a la lista</Button>
        </Link>
      </div>
      <div className="space-y-4">
        {conversation.messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 