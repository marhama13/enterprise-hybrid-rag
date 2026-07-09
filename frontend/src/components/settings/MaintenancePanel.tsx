import { Trash2, MessageSquare, RotateCcw } from "lucide-react";

export default function MaintenancePanel() {
  function clearChat() {
    if (confirm("Clear all chat history?")) {
      alert("Chat history cleared.");
    }
  }

  function clearVectorDB() {
    if (confirm("Clear vector database?")) {
      alert("Vector database cleared.");
    }
  }

  function refreshSystem() {
    window.location.reload();
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

      <h2 className="text-xl font-semibold mb-6">
        Maintenance
      </h2>

      <div className="flex flex-wrap gap-4">

        <button
          onClick={clearChat}
          className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 transition px-5 py-3 rounded-lg"
        >
          <MessageSquare size={18} />
          Clear Chat
        </button>

        <button
          onClick={clearVectorDB}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition px-5 py-3 rounded-lg"
        >
          <Trash2 size={18} />
          Clear Vector DB
        </button>

        <button
          onClick={refreshSystem}
          className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 transition px-5 py-3 rounded-lg"
        >
          <RotateCcw size={18} />
          Refresh
        </button>

      </div>

      <p className="text-slate-400 text-sm mt-6">
        Administrative maintenance tools for the Enterprise Hybrid RAG platform.
      </p>

    </div>
  );
}