import {
  LayoutDashboard,
  Upload,
  MessageSquare,
  BarChart3,
  Settings,
} from "lucide-react";

import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  return (
    <aside className="w-72 bg-slate-950 border-r border-slate-800 flex flex-col p-6">

      <h1 className="text-2xl font-bold text-cyan-400 mb-10">
        Enterprise Hybrid RAG
      </h1>

      <div className="space-y-2">

        <SidebarItem
          icon={LayoutDashboard}
          title="Dashboard"
          to="/"
        />

        <SidebarItem
          icon={Upload}
          title="Upload"
          to="/upload"
        />

        <SidebarItem
          icon={MessageSquare}
          title="Chat"
          to="/chat"
        />

        <SidebarItem
          icon={BarChart3}
          title="Analytics"
          to="/analytics"
        />

        <SidebarItem
          icon={Settings}
          title="Settings"
          to="/settings"
        />

      </div>

    </aside>
  );
}