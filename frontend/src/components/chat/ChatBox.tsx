

import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";

import { askQuestion } from "../../services/chatService";

import { useState, useEffect, useRef } from "react";

interface Source {
  document: string;
  page: number;
  chunk: number;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "👋 Hello! I'm your Enterprise Hybrid RAG Assistant.\n\nUpload a PDF and ask me anything about it.",
    },
  ]);
  
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
    });
    }, [messages, loading]);


  const handleSend = async (question: string) => {
    // Show user's message immediately
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: question,
      },
    ]);

    setLoading(true);

    try {
      const history = messages.map((message) => ({
  role: message.role,
  content: message.content,
}));

const response = await askQuestion(
  question,
  history
);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.answer,
          sources: response.sources.slice(0, 3),
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "❌ Sorry, I couldn't connect to the AI backend. Please make sure the backend and Ollama are running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-800 bg-slate-900">

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-6 p-6">

        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message}
          />
        ))}

        {loading && <TypingIndicator />}

        <div ref={messagesEndRef} />

      </div>

      {/* Input */}
      <ChatInput
        onSend={handleSend}
        loading={loading}
    />

    </div>
  );
}