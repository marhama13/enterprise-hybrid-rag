import type { LucideIcon } from "lucide-react";
interface Props {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
}: Props) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-slate-400 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

        </div>

        <div className="w-12 h-12 rounded-lg bg-cyan-600 flex items-center justify-center">

          <Icon className="text-white" />

        </div>

      </div>

    </div>
  );
}