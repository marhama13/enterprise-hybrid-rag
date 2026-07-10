import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export interface SettingsResponse {
  llm_model: string;
  embedding_model: string;
  vector_database: string;

  system: {
    fastapi: string;
     llm_provider: string;
    chromadb: string;
  };

  version: string;

  frameworks: string[];
}

export async function getSettings(): Promise<SettingsResponse> {
  const response = await API.get("/settings/");
  return response.data;
}