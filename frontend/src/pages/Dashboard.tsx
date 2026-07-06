import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
  api
    .get("/health")
    .then((response) => {
      console.log(response.data);
      setStatus(response.data.status);
    })
    .catch((error) => {
      console.error(error);
      setStatus("Backend Offline");
    });
}, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Enterprise Hybrid RAG</h1>

      <h2>Backend Status:</h2>

      <p>{status}</p>
    </div>
  );
}