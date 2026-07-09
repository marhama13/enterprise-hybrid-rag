import os
import ollama


class OllamaService:

    MODEL = os.getenv(
        "OLLAMA_MODEL",
        "llama3.2"
    )

    HOST = os.getenv(
        "OLLAMA_HOST",
        "http://host.docker.internal:11434"
    )

    client = ollama.Client(host=HOST)

    @classmethod
    def generate(cls, prompt: str) -> str:

        response = cls.client.chat(
            model=cls.MODEL,
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            options={
                "temperature": 0.1,
                "num_predict": 180,
            },
        )

        return response["message"]["content"]