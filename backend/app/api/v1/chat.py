import time

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.retrieval.hybrid_service import HybridService
from app.services.prompt_builder import PromptBuilder
from app.services.llm_service import LLMService

import time

from app.services.analytics_state import AnalyticsState


router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)

hybrid = HybridService()


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    question: str
    document_name: str | None = None
    history: list[ChatMessage] = []


@router.post("/")
def chat(request: ChatRequest):

    start_time = time.perf_counter()

    try:

        results = hybrid.search(
            query=request.question,
            document_name=request.document_name,
        )

        if not results:

            response_time = round(
                time.perf_counter() - start_time,
                2,
            )

            AnalyticsState.add_query(response_time)

            return {
                "question": request.question,
                "answer": "I couldn't find this information in the uploaded documents.",
                "sources": [],
                "response_time": response_time,
            }

        prompt = PromptBuilder.build(
            question=request.question,
            contexts=results,
            history=request.history,
        )

        answer = LLMService.generate(prompt)

        sources = []

        for item in results:

            sources.append(
                {
                    "document": item["metadata"]["document_name"],
                    "page": item["metadata"]["page_number"],
                    "chunk": item["metadata"]["chunk_number"],
                    
                }
            )

        response_time = round(
            time.perf_counter() - start_time,
            2,
        )
        AnalyticsState.add_query(response_time)

        print("=" * 60)
        print("Question :", request.question)
        print("Retrieved :", len(results), "chunks")
        print("Time :", response_time, "seconds")
        print("=" * 60)

        return {
            "question": request.question,
            "answer": answer,
            "sources": sources,
            "response_time": response_time,
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Chat service error: {str(e)}",
        )