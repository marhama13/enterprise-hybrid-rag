export default function AboutProject() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

      <h2 className="text-xl font-semibold mb-6">
        About Project
      </h2>

      <div className="space-y-3">

        <div className="flex justify-between">
          <span>Project</span>
          <span className="text-cyan-400">
            Enterprise Hybrid RAG
          </span>
        </div>

        <div className="flex justify-between">
          <span>Developer</span>
          <span className="text-cyan-400">
            Marhama Shaikh
          </span>
        </div>

        <div className="flex justify-between">
          <span>Backend</span>
          <span className="text-cyan-400">
            FastAPI
          </span>
        </div>

        <div className="flex justify-between">
          <span>Frontend</span>
          <span className="text-cyan-400">
            React + TypeScript
          </span>
        </div>

        <div className="flex justify-between">
          <span>LLM</span>
          <span className="text-cyan-400">
            Local (Ollama) / Cloud (Groq)
          </span>
        </div>

        <div className="flex justify-between">
          <span>Vector DB</span>
          <span className="text-cyan-400">
            ChromaDB
          </span>
        </div>

      </div>

    </div>
  );
}