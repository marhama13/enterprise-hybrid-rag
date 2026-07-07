import { UploadCloud } from "lucide-react";

export default function ActivityCard() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

      <h2 className="text-xl font-semibold mb-6">
        Recent Activity
      </h2>

      <div className="flex flex-col items-center justify-center py-10">

        <UploadCloud size={60} className="text-cyan-400 mb-4" />

        <h3 className="text-lg font-semibold">
          No documents uploaded
        </h3>

        <p className="text-slate-400 mt-2">
          Upload your first PDF to start chatting with your documents.
        </p>

        <button className="mt-6 bg-cyan-600 hover:bg-cyan-500 px-6 py-3 rounded-lg transition">
          Upload Document
        </button>

      </div>

    </div>
  );
}