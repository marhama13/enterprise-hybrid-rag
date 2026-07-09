import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
});

export interface ChatHistory {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  question: string;
  answer: string;
  sources: {
    document: string;
    page: number;
    chunk: number;
  }[];
  response_time: number;
}

export async function askQuestion(
  question: string,
  history: ChatHistory[],
  document_name?: string
): Promise<ChatResponse> {

  const response = await API.post("/chat/", {
    question,
    document_name,
    history,
  });

  return response.data;
}