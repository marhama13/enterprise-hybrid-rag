import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { getAnalytics } from "../services/analyticsService";
import type { AnalyticsResponse } from "../services/analyticsService";

import StatCard from "../components/analytics/StatCard";
import DocumentsTable from "../components/analytics/DocumentsTable";
import SystemStatus from "../components/analytics/SystemStatus";

import AnalyticsCharts from "../components/analytics/AnalyticsCharts";
import {
  FileText,
  Boxes,
  Brain,
  Bot,
} from "lucide-react";

export default function Analytics() {

  const [analytics, setAnalytics] =
    useState<AnalyticsResponse | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadAnalytics();

  }, []);

  async function loadAnalytics() {

    try {

      const data = await getAnalytics();

      setAnalytics(data);

    } finally {

      setLoading(false);

    }

  }

  if (loading) {

    return (
      <MainLayout>

        <div className="text-xl">
          Loading analytics...
        </div>

      </MainLayout>
    );

  }

  if (!analytics) {

    return (
      <MainLayout>

        <div>
          Failed to load analytics.
        </div>

      </MainLayout>
    );

  }

  return (

    <MainLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            Analytics
          </h1>

          <p className="text-slate-400 mt-2">
            Enterprise Hybrid RAG Statistics
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <StatCard
            title="Documents"
            value={analytics.documents}
            icon={FileText}
          />

          <StatCard
            title="Chunks"
            value={analytics.chunks}
            icon={Boxes}
          />

          <StatCard
            title="Embeddings"
            value={analytics.embeddings}
            icon={Brain}
          />

          <StatCard
            title="AI Model"
            value={analytics.model}
            icon={Bot}
          />

        </div>

        <AnalyticsCharts
            documents={analytics.documents_detail}
        />

        <SystemStatus
            status={analytics.system_status}
        />

        <DocumentsTable
          documents={analytics.documents_detail}
        />

      </div>

    </MainLayout>

  );

}