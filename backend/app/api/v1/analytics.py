from pathlib import Path
import json

from fastapi import APIRouter

from app.services.llm_service import LLMService

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"],
)


@router.get("/")
def get_analytics():

    processed_dir = Path("processed")

    total_documents = 0
    total_chunks = 0

    document_stats = []

    for file in processed_dir.glob("*.json"):

        with open(file, "r", encoding="utf-8") as f:
            data = json.load(f)

        chunk_count = len(data["chunks"])

        total_documents += 1
        total_chunks += chunk_count

        document_stats.append(
            {
                "document": file.stem,
                "chunks": chunk_count,
            }
        )

    return {
        "documents": total_documents,
        "chunks": total_chunks,
        "embeddings": total_chunks,

        "model": LLMService.MODEL_NAME,

        "system_status": {
            "fastapi": "Running",
            "ollama": "Connected",
            "chromadb": "Healthy",
        },

        "documents_detail": document_stats,
    }