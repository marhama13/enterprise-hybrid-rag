import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
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