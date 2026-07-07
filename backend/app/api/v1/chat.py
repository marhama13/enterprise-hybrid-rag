from fastapi import APIRouter
from pydantic import BaseModel

from app.services.retrieval.hybrid_service import HybridService
from app.services.prompt_builder import PromptBuilder
from app.services.llm_service import LLMService

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)

hybrid = HybridService()


class ChatRequest(BaseModel):
    question: str
    document_name: str | None = None


@router.post("/")
def chat(request: ChatRequest):

    results = hybrid.search(
        query=request.question,
        document_name=request.document_name,
    )

    prompt = PromptBuilder.build(
        question=request.question,
        contexts=results,
    )

    answer = LLMService.generate(prompt)

    sources = []

    for item in results:

        sources.append(
            {
                "document": item["metadata"]["document_name"],
                "page": item["metadata"]["page_number"],
                "chunk": item["metadata"]["chunk_number"],
                "score": round(item["rerank_score"], 2),
            }
        )

    return {
        "question": request.question,
        "answer": answer,
        "sources": sources,
    }