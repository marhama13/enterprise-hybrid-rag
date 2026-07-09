import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
});

export interface DocumentDetail {
  document: string;
  chunks: number;
}

export interface AnalyticsResponse {
  documents: number;
  chunks: number;
  embeddings: number;
  model: string;

  system_status: {
    fastapi: string;
    ollama: string;
    chromadb: string;
  };

  documents_detail: DocumentDetail[];
}

export async function getAnalytics(): Promise<AnalyticsResponse> {
  const response = await API.get("/analytics/");
  return response.data;
}