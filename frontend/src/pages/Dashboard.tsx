import { useEffect, useState } from "react";

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

import {
  getAnalytics,
} from "../services/analyticsService";

import type {
  AnalyticsResponse,
} from "../services/analyticsService";

import {
  getSettings,
} from "../services/settingsService";

import type {
  SettingsResponse,
} from "../services/settingsService";

export default function Dashboard() {

  const [analytics, setAnalytics] =
    useState<AnalyticsResponse | null>(null);

  const [settings, setSettings] =
    useState<SettingsResponse | null>(null);

  

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadDashboard();

  }, []);

  async function loadDashboard() {

    try {

      const [
        analyticsData,
        settingsData,
      ] = await Promise.all([
        getAnalytics(),
        getSettings(),
      ]);

      setAnalytics(analyticsData);
      setSettings(settingsData);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  if (loading) {

    return (

      <MainLayout>

        <div className="flex items-center justify-center h-64">

          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>

        </div>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      {/* Header */}

      <h1 className="text-4xl font-bold mb-2">
        Welcome 👋
      </h1>

      <p className="text-slate-400 mb-10">
        Enterprise Hybrid RAG Platform
      </p>

      {/* Statistics */}

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Documents"
          value={analytics?.documents ?? 0}
          icon={FileText}
          color="bg-blue-600"
        />

        <StatCard
          title="Chunks"
          value={analytics?.chunks ?? 0}
          icon={Database}
          color="bg-purple-600"
        />

        <StatCard
            title="Queries"
            value={analytics?.queries ?? 0}
            icon={MessageCircle}
            color="bg-green-600"
        />

        <StatCard
          title="System"
          value={settings?.system.fastapi ?? "Unknown"}
          icon={Activity}
          color="bg-cyan-600"
        />

      </div>

      {/* Activity + System */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-10">

        <div className="xl:col-span-2">

          <ActivityCard
            documents={analytics?.documents_detail ?? []}
          />

        </div>

        <SystemStatus
          system={settings?.system}
        />

      </div>

    </MainLayout>

  );

}