from fastapi import FastAPI

from app.api.v1.health import router as health_router
from app.core.config import settings
from app.core.logging import logger
logger.info("Enterprise Hybrid RAG API Started Successfully")
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="AI Knowledge Assistant using Hybrid Retrieval-Augmented Generation",
)

app.include_router(
    health_router,
    prefix=settings.API_V1_STR,
)


@app.get("/")
def home():
    return {
        "message": "Welcome to Enterprise Hybrid RAG API 🚀"
    }