import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import {
  getSettings,
} from "../services/settingsService";

import type {
  SettingsResponse,
} from "../services/settingsService";

import SettingCard from "../components/settings/SettingCard";
import SystemStatus from "../components/settings/SystemStatus";

import MaintenancePanel from "../components/settings/MaintenancePanel";
import AboutProject from "../components/settings/AboutProject";

export default function Settings() {

  const [settings, setSettings] =
    useState<SettingsResponse | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadSettings();

  }, []);

  async function loadSettings() {

    try {

      const data = await getSettings();

      setSettings(data);

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

  if (!settings) {

    return (

      <MainLayout>

        <div className="text-red-400">

          Failed to load settings.

        </div>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            Settings
          </h1>

          <p className="text-slate-400 mt-2">
            Enterprise Hybrid RAG Configuration
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <SettingCard
            title="LLM Model"
            value={settings.llm_model}
          />

          <SettingCard
            title="Embedding Model"
            value={settings.embedding_model}
          />

          <SettingCard
            title="Vector Database"
            value={settings.vector_database}
          />

        </div>

        <SystemStatus
          system={settings.system}
        />

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

          <h2 className="text-xl font-semibold mb-6">
            Frameworks
          </h2>

          <div className="flex flex-wrap gap-3">

            {settings.frameworks.map((framework) => (

              <span
                key={framework}
                className="bg-cyan-600 px-4 py-2 rounded-lg"
              >
                {framework}
              </span>

            ))}

          </div>

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

            <MaintenancePanel />

            <AboutProject />

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

          <h2 className="text-xl font-semibold">
            Version
          </h2>

          <p className="text-slate-400 mt-2">
            {settings.version}
          </p>

        </div>

      </div>

    </MainLayout>

  );

}