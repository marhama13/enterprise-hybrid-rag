const systems = [
  { name: "Backend", status: "Healthy", color: "text-green-400" },
  { name: "Vector DB", status: "Pending", color: "text-yellow-400" },
  { name: "Embedding", status: "Pending", color: "text-yellow-400" },
  { name: "Retriever", status: "Hybrid Search", color: "text-blue-400" },
  { name: "Reranker", status: "Cross Encoder", color: "text-purple-400" },
];

export default function SystemStatus() {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
      <h2 className="text-xl font-bold mb-6">System Status</h2>

      {systems.map((item) => (
        <div
          key={item.name}
          className="grid grid-cols-2 py-3 border-b border-slate-800 last:border-none"
        >
          <span className="text-slate-400">{item.name}</span>

          <span className={`text-right font-semibold ${item.color}`}>
            {item.status}
          </span>
        </div>
      ))}
    </div>
  );
}