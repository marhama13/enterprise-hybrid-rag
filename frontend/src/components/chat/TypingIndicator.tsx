import { Bot } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex gap-3 justify-start">

      <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center shadow-lg">
        <Bot size={20} className="text-white" />
      </div>

      <div className="rounded-xl bg-slate-800 px-5 py-4">

        <div className="flex items-center gap-2">

          <div className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce"></div>

          <div
            className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce"
            style={{ animationDelay: "0.15s" }}
          ></div>

          <div
            className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce"
            style={{ animationDelay: "0.3s" }}
          ></div>

        </div>

      </div>

    </div>
  );
}