import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export interface DocumentDetail {
  document: string;
  chunks: number;
}

export interface AnalyticsResponse {
  documents: number;
  chunks: number;
  embeddings: number;
  queries: number;
  average_response_time: number;
  model: string;

  system_status: {
    fastapi: string;
    llm_provider: string;
    chromadb: string;
  };

  documents_detail: DocumentDetail[];
}

export async function getAnalytics(): Promise<AnalyticsResponse> {
  const response = await API.get("/analytics/");
  return response.data;
}