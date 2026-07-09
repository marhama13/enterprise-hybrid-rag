import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface DocumentDetail {
  document: string;
  chunks: number;
}

interface Props {
  documents: DocumentDetail[];
}

const COLORS = [
  "#06b6d4",
  "#3b82f6",
  "#14b8a6",
  "#8b5cf6",
  "#f59e0b",
  "#10b981",
];

export default function AnalyticsCharts({ documents }: Props) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

      {/* Bar Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

        <h2 className="text-xl font-semibold mb-6">
          Chunks per Document
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={documents}>
            <XAxis dataKey="document" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="chunks" fill="#06b6d4" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* Pie Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

        <h2 className="text-xl font-semibold mb-6">
          Chunk Distribution
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>

            <Pie
              data={documents}
              dataKey="chunks"
              nameKey="document"
              outerRadius={110}
              label
            >

              {documents.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}

            </Pie>

            <Tooltip />

          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}