interface Props {
  system?: {
    fastapi: string;
    llm_provider: string;
    chromadb: string;
  };
}

export default function SystemStatus({ system }: Props) {

  const systems = [

    {
      name: "FastAPI",
      status: system?.fastapi ?? "Unknown",
      color: "text-green-400",
    },

    {
      name: "LLM",
      status: system?.llm_provider ?? "Unknown",
      color: "text-green-400",
    },

    {
      name: "ChromaDB",
      status: system?.chromadb ?? "Unknown",
      color: "text-green-400",
    },

  ];

  return (

    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">

      <h2 className="text-xl font-bold mb-6">
        System Status
      </h2>

      {systems.map((item) => (

        <div
          key={item.name}
          className="grid grid-cols-2 py-3 border-b border-slate-800 last:border-none"
        >

          <span className="text-slate-400">

            {item.name}

          </span>

          <span
            className={`text-right font-semibold ${item.color}`}
          >

            🟢 {item.status}

          </span>

        </div>

      ))}

    </div>

  );

}