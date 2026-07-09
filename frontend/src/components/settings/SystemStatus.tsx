interface Props {
  system: {
    fastapi: string;
    llm_provider: string;
    chromadb: string;
  };
}

export default function SystemStatus({
  system,
}: Props) {
  return (

    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

      <h2 className="text-xl font-semibold mb-6">
        System Status
      </h2>

      <div className="space-y-3">

        {Object.entries(system).map(([key, value]) => (

          <div
            key={key}
            className="flex justify-between"
          >

            <span className="capitalize">
              {key}
            </span>

            <span className="text-green-400">
              🟢 {value}
            </span>

          </div>

        ))}

      </div>

    </div>

  );
}