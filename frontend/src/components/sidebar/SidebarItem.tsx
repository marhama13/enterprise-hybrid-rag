import type { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  icon: LucideIcon;
  title: string;
  active?: boolean;
}

export default function SidebarItem({
  icon: Icon,
  title,
  active = false,
}: SidebarItemProps) {
  return (
    <button
      className={`w-full flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
        active
          ? "bg-cyan-600 text-white"
          : "text-slate-400 hover:bg-slate-800 hover:text-white"
      }`}
    >
      <Icon size={20} />
      <span>{title}</span>
    </button>
  );
}