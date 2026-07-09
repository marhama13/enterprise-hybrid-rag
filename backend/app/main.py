from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.health import router as health_router
from app.core.config import settings
from app.core.logging import logger
from app.api.v1.upload import router as upload_router
from app.api.v1.chat import router as chat_router
from app.api.v1 import analytics
logger.info("Enterprise Hybrid RAG API Started Successfully")
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="AI Knowledge Assistant using Hybrid Retrieval-Augmented Generation",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(
    health_router,
    prefix=settings.API_V1_STR,
)

app.include_router(
    upload_router,
    prefix=settings.API_V1_STR,
)
app.include_router(
    chat_router,
    prefix=settings.API_V1_STR,
)
app.include_router(
    analytics.router,
    prefix="/api/v1",
)

@app.get("/")
def home():
    return {
        "message": "Welcome to Enterprise Hybrid RAG API 🚀"
    }