interface Props {
  status: {
    fastapi: string;
    llm_provider: string;
    chromadb: string;
  };
}

export default function SystemStatus({ status }: Props) {
  const systems = [
    { name: "FastAPI", value: status.fastapi },
    { name: "LLM Provider", value: status.llm_provider },
    { name: "ChromaDB", value: status.chromadb },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

      <h2 className="text-xl font-semibold mb-6">
        System Status
      </h2>

      <div className="space-y-4">

        {systems.map((system) => (

          <div
            key={system.name}
            className="flex items-center justify-between"
          >

            <span>{system.name}</span>

            <div className="flex items-center gap-2">

              <div className="w-3 h-3 rounded-full bg-green-500" />

              <span className="text-green-400">
                {system.value}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}