import os

from app.services.groq_service import GroqService
from app.services.ollama_service import OllamaService


class LLMService:

    PROVIDER = os.getenv("LLM_PROVIDER", "groq").lower()

    # <-- ADD THIS
    MODEL_NAME = (
        os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")
        if PROVIDER == "groq"
        else os.getenv("OLLAMA_MODEL", "llama3.2")
    )

    @classmethod
    def generate(cls, prompt: str):

        if cls.PROVIDER == "groq":
            return GroqService.generate(prompt)

        elif cls.PROVIDER == "ollama":
            return OllamaService.generate(prompt)

        raise ValueError(f"Unsupported provider: {cls.PROVIDER}")