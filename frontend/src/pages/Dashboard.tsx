import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/dashboard/StatCard";
import ActivityCard from "../components/dashboard/ActivityCard";
import SystemStatus from "../components/dashboard/SystemStatus";

import {
  FileText,
  Database,
  MessageCircle,
  Activity,
} from "lucide-react";

export default function Dashboard() {
  return (
    <MainLayout>
      {/* Header */}
      <h1 className="text-4xl font-bold mb-2">
        Welcome 👋
      </h1>

      <p className="text-slate-400 mb-10">
        Enterprise Hybrid RAG Platform
      </p>

      {/* Statistics Cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Documents"
          value={0}
          icon={FileText}
          color="bg-blue-600"
        />

        <StatCard
          title="Chunks"
          value={0}
          icon={Database}
          color="bg-purple-600"
        />

        <StatCard
          title="Queries"
          value={0}
          icon={MessageCircle}
          color="bg-green-600"
        />

        <StatCard
          title="System"
          value="Healthy"
          icon={Activity}
          color="bg-cyan-600"
        />
      </div>

      {/* Activity + System Status */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-10">
        <div className="xl:col-span-2">
          <ActivityCard />
        </div>

        <SystemStatus />
      </div>
    </MainLayout>
  );
}