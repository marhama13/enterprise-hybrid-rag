from fastapi import APIRouter

from app.services.llm_service import LLMService

router = APIRouter(
    prefix="/settings",
    tags=["Settings"],
)


@router.get("/")
def get_settings():

    return {
        "llm_model": LLMService.MODEL_NAME,
        "embedding_model": "all-MiniLM-L6-v2",
        "vector_database": "ChromaDB",

        "system": {
            "fastapi": "Running",
            "llm_provider": LLMService.PROVIDER,
            "chromadb": "Healthy",
        },

        "version": "1.0.0",

       "frameworks": [
            "FastAPI",
            "React",
            "ChromaDB",
            "Groq" if LLMService.PROVIDER == "groq" else "Ollama",
        ],
    }