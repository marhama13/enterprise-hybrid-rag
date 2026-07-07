import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: StatCardProps) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 hover:border-cyan-500 transition-all">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-400 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-3">
            {value}
          </h2>

        </div>

        <div className={`${color} p-4 rounded-xl`}>
          <Icon size={28} />
        </div>

      </div>

    </div>
  );
}