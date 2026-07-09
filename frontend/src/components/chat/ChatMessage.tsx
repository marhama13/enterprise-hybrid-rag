import CitationCard from "./CitationCard";
import ReactMarkdown from "react-markdown";
import { Bot, User } from "lucide-react";

interface Source {
  document: string;
  page: number;
  chunk: number;
}

interface Props {
  message: {
    role: string;
    content: string;
    sources?: Source[];
  };
}

export default function ChatMessage({ message }: Props) {
  return (
    <div
      className={`flex gap-3 ${
        message.role === "user"
          ? "justify-end"
          : "justify-start"
      }`}
    >
      {/* AI Avatar */}
      {message.role === "assistant" && (
        <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center shadow-lg flex-shrink-0">
          <Bot size={20} className="text-white" />
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={`max-w-2xl rounded-xl p-5 ${
          message.role === "user"
            ? "bg-cyan-600 text-white"
            : "bg-slate-800 text-white"
        }`}
      >
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>

        {message.sources && message.sources.length > 0 && (
          <div className="mt-5">
            <p className="mb-2 text-sm font-semibold text-cyan-400">
              📄 Sources
            </p>

            {message.sources.map((source, index) => (
              <CitationCard
                key={index}
                source={source}
              />
            ))}
          </div>
        )}
      </div>

      {/* User Avatar */}
      {message.role === "user" && (
        <div className="w-10 h-10 rounded-full bg-slate-700 border border-slate-500 flex items-center justify-center flex-shrink-0">
          <User size={20} className="text-white" />
        </div>
      )}
    </div>
  );
}