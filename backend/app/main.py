from fastapi import FastAPI

app = FastAPI(
    title="Enterprise Hybrid RAG API",
    version="1.0.0",
    description="AI Knowledge Assistant using Hybrid Retrieval-Augmented Generation"
)

@app.get("/")
def home():
    return {
        "message": "Welcome to Enterprise Hybrid RAG API 🚀"
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }