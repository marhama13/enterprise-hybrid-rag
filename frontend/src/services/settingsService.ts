import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
});

export interface SettingsResponse {
  llm_model: string;
  embedding_model: string;
  vector_database: string;

  system: {
    fastapi: string;
    ollama: string;
    chromadb: string;
  };

  version: string;

  frameworks: string[];
}

export async function getSettings(): Promise<SettingsResponse> {
  const response = await API.get("/settings/");
  return response.data;
}